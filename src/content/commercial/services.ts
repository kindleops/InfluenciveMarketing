import type { ServicePage } from "./types";

/**
 * High-intent service pages. Each maps to one of the eight disciplines on
 * /services and goes deeper into a single thing buyers search for.
 */
export const servicePages: ServicePage[] = [
  {
    slug: "seo",
    name: "SEO",
    discipline: "organic",
    metaTitle: "SEO Agency for Technical, Content & Programmatic SEO",
    metaDescription:
      "Technical SEO, content strategy and search architecture built as one system — so organic traffic grows on the queries that bring in revenue, not just visits.",
    primaryQuery: "seo agency",
    secondaryQueries: ["seo services", "technical seo agency", "seo company", "b2b seo agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "SEO",
      title: ["Search that compounds.", "Not search that stalls."],
      lead:
        "We treat organic search as infrastructure: a site search engines can crawl and trust, content that answers what your buyers actually ask, and an architecture that lets both scale without starting over.",
    },
    problem: {
      heading: "Most SEO programs plateau for the same reasons.",
      body: [
        "They optimize pages one at a time. Keywords get assigned to URLs in a spreadsheet, articles get written to a word count, and a monthly report shows rankings moving in both directions. After a year the site is bigger but not more authoritative, and nobody can say which work produced revenue.",
        "Durable organic growth comes from decisions made above the page: which topics the site should own, how those topics are organized into sections search engines can understand, how templates handle thousands of URLs without thin or duplicate content, and how every new page strengthens the ones around it.",
        "That is the work we lead with. Rankings are an output of it, not the plan.",
      ],
    },
    included: [
      {
        title: "Technical foundation",
        detail:
          "Crawlability, indexation, rendering, internal linking, canonicalization, structured data and Core Web Vitals — audited against how Google actually processes the site, then fixed in priority order.",
      },
      {
        title: "Search architecture",
        detail:
          "A topic map built from real query data, organized into hubs and clusters, with URL structure and navigation designed so authority flows to the pages that convert.",
      },
      {
        title: "Content strategy",
        detail:
          "Briefs grounded in what the ranking pages cover and what they miss, written by people who understand the subject — not rewritten competitor articles.",
      },
      {
        title: "Programmatic SEO",
        detail:
          "Templates and data models for pages that exist at scale — locations, integrations, comparisons, catalog pages — with quality gates so no page ships without something unique to say.",
      },
      {
        title: "Authority building",
        detail:
          "Digital PR and linkable assets built on your own expertise and data. No link schemes, no bought placements.",
      },
      {
        title: "Measurement",
        detail:
          "Organic performance tied to pipeline or revenue by section and template, so investment follows what works rather than what ranks.",
      },
    ],
    approach: [
      {
        title: "Diagnose",
        detail:
          "Crawl the site, read the server logs where we can get them, review Search Console, and map where traffic, conversions and authority currently sit. The output is a short list of constraints, ranked by impact.",
      },
      {
        title: "Architect",
        detail:
          "Build the topic map, decide which sections and templates the site needs, and specify the technical changes. This is where we agree what the site should rank for and why.",
      },
      {
        title: "Build",
        detail:
          "Ship the technical fixes and the first content in waves, working in your CMS or alongside your developers. Every release is annotated so its effect can be read later.",
      },
      {
        title: "Compound",
        detail:
          "Publish, refresh and consolidate on a steady cadence. Pages that underperform get improved or merged; sections that work get extended.",
      },
    ],
    measures: [
      "Non-brand organic clicks",
      "Organic-sourced pipeline or revenue",
      "Share of target queries on page one",
      "Indexed vs. submitted URLs",
      "Pages earning clicks, by template",
      "Core Web Vitals pass rate",
    ],
    fit: {
      for: [
        "Companies whose buyers research before they talk to sales",
        "Sites with a real content or catalog footprint to organize",
        "Teams willing to give subject-matter access, not just a brief",
        "Leaders who can commit to at least two quarters",
      ],
      notFor: [
        "Anyone looking for guaranteed rankings or a fixed number of links",
        "A single launch that needs traffic next week — that's paid media",
        "Sites that can't make technical changes to templates or hosting",
      ],
    },
    engagement: {
      model: "Retainer, after a fixed-scope audit",
      duration: "Six-month minimum; results are read quarterly",
      team: "SEO lead, technical SEO, content strategist, writers with subject expertise",
    },
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "Technical fixes on a site with existing authority can show movement within weeks of being crawled. New content usually takes months to reach its potential, and competitive head terms take longer. We plan in quarters and report what moved, what didn't and why at each one.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No. Nobody controls how a search engine ranks pages, and anyone promising a position is either guessing or doing something that puts the site at risk. We commit to the work, the cadence and transparent measurement.",
      },
      {
        q: "Do you write the content or do we?",
        a: "Either. We brief, write and edit, but the best results come when your experts contribute knowledge we can't get elsewhere — product detail, customer questions, opinions. We make that as light as a short interview.",
      },
      {
        q: "Can you work with our developers and CMS?",
        a: "Yes. We write tickets your team can implement, or implement directly where we have access. We work in most modern CMSs and frameworks, including headless setups.",
      },
      {
        q: "What does an SEO audit include?",
        a: "Crawl and indexation analysis, rendering checks, internal linking, duplication and canonicals, structured data, performance, and a content and query review. It ends with a prioritized plan, not a list of every warning a tool can produce.",
      },
    ],
    related: {
      industries: ["ecommerce", "b2b-saas"],
      solutions: ["lead-generation"],
      useCases: ["website-migration", "organic-traffic-drop"],
      compare: ["seo-vs-ppc"],
      guides: ["technical-seo-audit", "website-migration-seo-checklist"],
      playbooks: ["topic-cluster-program"], research: ["organic-search-after-ai-overviews"] },
  },
  {
    slug: "paid-media",
    name: "Paid Media",
    discipline: "growth",
    metaTitle: "Paid Media Agency for Search, Social & Shopping",
    metaDescription:
      "Paid search, paid social and shopping run against incremental revenue, not platform ROAS — with creative testing and weekly budget pacing built in.",
    primaryQuery: "paid media agency",
    secondaryQueries: ["ppc agency", "paid social agency", "google ads agency", "performance marketing agency", "paid search management"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Paid Media",
      title: ["Spend that answers to revenue.", "Not to the ad platform."],
      lead:
        "We run paid search, paid social and shopping as one budget with one question behind it: what did this spend cause that wouldn't have happened anyway? Bids, audiences and creative are all set up to answer it.",
    },
    problem: {
      heading: "Ad platforms grade their own homework.",
      body: [
        "Every ad platform reports the conversions it can claim, and most accounts are managed to those numbers. Add up what Google Ads, Meta and LinkedIn each report and the total often exceeds what the CRM recorded. Retargeting and branded search look like the best campaigns in the account because they reach people who were already on their way to buying.",
        "Accounts run this way drift toward the cheapest attributed conversions. Budget moves to audiences closest to purchase, prospecting gets cut because it looks expensive, and a year later the account is efficient on paper while new-customer growth has quietly stalled.",
        "Good paid media starts from the business number — new customers, qualified pipeline, contribution margin — and treats platform ROAS as one noisy input among several. It needs a creative supply that keeps pace with how quickly audiences tire of ads, and a budget plan that knows where the next dollar earns least. That is how we run accounts.",
      ],
    },
    included: [
      {
        title: "Paid search",
        detail:
          "Google Ads and Microsoft Ads structured around intent, not keyword volume. Brand, non-brand and competitor terms are separated so each is judged on its own economics, and search term reports are read weekly, not once a quarter.",
      },
      {
        title: "Paid social",
        detail:
          "Meta, LinkedIn, TikTok and others, chosen by where your buyers actually spend attention. Account structures stay simple enough for each platform's delivery system to learn, with prospecting and retargeting measured apart.",
      },
      {
        title: "Shopping and product feeds",
        detail:
          "Feed quality treated as a media lever: titles, attributes, categories and custom labels organized around margin and stock, so Shopping and Performance Max spend on products worth selling.",
      },
      {
        title: "Programmatic basics",
        detail:
          "Display, online video and connected TV bought with clear placement controls when reach beyond search and social is warranted — brand-safety exclusions and frequency caps set before launch, not after the first bad placement report.",
      },
      {
        title: "Creative testing",
        detail:
          "A standing pipeline of concepts, hooks and formats, each round tested against a stated hypothesis, so winning angles are identified early and fatigue is caught before cost per result starts to climb.",
      },
      {
        title: "Measurement and pacing",
        detail:
          "Conversion tracking audited end to end, qualified leads or order margin passed back from the CRM, and budgets paced weekly against a plan that says where marginal spend goes next.",
      },
    ],
    approach: [
      {
        title: "Audit",
        detail:
          "Review account structure, tracking, conversion definitions, search terms, audience overlap and creative history. We reconcile platform-reported conversions against CRM or order data so everyone knows how far the numbers disagree before any budget moves.",
      },
      {
        title: "Rebuild the signal",
        detail:
          "Fix tracking and send each platform the conversions that matter — qualified leads or margin, not raw form fills — so automated bidding optimizes toward outcomes the business values, then restructure campaigns around that signal.",
      },
      {
        title: "Test",
        detail:
          "Run creative and audience tests in planned rounds, with holdouts or geographic splits where volume allows, so we learn what is incremental rather than what is merely attributed.",
      },
      {
        title: "Scale and pace",
        detail:
          "Shift budget toward what holds up under testing, watch marginal cost as spend rises, and report weekly on pacing and monthly on what the business got for the money.",
      },
    ],
    measures: [
      "New-customer acquisition cost",
      "Marginal cost per result at current spend",
      "Platform vs. CRM conversion reconciliation",
      "Incremental lift from holdout tests",
      "Creative fatigue by concept",
      "Budget pacing vs. plan",
      "Qualified pipeline or contribution margin from paid",
    ],
    fit: {
      for: [
        "Companies spending enough that measurement errors are expensive",
        "Teams that can share CRM or order data, not just ad account access",
        "Offers that already convert once the right people see them",
        "Leaders who want to know what's incremental, even when the answer is uncomfortable",
      ],
      notFor: [
        "Anyone who wants a guaranteed ROAS target written into the contract",
        "Offers that don't yet convert through sales or organic channels — ads only make that problem more expensive",
        "Accounts where new creative can't be produced more than once a quarter",
      ],
    },
    engagement: {
      model: "Monthly retainer, after a fixed-scope account audit",
      duration: "One-quarter initial term; performance is reviewed quarterly after that",
      team: "Paid media lead, channel specialists, creative strategist, analytics support",
    },
    faqs: [
      {
        q: "How much should we spend on paid media?",
        a: "That depends on your acquisition economics, not an industry benchmark. We work backward from what a customer is worth and what you can afford to pay for one, then find the spend level where marginal cost stays inside that limit. We'd rather tell you a channel is saturated than keep spending into it.",
      },
      {
        q: "Do you guarantee ROAS or cost per lead?",
        a: "No. Auction prices, competitor behavior and platform changes are outside anyone's control, and a guaranteed target encourages chasing easy attributed conversions. We commit to disciplined testing, honest reporting and a clear account of what the spend actually caused.",
      },
      {
        q: "Why don't our ad platform numbers match our CRM?",
        a: "Each platform counts conversions within its own attribution windows and rules, and several platforms often claim the same sale. Tracking gaps, consent choices and cross-device journeys widen the difference. We reconcile the sources and agree which number the business steers by.",
      },
      {
        q: "Do you produce the ad creative?",
        a: "We write the creative strategy and briefs, and our design team can produce static, motion and short-form video. If you have an in-house team or work with creators, we brief them and run the testing. Either way, the testing plan and the learning log stay with us.",
      },
      {
        q: "Can you take over our existing ad accounts?",
        a: "Yes, and we usually prefer to. Account history helps the platforms' bidding systems. We audit first, keep what works and restructure in stages so performance doesn't reset all at once.",
      },
    ],
    related: {
      services: ["marketing-analytics", "cro"],
      industries: ["ecommerce"],
      solutions: ["lower-acquisition-cost"],
      useCases: ["scaling-paid-media"],
      compare: ["seo-vs-ppc"],
      guides: ["marketing-attribution-models"],
      playbooks: ["creative-testing-system"], research: ["paid-search-economics-high-ticket-services", "anatomy-of-a-50k-month-acquisition-system"] },
  },
  {
    slug: "web-design",
    name: "Web Design & Development",
    discipline: "web",
    metaTitle: "Web Design Agency for Fast, Conversion-Ready Sites",
    metaDescription:
      "Marketing sites designed and engineered together — a CMS your team can run, performance that passes Core Web Vitals, and pages built to convert visitors.",
    primaryQuery: "web design agency",
    secondaryQueries: ["website design agency", "web development agency", "web design company", "marketing website agency", "website design and development"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Web Design & Development",
      title: ["A site your team can run.", "Not one they work around."],
      lead:
        "We design and build marketing sites as working systems: a content model that matches how you actually publish, templates that stay fast as pages multiply, and design decisions made with the conversion path in view.",
    },
    problem: {
      heading: "Websites decay from the inside out.",
      body: [
        "Most redesigns are judged on launch day, by how the homepage looks. Six months later marketing is filing tickets to change a headline, landing pages live in a separate tool because the CMS can't handle them, and each new section has been bolted on with its own styles. The site looks finished and behaves like a bottleneck.",
        "The cause is usually structural. The content model was designed around the mockups rather than the content, components were built one-off per page, and performance was checked once before launch and never again. Nobody owned how the site would change after the agency left.",
        "We design for the second year, not just launch day: a design system of components that combine without breaking, a CMS your marketers can publish in without a developer, and performance budgets enforced in the build so the site stays fast as it grows.",
      ],
    },
    included: [
      {
        title: "Discovery and information architecture",
        detail:
          "Stakeholder interviews, analytics review and a content inventory to decide what the site must say, to whom and in what order — producing a sitemap and page hierarchy grounded in how buyers actually navigate.",
      },
      {
        title: "Conversion-minded design",
        detail:
          "Layouts built around the decision each visitor is making: one clear primary action, credible proof placed where doubts arise, and forms that ask only for what sales genuinely uses. Visual design serves the argument the page is making.",
      },
      {
        title: "Design system",
        detail:
          "A component library in Figma and in code, with tokens for type, color and spacing, so new pages are assembled from tested parts instead of designed from scratch each time.",
      },
      {
        title: "CMS architecture",
        detail:
          "Content types, fields and relationships modeled on how your team publishes — in a headless CMS such as Sanity or Contentful, or in WordPress or Webflow when those fit better — with roles, live previews and guardrails that keep pages on-brand.",
      },
      {
        title: "Front-end engineering",
        detail:
          "Accessible, semantic front ends with performance budgets set against Google's Core Web Vitals: LCP at or under 2.5 seconds, INP at or under 200 milliseconds and CLS at or under 0.1, measured at the 75th percentile of real visits.",
      },
      {
        title: "Launch and migration",
        detail:
          "Redirect maps, analytics and tag verification, structured data and pre-launch crawls of staging, so the new site keeps the search visibility and tracking the old one earned.",
      },
    ],
    approach: [
      {
        title: "Discover",
        detail:
          "Interviews, analytics and search data, a content audit and a look at how the current site is edited day to day. We define the audiences, the jobs the site has to do and the constraints — platform, team, integrations.",
      },
      {
        title: "Structure",
        detail:
          "Agree the sitemap, content model and wireframes before visual design begins. Settling structure first prevents the most expensive rework there is: redesigning pages because the real content didn't fit them.",
      },
      {
        title: "Design",
        detail:
          "Apply the visual direction to key templates, then extend it into a component system. Prototypes are reviewed on real devices with real copy, not placeholder text.",
      },
      {
        title: "Build",
        detail:
          "Engineer and document components, assemble templates, configure the CMS and migrate content. Accessibility and performance are checked on every pull request rather than in a final QA scramble.",
      },
      {
        title: "Launch and hand over",
        detail:
          "Stage the launch with redirect testing, tracking checks and post-launch monitoring. Your team gets training, documentation and a component library it can extend without us.",
      },
    ],
    measures: [
      "Core Web Vitals at the 75th percentile, by template",
      "Conversion rate on key paths",
      "Time to publish a page without a developer",
      "Accessibility issues against WCAG AA",
      "Organic visibility retained after launch",
      "Form completion and abandonment",
    ],
    fit: {
      for: [
        "Companies whose website is a primary sales or acquisition channel",
        "Marketing teams that need a developer for routine changes",
        "Sites that have grown by accretion and no longer hang together",
        "Teams ready to make content and structural decisions, not only visual ones",
      ],
      notFor: [
        "A quick theme swap on a tight deadline — a site builder template will serve you better",
        "Companies whose positioning is still unsettled — that work should come first",
        "Anyone expecting a new design alone to fix an offer or pricing problem",
      ],
    },
    engagement: {
      model: "Fixed-scope project, with optional ongoing support",
      duration: "Typically one to two quarters, depending on templates and migration",
      team: "Design lead, product designer, front-end and CMS engineers, content strategist, SEO support for migration",
    },
    faqs: [
      {
        q: "How long does a website redesign take?",
        a: "Most marketing sites take one to two quarters from discovery to launch. Scope drives the timeline: the number of templates, the volume of content to migrate and integrations with your CRM or product. If timing matters, we phase the work so the most important pages launch first.",
      },
      {
        q: "Which CMS do you recommend?",
        a: "The one that fits how your team publishes and what the site has to connect to. A headless CMS suits teams with engineering support and structured content; WordPress or Webflow can be right for teams that need editing independence with less engineering. We explain the trade-offs rather than default to a favorite.",
      },
      {
        q: "Will we lose search rankings when we redesign?",
        a: "You can if URLs change without redirects, content is cut or templates drop important markup. We map every URL, preserve what search engines value and crawl the staging site before launch. Some short-term fluctuation is normal; sustained losses usually point to a migration mistake that can be found and fixed.",
      },
      {
        q: "Can our team update the site after launch?",
        a: "That's one of the main design goals. We build templates and flexible sections your marketers can combine, with guardrails so pages stay on-brand and fast. Training and documentation are part of every handover.",
      },
      {
        q: "Do you only design, or build as well?",
        a: "Both, and we prefer doing both. Performance, content modeling and accessibility are decided as much in design as in code. If you have in-house engineers, we can hand over a documented design system and work alongside them through the build.",
      },
    ],
    related: {
      services: ["branding", "cro", "seo"],
      solutions: ["website-redesign"],
      useCases: ["website-migration"],
      guides: ["website-migration-seo-checklist", "landing-page-optimization"],
      insights: ["website-as-operating-system"], research: ["why-saas-homepages-lose-the-sale"] },
  },
  {
    slug: "social-media",
    name: "Social Media Marketing",
    discipline: "growth",
    metaTitle: "Social Media Marketing Agency: Organic, Creator & Paid",
    metaDescription:
      "Organic social strategy, creator partnerships and paid social support planned together — with a clear view of what organic reach can and can't deliver.",
    primaryQuery: "social media marketing agency",
    secondaryQueries: ["social media agency", "social media management agency", "b2b social media agency", "creator marketing agency", "influencer marketing agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Social Media",
      title: ["Presence with a purpose.", "Not posting for its own sake."],
      lead:
        "We plan organic social, creator partnerships and paid social support as one program, so each does the job it's suited to — and nobody expects a content calendar to do the work of a media budget.",
    },
    problem: {
      heading: "Posting more is not a strategy.",
      body: [
        "Many social programs are defined by output: a fixed number of posts a week on every platform, a calendar filled weeks ahead, and a monthly report on followers and impressions. The content is on-brand and forgettable, and nobody can say what it changed.",
        "Organic reach depends on each platform's algorithm deciding a post is worth showing, and that decision favors content people stop for, respond to and share — not content that restates the website. Brand accounts compete in the same feed as creators and friends. That is a hard contest, and pretending otherwise sets a program up to disappoint.",
        "Organic social does some things well. It builds familiarity with people who already follow you, gives founders and experts a public voice, shows you what your audience cares about and supplies creative that paid social can amplify. What it rarely does alone is generate predictable demand on a schedule. We plan around both facts.",
      ],
    },
    included: [
      {
        title: "Channel strategy",
        detail:
          "A decision about which platforms matter for your audience and which to deprioritize, with a defined job for each — awareness, community, recruiting, customer care — instead of the same post copied everywhere.",
      },
      {
        title: "Content system",
        detail:
          "Recurring formats and series that give a small team a repeatable way to produce, plus a process for turning one piece of expertise into posts native to each platform rather than one asset resized.",
      },
      {
        title: "Founder and expert voice",
        detail:
          "Ghostwriting and editorial support for leaders and subject-matter experts, especially on LinkedIn, where posts from people often travel further than posts from company pages.",
      },
      {
        title: "Creator partnerships",
        detail:
          "Finding creators whose audience matches your buyers, writing briefs that leave room for their voice, and handling usage rights and advertising disclosure requirements — measured on contribution, not follower counts.",
      },
      {
        title: "Community management",
        detail:
          "Guidelines and response workflows for comments, messages and mentions, escalation paths for complaints and support issues, and a regular digest of what the community is saying for product and leadership.",
      },
      {
        title: "Paid social support",
        detail:
          "Organic and creator posts that earn attention are tested as paid creative, and what resonates organically shapes the audiences and angles used in paid campaigns.",
      },
    ],
    approach: [
      {
        title: "Listen",
        detail:
          "Audit your accounts, study what your audience and peers engage with, and ask sales and support what customers keep asking. We map the gap between what you publish and what your audience wants to hear from you.",
      },
      {
        title: "Define",
        detail:
          "Choose channels, give each a role and a success measure, and design formats your team can sustain. We agree up front what social is responsible for — and what it isn't.",
      },
      {
        title: "Produce and publish",
        detail:
          "Create content in batches with approvals built around your team's calendar, and publish on a cadence the program can keep for a year rather than one that burns out in a month.",
      },
      {
        title: "Learn and amplify",
        detail:
          "Review performance by format and series, not just by post. Retire what doesn't land, extend what does, and move organic and creator content that has already earned attention into paid testing.",
      },
    ],
    measures: [
      "Engagement rate by format and series",
      "Saves, shares and comments over likes",
      "Branded search and direct traffic trends",
      "Social-sourced traffic and conversions",
      "Creator content performance when run as paid",
      "Response time on community messages",
    ],
    fit: {
      for: [
        "Brands whose buyers spend real time on specific platforms",
        "Companies with founders or experts willing to be visible",
        "Teams that want organic and paid social planned together",
        "Consumer brands open to working with creators on the creators' terms",
      ],
      notFor: [
        "Anyone expecting organic posts alone to hit a lead target",
        "Brands that route every post through several layers of approval — the medium moves too fast",
        "Companies whose main goal is follower growth",
      ],
    },
    engagement: {
      model: "Monthly retainer, starting with a strategy sprint",
      duration: "Strategy in the first few weeks; the program is reviewed quarterly",
      team: "Social strategist, content producers, community manager, creator partnerships lead, paid social specialist",
    },
    faqs: [
      {
        q: "Can organic social generate leads for us?",
        a: "Sometimes, particularly in B2B, where founder and expert posts on LinkedIn can start real conversations. But organic reach is unpredictable and hard to scale on demand. We treat leads from organic social as a welcome result and pair it with paid social when you need volume you can plan around.",
      },
      {
        q: "Which social platforms should we be on?",
        a: "Usually fewer than you think. We weigh where your buyers spend attention, which formats you can produce well and what your team can keep up. Being consistently good on two channels beats being half-present on five.",
      },
      {
        q: "How do creator partnerships work?",
        a: "We find creators whose audience overlaps with your buyers, agree terms, usage rights and disclosure, and brief them on the message while leaving the execution to them. Content that performs can then run as paid ads, with the creator's permission.",
      },
      {
        q: "How do you measure social media ROI?",
        a: "In layers, and honestly. Direct conversions from social capture only part of its effect, so we also track branded search, direct traffic, assisted conversions and how social content performs in paid. We'll tell you where the evidence is strong and where it's only directional.",
      },
      {
        q: "Do you handle community management?",
        a: "Yes, within agreed hours and guidelines. We set up response templates, escalation paths for complaints and support questions, and a regular summary so what the community says reaches the people who can act on it.",
      },
    ],
    related: {
      services: ["paid-media", "content-marketing", "branding"],
      solutions: ["go-to-market-strategy"],
      useCases: ["product-launch"],
      compare: ["agency-vs-in-house"],
      playbooks: ["creative-testing-system"],
    },
  },
  {
    slug: "cro",
    name: "Conversion Rate Optimization",
    discipline: "web",
    metaTitle: "Conversion Rate Optimization Agency: Research-Led CRO",
    metaDescription:
      "Research-led conversion rate optimization: user research, disciplined A/B testing and landing page work that finds what is actually blocking conversions.",
    primaryQuery: "conversion rate optimization agency",
    secondaryQueries: ["cro agency", "cro services", "a/b testing agency", "conversion optimization consultant", "landing page optimization services"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "CRO",
      title: ["Find what's in the way.", "Then prove it's gone."],
      lead:
        "We start with research into why visitors don't convert, test changes with enough rigor to trust the result, and keep a record of what each test taught — so the next one starts smarter than the last.",
    },
    problem: {
      heading: "Most tests prove nothing at all.",
      body: [
        "A typical testing program tries button colors and headline tweaks, calls a winner as soon as the dashboard turns green and ships it. A quarter later the conversion rate is where it started. The wins were noise: tests stopped early, run on too little traffic or judged on a metric that moved by chance.",
        "Statistics is only half the story. Tests stay small because the ideas come from opinion rather than evidence. Without research, a program tests what someone on the team suspects instead of what visitors actually struggle with — and small ideas produce effects too small for most sites' traffic to detect reliably.",
        "Good CRO works the other way round. Research identifies the real friction — an unclear offer, missing information, a broken flow, a reason to distrust — and tests are designed to be large enough to detect and specific enough to explain. Some findings don't need a test at all. A form that fails on mobile just needs fixing.",
      ],
    },
    included: [
      {
        title: "Conversion research",
        detail:
          "Funnel analysis, session recordings, heatmaps, on-site surveys and customer interviews combined into a ranked list of problems, each with the evidence behind it.",
      },
      {
        title: "UX research and usability testing",
        detail:
          "Moderated and unmoderated sessions with people who match your buyers, attempting real tasks on your site. The quickest way to see what analytics can only hint at.",
      },
      {
        title: "Experiment design",
        detail:
          "A written hypothesis for every test, a primary metric chosen before launch, and a check of traffic and duration so we know in advance whether the test can detect a meaningful effect.",
      },
      {
        title: "Statistical discipline",
        detail:
          "Tests run for full business cycles, aren't stopped the moment they look good, and are checked for uneven traffic splits and misleading segment effects before anyone calls a result.",
      },
      {
        title: "Landing pages",
        detail:
          "Dedicated pages for paid campaigns and key offers, built around a single decision and matched closely to the ad or email that brought the visitor there.",
      },
      {
        title: "Learning library",
        detail:
          "Every test documented — hypothesis, result, confidence and what it taught — so insight accumulates and the team stops rerunning ideas that already lost.",
      },
    ],
    approach: [
      {
        title: "Research",
        detail:
          "Audit analytics and tracking first, since tests are only as good as the data they read. Then run qualitative and quantitative research on the highest-traffic, highest-value paths and produce a prioritized list of friction points.",
      },
      {
        title: "Prioritize",
        detail:
          "Score each opportunity by strength of evidence, traffic available to test it and effort to build. Pages without enough traffic for a sound A/B test get usability research and direct fixes instead.",
      },
      {
        title: "Test",
        detail:
          "Design, build and QA experiments across devices and browsers, then run them to their planned end. Losing and flat tests are reported as fully as winners, because they carry as much information.",
      },
      {
        title: "Implement and extend",
        detail:
          "Ship winning variants properly into the site or CMS rather than leaving them running in a testing tool. What we learn feeds the next round and often other channels — ad copy, email, sales messaging.",
      },
    ],
    measures: [
      "Conversion rate on primary funnels",
      "Revenue or qualified leads per visitor",
      "Share of tests reaching a conclusive result",
      "Funnel step completion and drop-off",
      "Form and checkout abandonment",
      "Cumulative effect of shipped winners",
    ],
    fit: {
      for: [
        "Sites with enough traffic on key pages to test meaningfully",
        "Teams paying for traffic and wanting more from every visit",
        "Organizations that can ship changes quickly once a test wins",
        "Leaders comfortable hearing that most ideas don't win",
      ],
      notFor: [
        "Low-traffic sites expecting a steady stream of A/B tests — research and fixes will serve you better",
        "Anyone hoping testing will fix a product, pricing or positioning problem",
        "Teams that want winners declared on a schedule",
      ],
    },
    engagement: {
      model: "Research phase, then a monthly testing retainer",
      duration: "Research takes a few weeks; testing runs in quarterly cycles",
      team: "CRO lead, UX researcher, analyst, designer, front-end developer",
    },
    faqs: [
      {
        q: "How much traffic do we need for A/B testing?",
        a: "It depends on your current conversion rate and how large a change you want to detect. With less traffic you can only detect large effects, so tests must be bolder or run longer. We check this before every test, and on pages without enough traffic we use usability research and direct fixes instead.",
      },
      {
        q: "How long should an A/B test run?",
        a: "Until it reaches the sample size planned before launch, and for at least one full business cycle so weekday and weekend behavior are both represented. Stopping a test the moment it looks significant is one of the most common ways programs produce false winners.",
      },
      {
        q: "What's the difference between CRO and a website redesign?",
        a: "A redesign changes many things at once, so you can't tell which change helped or hurt. CRO changes things in measured steps. They work well together: CRO research should shape a redesign, and a new site gives testing a clean foundation to build on.",
      },
      {
        q: "Do you guarantee a conversion rate increase?",
        a: "No. Many well-designed tests lose or come out flat, and that is useful information. We commit to a rigorous process, tests capable of detecting a real effect and a plain account of what each one taught.",
      },
      {
        q: "Which testing tools do you use?",
        a: "We work in the tool you already have or recommend one that suits your stack and traffic, including server-side testing where client-side scripts would slow the page or cause flicker. The method matters more than the tool.",
      },
    ],
    related: {
      services: ["web-design", "paid-media", "marketing-analytics"],
      industries: ["ecommerce"],
      solutions: ["lower-acquisition-cost", "lead-generation"],
      guides: ["landing-page-optimization"], research: ["why-saas-homepages-lose-the-sale"] },
  },
  {
    slug: "branding",
    name: "Branding",
    discipline: "brand",
    metaTitle: "Branding Agency for Strategy, Identity & Messaging",
    metaDescription:
      "Brand strategy, positioning, identity and messaging built as a living system, with guidelines your team actually uses instead of a PDF sitting in a drive.",
    primaryQuery: "branding agency",
    secondaryQueries: ["brand strategy agency", "brand identity agency", "b2b branding agency", "brand positioning agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Branding",
      title: ["Know what you stand for.", "Then look like it everywhere."],
      lead:
        "We build brands from the argument outward: a clear position in the market, language that makes it concrete, and an identity system flexible enough to hold together on every surface your team touches.",
    },
    problem: {
      heading: "A logo is not a position.",
      body: [
        "Many branding projects start with the visible layer. A new logo, palette and typeface arrive in a polished presentation, everyone agrees it looks better, and within months the sales deck, the website and the product have drifted back into inconsistency. The identity changed; what the company says about itself didn't.",
        "Brands that hold up rest on decisions made before any design: who the company is for, what it does better than the alternatives buyers are really weighing, and what it is willing not to be. Without those decisions the identity has nothing specific to express, and the messaging falls back on category language any competitor could claim.",
        "The second failure is the guidelines document. A static PDF can't anticipate every use, so teams improvise and the brand erodes one exception at a time. We build identity as a system — tokens, components, templates and worked examples — that people use inside the tools they already work in, with a plan for how it grows.",
      ],
    },
    included: [
      {
        title: "Brand strategy",
        detail:
          "Research with customers, prospects and leadership to define the audience, the company's purpose and the role the brand has to play in the business plan for the next few years.",
      },
      {
        title: "Positioning",
        detail:
          "A clear statement of the category you compete in, the alternatives buyers compare you with and why they should choose you — checked against how customers actually describe that choice.",
      },
      {
        title: "Naming support",
        detail:
          "Criteria, candidate development and preliminary screening for company, product and feature names. We plan for formal trademark clearance by your counsel before any name is adopted.",
      },
      {
        title: "Visual identity",
        detail:
          "Logo, typography, color, imagery, iconography and motion principles, designed to work at every size and inside digital products, not only on a presentation slide.",
      },
      {
        title: "Messaging framework",
        detail:
          "Value propositions by audience, key messages, supporting proof and voice guidelines with examples of what to write and what to avoid, so anyone on the team can write on-brand.",
      },
      {
        title: "Living guidelines",
        detail:
          "Guidelines published as a site or inside your design tools, backed by templates and design tokens, with a named owner and a process for extending them as the brand meets new situations.",
      },
    ],
    approach: [
      {
        title: "Listen",
        detail:
          "Interview customers, lost prospects, sales and leadership, and review competitor positioning alongside your current materials. We look for the gap between how you describe yourselves and how buyers describe you.",
      },
      {
        title: "Decide",
        detail:
          "Workshop and write the positioning, audience priorities and brand platform. This is where leaders commit to trade-offs: what the brand will emphasize and what it will deliberately leave out.",
      },
      {
        title: "Express",
        detail:
          "Develop the verbal and visual identity together, in rounds, applied to real materials — homepage, sales deck, product screens, social posts — so each decision is judged in context rather than on a blank artboard.",
      },
      {
        title: "Systematize and roll out",
        detail:
          "Build guidelines, templates and tokens, train the teams who will use them and sequence the rollout so the most visible touchpoints change first and nothing is left half-migrated.",
      },
    ],
    measures: [
      "Message clarity and recall in customer interviews",
      "Consistency across key touchpoints at audit",
      "Branded search demand over time",
      "Sales feedback on positioning in live deals",
      "Adoption of templates and the brand system",
      "Win and loss reasons against named alternatives",
    ],
    fit: {
      for: [
        "Companies whose product or market has outgrown their current story",
        "Leadership teams willing to make positioning trade-offs and hold them",
        "Organizations preparing for a launch, a raise or a new market",
        "Teams that need the brand to work in the product, not only in marketing",
      ],
      notFor: [
        "A logo refresh on a two-week deadline",
        "Companies hoping a new identity will fix a product-market fit problem",
        "Teams without a senior sponsor who can make the final call",
      ],
    },
    engagement: {
      model: "Fixed-scope project",
      duration: "Typically one to two quarters from research to rollout",
      team: "Brand strategist, creative director, designers, copywriter, design systems support",
    },
    faqs: [
      {
        q: "What's the difference between branding and a rebrand?",
        a: "Branding is the ongoing work of defining and expressing who a company is. A rebrand is a deliberate change to that — to positioning, name or identity — usually prompted by a shift in strategy, audience or reputation. We'll tell you if a refresh would serve you better than a full rebrand.",
      },
      {
        q: "Do you help with naming?",
        a: "Yes. We set criteria, develop and refine candidates and run initial screening for obvious conflicts and domain availability. Final trademark clearance should come from your legal counsel before a name is adopted, and we build the schedule around that step.",
      },
      {
        q: "How involved does our team need to be?",
        a: "Interviews early, workshops at decision points and structured reviews during design. We keep the decision group small and senior to avoid design by committee, and give a wider group the chance to react to the work in context.",
      },
      {
        q: "What do we receive at the end of a branding project?",
        a: "Strategy and positioning, the messaging framework, the full identity system with source files, living guidelines, templates for your most-used materials and a rollout plan. All of it is yours to use and extend.",
      },
      {
        q: "Can you carry the new brand through our website and product?",
        a: "Yes. Because we also design and build websites and design systems, we can take the identity all the way into code — which is where many brand rollouts quietly lose their consistency.",
      },
    ],
    related: {
      services: ["web-design", "content-marketing", "social-media"],
      solutions: ["rebrand", "go-to-market-strategy"],
      useCases: ["product-launch", "post-funding-growth"],
      compare: ["full-service-vs-specialist-agency"],
    },
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    discipline: "organic",
    metaTitle: "Content Marketing Agency Built Around Pipeline",
    metaDescription:
      "Editorial strategy, expert-led content and distribution planned together, then measured against the pipeline and revenue it influences, not just pageviews.",
    primaryQuery: "content marketing agency",
    secondaryQueries: ["content marketing services", "b2b content marketing agency", "content strategy agency", "thought leadership agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Content Marketing",
      title: ["Say something worth reading.", "Then make sure it gets read."],
      lead:
        "We build content programs around what your experts know that nobody else can write, put it in front of the right people on purpose, and measure it against the pipeline it influences.",
    },
    problem: {
      heading: "More content rarely fixes a content problem.",
      body: [
        "A familiar pattern: a blog publishing steadily, articles written by generalists from a keyword brief, each competent and indistinguishable from what the rest of the category publishes. Traffic ticks up, sales never mentions any of it, and leadership starts asking whether content works at all.",
        "The missing pieces are usually the same. The content carries no insight only your company has — the patterns your team sees across customers, the opinions your experts hold, the data your product produces. And each piece is published and left, with no plan for reaching buyers beyond hoping search or a single social post does the job.",
        "We fix both ends. On the way in, busy experts contribute through short interviews and fast reviews instead of writing. On the way out, every piece ships with a distribution plan and is tracked against the deals it touches, so the program is judged on business impact and changed when it falls short.",
      ],
    },
    included: [
      {
        title: "Editorial strategy",
        detail:
          "Audiences, themes and the positions you want to own, turned into an editorial plan that balances search-driven pieces, point-of-view writing and material sales can use in active deals.",
      },
      {
        title: "Subject-matter extraction",
        detail:
          "Structured interviews with your experts, recorded and turned into drafts, so their knowledge reaches the page without asking them to write. Their review focuses on accuracy, not rewording.",
      },
      {
        title: "Writing and editing",
        detail:
          "Writers who can hold a technical conversation, working to editorial standards for evidence, clarity and voice, with editors who cut whatever doesn't earn its place.",
      },
      {
        title: "Formats beyond the blog",
        detail:
          "Guides, original analysis from your own data, newsletters, webinars, video and sales collateral — chosen by where your buyers learn, not by habit.",
      },
      {
        title: "Distribution",
        detail:
          "A plan for each piece across email, social, communities, partners, paid promotion and sales outreach, with each asset cut into the formats those channels reward.",
      },
      {
        title: "Content measurement",
        detail:
          "Engagement connected to CRM data, so you can see which pieces are read by accounts in pipeline and which appear in the journeys of deals that closed.",
      },
    ],
    approach: [
      {
        title: "Audit and interview",
        detail:
          "Review existing content, search data and recorded sales conversations, then interview experts and customers. We look for the questions buyers ask that nobody answers well, and the knowledge you already hold to answer them.",
      },
      {
        title: "Plan",
        detail:
          "Set editorial themes, formats, cadence and channels, and agree how each type of content will be judged. A sales one-pager and a search guide shouldn't share a success metric.",
      },
      {
        title: "Produce",
        detail:
          "Run a steady production cycle — interview, draft, expert review, edit, design — with turnaround planned around your experts' calendars rather than ours.",
      },
      {
        title: "Distribute and measure",
        detail:
          "Promote each piece through its planned channels, report monthly on engagement and pipeline influence, and refresh, consolidate or retire content based on what the evidence shows.",
      },
    ],
    measures: [
      "Content-influenced pipeline and revenue",
      "Engaged accounts matching your ideal customer profile",
      "Organic clicks on content, by topic",
      "Newsletter subscribers and engagement",
      "Sales use of content in active deals",
      "Returning readers and depth of reading",
    ],
    fit: {
      for: [
        "B2B and considered-purchase companies with long buying cycles",
        "Teams with real expertise that isn't yet visible in public",
        "Companies ready to connect content engagement to CRM data",
        "Leaders who can make experts available for regular interviews",
      ],
      notFor: [
        "Anyone wanting a high volume of generic posts for search",
        "Companies unwilling to publish a point of view",
        "Programs expected to pay back within a single quarter",
      ],
    },
    engagement: {
      model: "Monthly retainer, after a strategy phase",
      duration: "Six-month minimum; the editorial plan is reset each quarter",
      team: "Content strategist, managing editor, subject-aware writers, designer, distribution specialist",
    },
    faqs: [
      {
        q: "How do you measure content marketing ROI?",
        a: "We connect content engagement to your CRM to see which pieces are read by accounts that later enter pipeline and which show up in closed deals. That shows influence, not proof of cause, and we say so. We combine it with sales feedback and search performance for a fuller picture.",
      },
      {
        q: "Do you use AI to write content?",
        a: "We use AI tools for research, transcription, outlining and editing support. People are responsible for the thinking, the writing and the fact-checking. Content that only restates what's already online doesn't help your buyers or your search visibility, whoever or whatever writes it.",
      },
      {
        q: "How much time do you need from our experts?",
        a: "Usually a short interview per piece and a focused review of the draft. We prepare questions in advance and do the writing, so expert time goes into knowledge, not prose.",
      },
      {
        q: "How is content marketing different from SEO?",
        a: "They overlap. SEO content answers questions people already search for; content marketing also covers pieces built for newsletters, social, events and sales, where search demand doesn't exist yet. A good program does both and makes each reinforce the other.",
      },
      {
        q: "How often should we publish?",
        a: "As often as you can publish something good and distribute it properly. A smaller number of strong pieces with real distribution usually does more than a high cadence of pieces nobody promotes.",
      },
    ],
    related: {
      services: ["seo", "email-marketing", "social-media"],
      industries: ["b2b-saas", "professional-services"],
      solutions: ["lead-generation"],
      playbooks: ["topic-cluster-program"], research: ["organic-search-after-ai-overviews"] },
  },
  {
    slug: "email-marketing",
    name: "Email & Lifecycle Marketing",
    discipline: "growth",
    metaTitle: "Email Marketing Agency for Lifecycle & Retention",
    metaDescription:
      "Lifecycle flows, segmentation, deliverability and testing — with SPF, DKIM and DMARC set up properly so the email you send actually reaches the inbox.",
    primaryQuery: "email marketing agency",
    secondaryQueries: ["lifecycle marketing agency", "email marketing services", "klaviyo agency", "retention marketing agency", "email deliverability consultant"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Email & Lifecycle",
      title: ["The right message at the right moment.", "Not another blast to everyone."],
      lead:
        "We build lifecycle programs that respond to what customers do — sign up, activate, buy, lapse — on sending infrastructure mailbox providers trust, and test them so they keep improving long after launch.",
    },
    problem: {
      heading: "Batch-and-blast is a deliverability problem in waiting.",
      body: [
        "Many email programs amount to a weekly newsletter sent to everyone plus a welcome email someone set up years ago. Every campaign goes to the whole list, engagement slowly falls, and as it falls mailbox providers route more of the mail to spam or promotions. The usual response is to send more, which makes it worse.",
        "Inbox placement depends heavily on sender reputation: whether the domain is properly authenticated, whether recipients open, click and reply or ignore and complain, and whether the list is full of stale or invalid addresses. Gmail and Yahoo now require bulk senders to authenticate with SPF, DKIM and DMARC, support one-click unsubscribe and keep spam complaints low. A program that ignores those rules has a ceiling no subject line can break.",
        "Lifecycle marketing addresses both problems at once. Messages triggered by behavior are more relevant, so people engage with them; engagement protects reputation; better reputation improves placement for everything else you send. We build the flows, the segments and the technical foundation together.",
      ],
    },
    included: [
      {
        title: "Lifecycle flows",
        detail:
          "Welcome, onboarding, activation, browse and cart abandonment, post-purchase, replenishment, win-back and sunset flows, mapped to your customer journey and prioritized by the retention or revenue each can affect.",
      },
      {
        title: "Segmentation",
        detail:
          "Segments built on behavior, purchase history, product usage and lifecycle stage, using data from your store, product or CRM, so each message reflects what that person has actually done.",
      },
      {
        title: "Deliverability and authentication",
        detail:
          "SPF, DKIM and DMARC configured and aligned, DMARC reports monitored while the policy is tightened in stages, sending subdomains where they make sense, and list hygiene that suppresses unengaged and invalid addresses.",
      },
      {
        title: "Campaign strategy",
        detail:
          "A campaign calendar planned alongside the automated flows, with frequency rules so nobody receives more email than their engagement warrants.",
      },
      {
        title: "Testing",
        detail:
          "Subject lines, offers, timing, content and flow structure tested deliberately, with holdout groups on key flows so we know what lifecycle messaging adds beyond what customers would have done anyway.",
      },
      {
        title: "Templates and production",
        detail:
          "Modular, accessible templates that render reliably across the major email clients and in dark mode, with copy and design produced to one consistent standard.",
      },
    ],
    approach: [
      {
        title: "Audit",
        detail:
          "Review authentication, sender reputation, list health, existing flows, segments and reporting. Deliverability problems are fixed first, because every other improvement depends on the mail arriving.",
      },
      {
        title: "Map the lifecycle",
        detail:
          "Chart the customer journey and the data available at each stage, then identify the moments where a well-timed message could change behavior. That becomes the flow roadmap, in priority order.",
      },
      {
        title: "Build",
        detail:
          "Set up data integrations, segments and flows in your platform — Klaviyo, HubSpot, Braze, Customer.io or others — with QA across devices and email clients before anything goes live.",
      },
      {
        title: "Test and expand",
        detail:
          "Run structured tests inside flows and campaigns, measure against holdouts, and extend the program to new segments and lifecycle stages as the core flows prove their value.",
      },
    ],
    measures: [
      "Revenue or conversions per recipient",
      "Flow performance vs. holdout groups",
      "Inbox placement and spam complaint rate",
      "Click rate and click-to-conversion",
      "Active subscriber share of the list",
      "Unsubscribes by segment and frequency",
      "Repeat purchase or retention rate",
    ],
    fit: {
      for: [
        "Ecommerce and subscription brands with repeat-purchase potential",
        "SaaS companies whose trial or onboarding needs to activate users",
        "Teams with a growing list and no lifecycle strategy behind it",
        "Senders seeing more mail land in spam or promotions",
      ],
      notFor: [
        "Anyone planning to email purchased or rented lists",
        "Businesses with a single purchase and no ongoing relationship",
        "Teams that can't pass customer or product data to their email platform",
      ],
    },
    engagement: {
      model: "Setup project, followed by a monthly retainer",
      duration: "Core flows are usually live within the first quarter; testing is ongoing",
      team: "Lifecycle strategist, email developer, copywriter, designer, deliverability specialist",
    },
    faqs: [
      {
        q: "Why are our emails going to spam?",
        a: "Usually a mix of authentication gaps, low engagement and list quality. If SPF, DKIM or DMARC are missing or misaligned, providers trust your mail less; if many recipients ignore or report it, your reputation drops. We diagnose which factors apply and fix them in order of impact.",
      },
      {
        q: "What are SPF, DKIM and DMARC?",
        a: "Email authentication standards. SPF lists the servers allowed to send for your domain, DKIM adds a cryptographic signature showing the message wasn't altered, and DMARC tells providers what to do when mail fails those checks and sends you reports. Major mailbox providers now require them for bulk senders.",
      },
      {
        q: "Which email platform should we use?",
        a: "It depends on your business model and data. Ecommerce brands often fit Klaviyo, B2B teams often send through HubSpot or their CRM's marketing tools, and product-led companies may need Braze or Customer.io for event-driven messaging. If your current platform can do the job, we'll work in it.",
      },
      {
        q: "Are open rates still a useful metric?",
        a: "Less than they used to be. Privacy features such as Apple Mail Privacy Protection load images automatically, which inflates recorded opens. We rely on clicks, conversions and holdout tests, and treat opens as a rough signal at best.",
      },
      {
        q: "How often should we email our list?",
        a: "As often as the messages stay relevant and the list stays engaged. Behavior-triggered flows can add volume safely because they're timely; broadcast campaigns need frequency rules. We test cadence rather than guess at it.",
      },
    ],
    related: {
      services: ["marketing-automation", "content-marketing", "cro"],
      industries: ["ecommerce", "b2b-saas"],
      solutions: ["lower-acquisition-cost"],
      playbooks: ["speed-to-lead"],
    },
  },
  {
    slug: "marketing-analytics",
    name: "Marketing Analytics",
    discipline: "intelligence",
    metaTitle: "Marketing Analytics Agency: Tracking to Attribution",
    metaDescription:
      "Tracking plans, GA4 and server-side tagging, attribution and incrementality testing, so marketing decisions rest on data your team can trust and explain.",
    primaryQuery: "marketing analytics agency",
    secondaryQueries: ["marketing analytics consulting", "ga4 consultant", "server-side tagging services", "marketing measurement agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Marketing Analytics",
      title: ["Numbers you can decide with.", "Not numbers you argue about."],
      lead:
        "We build measurement from the ground up: a tracking plan that defines what matters, collection that holds up under browser and consent restrictions, reporting people actually open, and experiments that show what marketing really caused.",
    },
    problem: {
      heading: "Most dashboards measure the tracking, not the business.",
      body: [
        "A common picture: GA4 was set up in a hurry during a migration, events have been added ad hoc by different people, every ad platform counts conversions its own way and the CRM disagrees with all of them. Meetings start with a debate about which number is right, and decisions go to whoever argues most confidently.",
        "The problems compound. Browser privacy restrictions and consent choices mean client-side tags miss a growing share of activity. Attribution models hand out credit by rule, not by what actually caused a sale. Dashboards multiply, each built for one question and never maintained, until nobody trusts any of them.",
        "Reliable measurement starts with definitions — what counts as a lead, a customer, a conversion — then builds collection, storage and reporting on top, with controlled experiments to check what models can only estimate. It is unglamorous work, and it makes every other marketing decision better.",
      ],
    },
    included: [
      {
        title: "Tracking plans",
        detail:
          "A documented specification of every event, property and conversion, consistently named, tied to a business question and owned by someone — the reference everything else is built from.",
      },
      {
        title: "GA4 implementation",
        detail:
          "Configuration, custom events, key events, audiences and BigQuery export set up properly, with consent mode configured for the regions you operate in and retention settings reviewed.",
      },
      {
        title: "Server-side tagging",
        detail:
          "Tag management moved to a server container where it improves data quality and control, with first-party collection, conversion APIs for ad platforms and explicit rules on what data leaves your systems.",
      },
      {
        title: "Attribution",
        detail:
          "Attribution chosen for the decisions it has to support, CRM and ad data joined for full-journey views, and marketing mix modeling where spend levels and history make it worthwhile.",
      },
      {
        title: "Dashboards and reporting",
        detail:
          "A small set of dashboards built around specific decisions, with metric definitions documented inside the tool, so leadership, channel owners and finance read the same numbers the same way.",
      },
      {
        title: "Incrementality testing",
        detail:
          "Geo experiments, audience holdouts and platform lift studies designed to measure what a channel or campaign adds beyond what would have happened without it.",
      },
    ],
    approach: [
      {
        title: "Audit",
        detail:
          "Review the tag setup, GA4 configuration, consent implementation, CRM data and existing reports. We compare sources side by side to show where and how far they disagree, and document what's broken.",
      },
      {
        title: "Define",
        detail:
          "Agree metric definitions and the key business questions with marketing, sales and finance, then write the tracking plan and reporting requirements everyone signs off on.",
      },
      {
        title: "Implement",
        detail:
          "Rebuild tracking, deploy server-side tagging where it helps, connect sources to a warehouse where needed and QA every event against the plan before it's trusted in reports.",
      },
      {
        title: "Report and test",
        detail:
          "Launch decision-focused dashboards, train the teams who use them and run incrementality tests on the largest spend lines to calibrate what the attribution model claims.",
      },
    ],
    measures: [
      "Event coverage against the tracking plan",
      "Discrepancy between platform, analytics and CRM",
      "Share of conversions matched to a source",
      "Dashboard usage by team",
      "Incremental lift by channel from tests",
      "Time from question to trusted answer",
    ],
    fit: {
      for: [
        "Companies spending across several channels with no agreed source of truth",
        "Teams about to scale spend who need to know what works first",
        "Organizations whose CRM, warehouse and ad data never meet",
        "Leaders willing to act on test results that challenge assumptions",
      ],
      notFor: [
        "Anyone who wants a new dashboard without fixing the data feeding it",
        "Businesses with too little spend or volume for tests to be conclusive — simpler measurement will serve",
        "Teams expecting attribution to produce one certain answer",
      ],
    },
    engagement: {
      model: "Fixed-scope implementation, then optional ongoing analytics support",
      duration: "Audit and tracking rebuild usually within a quarter; testing runs quarterly",
      team: "Analytics lead, tracking engineer, data analyst, data engineer as needed",
    },
    faqs: [
      {
        q: "Which attribution model should we use?",
        a: "The one that fits the decision in front of you. Rule-based models such as last click are simple but biased; data-driven models are better but still describe correlation, not cause. For large budget decisions we calibrate models with incrementality tests and recommend a combination rather than a single answer.",
      },
      {
        q: "Why don't GA4 and our ad platforms agree?",
        a: "They count differently. Attribution windows, models, whether view-through conversions count and how cross-device journeys are stitched all vary, and consent choices remove some data from each. Some gap is normal. The goal is to understand it and decide which source steers which decision.",
      },
      {
        q: "What is incrementality testing?",
        a: "An experiment that compares an exposed group with a comparable unexposed one — regions, audiences or time periods — to measure how much a channel actually changed outcomes. It's the most direct way to learn whether spend is causing sales or just being credited with them.",
      },
      {
        q: "Does server-side tagging make our tracking privacy-compliant?",
        a: "Not on its own. It gives you more control over what data is sent to third parties, which helps, but consent still has to be respected. Some sectors, healthcare especially, face strict limits on what can be shared with ad and analytics platforms. We design alongside your legal and privacy team, not around them.",
      },
      {
        q: "Do we need a data warehouse?",
        a: "Not always. If GA4 and your CRM answer your questions, a warehouse adds cost without much value. Once you need to join ad, web, product and CRM data, or keep history beyond platform limits, a warehouse such as BigQuery earns its place.",
      },
    ],
    related: {
      services: ["paid-media", "marketing-automation", "cro"],
      industries: ["healthcare"],
      solutions: ["marketing-attribution"],
      guides: ["marketing-attribution-models"],
      insights: ["connected-systems"], research: ["anatomy-of-a-50k-month-acquisition-system"] },
  },
  {
    slug: "marketing-automation",
    name: "Marketing Automation & AI Workflows",
    discipline: "automation",
    metaTitle: "Marketing Automation Agency: CRM, Routing & AI Workflows",
    metaDescription:
      "CRM automation, lead routing and AI-assisted workflows with human review and clear guardrails, so marketing operations move faster without losing control.",
    primaryQuery: "marketing automation agency",
    secondaryQueries: ["marketing automation consultant", "hubspot automation agency", "ai marketing automation", "lead routing automation", "marketing operations agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Automation & AI",
      title: ["Let the system handle the routine.", "Keep people on the judgment calls."],
      lead:
        "We automate the operational work between marketing and sales — capturing, enriching, scoring and routing leads, keeping the CRM clean, drafting the repetitive — using AI where it earns its place and a human checkpoint wherever a mistake would be expensive.",
    },
    problem: {
      heading: "Automation nobody understands breaks quietly.",
      body: [
        "Most marketing automation grows by accretion. A workflow is added for each campaign, each form gets its own rules, and lead scoring is tuned once and never revisited. Eventually there are more workflows than anyone can map, leads slip through the gaps between them, and a single renamed field can break routing without anyone noticing for weeks.",
        "AI is now being layered onto those same foundations: models drafting emails, summarizing calls, enriching records and classifying leads. Used carelessly, they add a new failure mode — confident output that's wrong, produced at scale, with nobody checking.",
        "Good automation is designed like software: documented, owned, tested before it changes and monitored after. AI steps get the same treatment plus guardrails — defined inputs, constrained outputs, human review where the stakes are high and a log of what the model did. The goal is faster operations that people can still explain.",
      ],
    },
    included: [
      {
        title: "CRM architecture and hygiene",
        detail:
          "Objects, properties, lifecycle stages and deduplication rules in HubSpot, Salesforce or your CRM of record, so automation runs on data that means what it says.",
      },
      {
        title: "Lead capture and routing",
        detail:
          "Forms, enrichment and routing rules that assign each lead to the right owner by territory, segment or product, with fallbacks so nothing sits unassigned and response time is tracked from the first touch.",
      },
      {
        title: "Scoring and lifecycle stages",
        detail:
          "Fit and behavior scoring built with sales, lifecycle definitions agreed across teams, and handoff rules reviewed against which leads actually go on to convert.",
      },
      {
        title: "AI-assisted workflows",
        detail:
          "Language models applied to specific tasks — account research summaries, call notes, lead classification, first drafts of follow-ups, content repurposing — with prompts, inputs and outputs specified and versioned like code.",
      },
      {
        title: "Human review and guardrails",
        detail:
          "Approval steps before anything customer-facing is sent, confidence checks that route uncertain cases to a person, rules on what data may be sent to a model, and logs kept for audit.",
      },
      {
        title: "Documentation and monitoring",
        detail:
          "A map of every automation with its owner and purpose, plus alerts when volumes drop, errors spike or routing stalls, so failures surface in hours rather than at the end of the quarter.",
      },
    ],
    approach: [
      {
        title: "Map",
        detail:
          "Inventory existing workflows, integrations, fields and handoffs, and trace how a lead actually moves from first touch to closed deal. We surface the gaps, the duplicates and the silent failures.",
      },
      {
        title: "Design",
        detail:
          "Agree lifecycle definitions, routing logic and response-time expectations with marketing and sales, then decide which steps to automate, which to assist with AI and which to leave with people.",
      },
      {
        title: "Build and test",
        detail:
          "Build in a sandbox where the platform allows it, test against real scenarios and edge cases, and roll out in stages with the old process available as a fallback.",
      },
      {
        title: "Operate",
        detail:
          "Monitor performance, review a regular sample of AI outputs, retire automations that no longer serve a purpose and leave your team documentation it can maintain on its own.",
      },
    ],
    measures: [
      "Speed to lead, from form fill to first contact",
      "Leads unassigned or misrouted",
      "Lifecycle stage conversion rates",
      "Duplicate and incomplete record rates",
      "Manual hours removed from routine tasks",
      "AI output acceptance rate after human review",
      "Automation errors and time to detection",
    ],
    fit: {
      for: [
        "Teams where leads wait too long or reach the wrong person",
        "Companies with a CRM that has grown messy and hard to trust",
        "Marketing operations teams stretched thin by repetitive work",
        "Leaders who want to use AI but need it controlled and auditable",
      ],
      notFor: [
        "Anyone wanting AI to message customers with no human oversight",
        "Businesses without an agreed sales process to automate",
        "Teams hoping automation will decide what the process should be",
      ],
    },
    engagement: {
      model: "Fixed-scope build, with optional ongoing operations support",
      duration: "Core systems usually live within a quarter; reviewed quarterly after",
      team: "Marketing operations lead, CRM architect, automation engineer, AI workflow specialist",
    },
    faqs: [
      {
        q: "Which marketing automation platforms do you work with?",
        a: "Most often HubSpot and Salesforce with their marketing tools, plus integration platforms such as Zapier or Make, or custom code where those fall short. We recommend staying on your current platform unless it genuinely can't do the job, because migrations are costly.",
      },
      {
        q: "How do you use AI safely in marketing workflows?",
        a: "By giving it narrow tasks with clear inputs, checking its outputs and keeping a person in the loop wherever a mistake would reach a customer or change a record that matters. We also set rules on what data can be sent to a model and log what it produces so it can be reviewed later.",
      },
      {
        q: "Will automation replace our marketing operations team?",
        a: "No. It removes repetitive work so the team can spend its time on design, analysis and improvement. Someone still has to own the system, make judgment calls and decide what should change.",
      },
      {
        q: "How long does it take to fix lead routing?",
        a: "A focused routing rebuild usually takes a few weeks, depending on how complex your territories and segments are and how clean the underlying data is. Data cleanup is often the longer part of the work.",
      },
      {
        q: "What if our CRM data is a mess?",
        a: "That's common, and it comes first. We deduplicate, standardize key fields and add validation so new records stay clean. Automation built on bad data just spreads the errors faster.",
      },
    ],
    related: {
      services: ["email-marketing", "marketing-analytics"],
      solutions: ["lead-generation"],
      useCases: ["in-house-team-support"],
      playbooks: ["speed-to-lead"],
      insights: ["ai-is-infrastructure", "connected-systems"],
    },
  },
];
