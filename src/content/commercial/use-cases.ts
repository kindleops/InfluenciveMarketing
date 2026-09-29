import type { UseCasePage } from "./types";

/**
 * Situations a company finds itself in. Each page describes what goes wrong
 * in that situation, what to do first, and how we'd run it — written for
 * the situation, not adapted from a service page.
 */
export const useCasePages: UseCasePage[] = [
  {
    slug: "product-launch",
    name: "Launching a New Product",
    metaTitle: "Product Launch Marketing Agency: Plan, Launch, Learn",
    metaDescription:
      "How to plan a product launch that keeps working after launch day — positioning, launch assets, channel sequencing and measurement that lets you adjust fast.",
    primaryQuery: "product launch marketing agency",
    secondaryQueries: [
      "product launch marketing",
      "product launch strategy",
      "go to market launch agency",
      "how to market a new product",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Use case",
      title: ["Launch day is loud.", "Week six is what counts."],
      lead:
        "A launch should answer one question as fast as possible: who wants this, and why now? We plan positioning, assets, channels and measurement so the answer arrives in days, not after the budget is gone.",
    },
    situation: {
      heading: "Most launches are planned around a date, not a question.",
      body: [
        "The typical launch is built backward from a calendar. A page gets designed, an announcement email gets scheduled, ads are booked for the morning, and the team posts everywhere at once. The energy goes into making the day look busy. A week later the spike has faded, and nobody can say whether the product found its audience or simply had a loud morning.",
        "A launch is better understood as a sequence of questions. Who is this for? What problem do they already believe they have? What are they using instead today? What would make them try something new now, and what do they need to see before they commit? The plan should be designed to answer those quickly — messaging tested before the date, channels chosen for where the buyer actually is, and tracking in place before the first visitor arrives.",
        "We work on launches from positioning through the first quarter in market. The goal isn't a big day. It's a product that keeps getting adopted after the announcement has stopped being news.",
      ],
    },
    risks: [
      {
        title: "Positioning decided in the room",
        detail:
          "Messaging written by the people who built the product tends to describe features in internal language. Buyers don't recognize their own problem in it. Headlines and value propositions should be tested against real prospects — sales conversations, customer interviews or small paid tests — before the launch page is locked.",
      },
      {
        title: "Everything spent on one day",
        detail:
          "Concentrating budget and announcements on a single date produces one set of results and no room to adjust. A staggered sequence — existing customers and waitlist first, then partners, then paid reach — lets each wave improve the next.",
      },
      {
        title: "Tracking added after the fact",
        detail:
          "When conversion events, campaign naming and CRM fields are set up late, launch-week data is incomplete at exactly the moment it would be most useful. The first days of a launch are the cheapest learning you will ever get; losing them to broken tags is expensive.",
      },
      {
        title: "Sales and support hear about it last",
        detail:
          "If the sales team doesn't know the pitch and support doesn't know the answers, the demand the launch creates leaks at the handoff. Enablement is part of the launch, not a follow-up task.",
      },
    ],
    plan: [
      {
        title: "Position",
        detail:
          "Define the primary audience, the problem they recognize, the alternatives they use today and the one claim the product can prove. The output is a short messaging framework and a list of claims worth testing — not a brand manifesto.",
      },
      {
        title: "Prepare",
        detail:
          "Build the launch page, product visuals or demo, email sequences, ad creative in several distinct angles and sales materials. Set up analytics events, campaign naming and CRM fields, and test them end to end. This usually runs four to eight weeks before the date.",
      },
      {
        title: "Warm up",
        detail:
          "Open early access to existing customers, the waitlist and partners. Collect objections, questions and the language people use to describe the problem. Adjust the page and the ads before paying for attention.",
      },
      {
        title: "Launch in waves",
        detail:
          "Announce broadly, then open paid channels in stages. Read results daily in the first week against decision rules agreed in advance, and move budget toward the messages and audiences that convert rather than the ones that got the most clicks.",
      },
      {
        title: "Turn attention into adoption",
        detail:
          "After the first weeks, shift from announcement to adoption: onboarding emails, content that answers buyer questions, search pages for the problem the product solves, and retargeting for people who showed interest but didn't act.",
      },
    ],
    checklist: [
      "A one-sentence positioning statement the whole team can repeat",
      "Primary audience defined by the problem they already believe they have",
      "Messaging tested with real prospects before the launch page is final",
      "Launch page reviewed on mobile, on a staging URL, before the date",
      "Conversion events and campaign naming tested end to end",
      "Several distinct creative angles ready for paid testing, not just resized versions",
      "Pricing and packaging decided and consistent everywhere they appear",
      "Sales and support briefed, with an FAQ and objection-handling notes",
      "Email sequences for the waitlist, existing customers and new signups",
      "Written decision rules for shifting budget during launch week",
      "Partner, press and community outreach scheduled, each with an owner",
      "A plan for the first month after launch, not just the first day",
    ],
    faqs: [
      {
        q: "How far ahead should we start planning a product launch?",
        a: "For a significant launch, start positioning work roughly two to three months before the date. That leaves time to test messaging, build assets and set up tracking without rushing. Smaller feature releases can move faster when positioning is already clear.",
      },
      {
        q: "Should we launch with paid ads?",
        a: "Usually as part of the mix, not the whole plan. Paid media is useful for testing messages quickly and reaching people who don't know you yet. It works best after warm audiences have been reached, so you're paying to extend momentum rather than create it from nothing.",
      },
      {
        q: "What happens if the launch underperforms?",
        a: "Then the plan should tell you why. With tracking in place and messages tested separately, you can see whether the problem is reach, message, landing page or the offer itself, and respond to that specifically. A quiet launch is often a positioning problem, and positioning can be fixed.",
      },
      {
        q: "Can you work alongside our product and engineering teams?",
        a: "Yes. We plan around their release schedule, write tracking and page requirements into their tickets, and join the check-ins that matter. The launch plan should bend to the product timeline, not the other way around.",
      },
      {
        q: "Do you guarantee launch results?",
        a: "No. Nobody can promise how a market will respond to a new product. We commit to a clear plan, fast measurement and honest reads on what the data says, so you can make good decisions quickly.",
      },
    ],
    related: {
      services: ["branding", "paid-media", "email-marketing"],
      solutions: ["go-to-market-strategy"],
      useCases: ["post-funding-growth"],
      guides: ["landing-page-optimization"],
      playbooks: ["creative-testing-system"],
      work: ["the-product-surface"],
    },
  },
  {
    slug: "website-migration",
    name: "Website Migration",
    metaTitle: "Website Migration SEO: Replatform Without Losing Traffic",
    metaDescription:
      "Redirect mapping, pre- and post-launch crawls and monitoring for replatforms, redesigns and domain moves — so organic traffic survives the migration.",
    primaryQuery: "website migration seo",
    secondaryQueries: [
      "seo migration",
      "replatforming seo",
      "website redesign without losing seo",
      "domain migration seo",
      "site migration redirect mapping",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Use case",
      title: ["Change the site.", "Keep the traffic."],
      lead:
        "Replatforms, redesigns and domain moves ask search engines to relearn your site. We map every URL, check the new build before it goes live and watch it closely afterward, so organic search carries through the change.",
    },
    situation: {
      heading: "A migration is an SEO event, whether you plan it as one or not.",
      body: [
        "Moving to a new CMS, redesigning templates, merging domains or changing URL structure all ask search engines to rediscover and re-evaluate the site. Every URL that changes has to be matched to its new home. The signals attached to the old page — links from other sites, relevance, history — have to be passed on. And the new templates have to render content that search engines can actually read. When those steps are skipped, organic traffic can fall sharply and take months to come back, if it comes back at all.",
        "Most migration losses trace to a short list of causes: redirects that were never mapped or all point to the homepage, content cut or thinned during the redesign, noindex tags and robots rules from staging carried into production, internal links still pointing at old URLs, and JavaScript rendering that hides content from crawlers. Every one of them is preventable, and every one is far cheaper to catch before launch than after.",
        "We join migrations as early as we can — ideally while the new site is still being scoped — and stay through the weeks after launch, when problems actually surface.",
      ],
    },
    risks: [
      {
        title: "An incomplete redirect map",
        detail:
          "A crawl only finds pages that are linked. Old URLs with external backlinks, orphaned pages, PDFs, image URLs and parameter variations are easy to miss. The inventory should combine a crawl with analytics, Search Console, backlink data, XML sitemaps and, where available, server logs.",
      },
      {
        title: "Content lost in the redesign",
        detail:
          "New designs often trim copy, merge pages or drop sections that were quietly earning search traffic. Headings, body copy and internal links on high-traffic pages should be compared old against new before anything ships.",
      },
      {
        title: "Staging settings shipped to production",
        detail:
          "A sitewide noindex, a robots.txt disallow, password protection or canonical tags that still reference the staging domain can make a new site invisible on day one. These are simple to check and devastating to miss.",
      },
      {
        title: "Changing everything at once",
        detail:
          "A new domain, platform, URL structure, design and content in a single release makes it nearly impossible to diagnose a drop. Where the business allows it, separate the changes. Where it doesn't, benchmark more thoroughly.",
      },
    ],
    plan: [
      {
        title: "Benchmark",
        detail:
          "Crawl the current site in full and export search performance by URL. Record which pages earn clicks, links and conversions. This baseline is what the new site will be judged against, and it can't be recreated once the old site is gone.",
      },
      {
        title: "Map",
        detail:
          "Build a one-to-one redirect map from every old URL worth keeping to its closest new equivalent, using permanent (301) redirects. Decide deliberately which pages to consolidate or retire, rather than letting them fall to the homepage. Remove chains and loops.",
      },
      {
        title: "Test on staging",
        detail:
          "Crawl the staging site and run the redirect map against it. Check status codes, canonicals, meta robots, hreflang where relevant, structured data, internal links, rendering and page speed. Confirm analytics and conversion tracking fire on the new templates.",
      },
      {
        title: "Launch",
        detail:
          "Deploy, remove staging blocks, submit updated XML sitemaps and crawl production the same day. Spot-check the highest-value URLs by hand. For a domain change, keep the old property verified in Search Console and use its change of address tool.",
      },
      {
        title: "Monitor",
        detail:
          "Check daily for the first weeks, then weekly: new 404s, indexing status, clicks and rankings for benchmarked pages, and server logs showing how crawlers handle old URLs. Some fluctuation is normal while search engines reprocess; a sustained drop on specific pages points to a specific fix.",
      },
    ],
    checklist: [
      "URL inventory built from crawl, analytics, Search Console, backlinks and logs",
      "Redirect map reviewed for one-to-one matches, with no chains or loops",
      "Baseline of clicks, rankings and conversions for top pages saved",
      "Content parity checked on every page that earns meaningful traffic",
      "Staging blocked from indexing, with a named owner to lift the block at launch",
      "Canonical, meta robots and hreflang tags verified on new templates",
      "Structured data carried over and validated",
      "Internal links updated to final URLs rather than relying on redirects",
      "Analytics and conversion tracking tested on the new site before launch",
      "Updated XML sitemaps ready to submit on launch day",
      "A rollback plan and a decision-maker available on launch day",
      "Post-launch monitoring schedule agreed for the following weeks",
    ],
    faqs: [
      {
        q: "How much traffic will we lose during a website migration?",
        a: "Nobody can honestly promise a number. Some short-term fluctuation is common while search engines recrawl and reprocess the site. Sustained losses usually point to specific, fixable problems — missing redirects, lost content, indexing blocks — which is why careful mapping and monitoring matter.",
      },
      {
        q: "How long should redirects stay in place?",
        a: "Treat them as permanent. Other sites will keep linking to old URLs for years, and removing the redirects throws away the value those links carry. The cost of keeping them is small compared with the cost of losing them.",
      },
      {
        q: "When should SEO be involved in a redesign?",
        a: "Before the sitemap and wireframes are final. Decisions about information architecture, URL structure and which content survives are made early, and they're much harder to change once design and development are underway.",
      },
      {
        q: "Should we change our domain and platform at the same time?",
        a: "If you can separate them, do. Each change carries its own risk, and doing them together makes any drop harder to diagnose. When business reasons require a combined move, the benchmark and monitoring work matters even more.",
      },
      {
        q: "Can you work with our developers or build partner?",
        a: "Yes. We don't need to build the site. We supply the redirect map in a format your developers can implement, write tickets for template changes, test staging and monitor after launch.",
      },
    ],
    related: {
      services: ["seo", "web-design", "marketing-analytics"],
      solutions: ["website-redesign"],
      useCases: ["organic-traffic-drop"],
      guides: ["website-migration-seo-checklist", "technical-seo-audit"],
      work: ["the-relaunch"],
    },
  },
  {
    slug: "scaling-paid-media",
    name: "Scaling Paid Media",
    metaTitle: "Scaling Paid Ads Without Losing Efficiency",
    metaDescription:
      "How to scale paid ads past the point where more budget stops working — creative volume, conversion signal, new channels and measurement that holds up.",
    primaryQuery: "scaling paid ads",
    secondaryQueries: [
      "how to scale paid ads",
      "scale ad spend profitably",
      "scaling meta ads",
      "scaling google ads",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Use case",
      title: ["More budget isn't scale.", "Better inputs are."],
      lead:
        "Every paid program reaches a point where extra spend buys less. We work on what the ad platforms depend on — creative, conversion signal, landing pages and measurement — so the next dollar is worth spending.",
    },
    situation: {
      heading: "The point where extra spend stops paying back.",
      body: [
        "Most paid programs hit a ceiling that looks the same from the inside. Acquisition cost creeps up, frequency climbs, the ads that carried the account start to fatigue, and the audiences that converted cheaply are used up. The usual response is to raise budgets on whatever worked last month, which tends to speed the decline rather than reverse it.",
        "Scaling well is mostly about inputs. Modern ad platforms automate bidding and much of the targeting. What they can't create for you is a steady supply of genuinely different creative, conversion signals that reflect real business value, landing pages that persuade people who have never heard of you, and a clear view of which spend is actually incremental. When those inputs are weak, more budget simply finds more expensive versions of the same customers.",
        "We help teams scale deliberately: set efficiency limits before spending, strengthen what the platforms learn from, and expand into new channels and audiences only when the current ones are genuinely saturated.",
      ],
    },
    risks: [
      {
        title: "Scaling on platform-reported return",
        detail:
          "Each platform claims credit for conversions using its own rules, and those claims overlap. Retargeting and branded search look efficient at almost any spend because they reach people who were already likely to buy. Budgets drift toward what would have converted anyway.",
      },
      {
        title: "Creative that runs out before the budget does",
        detail:
          "As spend rises, the same ads reach the same people more often and performance decays. Scale depends on new concepts — different angles, hooks and formats — not more resized versions of the current winner.",
      },
      {
        title: "Optimizing toward the wrong event",
        detail:
          "If the platform is told a click, an add-to-cart or any form fill is success, it will find more of those as cheaply as possible, regardless of quality. For lead generation especially, qualified-lead or revenue events need to flow back from the CRM.",
      },
      {
        title: "Landing pages built for warm traffic",
        detail:
          "Broader audiences know less about you. Pages that relied on existing context — brand familiarity, a referral, a previous visit — convert worse as reach expands, and the ads get blamed for a page problem.",
      },
    ],
    plan: [
      {
        title: "Set the guardrails",
        detail:
          "Agree what the next customer or lead is allowed to cost, based on margin or lifetime value, and judge scaling on marginal results rather than account averages. Define a blended acquisition cost that sits above any single platform's reporting.",
      },
      {
        title: "Fix the signal",
        detail:
          "Audit pixels, server-side events and conversion APIs, remove duplicate counting, and confirm consent handling. Pass lead quality or revenue back to Google Ads, Meta and LinkedIn through offline conversion imports or CRM integrations.",
      },
      {
        title: "Build creative volume",
        detail:
          "Stand up a testing system with a steady cadence of new concepts, clear hypotheses and a testing budget kept separate from the scaling budget, so experiments don't compete with proven ads for spend.",
      },
      {
        title: "Scale in steps",
        detail:
          "Raise budgets in increments and read marginal cost after each one. Consolidate campaigns where fragmentation starves the algorithms of data, and keep prospecting, retargeting and branded spend reported separately.",
      },
      {
        title: "Expand deliberately",
        detail:
          "When marginal returns in the main channel flatten, open new channels, placements, geographies or audiences — one at a time, with their own creative. Where spend is large enough, run geo holdouts or lift tests to confirm what's incremental.",
      },
    ],
    checklist: [
      "Marginal acquisition cost target tied to margin or lifetime value",
      "Blended acquisition cost reported alongside platform numbers",
      "Server-side tracking or conversion APIs in place and deduplicated",
      "Lead quality or revenue events sent back to each ad platform",
      "Branded and non-branded search reported separately",
      "Retargeting reported apart from prospecting, with a spend cap",
      "Testing budget separated from scaling budget",
      "A steady cadence of new creative concepts, not just variants",
      "Landing pages reviewed for visitors with no prior context",
      "Frequency and creative fatigue read weekly",
      "An incrementality test planned for the largest channel",
    ],
    faqs: [
      {
        q: "How fast can we increase ad spend?",
        a: "There's no universal safe rate. Gradual increases let the platforms adjust and let you read marginal results after each step; very large jumps can reset learning and make the data hard to interpret. Watch marginal acquisition cost, not the account average, after each change.",
      },
      {
        q: "Why does our cost per acquisition rise when we spend more?",
        a: "Because each additional dollar reaches people who are progressively less likely to buy, and the auction for them isn't cheaper. Creative fatigue adds to it. Some rise is normal; the question is whether the marginal customer is still profitable.",
      },
      {
        q: "Should we add new channels or push harder on the ones that work?",
        a: "Push the working channel until its marginal returns clearly flatten, then expand. New channels need their own creative, tracking and learning time, and spreading budget thin across many at once usually means none of them gets enough data to work.",
      },
      {
        q: "How do you measure incrementality?",
        a: "With controlled tests: geographic holdouts, platform lift studies, matched-market comparisons, or planned pauses on channels like branded search. They need enough volume to be readable, so we use them on the biggest spend decisions rather than everywhere.",
      },
      {
        q: "Do you guarantee a return on ad spend?",
        a: "No. Returns depend on your offer, margins, market and competition, most of which nobody outside your business controls. We commit to clear targets, disciplined testing and measurement you can check yourself.",
      },
    ],
    related: {
      services: ["paid-media", "cro", "marketing-analytics"],
      industries: ["ecommerce"],
      solutions: ["lower-acquisition-cost"],
      guides: ["landing-page-optimization"],
      playbooks: ["creative-testing-system"],
      work: ["the-growth-engine"],
    },
  },
  {
    slug: "organic-traffic-drop",
    name: "Organic Traffic Drop",
    metaTitle: "Organic Traffic Drop: How to Diagnose and Recover",
    metaDescription:
      "A structured way to diagnose an organic traffic drop — algorithm updates, technical regressions, tracking changes, seasonality and SERP shifts — then fix it.",
    primaryQuery: "organic traffic drop",
    secondaryQueries: [
      "why did my organic traffic drop",
      "sudden drop in organic traffic",
      "seo traffic decline",
      "google traffic drop recovery",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Use case",
      title: ["Traffic fell.", "Find out why before you fix it."],
      lead:
        "A drop in organic traffic has a small number of possible causes, and each leaves a different fingerprint in the data. We work through them in order until the cause is clear, then fix that cause — not everything at once.",
    },
    situation: {
      heading: "Diagnose first. Most damage comes from fixing the wrong thing.",
      body: [
        "When organic traffic falls, the instinct is to act: rewrite content, change title tags, prune pages, disavow links. Acting before diagnosing usually makes things worse. The changes pile on top of an unknown cause, and it becomes harder to tell what's happening — or whether anything you did helped.",
        "The possible causes are few, and they look different in the data. A tracking change shows up in analytics but not in Search Console. A technical regression tends to hit specific templates or directories from a specific date that lines up with a release. An algorithm update usually coincides with a confirmed update window and affects page types unevenly. Seasonality repeats in the same weeks of previous years. And a change in the search results themselves — more ads, AI-generated answers, new result features — can cut clicks while rankings hold steady.",
        "We work through those possibilities in order, using data you already have, until one explains the pattern. Then we fix that cause and set up the monitoring that would have caught it sooner.",
      ],
    },
    risks: [
      {
        title: "Mistaking a tracking problem for a traffic problem",
        detail:
          "A new consent banner, a changed analytics configuration or a tag lost in a redesign can make traffic appear to fall when visitors haven't gone anywhere. Comparing analytics sessions with Search Console clicks is the first check, not the last.",
      },
      {
        title: "Blaming the algorithm by default",
        detail:
          "It's easy to attribute any decline to a search engine update. If the drop began the day a deploy went out, the deploy is the likelier suspect. Timing that overlaps an update window is a clue, not proof.",
      },
      {
        title: "Reading the site as one number",
        detail:
          "Sitewide totals hide the pattern. One directory can lose most of its traffic while the rest of the site grows. Until the drop is segmented by template, section, query type, device and country, the cause usually stays invisible.",
      },
      {
        title: "Sweeping changes mid-rollout",
        detail:
          "Search engine updates roll out over days or weeks, and rankings move around while they do. Large content or structural changes made during that window muddy the read and can introduce new problems on top of the original one.",
      },
    ],
    plan: [
      {
        title: "Confirm the drop is real",
        detail:
          "Compare analytics sessions with Search Console clicks for the same period. Check for tag, consent, filter or property changes. Compare year over year to rule out seasonality, and split brand from non-brand queries.",
      },
      {
        title: "Locate it",
        detail:
          "Segment Search Console data by page, directory, template, query, device, country and search appearance. Pin down the start date as precisely as possible, and note whether impressions, click-through rate or both declined.",
      },
      {
        title: "Line up the timeline",
        detail:
          "Overlay release notes, CMS and configuration changes, robots.txt and sitemap edits, hosting or CDN changes, and the dates of confirmed search engine updates from Google's public status dashboard. Look for what changed on or just before the start date.",
      },
      {
        title: "Test the hypotheses",
        detail:
          "Crawl affected sections for status codes, noindex tags, canonicals, rendering and internal links; inspect sample URLs in Search Console. Review the current results for lost queries: who ranks now, and which features appeared. For quality-related declines, compare affected pages honestly with what now ranks.",
      },
      {
        title: "Fix, annotate and monitor",
        detail:
          "Fix the specific cause, annotate the change, and track recovery by the affected segment. Add alerts for indexing changes, crawl errors, tag failures and template-level traffic so the next problem is caught in days, not months.",
      },
    ],
    checklist: [
      "Analytics sessions compared with Search Console clicks for the same dates",
      "Year-over-year comparison to rule out seasonality",
      "Brand and non-brand queries split",
      "Drop located by directory, template, device and country",
      "Start date identified as precisely as the data allows",
      "Releases, CMS changes and configuration edits listed for that window",
      "Confirmed search engine update dates checked against the timeline",
      "Robots.txt, noindex, canonicals and status codes checked on affected pages",
      "JavaScript rendering tested on affected templates",
      "Search results for lost queries reviewed for new features, ads or competitors",
      "Internal links into affected sections checked",
      "Alerts set up for indexing, crawl errors and tracking failures",
    ],
    faqs: [
      {
        q: "How do we know if a traffic drop was caused by a Google update?",
        a: "Check whether the start date falls within a confirmed update window, whether the decline follows page types or content quality rather than a template or release, and whether tracking and technical causes have been ruled out. Timing alone isn't proof; sites have unrelated problems during update windows all the time.",
      },
      {
        q: "How long does it take to recover from an organic traffic drop?",
        a: "It depends on the cause. Technical regressions can recover once the fix is recrawled, often within weeks. Declines tied to how search engines assess content quality usually take longer and may not reverse until the site is reassessed. We don't promise a recovery date or a full recovery.",
      },
      {
        q: "Our rankings look stable, but clicks fell. Why?",
        a: "Usually because the results page changed. AI-generated answers, more ads or features that answer the question directly can reduce clicks without changing your position. It can also be a drop in demand for the queries themselves. Click-through rate by query shows which.",
      },
      {
        q: "Should we delete or rewrite content after a drop?",
        a: "Not before diagnosis. If content quality turns out to be the cause, improving or consolidating weak pages can help. Mass deletion based on a guess can remove pages that were never the problem and weaken the ones that remain.",
      },
      {
        q: "Can you help if we're not sure when the drop started?",
        a: "Yes. Search Console keeps around sixteen months of performance data, and analytics history often goes back further. Between them, the start date and affected sections can usually be reconstructed.",
      },
    ],
    related: {
      services: ["seo", "marketing-analytics", "content-marketing"],
      useCases: ["website-migration"],
      guides: ["technical-seo-audit", "website-migration-seo-checklist"],
      playbooks: ["topic-cluster-program"],
    },
  },
  {
    slug: "post-funding-growth",
    name: "Growth After a Funding Round",
    metaTitle: "Marketing After Series A: Build Growth That Repeats",
    metaDescription:
      "What to build in marketing after a funding round — positioning, measurement, channel tests and team shape — so new capital turns into repeatable growth.",
    primaryQuery: "marketing after series a",
    secondaryQueries: [
      "post funding marketing strategy",
      "series a marketing plan",
      "startup marketing after funding",
      "scaling marketing after series a",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Use case",
      title: ["You raised the round.", "Now build what repeats."],
      lead:
        "New capital raises expectations overnight. We help post-funding teams do the foundational work first — positioning, measurement, disciplined channel tests — so spending accelerates what works instead of hiding what doesn't.",
    },
    situation: {
      heading: "Capital changes the question from 'does it work' to 'does it repeat.'",
      body: [
        "A funding round resets expectations for marketing almost immediately. The plan presented to investors assumes a growth rate that the founder-led motion — referrals, the founders' network, early outbound — probably can't deliver on its own. There's pressure to hire quickly, spend quickly and show a pipeline curve that matches the deck.",
        "The teams that use the capital well tend to do a few unglamorous things first. They sharpen positioning so it holds up with buyers who have never heard of the company or met the founders. They build measurement that connects spend to pipeline and revenue before scaling spend. They run structured channel tests to find what's repeatable, rather than committing a year of budget to one bet. And they shape the team around what the tests reveal, instead of hiring a full department on day one.",
        "We work with post-funding teams as a bridge: doing the foundational work, running the first channel tests, and helping define the in-house team that will own the program long term.",
      ],
    },
    risks: [
      {
        title: "Hiring ahead of the strategy",
        detail:
          "A team hired before positioning and channels are clear ends up executing tactics without direction. Senior marketing hires made too early are also among the hardest to unwind, and the cost is measured in quarters, not just salary.",
      },
      {
        title: "Spending faster than you learn",
        detail:
          "Raising budgets across many channels at once makes it impossible to see what's working. Runway goes to noise, and the board review arrives with plenty of activity and no clear answer.",
      },
      {
        title: "Founder messaging that doesn't travel",
        detail:
          "Founders sell with conviction and context. A website, an ad or a new salesperson has to do the same job without them in the room. Messaging that worked in founder-led deals often needs rebuilding for cold audiences.",
      },
      {
        title: "Measuring activity instead of pipeline",
        detail:
          "Traffic, followers and lead counts look good on slides but rarely reconcile with revenue. Without clean CRM stages and source tracking, nobody can say which spend produced customers.",
      },
    ],
    plan: [
      {
        title: "Weeks 1–4: Positioning and baseline",
        detail:
          "Interview recent customers and lost deals, sharpen the category and core message, and audit the website, CRM and analytics. The output is a positioning framework and an honest map of what's measurable today.",
      },
      {
        title: "Weeks 3–8: Measurement foundation",
        detail:
          "Define lifecycle stages with sales, standardize source and campaign tracking, connect marketing data to the CRM, and build reporting leadership will actually trust in board conversations.",
      },
      {
        title: "Weeks 6–16: Structured channel tests",
        detail:
          "Choose a short list of channels suited to the buyer and sales motion. Give each a defined budget, a success threshold and an end date, and read them against pipeline, not clicks.",
      },
      {
        title: "Next quarter: Scale what earned it",
        detail:
          "Put more budget and effort behind the channels that met their thresholds, and turn them into repeatable programs with owners, cadences and documentation. Stop the ones that didn't, and say so clearly.",
      },
      {
        title: "Throughout: Shape the team",
        detail:
          "Use what the tests reveal to define the roles worth hiring. We help write job descriptions, interview candidates and hand over the programs, accounts and documentation as the team grows.",
      },
    ],
    checklist: [
      "Positioning tested with buyers who don't know the founders",
      "Ideal customer profile written down and agreed with sales",
      "CRM lifecycle stages defined and used consistently",
      "Source and campaign tracking standardized across channels",
      "Pipeline and revenue reporting that leadership trusts",
      "Channel tests with budgets, success thresholds and end dates",
      "Website that explains the product clearly without a demo",
      "Sales materials aligned with the new positioning",
      "Hiring plan sequenced behind what the tests show",
      "Board reporting that separates leading indicators from lagging ones",
    ],
    faqs: [
      {
        q: "What should our first marketing hire be after raising?",
        a: "It depends on the constraint. If strategy and positioning are unclear, you need senior judgment first — a head of marketing or a fractional leader. If the strategy is clear and you need output, a hands-on generalist or channel specialist is usually the better first hire.",
      },
      {
        q: "How much of the round should go to marketing?",
        a: "There isn't a universal share. Work backward from the growth targets in the plan, the length of your sales cycle and the acquisition cost your margins can support. Fund tests first, then scale what earns more budget.",
      },
      {
        q: "How quickly should we expect results?",
        a: "Positioning and measurement work shows value within the first weeks. Channel tests usually give directional signal within a quarter. Compounding channels like organic search take longer, which is a reason to start them early rather than skip them.",
      },
      {
        q: "Can you work alongside a new head of marketing?",
        a: "Yes, and it often works well. They own the strategy and the team; we add specialist depth and capacity while they hire, and hand work over as their team takes it on.",
      },
      {
        q: "Is this only relevant for venture-backed companies?",
        a: "No. Any company with new capital to deploy — from investors, a lender or a strong year — faces the same choice between spending quickly and learning first.",
      },
    ],
    related: {
      services: ["branding", "marketing-analytics"],
      industries: ["b2b-saas"],
      solutions: ["go-to-market-strategy"],
      useCases: ["product-launch", "in-house-team-support"],
      compare: ["fractional-cmo-vs-agency"],
      guides: ["how-to-choose-a-marketing-agency"],
    },
  },
  {
    slug: "in-house-team-support",
    name: "Supporting an In-House Team",
    metaTitle: "Marketing Agency to Support Your In-House Team",
    metaDescription:
      "How an agency can extend an in-house marketing team without taking it over — specialist depth, extra capacity and systems work, with ownership kept inside.",
    primaryQuery: "marketing agency to support in-house team",
    secondaryQueries: [
      "agency to support in-house marketing",
      "augment in-house marketing team",
      "marketing team augmentation",
      "hybrid agency in-house model",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Use case",
      title: ["Your team, extended.", "Not replaced."],
      lead:
        "In-house teams hold context no outside partner can match. We add the specialist depth and capacity they don't have — working in their tools, to their priorities, and leaving capability behind.",
    },
    situation: {
      heading: "Your team knows the business. It can't cover every specialty.",
      body: [
        "In-house marketing teams carry knowledge no agency can replicate: the product, the customers, the history of what's been tried and the internal relationships that get things done. What they rarely have is depth in every specialty the plan now demands — technical SEO, paid media at scale, marketing automation, analytics engineering, brand and web design — or the capacity to take on a major project while keeping day-to-day programs running.",
        "The usual answer is hiring, which is slow and hard to justify for skills needed part of the time. The usual alternative, handing a channel to an agency, often creates a parallel team with its own reporting, its own priorities and knowledge that leaves when the contract ends.",
        "We work the other way: inside your team's systems, to your team's roadmap, with the explicit aim of leaving capability behind. Your people keep ownership of strategy and of the relationship with the rest of the business. We bring specialist depth and extra hands.",
      ],
    },
    risks: [
      {
        title: "Two teams, two versions of the truth",
        detail:
          "When an agency reports from its own dashboards, the numbers rarely match internal ones, and meetings turn into reconciliation. Working in your analytics, CRM and project tools removes the argument before it starts.",
      },
      {
        title: "Unclear ownership",
        detail:
          "If it isn't written down who decides, who approves and who is accountable for each workstream, work stalls or gets done twice. Decision rights need agreeing at the start, not when the first disagreement arrives.",
      },
      {
        title: "Knowledge that leaves with the agency",
        detail:
          "Accounts set up under an agency's login, undocumented automations and reports only one person understands all create dependency. Everything we build should be owned by you and documented well enough for your team to run.",
      },
      {
        title: "Working around the internal team",
        detail:
          "When leadership starts routing requests to the agency instead of the team, morale and context both suffer. A good partner makes the internal team stronger and more visible, not smaller.",
      },
    ],
    plan: [
      {
        title: "Map the gaps",
        detail:
          "With your marketing lead, compare what the plan requires with what the team can do today — skills, capacity and systems. Decide what we should cover, what's worth hiring for and what can be dropped.",
      },
      {
        title: "Agree the operating model",
        detail:
          "Set decision rights, approval steps, a shared project board and communication channel, a meeting cadence and a single reporting source. Keep it light enough that it doesn't become its own workload.",
      },
      {
        title: "Embed and deliver",
        detail:
          "Work in your accounts and tools, join the team's planning rhythm, and ship specialist work against your roadmap rather than a separate agency plan.",
      },
      {
        title: "Transfer capability",
        detail:
          "Document every system we build or change, run pairing sessions on the skills you want to keep in-house, and hand over playbooks your team can run without us.",
      },
      {
        title: "Review the scope",
        detail:
          "Each quarter, look at what the team can now do alone and adjust: scale support up for a big project, down as hires land, or hand an area back entirely.",
      },
    ],
    checklist: [
      "Gap map of skills, capacity and systems agreed with the marketing lead",
      "A named owner on your side for every workstream",
      "Decision rights and approval steps written down",
      "All ad accounts, analytics, CRM and creative files owned by your company",
      "Agency working in your tools rather than its own",
      "One reporting source both teams use",
      "Shared project board and communication channel",
      "A documentation standard for anything built or changed",
      "Pairing or training plan for skills you want in-house",
      "Quarterly review of scope against what the team can now do alone",
    ],
    faqs: [
      {
        q: "Will an agency replace our in-house team?",
        a: "It shouldn't, and that's not how we work. Your team owns strategy, priorities and the relationship with the rest of the business. We add the specialist depth and capacity the plan needs, under their direction.",
      },
      {
        q: "What work is best kept in-house, and what's best outsourced?",
        a: "Brand voice, customer knowledge, cross-functional coordination and strategy usually belong in-house. Specialist, project-based or uneven work — migrations, automation builds, technical SEO, paid media at scale, analytics engineering — is where outside support tends to earn its cost.",
      },
      {
        q: "Can you work inside our tools and processes?",
        a: "Yes. We work in your ad accounts, analytics, CRM, project management and chat, and follow your team's planning rhythm rather than asking you to adopt ours.",
      },
      {
        q: "How does an engagement usually start?",
        a: "With a defined project or a single workstream, so both teams can see how the collaboration works before expanding it. From there it can grow into ongoing support or end cleanly with a handover.",
      },
      {
        q: "What if we decide to hire for the role later?",
        a: "That's often the goal. We can help define the role, write the job description, interview candidates and hand over the work, documentation and accounts to the new hire.",
      },
    ],
    related: {
      services: ["paid-media", "marketing-automation", "marketing-analytics"],
      useCases: ["post-funding-growth"],
      compare: ["agency-vs-in-house", "full-service-vs-specialist-agency"],
      alternatives: ["in-house-marketing-team"],
      insights: ["connected-systems"],
    },
  },
];
