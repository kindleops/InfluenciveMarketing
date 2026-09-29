import type { SolutionPage } from "./types";

export const solutionPages: SolutionPage[] = [
  {
    slug: "website-redesign",
    name: "Website Redesign",
    metaTitle: "Website Redesign Agency That Protects Traffic & Leads",
    metaDescription:
      "A website redesign planned around search, conversion and content operations — so the new site launches without losing traffic and improves after launch.",
    primaryQuery: "website redesign agency",
    secondaryQueries: ["website redesign services", "website redesign company", "b2b website redesign", "redesign website without losing seo"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Website Redesign",
      title: ["A new site should do more.", "Not just look newer."],
      lead:
        "Most redesigns change the surface and keep the problems. We start from what the site needs to do — for buyers, for search and for the team that runs it — and design from there, with the migration planned long before launch day.",
    },
    outcome:
      "A site that explains what you do to the people you want, converts the traffic it already gets, keeps the search visibility you've earned and can be updated by your own team without a developer ticket for every change. The redesign is judged after launch — on qualified conversions and organic performance against the old site — not on how the homepage looked in the final review. Behind it sits a design system and a set of templates that let the site keep improving, so the next redesign is a long way off.",
    signs: [
      "Your positioning has changed and the site still describes the company you used to be",
      "Sales avoids sending prospects to the website",
      "Small page updates need a developer and a week of waiting",
      "Traffic holds steady but conversions don't, and nobody can say where visitors drop",
      "Mobile pages miss Core Web Vitals thresholds — LCP over 2.5s, INP over 200ms or CLS over 0.1",
      "Years of additions have left duplicate pages, orphaned content and a navigation nobody owns",
    ],
    plan: [
      {
        title: "Audit what the current site earns",
        detail:
          "Before changing anything, we map which pages bring organic traffic, backlinks and conversions, how visitors move through the site and where they leave. That becomes two lists: what the redesign must not break, and the problems it has to solve.",
      },
      {
        title: "Define structure and messaging",
        detail:
          "Sitemap, page types and the message hierarchy, built from buyer questions and search demand rather than the org chart. Each template gets a stated job and a way to measure whether it does it.",
      },
      {
        title: "Design and build a system, not pages",
        detail:
          "A component library and templates in a CMS your team can actually use, designed mobile-first and built to meet performance thresholds from the start rather than tuned at the end.",
      },
      {
        title: "Migrate carefully",
        detail:
          "URL mapping, redirects, metadata, structured data, internal links and content moves planned page by page, tested on staging, then verified again once the new site is live and being crawled.",
      },
      {
        title: "Improve after launch",
        detail:
          "Watch crawl errors, rankings and conversions closely in the first weeks, fix what surfaces, and start a testing roadmap on the pages that carry the most revenue.",
      },
    ],
    deliverables: [
      "Current-site audit covering traffic, links, conversions and content",
      "Sitemap, page-type specifications and messaging framework",
      "Design system and component library",
      "Built templates in your CMS, with editor documentation",
      "URL redirect map and migration plan",
      "Analytics and conversion tracking, implemented and tested",
      "Launch checklist and post-launch monitoring report",
      "Testing roadmap for the first quarter after launch",
    ],
    measures: [
      "Qualified conversions per visit, by page type",
      "Organic clicks against the pre-launch baseline",
      "Indexed pages and crawl errors after migration",
      "Core Web Vitals pass rate on mobile",
      "Conversion rate on the pricing, demo or contact path",
      "Time to publish a new page without developer help",
    ],
    faqs: [
      {
        q: "How long does a website redesign take?",
        a: "It depends on the number of templates, the volume of content to move and the integrations involved. A focused marketing site usually runs one to two quarters from audit to launch; larger sites with complex migrations take longer. We set the timeline after the audit, not before it.",
      },
      {
        q: "Will we lose search rankings when we redesign?",
        a: "Some fluctuation after a significant change is normal. The causes of lasting losses — missing redirects, removed content, broken internal linking, blocked crawling — are preventable with a careful migration plan, which is why it's part of the project from the first week. We don't guarantee rankings, but we plan and monitor to protect them.",
      },
      {
        q: "Do we need to change CMS?",
        a: "Not always. If your current CMS lets the team publish easily and performs well, keeping it is often cheaper and less risky. We recommend a change only when the platform is the constraint.",
      },
      {
        q: "Can you redesign the site without a full rebrand?",
        a: "Yes. Many redesigns work within the existing identity and sharpen messaging and structure instead. If the audit shows the brand itself is holding the site back, we'll say so and scope that separately.",
      },
      {
        q: "What happens after launch?",
        a: "The first weeks are for monitoring and fixing — redirects, crawl errors, tracking gaps. After that we can hand over fully, with documentation and training, or stay on to run a testing and content roadmap.",
      },
    ],
    related: {
      services: ["web-design", "seo", "cro", "branding"],
      solutions: ["rebrand"],
      useCases: ["website-migration"],
      guides: ["website-migration-seo-checklist", "landing-page-optimization"],
      insights: ["website-as-operating-system"],
      work: ["the-relaunch"],
    },
  },
  {
    slug: "rebrand",
    name: "Rebrand",
    metaTitle: "Rebranding Agency for Strategy, Identity & Rollout",
    metaDescription:
      "Rebranding built on positioning first — strategy, naming where needed, identity and a rollout that carries the new brand across site, product, sales and search.",
    primaryQuery: "rebranding agency",
    secondaryQueries: ["rebranding services", "brand refresh agency", "corporate rebrand", "b2b rebranding agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Rebrand",
      title: ["Change what people understand.", "Not just what they see."],
      lead:
        "A rebrand works when it resolves a real mismatch between what the company has become and how it's perceived. We start with positioning, design an identity that expresses it, and plan the rollout so the change lands everywhere at once.",
    },
    outcome:
      "A brand that says clearly who you serve, what you do differently and why it matters — expressed in a verbal and visual identity your teams can apply without guessing. It launches in a coordinated rollout across the website, product, sales material and channels, with the recognition and search equity you've already built carried forward rather than thrown away. Internally, people can explain the company the same way, which is often the change customers notice first.",
    signs: [
      "The company has moved upmarket, into new markets or into new products, and the brand still reflects the old business",
      "A merger or acquisition has left two identities competing for attention",
      "Prospects misunderstand what you do after reading the website",
      "Every team produces its own version of the brand and nothing looks related",
      "The name causes confusion, trademark trouble or doesn't travel to new markets",
      "Sales, recruiting and fundraising conversations start by correcting outdated impressions",
    ],
    plan: [
      {
        title: "Diagnose what needs to change",
        detail:
          "Interviews with leadership, customers and sales, a review of how alternatives position themselves and an audit of every place the brand appears. The point is to separate what must change from what has earned recognition and should stay.",
      },
      {
        title: "Set positioning and messaging",
        detail:
          "Who you are for, the problem you solve, what makes you different and the proof behind it — written as a messaging framework and agreed by leadership before any design work begins.",
      },
      {
        title: "Design the identity",
        detail:
          "Logo, typography, color, imagery, motion and voice, explored in a few distinct directions and tested against real applications — a web page, a product screen, a sales deck — rather than judged on a blank slide.",
      },
      {
        title: "Build the system",
        detail:
          "Guidelines, templates and a component library so the brand can be applied consistently by people who weren't in the room when it was made.",
      },
      {
        title: "Plan and run the rollout",
        detail:
          "Sequence the change across website, product, documents, social profiles and physical spaces; plan redirects and search continuity if the name or domain changes; and brief teams before launch so the story is told the same way everywhere.",
      },
    ],
    deliverables: [
      "Brand audit and stakeholder interview summary",
      "Positioning statement and messaging framework",
      "Verbal identity: voice, tone and core narratives",
      "Visual identity: logo, color, type, imagery and motion principles",
      "Brand guidelines and working templates",
      "Website and product application designs",
      "Rollout plan, including domain and search continuity where needed",
      "Internal launch materials and team briefing",
    ],
    measures: [
      "Branded search demand before and after launch",
      "Organic and direct traffic retained through any domain change",
      "Message recall in sales and customer conversations",
      "Consistency of brand use across teams and channels",
      "Conversion rates on key pages before and after",
      "Time for teams to produce on-brand material",
    ],
    faqs: [
      {
        q: "Do we need a rebrand or a refresh?",
        a: "If your positioning is still right and the problem is dated or inconsistent execution, a refresh is usually enough. If what you do, who you serve or how you're different has changed, the brand needs to change at the strategy level too. The diagnostic phase exists to answer this before you commit to either.",
      },
      {
        q: "Will a rebrand hurt our search traffic?",
        a: "A visual change alone rarely affects search. A name or domain change can, because it shifts branded queries and requires a full site migration. We plan redirects, announce the change where it matters and monitor closely so existing search equity carries over.",
      },
      {
        q: "Do you handle naming?",
        a: "Yes, when the diagnosis shows the name is the problem. Naming work includes linguistic and cultural checks and preliminary availability screening, but trademark clearance should be confirmed by your legal counsel.",
      },
      {
        q: "How long does a rebrand take?",
        a: "Strategy and identity usually take one to two quarters, depending on scope and how many stakeholders need to align. Rollout follows and depends on how many places the brand lives.",
      },
      {
        q: "Who needs to be involved on our side?",
        a: "A senior sponsor who can make decisions, plus access to leadership, sales and a handful of customers for interviews. Rebrands stall when decisions go to a committee without a clear owner.",
      },
    ],
    related: {
      services: ["branding", "web-design", "content-marketing", "seo"],
      industries: ["professional-services"],
      solutions: ["website-redesign", "go-to-market-strategy"],
      useCases: ["post-funding-growth", "website-migration"],
      work: ["the-relaunch"],
    },
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    metaTitle: "B2B Lead Generation Agency for Qualified Pipeline",
    metaDescription:
      "B2B lead generation measured on qualified pipeline — search, paid, content and conversion paths built around your ideal customer, with fast sales follow-up.",
    primaryQuery: "b2b lead generation agency",
    secondaryQueries: ["b2b lead generation services", "b2b demand generation agency", "lead generation company", "b2b pipeline generation"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Lead Generation",
      title: ["Fewer leads that go nowhere.", "More that become pipeline."],
      lead:
        "Lead volume is easy to inflate and hard to turn into revenue. We build lead generation around the accounts that can buy, the moments they're ready to talk and a handoff to sales that doesn't waste their interest.",
    },
    outcome:
      "A steady flow of inquiries from companies that match your ideal customer profile, reaching sales quickly and with enough context for a useful first conversation. Reporting shows which programs create opportunities and revenue, not just form fills, so spend and effort move toward what produces pipeline and away from what only produces volume. Marketing and sales work from one set of definitions, which ends most of the arguments about lead quality.",
    signs: [
      "Sales says most marketing leads aren't worth calling",
      "Cost per lead looks healthy but pipeline from marketing is flat",
      "Nobody can say which campaigns produced last quarter's closed deals",
      "Demo and contact requests wait hours or days for a response",
      "Gated content attracts students, job seekers and competitors",
      "Paid campaigns target broad job titles with no account list behind them",
      "Marketing and sales report different numbers for the same quarter",
    ],
    plan: [
      {
        title: "Define who counts",
        detail:
          "Agree the ideal customer profile, buying roles and qualification criteria with sales, and write shared definitions for each stage from inquiry to opportunity. Without this, every metric that follows is disputed.",
      },
      {
        title: "Fix the conversion paths",
        detail:
          "Rework demo, contact and pricing pages, cut unnecessary form fields and make routing fast — with the prospect's pages viewed and questions asked passed to whoever follows up.",
      },
      {
        title: "Build intent-led programs",
        detail:
          "Search campaigns and content aimed at people actively researching the problem, plus account-based programs on LinkedIn and elsewhere aimed at a defined list of target accounts.",
      },
      {
        title: "Nurture what isn't ready",
        detail:
          "Behavior-triggered email and retargeting for prospects who fit but aren't ready to buy — useful enough that they come back when the timing changes.",
      },
      {
        title: "Measure on pipeline",
        detail:
          "CRM reporting from source to opportunity to closed-won, reviewed with sales every month. Budget moves on what it shows, and programs that produce inquiries but not opportunities get fixed or cut.",
      },
    ],
    deliverables: [
      "Ideal customer profile and qualification criteria agreed with sales",
      "Lifecycle stage definitions and routing rules in the CRM",
      "Reworked demo, contact and key landing pages",
      "Paid search and account-based campaign structure",
      "Intent-focused content plan and the first published pieces",
      "Nurture sequences for fit-but-not-ready prospects",
      "Pipeline reporting connected to CRM data",
    ],
    measures: [
      "Sales-accepted opportunities from marketing",
      "Pipeline value created, by program",
      "Lead-to-opportunity conversion rate",
      "Time to first sales response",
      "Share of inquiries matching the ideal customer profile",
      "Cost per qualified opportunity",
    ],
    faqs: [
      {
        q: "Do you guarantee a number of leads?",
        a: "No. A lead guarantee rewards volume, which is the opposite of what most B2B companies need. We commit to the plan, the cadence and transparent reporting on qualified pipeline.",
      },
      {
        q: "Do you run outbound or cold email?",
        a: "Our focus is inbound and account-based programs — search, content, paid and conversion. We work alongside outbound teams so their messages and marketing's tell the same story, but we don't run bulk cold outreach.",
      },
      {
        q: "How soon will we see more pipeline?",
        a: "Conversion and routing fixes can show up within weeks because they apply to demand you already have. New paid and content programs take longer, and their full effect appears over one or more sales cycles. We report leading indicators along the way.",
      },
      {
        q: "What do you need from our sales team?",
        a: "Agreement on what a good lead looks like, honest feedback on the leads they get and reliable CRM updates. A short monthly review between marketing and sales does more for lead quality than any single campaign change.",
      },
      {
        q: "Should we gate our content?",
        a: "Gate only what a qualified buyer would willingly trade contact details for. Most educational content works harder ungated, where it builds search visibility and trust; gated assets should be the exception.",
      },
      {
        q: "Is account-based marketing right for us?",
        a: "It fits when your market is a definable list of companies and each deal is large enough to justify concentrated effort on a few accounts at a time. If buyers are numerous and deals are small, broader intent-led programs usually work better. Many B2B companies end up with a mix: account-based for the top tier, inbound for everyone else.",
      },
    ],
    related: {
      services: ["paid-media", "content-marketing", "cro", "marketing-automation", "seo"],
      industries: ["b2b-saas", "professional-services"],
      solutions: ["marketing-attribution"],
      guides: ["landing-page-optimization"],
      playbooks: ["speed-to-lead"],
    },
  },
  {
    slug: "lower-acquisition-cost",
    name: "Lower Customer Acquisition Cost",
    metaTitle: "Reduce Customer Acquisition Cost Without Stalling Growth",
    metaDescription:
      "Lower customer acquisition cost by fixing measurement, conversion and channel mix together — so efficiency improves without cutting what creates demand.",
    primaryQuery: "reduce customer acquisition cost",
    secondaryQueries: ["how to lower cac", "lower customer acquisition cost", "reduce cac", "improve marketing efficiency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Lower Acquisition Cost",
      title: ["Spend less per customer.", "Without starving growth."],
      lead:
        "Cutting budget is the fastest way to lower acquisition cost for a quarter and the surest way to stall growth after it. We find where acquisition is wasteful, fix the conversion and measurement problems underneath, and rebalance toward sources that keep working.",
    },
    outcome:
      "A lower, steadier cost to acquire a customer, measured blended across channels and set against what those customers are worth — with a clear view of which spend is incremental, which pages and steps leak, and which channels are over-credited. Growth continues because the savings come from removing waste and converting better, not from switching off the programs that create demand. Finance and marketing agree on the number, so budget conversations start from the same place.",
    signs: [
      "Acquisition cost has risen quarter after quarter with no clear cause",
      "Every ad platform reports strong return, but total new customers haven't moved with spend",
      "Branded search and retargeting take a large share of budget and credit",
      "Landing pages and sign-up or checkout flows haven't been tested in a long time",
      "Most new customers come from one channel, so costs follow its auction",
      "Nobody can say what a customer is worth over time, so nobody knows what is affordable",
      "Discounts and promotions have become the default way to hit acquisition targets",
    ],
    plan: [
      {
        title: "Establish the real number",
        detail:
          "Calculate blended acquisition cost from finance and CRM data rather than platform dashboards, and set it against customer value and payback. Agree which costs are in and out so the number doesn't move with the definition.",
      },
      {
        title: "Find the waste",
        detail:
          "Audit spend for overlap and low incrementality — branded search that would convert anyway, retargeting aimed at people who already bought, audiences duplicated across platforms — and test the largest items with holdouts where volume allows.",
      },
      {
        title: "Fix conversion before buying more traffic",
        detail:
          "Improve landing pages, forms, checkout or sign-up and follow-up speed. A higher conversion rate lowers acquisition cost on every channel at once, which no bid adjustment can do.",
      },
      {
        title: "Rebalance the channel mix",
        detail:
          "Move spend toward sources that prove incremental, build organic search, referral and lifecycle programs that lower the cost of each additional customer, and keep a deliberate budget for testing new channels.",
      },
      {
        title: "Put a cadence on it",
        detail:
          "Review blended cost, payback and channel incrementality on a fixed schedule, so decisions follow trends rather than weekly noise.",
      },
    ],
    deliverables: [
      "Blended acquisition cost and payback model agreed with finance",
      "Spend audit with incrementality findings",
      "Holdout or geo test designs for the largest channels",
      "Conversion audit with prioritized fixes for the main paths",
      "Revised channel mix and budget allocation",
      "Organic and lifecycle roadmap to reduce paid dependence",
      "Monthly efficiency report with a log of decisions made",
    ],
    measures: [
      "Blended customer acquisition cost",
      "Payback period on acquisition spend",
      "New customers per unit of spend, by channel",
      "Conversion rate on primary acquisition paths",
      "Share of new customers from non-paid sources",
      "Incremental lift measured in holdout tests",
    ],
    faqs: [
      {
        q: "Why not just cut the channels with the worst return?",
        a: "Because platform-reported return often misleads. Channels that create demand, like upper-funnel social or video, can look expensive while channels that capture it, like branded search, look cheap by taking the credit. Cutting on reported return alone can reduce total customers without improving the cost of each one.",
      },
      {
        q: "How quickly can acquisition cost come down?",
        a: "Removing obvious waste and fixing conversion problems can show an effect within weeks. Rebalancing the mix and building organic and lifecycle programs takes quarters. We plan on both horizons and report on each.",
      },
      {
        q: "What is a good customer acquisition cost?",
        a: "There's no universal figure. A good acquisition cost is one your customer value and cash position can support, with a payback period the business is comfortable carrying. We work from your economics, not a benchmark.",
      },
      {
        q: "Do we need incrementality tests?",
        a: "If spend on a channel is meaningful, yes — at least periodically. Holdouts and geo tests are the most direct way to see what spend actually causes, and they change budget decisions more often than any attribution model does.",
      },
      {
        q: "Does lowering acquisition cost mean spending less?",
        a: "Not necessarily. Some companies should spend less. Others find that once waste is gone and conversion improves, they can spend more and still acquire customers profitably. The goal is efficient growth, not a smaller budget.",
      },
    ],
    related: {
      services: ["paid-media", "cro", "marketing-analytics", "email-marketing", "seo"],
      industries: ["ecommerce", "fintech"],
      solutions: ["marketing-attribution"],
      useCases: ["scaling-paid-media"],
      compare: ["seo-vs-ppc"],
      playbooks: ["creative-testing-system"],
    },
  },
  {
    slug: "marketing-attribution",
    name: "Marketing Attribution",
    metaTitle: "Marketing Attribution Services You Can Make Decisions On",
    metaDescription:
      "Marketing attribution built from clean tracking, CRM data and incrementality tests — so budget decisions rest on evidence your finance team will accept too.",
    primaryQuery: "marketing attribution services",
    secondaryQueries: ["marketing attribution consultant", "multi-touch attribution services", "attribution modeling", "marketing measurement agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Marketing Attribution",
      title: ["Know what's working.", "Well enough to move budget."],
      lead:
        "No attribution model is true. Some are useful. We build measurement that combines clean tracking, CRM data and controlled tests, and turn it into decisions about where the next dollar goes.",
    },
    outcome:
      "A measurement setup the leadership team trusts: consistent tracking across site, product and CRM; an attribution view that fits your sales motion; periodic incrementality tests that check what the model claims; and a regular review where budget moves on the evidence. Marketing, sales and finance look at the same numbers and argue about strategy instead of data. Where the numbers are uncertain, the reporting says so rather than hiding it.",
    signs: [
      "Ad platforms together claim more conversions than you actually had",
      "Finance doesn't trust marketing's numbers, and budget meetings stall on them",
      "UTM tagging is inconsistent and much of your traffic shows as direct or unassigned",
      "The CRM can't tell you where closed deals originally came from",
      "Budget is allocated on last-click reports nobody believes",
      "You've bought an attribution tool, but nobody uses its output to make decisions",
    ],
    plan: [
      {
        title: "Audit the data before the model",
        detail:
          "Review tagging, GA4 configuration, consent handling, CRM source fields and how offline conversions are captured. Most attribution problems are data problems, and no model fixes missing or inconsistent inputs.",
      },
      {
        title: "Rebuild the tracking foundations",
        detail:
          "A documented tracking plan, consistent UTM conventions, first-party or server-side collection where it helps, and CRM fields that keep original and most recent source attached all the way to revenue.",
      },
      {
        title: "Choose methods for the decisions you make",
        detail:
          "Multi-touch or position-based views for channel planning, self-reported attribution for word of mouth and private sharing that tracking can't see, and marketing mix modeling where spend and history support it — each used for what it's good at.",
      },
      {
        title: "Test for causality",
        detail:
          "Holdouts, geo experiments and platform lift studies on the largest channels, so the model's claims are checked against controlled evidence rather than taken on trust.",
      },
      {
        title: "Turn it into a decision cadence",
        detail:
          "A monthly or quarterly review where the numbers are read together and budget changes are agreed and logged — so measurement changes what the team does, not just what it reports.",
      },
    ],
    deliverables: [
      "Measurement audit covering analytics, tags, consent and CRM",
      "Tracking plan and UTM conventions",
      "Implemented tracking fixes and a data pipeline to reporting",
      "Attribution reporting matched to your sales motion",
      "Self-reported attribution on key conversion forms",
      "Incrementality test designs and readouts",
      "Executive dashboard reconciled with finance",
      "Decision log and review cadence",
    ],
    measures: [
      "Share of conversions with a known source",
      "Agreement between CRM, analytics and finance totals",
      "Revenue and pipeline by channel and program",
      "Incremental lift measured in controlled tests",
      "Budget changes made on the evidence each quarter",
    ],
    faqs: [
      {
        q: "Which attribution model is best?",
        a: "None is best in general. Last-click undervalues demand creation, multi-touch depends on user-level tracking that privacy changes have weakened, and marketing mix modeling needs enough spend and history to be reliable. We combine approaches and check them with experiments.",
      },
      {
        q: "Do we need a dedicated attribution tool?",
        a: "Sometimes, but rarely first. Most companies get more from fixing tracking, CRM fields and reporting in the tools they already have — GA4, their CRM and a warehouse or BI layer. We recommend a dedicated tool only when the gap is clear.",
      },
      {
        q: "How does privacy affect attribution?",
        a: "Consent requirements, browser tracking limits and platform changes mean a growing share of journeys can't be followed user by user. That's why we lean on first-party data, aggregate methods and controlled tests rather than trying to track everyone.",
      },
      {
        q: "How long until attribution is reliable?",
        a: "Tracking and CRM fixes usually take weeks to a quarter, depending on complexity. Enough clean data for confident channel comparisons takes longer — often a full quarter after the fixes, and longer where sales cycles are long.",
      },
      {
        q: "Will this satisfy our finance team?",
        a: "That's part of the goal. We reconcile marketing reporting with finance and CRM totals, document definitions and assumptions, and show where the numbers are uncertain instead of smoothing it over.",
      },
      {
        q: "Can attribution work with long B2B sales cycles?",
        a: "Yes, but it has to be built for them. That means tracking at the account level as well as the person, keeping original source on the CRM record through to closed-won, and reading results across quarters rather than weeks. Self-reported attribution is especially useful here, because buyers often first hear about a vendor in places no tracker sees.",
      },
    ],
    related: {
      services: ["marketing-analytics", "paid-media", "marketing-automation"],
      industries: ["b2b-saas", "ecommerce"],
      solutions: ["lower-acquisition-cost", "lead-generation"],
      guides: ["marketing-attribution-models"],
      insights: ["connected-systems"],
      work: ["the-operating-layer"],
    },
  },
  {
    slug: "go-to-market-strategy",
    name: "Go-to-Market Strategy",
    metaTitle: "Go-to-Market Strategy Consultant for Launch & Expansion",
    metaDescription:
      "Go-to-market strategy that turns positioning, pricing, channels and sales motion into a plan your teams can run — for a new product, segment or market.",
    primaryQuery: "go to market strategy consultant",
    secondaryQueries: ["go to market strategy agency", "gtm strategy consulting", "go to market plan", "b2b go to market strategy"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Go-to-Market Strategy",
      title: ["A plan your teams can run.", "Not a deck that sits in a drive."],
      lead:
        "Launching a product, entering a market or moving into a new segment forces decisions about who to sell to, what to say, how to price and which channels to use. We help you make those decisions with evidence, then turn them into a plan marketing and sales can execute.",
    },
    outcome:
      "A go-to-market plan built on clear choices: the segment and buyer you're targeting first, the positioning that wins them, the motion — self-serve, sales-led or partner — that fits how they buy, the channels to test and in what order, and the metrics that decide whether to scale, adjust or stop. Owners, timelines and budgets are attached, and the first programs are live, not just planned. When the market answers differently than expected, the plan has a mechanism for changing course.",
    signs: [
      "You're launching a new product and each team has a different idea of who it's for",
      "Early customers came through founder networks and nothing repeatable has replaced them",
      "You're entering a new segment or market with the message that worked in the last one",
      "Pricing and packaging were set once and never revisited",
      "Marketing and sales disagree on the target customer and how to sell to them",
      "New funding needs to become growth quickly, and there's no agreed plan for spending it",
    ],
    plan: [
      {
        title: "Understand the market and the buyer",
        detail:
          "Customer and prospect interviews, win-loss analysis, a review of how alternatives position themselves and a look at search demand — to learn how buyers describe the problem and choose between options.",
      },
      {
        title: "Make the core choices",
        detail:
          "Target segment and ideal customer profile, positioning, pricing and packaging inputs, and the sales motion — written down with the reasoning, so they can be revisited when the evidence changes.",
      },
      {
        title: "Design the channel plan",
        detail:
          "Which channels to test first, what each test has to prove and the order to run them in, sized to the budget and team you actually have rather than the one you might hire.",
      },
      {
        title: "Build the launch assets",
        detail:
          "Messaging framework, website pages, sales narrative and enablement, and the first campaign — ready for teams to use on day one.",
      },
      {
        title: "Launch, learn and adjust",
        detail:
          "Run the first programs, review results against the agreed success criteria on a set cadence, and decide what to scale, change or stop.",
      },
    ],
    deliverables: [
      "Market, buyer and competitive landscape summary",
      "Ideal customer profile and segment priorities",
      "Positioning and messaging framework",
      "Pricing and packaging recommendations",
      "Channel test plan with success criteria",
      "Launch website pages and sales narrative",
      "Sales enablement materials",
      "Go-to-market scorecard and review cadence",
    ],
    measures: [
      "Qualified pipeline or sign-ups from the target segment",
      "Win rate against named alternatives",
      "Sales cycle length in the new segment",
      "Channel test results against success criteria",
      "Message resonance in sales calls and win-loss feedback",
      "Acquisition cost and payback for early customer cohorts",
    ],
    faqs: [
      {
        q: "How is go-to-market strategy different from a marketing plan?",
        a: "A marketing plan decides which campaigns to run. A go-to-market strategy decides who you're selling to, what you're selling them, how it's priced and how it's sold — the choices a marketing plan depends on. We do both, in that order.",
      },
      {
        q: "How long does go-to-market strategy work take?",
        a: "Research and the core decisions usually take several weeks, depending on customer access and how much data already exists. We then stay involved through launch and the first review cycles, because a plan only proves itself in the market.",
      },
      {
        q: "Do you help with pricing?",
        a: "We bring pricing and packaging inputs — how buyers value the product, how alternatives are packaged and what the sales motion implies — and help structure the decision. Final pricing is a business call we support rather than make.",
      },
      {
        q: "Can you help with international expansion?",
        a: "Yes, on the marketing side: adapting positioning, messaging, channel plans and web presence for new markets. Legal, tax and entity setup should sit with specialists.",
      },
      {
        q: "What if we're not sure the product is ready?",
        a: "Then the plan should say so. We can design a smaller, controlled launch to a specific segment to learn quickly before committing the full budget.",
      },
      {
        q: "Do you work with early-stage or established companies?",
        a: "Both. Early-stage companies usually need to find their first repeatable segment and channel; established companies more often need to launch a new product or enter a new market without disrupting what already works. The method is the same — evidence, choices, tests — but the scope and the risks differ.",
      },
    ],
    related: {
      services: ["branding", "content-marketing", "paid-media", "web-design"],
      industries: ["b2b-saas", "fintech"],
      solutions: ["rebrand", "lead-generation"],
      useCases: ["product-launch", "post-funding-growth"],
      compare: ["fractional-cmo-vs-agency"],
    },
  },
];
