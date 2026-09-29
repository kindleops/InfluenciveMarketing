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
    await expect(page.getByRole("heading", { level: 1, name: "Build what growth requires." })).toBeVisible();
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

  test("signature scenes render and settle", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });

    // Hero glass renders into a WebGL canvas.
    await expect(page.locator("section[aria-labelledby='hero-title'] canvas")).toHaveCount(1);

    // Platform: the machine lands on the horizon, then the camera takes
    // each layer in turn and pulls back to the whole.
    const stage = page.locator("section[aria-labelledby='platform-title'] [data-beat]");
    const scrollTrack = (segments: number) =>
      page.evaluate((k) => {
        const t = document.querySelector("section[aria-labelledby='platform-title'] [class*='track']") as HTMLElement;
        const seg = (t.offsetHeight - window.innerHeight) / 8;
        window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY + seg * k);
      }, segments);
    await scrollTrack(0.95);
    await expect(stage).toHaveAttribute("data-landed");
    await scrollTrack(3.5);
    await expect(stage).toHaveAttribute("data-beat", "2");
    await expect(stage).toHaveAttribute("data-focus");
    await expect(stage.locator("[data-module='Acquisition'][data-active]")).toHaveCount(1);
    await scrollTrack(7.5);
    await expect(stage).toHaveAttribute("data-beat", "6");
    await expect(stage).not.toHaveAttribute("data-focus");

    // AI infrastructure: the field assembles when it arrives.
    const field = page.locator("[class*='IntelligenceField'][class*='field']").first();
    await field.scrollIntoViewIfNeeded();
    await expect(field).toHaveAttribute("data-assembled", "");
    await expect(field).toHaveAttribute("data-live", "");

    // Finale: the scene settles as the glass reaches the centre.
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

  test("disciplines respond to keyboard and pointer", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const list = page.getByRole("tablist", { name: "Disciplines" });
    await list.scrollIntoViewIfNeeded();
    const tabs = list.getByRole("tab");
    await expect(tabs).toHaveCount(8);

    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowDown");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(1)).toBeFocused();
    await page.keyboard.press("End");
    await expect(tabs.nth(7)).toHaveAttribute("aria-selected", "true");

    await tabs.nth(3).hover();
    await expect(tabs.nth(3)).toHaveAttribute("aria-selected", "true");
    const panel = page.getByRole("tabpanel");
    await expect(panel).toHaveAttribute("aria-labelledby", (await tabs.nth(3).getAttribute("id"))!);

    // The lens has moved to the active row.
    const lensY = await list.evaluate((el) => getComputedStyle(el).getPropertyValue("--lens-y"));
    const rowTop = await tabs.nth(3).evaluate((el) => (el as HTMLElement).offsetTop);
    expect(parseFloat(lensY)).toBe(rowTop);
  });

  test("pointer light releases when the pointer leaves", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Primary" });
    const highlight = nav.locator("li[aria-hidden='true']");
    await nav.getByRole("link", { name: "Services" }).hover();
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
      const el = document.querySelector("section[aria-labelledby='pov-title']") as HTMLElement;
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
    await expect(page.locator("section[aria-label='Interlude']")).toHaveAttribute("data-reduced");
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

    // The system's chapter card is shown as a still frame, readable.
    await page.evaluate(() => {
      const t = document.querySelector("section[aria-labelledby='platform-title'] [class*='track']") as HTMLElement;
      window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY + 20);
    });
    await expect
      .poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.querySelector("#platform-title")!.parentElement!).opacity)), { timeout: 15_000 })
      .toBeGreaterThan(0.95);

    // Unpinned scenes are recomposed, not left to overflow.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    // The AI field is shown assembled; no signal animation runs.
    const levelOpacity = await page.evaluate(() => {
      const g = document.querySelector("[class*='IntelligenceField'] [class*='level']") as SVGGElement;
      return parseFloat(getComputedStyle(g).opacity);
    });
    expect(levelOpacity).toBe(1);
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
