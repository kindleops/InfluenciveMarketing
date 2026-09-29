import type { IndustryPage } from "./types";

export const industryPages: IndustryPage[] = [
  {
    slug: "ecommerce",
    name: "Ecommerce",
    metaTitle: "Ecommerce Marketing Agency for DTC & Online Retail",
    metaDescription:
      "Acquisition, retention and site conversion for online retail, run as one system — so paid, organic and email stop competing for credit and start compounding.",
    primaryQuery: "ecommerce marketing agency",
    secondaryQueries: ["dtc marketing agency", "ecommerce growth agency", "online store marketing", "shopify marketing agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Ecommerce",
      title: ["Growth that survives", "the next algorithm change."],
      lead:
        "Online retail lives on thin margins and fast feedback. We build the system underneath — acquisition, the store itself, and the customer relationship after the first order — so growth doesn't depend on one channel behaving.",
    },
    context: {
      heading: "The economics moved. Most playbooks didn't.",
      body: [
        "Paid social used to carry most direct-to-consumer brands on its own. Signal loss from privacy changes, rising competition in auctions and creative that fatigues in weeks have made that a fragile strategy. Brands that grew on one channel now find their acquisition cost set by forces they don't control.",
        "What holds up is a mix: paid acquisition that is measured on contribution margin rather than platform-reported return, organic and search demand that doesn't need to be bought every day, a store that converts the traffic it gets, and lifecycle marketing that turns first orders into second ones.",
        "None of those pieces is new. The difference is designing them to feed each other — creative learnings informing the site, search data informing the product catalog, retention data informing who to acquire.",
      ],
    },
    challenges: [
      {
        title: "Acquisition cost set by the auction",
        detail:
          "When one paid channel drives most new customers, every rise in auction pressure goes straight to the P&L. Diversifying demand sources is a margin decision, not a marketing one.",
      },
      {
        title: "Platform-reported return that doesn't reconcile",
        detail:
          "Each ad platform claims credit for the same orders. Budget decisions made on those numbers over-fund the channels best at claiming, not the ones creating demand.",
      },
      {
        title: "A store that leaks at the product page",
        detail:
          "Slow templates, unclear shipping and returns, weak product imagery on mobile — small frictions that quietly tax every channel sending traffic.",
      },
      {
        title: "Customers who buy once",
        detail:
          "Without a deliberate post-purchase journey, repeat purchase is left to chance, and the business keeps paying to acquire the same kind of customer again.",
      },
    ],
    channels: [
      { channel: "Paid social", role: "Demand creation and new-customer acquisition, driven by a steady creative testing cadence." },
      { channel: "Paid search & shopping", role: "Capturing existing demand; separating branded from non-branded so incrementality is visible." },
      { channel: "Organic search", role: "Category and collection pages plus buying guides that earn demand without a daily bid." },
      { channel: "Email & SMS", role: "Welcome, browse and cart recovery, post-purchase and win-back flows that lift lifetime value." },
      { channel: "The store", role: "Product pages, collections and checkout treated as a channel with its own roadmap and tests." },
    ],
    metrics: [
      { title: "Contribution margin per order", detail: "Revenue after product cost, shipping, discounts and acquisition — the number that says whether growth is healthy." },
      { title: "New-customer acquisition cost", detail: "Measured blended across channels, not per platform, so it reflects what a new customer really costs." },
      { title: "Repeat purchase rate", detail: "The share of customers who order again within a set window — the clearest read on retention work." },
      { title: "Conversion rate by entry path", detail: "Landing, product and collection pages compared by traffic source, so site fixes target where they matter." },
    ],
    firstNinetyDays: [
      { title: "Weeks 1–3: Measurement you can trust", detail: "Reconcile store, analytics and ad-platform data; set up a blended view of acquisition cost and margin by channel." },
      { title: "Weeks 3–6: Fix the leaks", detail: "Audit product and collection templates on mobile, shipping and returns clarity, site speed and checkout, and ship the highest-impact fixes." },
      { title: "Weeks 5–10: Rebuild the testing engine", detail: "A structured creative testing system for paid social and a clean branded/non-branded split in search." },
      { title: "Weeks 8–13: Retention foundations", detail: "Welcome, post-purchase and win-back flows designed around what customers actually do after the first order." },
    ],
    faqs: [
      {
        q: "Do you work on Shopify?",
        a: "Yes — Shopify and Shopify Plus are the most common platforms we see, and we also work with headless builds and other commerce platforms. The strategy doesn't change with the platform; the implementation does.",
      },
      {
        q: "Can you take over our paid media from another agency?",
        a: "Yes. We start with an account and measurement audit so the handover doesn't reset learning, then restructure in stages rather than all at once.",
      },
      {
        q: "How do you measure whether paid media is actually working?",
        a: "We look past platform-reported return to blended new-customer acquisition cost and contribution margin, and use holdouts or geo tests where spend is large enough to make them meaningful.",
      },
      {
        q: "Do we need all of these channels at once?",
        a: "No. Most brands have one or two constraints that matter far more than the rest. The first weeks are about finding those and fixing them first.",
      },
    ],
    related: {
      services: ["paid-media", "cro", "email-marketing", "seo"],
      solutions: ["lower-acquisition-cost", "marketing-attribution"],
      useCases: ["scaling-paid-media"],
      guides: ["landing-page-optimization", "marketing-attribution-models"],
      playbooks: ["creative-testing-system"],
      work: ["the-growth-engine"],
    },
  },
  {
    slug: "b2b-saas",
    name: "B2B SaaS",
    metaTitle: "B2B SaaS Marketing Agency for Pipeline, Not MQLs",
    metaDescription:
      "Marketing for B2B software companies measured on qualified pipeline and revenue — built for long sales cycles, product-led trials and sales-led demos alike.",
    primaryQuery: "b2b saas marketing agency",
    secondaryQueries: ["saas marketing agency", "b2b saas growth agency", "saas demand generation agency", "product-led growth agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "B2B SaaS",
      title: ["Pipeline you can trace.", "Not leads you have to explain."],
      lead:
        "Software buyers research quietly, decide in groups and take their time. We build marketing that follows that reality — positioning that makes the choice obvious, programs aimed at accounts that can buy, and measurement that runs all the way to closed-won.",
    },
    context: {
      heading: "Long cycles punish short-term measurement.",
      body: [
        "A B2B software purchase rarely happens in one visit. A champion finds you, a buying group forms, security and procurement get involved, and months can pass between the first touch and a signed contract. Marketing measured on what happens this month — form fills, MQLs, cost per lead — ends up optimizing for the part of the journey that is easiest to count and least connected to revenue.",
        "The motion matters as much as the cycle. In a product-led company, the website's job is to get the right people into a trial or free plan, and the product's job is to convert them; marketing's work continues inside onboarding. In a sales-led company, the job is to start conversations with accounts that fit and give sales context about what those accounts have already seen. Many companies run both, and the handoff between them is where pipeline most often leaks.",
        "We build for the motion you actually run: positioning that makes the category and the buyer obvious, content and search that meet buyers during research, paid programs aimed at accounts that can buy, and reporting that follows an opportunity from first touch to revenue in the CRM.",
      ],
    },
    challenges: [
      {
        title: "MQL volume that sales doesn't trust",
        detail:
          "When the target is a lead count, the easiest leads get produced — ebook downloads, webinar sign-ups, students and competitors. Sales stops following up, and the two teams argue about definitions instead of revenue.",
      },
      {
        title: "Trials that never reach the first real outcome",
        detail:
          "Sign-ups are cheap to generate and expensive to waste. If new users hit an empty state, a setup wall or an integration they can't finish alone, conversion to paid is decided before sales or lifecycle email gets a chance.",
      },
      {
        title: "Demo requests that go cold in the queue",
        detail:
          "Buyers who ask for a demo are comparing options. Slow routing, a generic booking form and a discovery call that repeats what they already typed in quietly move them to the next vendor on the list.",
      },
      {
        title: "Positioning that sounds like every other tool",
        detail:
          "Feature-led messaging in a crowded category gives buyers no reason to choose. Without a sharp view of who the product is for and what it replaces, paid and organic both work harder for less.",
      },
    ],
    channels: [
      { channel: "Organic search & content", role: "Problem-aware, comparison and integration content that meets buyers while they research — before they fill in a form." },
      { channel: "Paid search", role: "High-intent category and alternative queries, with bidding tied to opportunity value in the CRM rather than raw form fills." },
      { channel: "LinkedIn & account-based paid", role: "Reaching defined buying committees at target accounts, judged on account engagement and opportunities created." },
      { channel: "Website & onboarding", role: "Pricing, demo and sign-up paths treated as conversion surfaces, and the first in-product sessions designed with the product team." },
      { channel: "Lifecycle email & in-app", role: "Trial nurture triggered by product behavior, and expansion messaging for accounts that already pay." },
    ],
    metrics: [
      { title: "Qualified pipeline created", detail: "Opportunities sales has accepted, valued in the CRM and traced to source — the number marketing should be held to." },
      { title: "Trial-to-paid and demo-to-opportunity rates", detail: "Conversion at the two moments where the motion works or doesn't, broken out by source and segment." },
      { title: "Win rate and cycle length by source", detail: "Whether the pipeline marketing creates actually closes, and how fast, compared with other sources." },
      { title: "Acquisition payback", detail: "How long gross margin from a new customer takes to repay what it cost to win them — the check on whether growth is efficient." },
    ],
    firstNinetyDays: [
      { title: "Weeks 1–3: Connect marketing to the CRM", detail: "Audit lifecycle stages, routing, source fields and opportunity attribution in HubSpot or Salesforce, so pipeline can be traced to the programs that created it." },
      { title: "Weeks 3–6: Sharpen positioning and core pages", detail: "Clarify who the product is for and what it replaces, then rework the homepage, pricing, demo and sign-up paths around that message." },
      { title: "Weeks 5–10: Rebuild paid and search around intent", detail: "Restructure paid search around high-intent queries, set up account-based targeting for the ideal customer profile and publish the first research-stage content cluster." },
      { title: "Weeks 8–13: Close the trial and demo gaps", detail: "Map where trial users stall and where demo requests lose momentum, then ship onboarding prompts, lifecycle emails and routing fixes for the biggest drop-offs." },
    ],
    faqs: [
      {
        q: "Do you work with product-led or sales-led companies?",
        a: "Both, and the hybrids in between. We start from how revenue happens today — self-serve sign-ups, sales-assisted trials, enterprise deals — and build marketing that feeds that motion instead of forcing a new one.",
      },
      {
        q: "Will you still report on MQLs?",
        a: "We'll track them as a leading indicator if your team finds them useful, but we don't set goals on them. The targets we agree on are sales-accepted opportunities, pipeline value and, over time, revenue — numbers marketing and sales both recognize.",
      },
      {
        q: "How do you handle attribution with a long sales cycle?",
        a: "We combine CRM source tracking, self-reported attribution on key forms and account-level engagement, then read patterns across quarters rather than crediting a single click. No model is perfect in B2B; the aim is decisions that hold up.",
      },
      {
        q: "Do you work inside our CRM?",
        a: "Yes — most often HubSpot or Salesforce. We work with your RevOps or sales ops team on stages, routing and fields, because marketing measurement is only as good as the CRM data underneath it.",
      },
      {
        q: "Is there such a thing as too early for this?",
        a: "Yes. If you haven't found a repeatable way to win customers, heavy acquisition spend tends to amplify the confusion. At that stage we focus on positioning, a website that explains the product clearly and small, controlled channel tests.",
      },
    ],
    related: {
      services: ["seo", "paid-media", "content-marketing", "marketing-analytics"],
      solutions: ["lead-generation", "marketing-attribution", "go-to-market-strategy"],
      useCases: ["post-funding-growth"],
      guides: ["marketing-attribution-models"],
      playbooks: ["speed-to-lead"],
      work: ["the-product-surface"], research: ["why-saas-homepages-lose-the-sale"] },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    metaTitle: "Healthcare Marketing Agency for Practices & Clinics",
    metaDescription:
      "Patient acquisition for practices, clinics and health services — local search, reviews and paid media, with tracking designed around HIPAA limits on ad data.",
    primaryQuery: "healthcare marketing agency",
    secondaryQueries: ["medical practice marketing", "healthcare digital marketing agency", "patient acquisition marketing", "clinic marketing agency"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Healthcare",
      title: ["More patients, found locally.", "Without leaking their data."],
      lead:
        "Practices, clinics and health services compete on trust and proximity. We build patient acquisition around local search, reviews and a website that makes booking easy — with tracking and ad setups designed around what privacy rules allow.",
    },
    context: {
      heading: "Patient acquisition runs through search, maps and trust.",
      body: [
        "Most people choosing a provider start with a search that includes a place — a service or symptom plus a neighborhood, or simply “near me.” What they see first is a map listing, a star rating and a handful of reviews. Practices that win this moment usually do it with an accurate Google Business Profile, a steady flow of genuine reviews and location pages that answer basic questions, rather than with bigger ad budgets.",
        "The complication is data. Under HIPAA, information that links a person to a health condition, a provider or an appointment can be protected health information, and standard tracking pixels, session recordings and ad-platform conversion tags can pass exactly that kind of information to third parties. Regulators have issued guidance on tracking technologies and the rules continue to be tested, so this is an area to settle with your privacy officer or counsel rather than assume. The ad platforms add their own limits on health-related targeting and on certain services.",
        "So the work has two halves: make the practice easy to find, choose and book, and measure that without exposing patient information. That means deciding what is tracked, where and through which tools before a campaign launches — with your compliance team in the loop from the start.",
      ],
    },
    challenges: [
      {
        title: "Tracking that sends more than it should",
        detail:
          "Default pixel and analytics setups can capture page URLs, form fields and appointment details that reveal a condition. Designing for this up front — server-side tagging, stripped parameters, vendors willing to sign a business associate agreement — is far easier than fixing it after launch.",
      },
      {
        title: "Local listings that drift out of date",
        detail:
          "Wrong hours, departed providers, duplicate locations and poorly chosen categories send patients elsewhere and weaken visibility in map results.",
      },
      {
        title: "Reviews left to chance",
        detail:
          "Satisfied patients rarely review unprompted. Without a consistent request process — and replies that never confirm someone is a patient — ratings end up reflecting the few who were unhappy.",
      },
      {
        title: "A booking path that stalls",
        detail:
          "Phone-only scheduling, unanswered calls after hours and intake forms that demand everything up front turn real interest into lost patients before anyone at the front desk knows they called.",
      },
    ],
    channels: [
      { channel: "Google Business Profile & local search", role: "Complete, accurate profiles for every location and provider, with categories, services and photos maintained as ongoing work." },
      { channel: "Organic search", role: "Service, condition and location pages written for patients and reviewed by clinicians, so they are accurate as well as findable." },
      { channel: "Paid search", role: "Capturing high-intent service searches within Google's healthcare ad policies, with conversion tracking built around privacy limits." },
      { channel: "Reviews & reputation", role: "A request step built into the patient journey and a response policy that protects patient privacy." },
      { channel: "Website & booking", role: "Clear services, insurance and location information, and an online booking or request flow that works on a phone." },
    ],
    metrics: [
      { title: "New patient appointments by service line", detail: "Booked appointments, not form fills, broken out by the services the practice most wants to grow." },
      { title: "Cost per new patient", detail: "Marketing spend divided by new patients actually seen — taken from scheduling data rather than ad platforms." },
      { title: "Call answer and booking rate", detail: "How many calls from marketing get answered and become appointments; often the quickest improvement available." },
      { title: "Local visibility and review flow", detail: "Map-result presence for priority searches at each location, and the steady rate of new reviews over time." },
    ],
    firstNinetyDays: [
      { title: "Weeks 1–3: Privacy and tracking review", detail: "Inventory every pixel, tag, form and third-party script, flag what could expose protected information, and agree a measurement plan with your compliance team." },
      { title: "Weeks 2–6: Local foundations", detail: "Clean up Business Profiles and directory listings for every location and provider, and put a review request and reply process in place." },
      { title: "Weeks 5–10: Pages that answer patient questions", detail: "Rebuild service and location pages around what patients actually search, with clinical review before anything is published." },
      { title: "Weeks 8–13: Paid search and the booking path", detail: "Launch or restructure search campaigns within platform health policies, and fix the call handling and online booking steps where patients drop off." },
    ],
    faqs: [
      {
        q: "Can you make our website tracking HIPAA compliant?",
        a: "We design and implement measurement that avoids sending protected health information to tools that aren't permitted to receive it, and we favor vendors that will sign a business associate agreement where one is needed. Whether the setup is compliant is a determination for your privacy officer or counsel; we build to their requirements and document everything so they can review it.",
      },
      {
        q: "Can we advertise healthcare services on Google and Meta?",
        a: "Generally yes, within limits. Both platforms restrict targeting based on health conditions, and some services — prescription drugs and addiction treatment, for example — require extra certification or are restricted. We check the current policies for your specific services before planning campaigns.",
      },
      {
        q: "Do you write medical content?",
        a: "We write patient-facing content, but clinical accuracy has to come from your clinicians. Every page describing a condition, treatment or outcome goes through their review before it's published, and we avoid promises about results.",
      },
      {
        q: "How do we get more reviews without breaking rules?",
        a: "Ask every patient consistently, through a channel that doesn't reveal their condition, and don't offer incentives. When replying, never confirm the reviewer is a patient or discuss their care — one of the most common and avoidable mistakes in healthcare marketing.",
      },
      {
        q: "Do you work with multi-location groups?",
        a: "Yes. Multi-location practices need location-level profiles, pages and reporting, with shared brand standards and central control of tracking. We structure the work so each location can be managed without duplicating effort.",
      },
    ],
    related: {
      services: ["seo", "paid-media", "web-design", "marketing-analytics"],
      industries: ["home-services"],
      solutions: ["lead-generation", "marketing-attribution"],
      guides: ["landing-page-optimization"],
      playbooks: ["speed-to-lead"],
    },
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    metaTitle: "Professional Services Marketing for Law & Advisory Firms",
    metaDescription:
      "Marketing for law, accounting, consulting and advisory firms — expertise-led content, partner visibility and referral pipelines that bring in the right work.",
    primaryQuery: "professional services marketing agency",
    secondaryQueries: ["law firm marketing agency", "accounting firm marketing", "consulting firm marketing agency", "b2b professional services marketing"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Professional Services",
      title: ["Expertise is the product.", "Make it visible."],
      lead:
        "Law, accounting, consulting and advisory firms sell judgment, and clients choose people they already trust. We build marketing that makes your partners' expertise findable, credible and easy to refer — and points it at the work you actually want.",
    },
    context: {
      heading: "Referrals win the work. Visibility decides who gets referred.",
      body: [
        "Most professional services firms grow through relationships: a past client, a peer at another firm, a banker or in-house counsel who says “talk to them.” That doesn't make marketing irrelevant — it changes its job. The person who was referred still searches the firm's name, reads the partner's profile and looks for evidence that the firm has handled problems like theirs. If what they find is thin or generic, the referral cools.",
        "The second job is reaching clients before a referral happens. People looking for specialist advice search for their problem, not a firm name — a regulation, a transaction type, a dispute, a tax question. Firms that publish clear, practical thinking on those problems get found by people who don't know them yet, and give referrers something worth forwarding.",
        "Both depend on getting expertise out of busy partners without taking billable time they don't have. And in regulated professions, advertising has its own rules: bar associations, accounting bodies and other regulators set standards on claims, testimonials and solicitation that vary by jurisdiction. We plan with those rules in view and recommend that your ethics or compliance contact reviews what goes out.",
      ],
    },
    challenges: [
      {
        title: "Partners who are invisible online",
        detail:
          "Profiles list credentials but say nothing about the matters a partner handles or how they think. Clients compare people, and a sparse bio loses to a specific one.",
      },
      {
        title: "Thought leadership nobody has time to write",
        detail:
          "Content stalls after an early burst because it depends on partners drafting articles. Without an editorial process built around short interviews, output stops whenever billable work picks up.",
      },
      {
        title: "Referral sources that go quiet unnoticed",
        detail:
          "Most firms can't say which relationships send work or how often. Without regular, useful contact those relationships fade, and nobody notices until the pipeline thins.",
      },
      {
        title: "A website organized around the firm, not the client",
        detail:
          "Navigation by practice group and office makes sense internally. Clients arrive with a problem and need to find the people and experience that match it quickly.",
      },
    ],
    channels: [
      { channel: "Partner & practice pages", role: "Profiles and practice pages rewritten around the matters, industries and questions each team handles." },
      { channel: "Expertise-led content", role: "Articles, briefings and guides on the specific problems clients search for, drafted from partner interviews and approved by them." },
      { channel: "Organic search", role: "Practice-area and issue pages structured so the firm is found for the problems it wants to be known for." },
      { channel: "Email & referral nurture", role: "Useful updates for clients and referrers — regulatory changes, market notes — sent on a steady cadence." },
      { channel: "LinkedIn", role: "Partner-led publishing plus targeted paid distribution to decision-makers in the sectors the firm serves." },
    ],
    metrics: [
      { title: "Qualified inquiries by practice area", detail: "New matter or engagement conversations tagged by source and practice, so effort follows the work the firm wants." },
      { title: "Referral source activity", detail: "Which relationships send work, how often and what kind — the pipeline most firms never measure." },
      { title: "Inquiries from profiles and published thinking", detail: "Contact that starts on a partner profile or an article, showing which people and topics draw clients in." },
      { title: "Search visibility for priority issues", detail: "Presence for the problems and matter types the firm has chosen to be known for." },
    ],
    firstNinetyDays: [
      { title: "Weeks 1–3: Choose what to be known for", detail: "Agree the practices, sectors and matter types to prioritize, and review the advertising rules that apply in the firm's jurisdictions with its ethics or compliance contact." },
      { title: "Weeks 3–7: Rebuild partner and practice pages", detail: "Interview partners, rewrite profiles and practice pages around client problems, and fix site structure so they're easy to reach." },
      { title: "Weeks 6–10: Start the editorial engine", detail: "Set up an interview-led process that turns short partner conversations into articles and briefings, and publish the first set." },
      { title: "Weeks 8–13: Track and nurture referrals", detail: "Capture referral sources in the CRM, launch a regular update for clients and referrers, and report inquiries by source." },
    ],
    faqs: [
      {
        q: "Does marketing matter for a firm that grows by referral?",
        a: "Yes — it makes referrals convert more often and arrive more often. Referred clients check the firm and partner online before they call, and referrers pass on names more readily when they have something useful to forward.",
      },
      {
        q: "How much partner time does this take?",
        a: "Less than most firms expect. We rely on short, structured interviews rather than asking partners to write, and they review drafts instead of creating them. The commitment is steady, not heavy.",
      },
      {
        q: "Do you know the advertising rules for lawyers and accountants?",
        a: "We plan with the common restrictions in mind — around claims of specialization, testimonials, comparisons and solicitation. But the rules differ by jurisdiction and professional body and they change, so we recommend your ethics or compliance contact reviews campaigns and content, and we build that review into the workflow.",
      },
      {
        q: "Should our partners be active on LinkedIn?",
        a: "For most firms, yes, because clients follow people more than firms. We help partners publish a small amount consistently, drawing on the firm's own content so it doesn't become a second job.",
      },
      {
        q: "Do you work with smaller firms?",
        a: "Yes. The principles are the same; the scope is narrower. A smaller firm usually gets the most from sharp partner profiles, a focused set of practice pages and a simple referral nurture before anything else.",
      },
    ],
    related: {
      services: ["content-marketing", "seo", "branding", "web-design", "email-marketing"],
      solutions: ["lead-generation", "rebrand", "website-redesign"],
      compare: ["fractional-cmo-vs-agency"],
      guides: ["how-to-choose-a-marketing-agency"],
      playbooks: ["topic-cluster-program"], research: ["paid-search-economics-high-ticket-services"] },
  },
  {
    slug: "home-services",
    name: "Home Services",
    metaTitle: "Home Services Marketing Agency for Trades & Local Pros",
    metaDescription:
      "Local SEO, Google Business Profile, Local Services Ads and call tracking for trades and home services — built to win the job before a competitor calls back.",
    primaryQuery: "home services marketing agency",
    secondaryQueries: ["home service marketing", "contractor marketing agency", "hvac marketing agency", "plumbing marketing agency", "local services ads management"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Home Services",
      title: ["Win the call.", "Then win the job."],
      lead:
        "For trades and residential services, homeowners usually hire whoever shows up first and answers fastest. We build the local visibility, the call tracking and the response process that decide both.",
    },
    context: {
      heading: "Most jobs are decided in the first few minutes.",
      body: [
        "When a water heater fails or the air conditioning stops, the homeowner searches, scans the map results and calls two or three businesses. The ones that answer, give a clear next step and turn up when promised get the job. Marketing that stops at the click misses where the money is actually won or lost.",
        "Local visibility is its own discipline. Map rankings lean heavily on the Google Business Profile — primary category, services, service area, reviews, photos and how actively it's maintained — alongside service and area pages on the website. For many trades, Local Services Ads sit above everything else in the results, charge per lead rather than per click, require Google's background and license screening, and reward businesses that respond quickly and dispute invalid leads.",
        "Then there is the calendar. Demand swings with weather and season — heating in winter, cooling and roofing in summer, gutters in the fall. A good plan shifts budget and messaging ahead of those swings, and uses slower months to sell maintenance plans, replacements and planned projects.",
      ],
    },
    challenges: [
      {
        title: "Calls that go unanswered or untracked",
        detail:
          "Missed calls during jobs and after hours are lost revenue, and without call tracking nobody knows which ad, listing or page produced the calls that actually booked.",
      },
      {
        title: "A Business Profile set up once and forgotten",
        detail:
          "The wrong primary category, missing services, stale photos and slow review replies all weaken map visibility — often more than anything on the website.",
      },
      {
        title: "Paying for leads that were never real",
        detail:
          "Shared lead marketplaces and loosely built campaigns bring in wrong-area, wrong-service and duplicate inquiries. Unless someone filters and disputes them, cost per job climbs quietly.",
      },
      {
        title: "Seasonality handled by panic",
        detail:
          "Budgets that stay flat through a slow season and scramble in a busy one waste money at both ends and leave crews either idle or overbooked.",
      },
    ],
    channels: [
      { channel: "Google Business Profile", role: "Categories, services, service areas, photos, posts and review replies managed every week, for every location." },
      { channel: "Local Services Ads", role: "Setup and screening, service and area selection, lead disputes and budget pacing, with response time watched closely." },
      { channel: "Paid search", role: "Service-plus-area campaigns for emergency and high-value work, scheduled around business hours and crew capacity." },
      { channel: "Local SEO & service pages", role: "A page for each core service and the areas served, with real project photos and plain answers to common cost and timing questions." },
      { channel: "Call tracking & follow-up", role: "Tracking numbers by source, call recording where permitted and disclosed, and text or email follow-up on missed calls and open estimates." },
      { channel: "Reviews", role: "A request sent after every completed job, with prompt, specific replies that future customers will read." },
    ],
    metrics: [
      { title: "Booked jobs by source", detail: "Calls and forms that became scheduled work, traced back to the listing, ad or page that produced them." },
      { title: "Cost per booked job", detail: "Spend divided by jobs actually scheduled — far more useful than cost per lead when lead quality varies this much." },
      { title: "Speed to lead and answer rate", detail: "How quickly calls and web inquiries reach a live person, and how many are missed entirely." },
      { title: "Map visibility by service area", detail: "Where the business appears in local results for priority services across the neighborhoods and towns it covers." },
    ],
    firstNinetyDays: [
      { title: "Weeks 1–2: Track every call", detail: "Install call tracking by source, connect it to the scheduling system or CRM, and listen to a sample of calls to hear where jobs are lost." },
      { title: "Weeks 2–5: Fix the profile and listings", detail: "Correct categories, services and service areas, clean up directory listings, add real photos and start a review request after every job." },
      { title: "Weeks 4–9: Rebuild paid around booked jobs", detail: "Restructure Local Services Ads and search campaigns by service and area, schedule them around capacity and start disputing invalid leads." },
      { title: "Weeks 8–13: Response speed and the season ahead", detail: "Set response targets, add missed-call text-back and estimate follow-up, and plan budget and messaging for the next seasonal shift." },
    ],
    faqs: [
      {
        q: "Should we run Local Services Ads or regular Google Ads?",
        a: "Often both. Local Services Ads appear at the top for many trades and charge per lead, while search ads give more control over services, keywords and scheduling. We set the split from the jobs each actually books, not the leads each reports.",
      },
      {
        q: "How long does local SEO take to work?",
        a: "Profile and listing fixes can affect map visibility within weeks. Ranking in more competitive markets or across a wide service area takes months of steady reviews, content and profile activity. We don't guarantee positions — map results also depend on where the searcher is standing.",
      },
      {
        q: "Why does speed to lead matter so much?",
        a: "Homeowners with an urgent problem call several businesses and book the first one that gives them a clear answer and a time. A slow callback often means the job is already gone, however good the ad was.",
      },
      {
        q: "What can marketing do in the slow season?",
        a: "Quieter months are the time to promote maintenance plans, replacements and projects with longer lead times, to build reviews and content, and to prepare campaigns so the busy season starts at full speed.",
      },
      {
        q: "Do you work with multi-location or franchise businesses?",
        a: "Yes. Each location needs its own profile, pages and tracking, with central control over brand, budgets and reporting so locations can be compared fairly.",
      },
    ],
    related: {
      services: ["seo", "paid-media", "marketing-automation", "marketing-analytics"],
      industries: ["healthcare"],
      solutions: ["lead-generation", "lower-acquisition-cost"],
      guides: ["landing-page-optimization"],
      playbooks: ["speed-to-lead"], research: ["paid-search-economics-high-ticket-services"] },
  },
  {
    slug: "fintech",
    name: "Fintech",
    metaTitle: "Fintech Marketing Agency for Trust, Growth & Activation",
    metaDescription:
      "Fintech marketing that earns trust and moves users through onboarding — with copy built for compliance review and paid media planned around financial ad rules.",
    primaryQuery: "fintech marketing agency",
    secondaryQueries: ["financial services marketing agency", "fintech growth agency", "fintech digital marketing", "banking app marketing"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Fintech",
      title: ["Growth that clears compliance.", "And earns the second login."],
      lead:
        "People hand a fintech their money, their data and often their identity documents. We build marketing that earns that trust, holds up in compliance review and carries new users past onboarding into real use.",
    },
    context: {
      heading: "In fintech, trust is the conversion rate.",
      body: [
        "A fintech product asks more of a new user than almost any other category: link a bank account, verify identity, move money, allow a credit check. Every step is a point where a hesitant person leaves. The marketing that works lowers that hesitation — plain explanations of how the product works, who it partners with or is regulated by, what it costs and how money is protected — rather than adding louder claims.",
        "The claims themselves are regulated. Depending on the product and the market, rules on financial promotions, lending and credit advertising, deposit insurance statements, investment performance and fair lending can all apply. The ad platforms add their own layer: Google requires financial services verification in many countries, and Meta treats credit and other financial products as a special ad category with limited targeting. Copy, landing pages and app store listings need compliance review built into the workflow, not bolted on at the end.",
        "Acquisition is also only half the funnel. Many sign-ups never finish verification or fund an account. The companies that grow efficiently treat onboarding and activation as marketing problems too, and judge acquisition by who becomes an active user rather than who downloads the app.",
      ],
    },
    challenges: [
      {
        title: "Copy that stalls in compliance review",
        detail:
          "When marketing writes first and compliance edits last, launches slip and messages get diluted. An approved claims library and review built into the brief keep both speed and accuracy.",
      },
      {
        title: "Ad accounts held back by financial policies",
        detail:
          "Unverified advertisers, disapproved ads and restricted targeting can stop campaigns without warning. Planning around platform verification and special ad category rules avoids the surprise.",
      },
      {
        title: "Sign-ups that never activate",
        detail:
          "Identity checks, bank linking and first funding each lose people. If acquisition is measured on installs or sign-ups, spend drifts toward sources that produce users who never transact.",
      },
      {
        title: "A brand that hasn't earned trust yet",
        detail:
          "Newer companies compete with institutions people have used for decades. Without visible security, clear fees and a plain answer to “where is my money held,” even strong offers underperform.",
      },
    ],
    channels: [
      { channel: "Paid search & paid social", role: "Acquisition within each platform's financial-services rules, optimized toward activated users rather than installs." },
      { channel: "Website & app store listings", role: "Product, pricing and security pages written plainly, disclosures handled cleanly, and landing pages matched to each campaign." },
      { channel: "Organic search & content", role: "Educational content on the money questions your users search, reviewed for accuracy and compliance before publishing." },
      { channel: "Onboarding & lifecycle messaging", role: "Email, push and in-app prompts that help users through verification, linking and first use, triggered by what they have or haven't done." },
      { channel: "Referral programs", role: "Invitations with clear, reviewed terms, for products that users are genuinely willing to recommend." },
    ],
    metrics: [
      { title: "Cost per activated user", detail: "Acquisition spend divided by users who finish onboarding and take a meaningful first action, such as funding an account." },
      { title: "Onboarding completion by step", detail: "Where people drop between sign-up, verification, linking and funding — split by source, so channels are judged on quality." },
      { title: "Early retention", detail: "The share of activated users still active after a set period, which shows whether acquisition brings in the right people." },
      { title: "Compliance review cycle time", detail: "How long copy and creative take to clear review — a practical limit on how fast marketing can test and learn." },
    ],
    firstNinetyDays: [
      { title: "Weeks 1–3: Measurement past the sign-up", detail: "Connect ad platforms, analytics and product events so acquisition is judged on activation, while keeping sensitive financial data out of third-party tools." },
      { title: "Weeks 2–6: A compliance-ready workflow", detail: "Work with your compliance team on a library of approved claims and disclosures, and a review process sized to the testing pace you need." },
      { title: "Weeks 5–10: Fix onboarding friction", detail: "Map each onboarding step, find where and why users drop, and ship copy, sequencing and lifecycle changes with the product team." },
      { title: "Weeks 8–13: Rebuild acquisition on quality", detail: "Shift paid and content programs toward sources that produce activated users, and confirm platform verification and ad category settings." },
    ],
    faqs: [
      {
        q: "Do you handle compliance approval?",
        a: "No — sign-off belongs to your compliance or legal team, and it should. We write with the rules in mind, maintain a record of approved claims and disclosures, and build review into the schedule so it doesn't become the bottleneck.",
      },
      {
        q: "Can we advertise financial products on Google and Meta?",
        a: "Usually, with conditions. Google requires financial services verification in many countries, Meta applies special ad category restrictions to credit and other financial products, and both limit or prohibit some products outright. We check the current policies for your products and markets before planning campaigns.",
      },
      {
        q: "How do you measure fintech acquisition?",
        a: "On users who activate — completing verification and taking a first meaningful action — rather than installs or sign-ups. Where privacy and data rules allow, we send activation events back to ad platforms so they optimize for quality rather than volume.",
      },
      {
        q: "Do you work with B2B fintech as well as consumer?",
        a: "Yes. B2B fintech — payments infrastructure, finance software, embedded products — sells more like B2B SaaS, with longer cycles and technical buyers, but the same care with regulated claims and trust applies.",
      },
      {
        q: "How does a newer brand build trust?",
        a: "By being specific. Explain how the product works, who holds customer funds, what it costs and how accounts are protected, in plain language on the pages people check before signing up. Verifiable detail does more than broad reassurance.",
      },
    ],
    related: {
      services: ["paid-media", "branding", "cro", "marketing-automation", "marketing-analytics"],
      industries: ["b2b-saas"],
      solutions: ["lower-acquisition-cost", "go-to-market-strategy"],
      useCases: ["product-launch", "post-funding-growth"],
      guides: ["landing-page-optimization"],
    },
  },
];
