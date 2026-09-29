import path from "node:path";
import { test, expect, type Page } from "@playwright/test";

/*
 * Client portal. Runs against the developer fixtures (PORTAL_DATA=fixtures,
 * see playwright.config.ts). The fixture world lives in the server process,
 * so tests that change state never assume a starting state they didn't make.
 */

const AXE_PATH = path.join(process.cwd(), "node_modules/axe-core/axe.min.js");
const ROUTES = [
  "/portal",
  "/portal/approvals",
  "/portal/campaigns",
  "/portal/campaigns/c-meta-prospect?tab=performance",
  "/portal/content",
  "/portal/content?view=pipeline",
  "/portal/creative",
  "/portal/analytics",
  "/portal/growth",
  "/portal/messages",
  "/portal/deliverables",
  "/portal/billing",
  "/portal/integrations",
  "/portal/team",
  "/portal/account",
  "/portal/settings",
  "/portal/help",
  "/portal/welcome",
];

function watch(page: Page) {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(m.text());
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  return problems;
}

async function axe(page: Page) {
  await page.waitForFunction(
    () => document.getAnimations().every((a) => a.playState !== "running" || a.effect?.getTiming().iterations === Infinity),
    undefined,
    { timeout: 10_000 },
  );
  await page.addScriptTag({ path: AXE_PATH });
  return page.evaluate(async () => {
    // @ts-expect-error injected
    const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] });
    return r.violations
      .filter((v: { impact: string }) => v.impact === "serious" || v.impact === "critical")
      .map((v: { id: string; nodes: { target: string[] }[] }) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
  });
}

async function overflow(page: Page) {
  return page.evaluate(() => {
    const W = window.innerWidth;
    const clipped = (el: Element) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== "visible") return true;
      return false;
    };
    return [...document.querySelectorAll("body *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > W + 1 && getComputedStyle(el).position !== "fixed" && !clipped(el);
      })
      .slice(0, 3)
      .map((el) => `${el.tagName.toLowerCase()}.${String((el as HTMLElement).className).slice(0, 40)}`);
  });
}

test.describe("portal", () => {
  test("every surface renders, is marked as demo data, and is not indexed", async ({ page }) => {
    for (const r of ROUTES) {
      const problems = watch(page);
      const res = await page.goto(r, { waitUntil: "networkidle" });
      expect(res?.status(), r).toBe(200);
      await expect(page.locator("h1").first(), r).toBeVisible();
      if (r !== "/portal/welcome") await expect(page.getByText("Demo data: developer fixtures, not a real client"), r).toBeAttached();
      await expect(page.locator('meta[name="robots"]'), r).toHaveAttribute("content", /noindex/);
      expect(problems, r).toEqual([]);
    }
  });

  test("command answers what's happening now", async ({ page }) => {
    await page.goto("/portal", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("growth system");
    await expect(page.getByRole("heading", { name: /Needs your attention/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Active work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Performance" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What changed" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Next 14 days" })).toBeVisible();
    // One click opens the exact approval.
    const first = page.getByRole("region", { name: /Needs your attention/ }).getByRole("link").first();
    const href = await first.getAttribute("href");
    await first.click();
    await page.waitForURL((u) => href !== null && u.toString().includes(href.split("?")[0]));
  });

  test("an approval explains itself, records decisions and guards high-impact ones", async ({ page }) => {
    await page.goto("/portal/approvals?id=a-budget", { waitUntil: "networkidle" });
    for (const q of ["What you’re approving", "Why it matters", "What happens after you approve", "History"])
      await expect(page.getByText(q, { exact: true }).first()).toBeVisible();
    const approve = page.getByRole("button", { name: "Approve…" });
    if (await approve.count()) {
      await approve.click();
      await expect(page.getByRole("button", { name: "Confirm & approve" })).toBeVisible();
      await page.getByRole("button", { name: "Cancel" }).click();
      await expect(page.getByRole("button", { name: "Approve…" })).toBeVisible();
    }
    // Request changes cannot be sent without saying what should change.
    await page.goto("/portal/approvals", { waitUntil: "networkidle" });
    const request = page.getByRole("button", { name: "Request changes" });
    if (await request.count()) {
      await request.click();
      await expect(page.getByRole("button", { name: "Send to the team" })).toBeDisabled();
      await page.getByRole("button", { name: "Cancel" }).click();
    }
    // Comments land in the history.
    const note = `Checked on ${Date.now()}`;
    await page.getByLabel("Comment").fill(note);
    await page.getByRole("button", { name: "Comment", exact: true }).click();
    await expect(page.getByText(`“${note}”`)).toBeVisible();
  });

  test("command palette searches the account and navigates", async ({ page }) => {
    await page.goto("/portal", { waitUntil: "networkidle" });
    await page.keyboard.press("Control+k");
    const input = page.getByRole("combobox");
    await expect(input).toBeFocused();
    await input.fill("prospecting");
    await expect(page.getByRole("option", { name: /Always-on prospecting/ })).toBeVisible();
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/portal\/campaigns\/c-meta-prospect/);
    await expect(page.locator("h1")).toHaveText("Always-on prospecting");
  });

  test("messages: reply in context", async ({ page }) => {
    await page.goto("/portal/messages?thread=m-homepage", { waitUntil: "networkidle" });
    const text = `Looks good — ${Date.now()}`;
    await page.getByLabel("Reply").fill(text);
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByText(text)).toBeVisible();
  });

  test("analytics chart reads out by keyboard and has a data table", async ({ page }) => {
    await page.goto("/portal/analytics?range=90d", { waitUntil: "networkidle" });
    const chart = page.getByRole("img", { name: /Revenue, Last 90 days/ });
    await chart.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator("[aria-live=polite]").filter({ hasText: /\$[\d,]+/ }).first()).toBeAttached();
    await expect(page.locator("table caption", { hasText: "Revenue" })).toBeAttached();
  });

  test("roles are enforced: a viewer can't approve or see billing", async ({ page, context }) => {
    await context.addCookies([{ name: "portal-demo-role", value: "viewer", url: "http://localhost:3100/portal" }]);
    await page.goto("/portal/approvals?id=a-promo-dates", { waitUntil: "networkidle" });
    await expect(page.getByRole("button", { name: /^Approve/ })).toHaveCount(0);
    await page.goto("/portal/billing", { waitUntil: "networkidle" });
    await expect(page.getByText("Billing is visible to owners and admins.")).toBeVisible();
  });

  test("a brand-new account shows honest empty states, not invented data", async ({ page, context }) => {
    await context.addCookies([{ name: "portal-client", value: "lumen", url: "http://localhost:3100/portal" }]);
    await page.goto("/portal", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("being prepared");
    await expect(page.getByText("Performance will appear once analytics is connected.")).toBeVisible();
    await page.goto("/portal/campaigns", { waitUntil: "networkidle" });
    await expect(page.getByText("No campaigns have launched yet.")).toBeVisible();
    await page.goto("/portal/analytics", { waitUntil: "networkidle" });
    await expect(page.getByText("This will appear once attribution begins.")).toBeVisible();
  });

  test("no serious or critical axe violations (desktop)", async ({ page }) => {
    for (const r of [...ROUTES, "/portal/approvals?id=a-budget", "/portal/creative?asset=cr-winter-hero", "/portal/content?item=ct-guide-7"]) {
      await page.goto(r, { waitUntil: "networkidle" });
      await page.waitForTimeout(700);
      expect(await axe(page), r).toEqual([]);
    }
  });

  test.describe("phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    test("bottom navigation, no sideways overflow, accessible", async ({ page }) => {
      for (const r of ["/portal", "/portal/approvals?id=a-promo-dates", "/portal/campaigns/c-search-nb", "/portal/analytics", "/portal/content", "/portal/messages?thread=m-film"]) {
        await page.goto(r, { waitUntil: "networkidle" });
        await page.waitForTimeout(600);
        await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: /Approvals/ })).toBeVisible();
        expect(await overflow(page), r).toEqual([]);
        expect(await axe(page), r).toEqual([]);
      }
    });
  });

  test.describe("reduced motion", () => {
    test.use({ contextOptions: { reducedMotion: "reduce" } });

    test("nothing moves on its own", async ({ page }) => {
      for (const r of ["/portal", "/portal/campaigns", "/portal/analytics"]) {
        await page.goto(r, { waitUntil: "networkidle" });
        await page.waitForTimeout(1000);
        const moving = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
        expect(moving, r).toBe(0);
      }
    });
  });
});
