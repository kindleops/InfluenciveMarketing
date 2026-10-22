import path from "node:path";
import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const AXE_PATH = path.join(process.cwd(), "node_modules/axe-core/axe.min.js");

/* Messages the environment produces, not the site: software-GL driver
   chatter on GPU-less machines. Anything else fails the run. */
const ENV_NOISE = [/swiftshader/i, /GPU stall/i, /GroupMarkerNotSet/i, /WebGL/i, /was preloaded using link preload but not used/i];

function watchConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (m: ConsoleMessage) => {
    if (m.type() !== "error" && m.type() !== "warning") return;
    const text = m.text();
    if (ENV_NOISE.some((r) => r.test(text))) return;
    problems.push(`${m.type()}: ${text}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  return problems;
}

async function skipIntro(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("intro-seen", "1"));
}

/** Scroll the whole page in steps so every reveal and lazy scene runs. */
async function traverse(page: Page, step = 600) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += step) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(600);
}

/** Wait until every finite animation (entrances, fades) has finished, so an
 *  audit never samples text halfway through fading in. */
async function settle(page: Page) {
  await page.waitForFunction(
    () => document.getAnimations().every((a) => a.playState !== "running" || a.effect?.getTiming().iterations === Infinity),
    undefined,
    { timeout: 10_000 },
  );
}

async function routes(page: Page) {
  const res = await page.request.get("/sitemap.xml");
  expect(res.ok()).toBeTruthy();
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

test.describe("home page", () => {
  test("loads without console, hydration or page errors", async ({ page }) => {
    await skipIntro(page);
    const problems = watchConsole(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1, name: /AI that does the work/ })).toBeVisible();
    await traverse(page);
    expect(problems.filter((p) => /hydrat/i.test(p)), "hydration").toEqual([]);
    expect(problems).toEqual([]);
  });

  for (const vp of [
    { width: 1920, height: 1080 },
    { width: 1280, height: 800 },
    { width: 820, height: 1180 },
    { width: 390, height: 844 },
  ]) {
    test(`no horizontal overflow at ${vp.width}px`, async ({ page }) => {
      await skipIntro(page);
      await page.setViewportSize(vp);
      await page.goto("/", { waitUntil: "networkidle" });
      await traverse(page, 700);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("the agent console plays a run and the workflow switches routes", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });

    // Hero: the agent works the request step by step, then waits for a person.
    const trace = page.locator("section[aria-labelledby='hero-title'] ol").first();
    await expect(trace.locator("li[data-kind='Review']")).toHaveCount(1, { timeout: 20_000 });
    await expect(trace.locator("li[data-kind='Action']")).toHaveCount(1, { timeout: 10_000 });

    // Automation: choosing the request changes which route is lit.
    const flow = page.getByRole("radiogroup", { name: "Run the workflow with" });
    await flow.scrollIntoViewIfNeeded();
    const steps = page.locator("section[aria-labelledby='flow-title'] ol li[data-on]");
    await expect(steps.filter({ hasText: "Owner reviews" })).toHaveCount(1);
    await flow.getByRole("radio", { name: "Routine question" }).click();
    await expect(flow.getByRole("radio", { name: "Routine question" })).toHaveAttribute("aria-checked", "true");
    await expect(steps.filter({ hasText: "Draft answer" })).toHaveCount(1);
    await expect(steps.filter({ hasText: "Owner reviews" })).toHaveCount(0);

    // Finale: the closing scene still settles as it reaches the centre.
    await page.locator("section[aria-labelledby='cta-title'] [class*='stageGap']").scrollIntoViewIfNeeded();
    const readSettle = () =>
      page.evaluate(() =>
        parseFloat(getComputedStyle(document.querySelector("section[aria-labelledby='cta-title']")!).getPropertyValue("--settle")),
      );
    await expect
      .poll(async () => {
        await page.mouse.wheel(0, 40); // arrive the way a visitor does
        return readSettle();
      }, { timeout: 8000 })
      .toBeGreaterThan(0.5);
  });

  test("the team switcher responds to pointer and keyboard", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const list = page.getByRole("tablist", { name: "Teams" });
    await list.scrollIntoViewIfNeeded();
    const tabs = list.getByRole("tab");
    await expect(tabs).toHaveCount(6);
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("Triage and routing");
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(2)).toBeFocused();
    await expect(page.getByRole("tabpanel")).toContainText("Document intake");
    await page.keyboard.press("End");
    await expect(tabs.nth(5)).toHaveAttribute("aria-selected", "true");
  });

  test("the automation theater plays, switches flows and pauses", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const theater = page.locator("section[aria-labelledby='flows-title'] [class*='theater']").first();
    await theater.scrollIntoViewIfNeeded();
    const log = theater.locator("[class*='log'] ol li");
    // The run advances on its own: the log fills as events land.
    await expect.poll(() => log.count(), { timeout: 15_000 }).toBeGreaterThan(2);
    // Choosing a flow restarts the scene on that flow.
    const scenes = theater.getByRole("group", { name: "Automation examples" });
    await scenes.getByRole("button", { name: /Ticket to resolution/ }).click();
    await expect(scenes.getByRole("button", { name: /Ticket to resolution/ })).toHaveAttribute("aria-pressed", "true");
    await expect(theater.locator("[class*='flowTitle']")).toHaveText("Ticket to resolution");
    // Pause holds the frame.
    await theater.getByRole("button", { name: "Pause the examples" }).click();
    const held = await log.count();
    await page.waitForTimeout(2500);
    expect(await log.count()).toBe(held);
    await expect(theater.getByRole("button", { name: "Play the examples" })).toBeVisible();
  });

  test("the services menu opens from the header", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.getByRole("link", { name: "Services", exact: true }).hover();
    const ai = nav.getByRole("link", { name: /AI agent development/ });
    await expect(ai).toBeVisible();
    await page.mouse.move(700, 800);
    await expect(ai).toBeHidden();
    // Keyboard reaches the same links.
    await nav.getByRole("link", { name: "Services", exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(nav.getByRole("link", { name: /AI automation/ }).first()).toBeFocused();
  });

  test("pointer light releases when the pointer leaves", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Primary" });
    const highlight = nav.locator("li[aria-hidden='true']");
    await nav.getByRole("link", { name: "Services", exact: true }).hover();
    await expect(highlight).toHaveAttribute("data-on");
    await page.mouse.move(700, 600);
    await expect(highlight).not.toHaveAttribute("data-on");
  });

  test("keyboard: skip link and visible focus", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeFocused();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const cs = getComputedStyle(el);
      return { style: cs.outlineStyle, width: parseFloat(cs.outlineWidth) };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThan(0);
  });

  test("idle page does not keep the CPU busy", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await traverse(page, 900);
    // Rest on a static scene, away from the WebGL surfaces.
    await page.evaluate(() => {
      const el = document.querySelector("section[aria-labelledby='ship-title']") as HTMLElement;
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 200);
    });
    await page.waitForTimeout(1500);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Performance.enable");
    const read = async () => {
      const { metrics } = await cdp.send("Performance.getMetrics");
      return metrics.find((m) => m.name === "TaskDuration")!.value;
    };
    const a = await read();
    await page.waitForTimeout(3000);
    const busy = (await read()) - a;
    // Less than a fifth of wall time on the main thread while nothing happens.
    expect(busy).toBeLessThan(0.6);
  });
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("composition holds without movement", async ({ page }) => {
    await skipIntro(page);
    const problems = watchConsole(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // The hero holds its opening frame (visibility checks ignore opacity).
    await page.waitForTimeout(500);
    const heroOpacity = await page.evaluate(() => {
      let el: Element | null = document.querySelector("#hero-title");
      let o = 1;
      while (el) {
        o *= parseFloat(getComputedStyle(el).opacity);
        el = el.parentElement;
      }
      return o;
    });
    expect(heroOpacity).toBeGreaterThan(0.95);
    await traverse(page);

    // The agent console shows the finished run, not an empty frame.
    await expect(page.locator("section[aria-labelledby='hero-title'] ol").first().locator("li")).toHaveCount(7);

    // The automation theater shows a whole flow, still.
    await expect(page.locator("section[aria-labelledby='flows-title'] [class*='theater']").first()).toHaveAttribute("data-still");

    // Nothing overflows sideways once motion is removed.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    // Nothing loops or travels: no infinite or long-running CSS animation.
    await page.waitForTimeout(1200);
    const moving = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => {
          const t = a.effect?.getTiming();
          return a.playState === "running" && (a as CSSAnimation).animationName && (t?.iterations === Infinity || Number(t?.duration) > 50);
        })
        .map((a) => (a as CSSAnimation).animationName),
    );
    expect(moving).toEqual([]);
    expect(problems).toEqual([]);
  });
});

test.describe("accessibility", () => {
  test("home has no serious or critical axe violations", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await traverse(page);
    // Scroll-linked states pass through intermediate values; audit at rest.
    await page.waitForTimeout(1500);
    await page.addScriptTag({ path: AXE_PATH });
    const result = await page.evaluate(async () => {
      // @ts-expect-error injected
      const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] });
      return r.violations
        .filter((v: { impact: string }) => v.impact === "serious" || v.impact === "critical")
        .map((v: { id: string; nodes: { target: string[] }[] }) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
    });
    expect(result).toEqual([]);
  });

  test("interior routes have no serious or critical axe violations", async ({ page }) => {
    await skipIntro(page);
    const paths = (await routes(page)).filter((p) => p !== "/").slice(0, 6);
    for (const path of paths) {
      await page.goto(path, { waitUntil: "networkidle" });
      await traverse(page, 900);
      await page.waitForTimeout(1200);
      await settle(page);
      await page.addScriptTag({ path: AXE_PATH });
      const violations = await page.evaluate(async () => {
        // @ts-expect-error injected
        const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa"] });
        return r.violations
          .filter((v: { impact: string }) => v.impact === "serious" || v.impact === "critical")
          .map((v: { id: string; nodes: { target: string[] }[] }) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
      });
      expect(violations, path).toEqual([]);
    }
  });
});

test.describe("routes and links", () => {
  test("every sitemap route renders without errors", async ({ page }) => {
    // The sitemap now includes the commercial and library pages (~110 routes).
    test.setTimeout(900_000);
    await skipIntro(page);
    const paths = await routes(page);
    expect(paths.length).toBeGreaterThan(10);
    for (const path of paths) {
      const problems = watchConsole(page);
      const res = await page.goto(path, { waitUntil: "networkidle" });
      expect(res?.status(), path).toBe(200);
      await expect(page.locator("main h1").first(), path).toBeVisible();
      expect(problems, path).toEqual([]);
      page.removeAllListeners("console");
      page.removeAllListeners("pageerror");
    }
  });

  test("no broken internal links on the home page", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const hrefs = await page.evaluate(() =>
      [...new Set([...document.querySelectorAll("a[href]")].map((a) => (a as HTMLAnchorElement).getAttribute("href")!))].filter(
        (h) => h.startsWith("/") && !h.startsWith("//"),
      ),
    );
    expect(hrefs.length).toBeGreaterThan(10);
    for (const href of hrefs) {
      const res = await page.request.get(href.split("#")[0]);
      expect(res.status(), href).toBe(200);
    }
  });
});
