# Brand platform

The marketing site for a digital growth company operating across brand, product, growth and intelligence. It is built so the final identity can be swapped in without redesigning anything.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules + design tokens · `motion` · `lenis`
- **Rendering:** every page is statically prerendered; `/api/inquiry` is the only server route.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

Requires Node ≥ 20.9.

---

## Rebranding

The current name is temporary. Identity lives in a handful of files, and nothing else references it:

| What                          | Where                                         |
| ----------------------------- | --------------------------------------------- |
| Name, legal name, email, URL, socials | `src/config/brand.ts`                 |
| Brand glyph (header, footer)  | `src/components/brand/BrandMark.tsx`          |
| Favicon                       | `src/app/icon.svg`                            |
| Social share image            | `src/app/opengraph-image.tsx`                 |
| Palette, type, radii, motion  | `src/styles/tokens.css`                       |

Social links render only when they have a URL. Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, the sitemap and OG metadata resolve correctly.

---

## Design system

### Tokens — `src/styles/tokens.css`

Components use tokens only; they never use raw values.

- **Surfaces:** obsidian → charcoal (`--color-void` … `--color-surface-high`)
- **Text:** ivory, not white (`--text-primary / secondary / muted / faint`)
- **Light:** near-monochrome. Light itself is the accent. Cobalt (`--brand*`) is reserved for signals inside product UI; `AmbientGlow` sources are low-saturation "moonlight".
- **Type:** Geist Sans at a light display weight (`--weight-display`), Geist Mono for labels and metadata. Display type is **two-tone**: `<em className="t-accent">` sets the second phrase in `--text-tone`. Instrument Serif italic (`.t-serif`) is reserved for a few editorial moments (thesis, manifesto, quotes). A fluid scale runs from `--fs-mega` down to `--fs-micro`.
- **Spacing:** one 4px-root scale, `--space-1` … `--space-11`, plus `--section-y`
- **Motion:** `--ease-out` (the house curve), `--ease-soft`, `--ease-in-out`, `--ease-emphasized`. Durations: micro 160 · UI 280 · reveal 760 · cinematic 1200 ms. These are mirrored for JavaScript in `src/lib/motion.ts`.

### Materials — `src/styles/materials.css`

Glass is built as a material rather than a blur utility. Each surface layers a translucent fill with depth-aware blur, a gradient rim with spectral refraction at the trailing edge, and internal specular light that tracks the pointer.

| Level | Use                         |
| ----- | --------------------------- |
| `1`   | Navigation — barely there   |
| `2`   | Interface cards             |
| `3`   | Hero and feature surfaces   |
| `4`   | Interactive, pointer-reactive |

Use `<GlassSurface level={3} interactive />`, or `className="glass" data-level="3"`. `.plate` is the non-glass hairline surface, for places where glass would be noise.

### Scenes

`<Section tone="void | dark | raised | lit | warm">` sets the lighting of each scene so the page has rhythm: some scenes are restrained, others open up. `<AmbientGlow>` adds local light sources.

### Motion

- **Tiers:** every movement uses one of five tiers defined in `tokens.css` (`--m-micro-*`, `--m-interaction-*`, `--m-enter-*`, `--m-reveal-*`, `--m-cinematic-*`), each with a set duration, easing, distance, blur and scale. Surfaces carry inertia and resolve out of a slight defocus rather than bouncing or fading up.
- **Depth:** six levels: 0 atmosphere, 1 distant geometry, 2 supporting visual, 3 product, 4 foreground glass, 5 navigation and active control (`--depth-*`). Blur falls with depth and shadow rises with it. Colour carries a role: blue for intelligence, gold for resolution, violet for creative transition, teal for system energy (`--light-*`).
- **Lit stage:** wrap dark product UI in `.lit-stage` (materials.css) to put a key light, a floor reflection and a faint spatial grid behind it. `--stage-key` sets the light role. The UI stays dark and the surrounding light reveals it.
- **Reveals:** add `data-reveal="up | fade | mask | blur | scale | line"`, `data-split` (via `<SplitText>`) or `data-stagger` to any element, including in server components. A single site-wide `IntersectionObserver` (`RevealObserver`) drives all of them.
- **Pointer:** `InteractionLayer` is one delegated listener for `data-pointer-light` (glass light), `data-tilt` (subtle perspective), `data-magnetic` (buttons) and `data-cursor="Label"` (contextual cursor label). It only runs on fine pointers.
- **Scroll-linked:** the homepage is choreographed as pinned scenes: the hero push-in (`Hero`), the product story (`Platform`: the console arrives from depth, focuses on each layer, then pulls back to the whole machine), the three-act diagram (`ConnectedSystem`) and the horizontal work reel (`WorkReel`, whose pin length is measured from the strip and whose off-centre frames recede). Unpinned scenes: `IntelligenceField` assembles once when it arrives, the point of view resolves clause by clause (`<ScrollScene>` exposes scroll progress as a CSS variable), and `CtaAtmosphere` converges the page's geometry on the finale. Each listens to one `motion` scroll value and writes refs or CSS variables. Opacity is never bound directly to accelerated scroll timelines, because that drifts inside pinned, smooth-scrolled sections. Phones and reduced motion get unpinned, fully composed versions.
- **Chapters:** add `data-chapter="NN|Name"` to a scene root (or `chapter` on `<Section>`) and `ChapterIndicator` shows it vertically in the right margin on desktop.
- **Reduced motion:** movement is removed while composition, light and material stay. Pinned scenes are unpinned and shown in their finished states, reveals become short fades, the shader renders a still frame, and smooth scrolling is disabled. Use `useReducedMotion` from `@/lib/useReducedMotion`, not motion's hook: it is hydration-safe and follows changes to the setting.
- **Off-screen scenes** hold their ambient CSS and SMIL animations (`RevealObserver`), so an idle page does almost no work.
- **Without JavaScript:** reveal states only apply under `html.js`, so the site is fully readable without scripts.

### Primitives

**Display type** reveals character by character (`<SplitText>` default `mode="chars"`; `<Chars>` for custom markup). Lines with their own clipped gradients use `mode="lines"`. Elements with `data-scramble` decode from noise when revealed (running-header labels use it).

**Signature components:** `GlassObject` (hero + `framing="finale"` bookend in the closing CTA), `ServiceExplorer` + `ServiceArt` (eight looping discipline illustrations, auto-advancing tour, glass selection lens with a signal to the stage), `IntelligenceField` (AI as infrastructure: layers stacked over an intelligence ground plane, signals rising through them), `InsightCards` (generative light-field covers per category), `WorkReel`, `Platform`, `Horizon` (full-bleed photographed interlude that opens from a letterbox on scroll).

### Photography

`src/assets/plates/` holds art-directed, AI-generated environment plates: abstract architecture, glass and light, with no people, products, text or brands. Each `WorkVisual` stages its interface glass over one of them (`identity` → `relaunch.jpg`, `growth`, `operations`, `product`), and `Horizon` uses `horizon.jpg` (21:9). They're imported statically, so `next/image` serves responsive AVIF/WebP with a blur placeholder. To replace one, drop in a same-named JPEG around 2,700px wide. Keep them dark, near-monochrome and roughly 16:9.


`Button` (primary / secondary / ghost, magnetic, arrow) · `TextLink` · `Eyebrow` · `SplitText` · `SectionHeading` · `GlassSurface` · `Section` · `AmbientGlow` · `PageHero` · `CaseStudyPreview` · `WorkVisual` · `Quote` · `LogoWall` · `InsightList`

---

## Content and proof

All content lives in `src/content/`, separate from presentation.

**No fabricated proof.** The site ships without testimonials, client logos or client results, and every proof component renders nothing until real, approved entries exist:

- **Testimonials, client logos, recognition:** `src/content/proof.ts`. Add entries and the sections appear automatically on Home, Work and About. Put logos in `/public/clients` as monochrome SVGs.
- **Case studies:** `src/content/work.ts`. Entries with `kind: "blueprint"` are engagement models: no client is named, and each shows the *signals we measure* rather than invented results. Add `kind: "case-study"` entries with a `client`, real `results` and an optional `testimonial`, and they get their own section on `/work`, with results shown on the preview and detail pages.
- **Illustrative interfaces:** the hero console, the work visuals and the decision engine are representations of the kinds of systems we build, and are labelled as illustrative. To show real project media, pass `media` to `<CaseStudyPreview>`.
- **Copy to verify before launch:** operational commitments on `/approach` ("Senior by default", "Weekly increments", …) and the engagement durations in `services.ts` and `work.ts` are draft positioning. Confirm they match how the company actually operates. The legal pages are templates and need review by counsel.

Insights are structured blocks in `src/content/insights.ts` (`p`, `h2`, `quote`, `list`).

---

## Project inquiries

`/start` is a conversational intake with eight steps: keyboard-first, draft saved locally, and deep-linkable (`/start?need=website`). Submissions go to `POST /api/inquiry`, which validates every field server-side and ignores bots caught by the honeypot.

Configure delivery in the environment (see `.env.example`):

| Variable | Effect |
| -------- | ------ |
| `INQUIRY_WEBHOOK_URL` | POSTs the inquiry as readable JSON (Slack workflow, Zapier, Make, CRM) |
| `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` | Sends a formatted email via Resend, with the reply-to set to the visitor |
| `INQUIRY_FROM_EMAIL` | Optional sender address for Resend |

With nothing configured, development logs the inquiry and succeeds. **Production returns 503**, and the form then shows the direct email address, so a lead is never silently dropped.

---

## Performance and accessibility

- The hero object (`components/hero/GlassObject.tsx`) is the brand mark rendered as glass: a single ray-marched fragment shader with refraction, 6-sample spectral dispersion and Fresnel reflections of a procedural studio. It uses a bounding-sphere early-out and capped resolution with adaptive downscaling, runs at up to ~40 fps, and pauses offscreen or when the tab is hidden. Reduced motion renders one still frame; without WebGL, a CSS horizon stands in.
- The first homepage visit per session plays a ~1.6s title sequence (`components/system/Intro.tsx`) whose horizon hands off to the one behind the glass. It is skipped for reduced motion. Route changes lift a curtain of the void off the new page without blocking interaction (`app/template.tsx`).
- Animation uses transform and opacity. Expensive effects (backdrop blur, pinned scenes) are used sparingly and simplified on mobile. Smooth scrolling is desktop-only; touch devices keep native momentum.
- Type has a floor: labels are 12px, micro text is 11px, and every text tone clears 4.5:1 on the darkest scene.
- Semantic landmarks and a skip link are in place. Visible focus states throughout. The mobile menu traps focus and closes on Escape, capability layers are keyboard-navigable tabs, and form errors are announced to screen readers.

## Testing

```bash
npm run build && npm run test:e2e   # Playwright + axe against the production build
npm run verify                      # typecheck + build + e2e
```

The suite (`e2e/site.spec.ts`) checks:

- console, hydration and page errors
- horizontal overflow at four viewports
- that the signature scenes render and settle
- discipline keyboard and pointer control
- that the pointer light releases
- the skip link and visible focus
- idle CPU
- reduced motion
- axe (WCAG A/AA) on the home page and interior routes
- that every sitemap route renders
- internal links

On machines without a GPU, WebGL runs on SwiftShader.

## Structure

```
src/
  app/            routes (home, work, capabilities, services, approach, insights, about, start, legal, api)
  components/
    brand/        identity glyph + wordmark
    hero/         liquid-light shader, system console, hero composition
    home/         homepage scenes (reused across interior pages)
    intake/       project inquiry flow
    insights/     article index, reading progress
    layout/       header, footer, page hero, legal layout
    proof/        testimonials / logos (render only with real data)
    services/     sticky discipline index
    system/       reveal observer, interaction layer, smooth scroll
    ui/           primitives
    work/         case study previews and art-directed visuals
  config/         brand + navigation
  content/        all copy and structured content
  lib/            motion utilities
  styles/         tokens, base, materials, motion
```
