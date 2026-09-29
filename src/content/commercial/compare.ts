import type { ComparePage } from "./types";

export const comparePages: ComparePage[] = [
  {
    slug: "seo-vs-ppc",
    name: "SEO vs. PPC",
    metaTitle: "SEO vs. PPC: Which Should You Invest In First?",
    metaDescription:
      "How SEO and pay-per-click compare on speed, cost, control and durability — and how to decide which to fund first, or how to run both without wasting budget.",
    primaryQuery: "seo vs ppc",
    secondaryQueries: ["seo or ppc", "seo vs paid search", "organic vs paid search", "should i invest in seo or ppc"],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Compare",
      title: ["SEO vs. PPC.", "Speed or compounding."],
      lead:
        "Paid search buys attention today. Organic search earns it over time. The right mix depends on how fast you need results, how much your market searches, and how long you can wait for a return.",
    },
    options: [
      {
        name: "SEO",
        summary:
          "Earning unpaid visibility in search results through technical quality, content and authority. Slow to start, cheap per visit once it works, and durable.",
      },
      {
        name: "PPC",
        summary:
          "Paying for placement in search results, usually per click. Fast, precise and fully controllable — and it stops the moment you stop paying.",
      },
    ],
    criteria: [
      { criterion: "Time to first results", a: "Months for new content; weeks for technical fixes on an established site", b: "Days, once campaigns and tracking are set up" },
      { criterion: "Cost structure", a: "Mostly fixed: people, content and development", b: "Mostly variable: you pay for every click, plus management" },
      { criterion: "What happens when you stop", a: "Traffic declines slowly; pages keep ranking for a while", b: "Traffic stops immediately" },
      { criterion: "Control over message and landing page", a: "Partial — search engines choose which page and snippet to show", b: "Full — you choose the query, the ad and the page" },
      { criterion: "Best at", a: "Research-stage and informational queries; building authority", b: "High-intent, commercial queries; testing offers quickly" },
      { criterion: "Measurement", a: "Slower feedback; best read by section and over quarters", b: "Fast, granular feedback on queries, ads and conversion" },
      { criterion: "Competitive exposure", a: "Rivals can’t buy their way past a strong page, but a better page can overtake it", b: "Rivals with deeper budgets can outbid you on the queries that matter most" },
      { criterion: "What you own at the end", a: "Pages, authority and content that keep working", b: "Data about which queries and messages convert — valuable, but not an asset that keeps producing traffic" },
    ],
    chooseA: [
      "Your buyers research before they buy, and search volume in your category is meaningful",
      "You can invest for two quarters or more before judging the return",
      "Paid clicks in your market are expensive enough to erode margin",
      "You have expertise to publish that competitors don't",
      "The same questions come up in every sales conversation — that is content waiting to be written",
    ],
    chooseB: [
      "You need leads or sales this quarter",
      "You're testing a new offer, market or price and need fast signal",
      "Search volume is small but highly commercial",
      "Your site doesn't yet have the authority to rank for competitive terms",
    ],
    verdict:
      "For most companies the answer is both, sequenced. Paid search funds learning quickly — which queries convert, which messages land — and that learning should shape what organic content gets built. As organic pages start to rank for terms you're paying for, budget can move to queries organic can't win yet. The mistake is treating them as separate programs with separate teams and separate reports.",
    faqs: [
      {
        q: "Is SEO cheaper than PPC?",
        a: "Per visit, usually yes once it's working, because you aren't paying for each click. But SEO has real costs — content, development and time — and they come before the traffic does. Over a short horizon PPC is often cheaper per result; over a long one SEO usually is.",
      },
      {
        q: "Does running PPC help SEO rankings?",
        a: "Not directly. Search engines don't rank pages higher because you advertise. Indirectly, paid search data can tell you which queries and pages convert, which makes your SEO investment smarter.",
      },
      {
        q: "Should we stop bidding on our brand name if we rank first organically?",
        a: "Sometimes. It depends on whether competitors bid on your brand and how much of the paid traffic would have come through organic anyway. The way to know is to test it with a controlled pause and watch total branded clicks and conversions.",
      },
      {
        q: "How much should we spend on each?",
        a: "There isn't a universal ratio. Start from what you need this quarter versus next year, how competitive paid clicks are in your market, and what your site can realistically rank for today.",
      },
    ],
    related: {
      services: ["seo", "paid-media"],
      solutions: ["lead-generation", "lower-acquisition-cost"],
      guides: ["technical-seo-audit"], research: ["organic-search-after-ai-overviews", "paid-search-economics-high-ticket-services"] },
  },
  {
    slug: "agency-vs-in-house",
    name: "Agency vs. In-House Marketing",
    metaTitle: "Marketing Agency vs. In-House Team: How to Decide",
    metaDescription:
      "An honest comparison of hiring a marketing agency versus building an in-house team — cost structure, speed, depth, context and control — and when each one wins.",
    primaryQuery: "marketing agency vs in house",
    secondaryQueries: [
      "in house marketing vs agency",
      "should i hire a marketing agency or build a team",
      "outsource marketing or hire in house",
      "pros and cons of in house marketing team",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Compare",
      title: ["Agency vs. in-house.", "Range or continuity."],
      lead:
        "An agency gives you a bench of specialists you couldn't justify hiring one by one. An in-house team gives you people who live inside your business every day. Neither is the grown-up choice. The right answer depends on how steady your marketing work is, how specialized it needs to be, and who inside will own it.",
    },
    options: [
      {
        name: "Marketing agency",
        summary:
          "An outside team you contract for strategy, execution or both. You get access to several senior disciplines and their tooling without employing each person — and you share their attention with other clients.",
      },
      {
        name: "In-house team",
        summary:
          "People you employ who work only on your business. They carry context no outsider can match and they stay when a project ends — but you have to hire, manage and keep every skill you need.",
      },
    ],
    criteria: [
      { criterion: "Time to productive work", a: "Weeks — the team already exists; onboarding is about your context, not recruiting", b: "Months per role once recruiting, notice periods and ramp-up are stacked together" },
      { criterion: "Breadth of skills", a: "Several disciplines available without a full-time hire for each", b: "Limited to who you've hired; gaps get covered by generalists or not at all" },
      { criterion: "Depth of business context", a: "Built through onboarding, access and regular contact — always partial", b: "Accumulates daily: product, customers, sales conversations, internal history" },
      { criterion: "Cost structure", a: "Fees tied to scope, adjustable by contract as needs change", b: "Salaries, benefits, tools and management time — largely fixed and slow to change" },
      { criterion: "Speed on small requests", a: "Depends on process; minor changes often wait in a queue", b: "Fast — someone can fix a typo or swap an image the same afternoon" },
      { criterion: "Outside perspective", a: "Sees patterns across other categories and markets", b: "Strong on what worked here before; can drift toward insularity" },
      { criterion: "Where the knowledge lives", a: "Leaves with the contract unless documentation and handover are in scope", b: "Stays in the company — until the person who holds it leaves" },
      { criterion: "Management load", a: "You manage a relationship, a scope and outcomes", b: "You manage people: hiring, development, reviews and retention" },
    ],
    chooseA: [
      "You need several disciplines — brand, web, paid, analytics — but not enough steady volume to employ a specialist in each",
      "You need to start in weeks, not after a hiring cycle",
      "The work is lumpy: a relaunch, a migration or a launch, followed by a quieter stretch",
      "You don't yet have a senior marketer who can hire and manage specialists well",
      "You want an outside view on positioning, channel mix or measurement",
    ],
    chooseB: [
      "Marketing is continuous, high-volume and central to how the business runs day to day",
      "The work depends on deep product knowledge and fast iteration with sales and product teams",
      "You can hire at the seniority the work needs, and someone experienced can manage those hires",
      "Your category is technical or regulated enough that ramping up an outside team is repeatedly expensive",
      "You want the institutional knowledge to stay inside the company over the long term",
    ],
    verdict:
      "If marketing is a daily operating function with steady volume, and you can hire and manage senior people, in-house is usually the better long-term answer — context compounds, and nobody outside can own your customers for you. An agency earns its place where the in-house model is weakest: breadth you can't justify hiring for, specialist depth for a defined period, and speed when you can't wait on recruiting. Most mature teams end up hybrid — a small in-house core that owns goals, data and the brand, with outside specialists for work that's episodic or deeply technical. The failure mode on either side is the same: nobody inside owns the outcome. If you work with us, someone on your team should still own the targets, the numbers and the final calls.",
    faqs: [
      {
        q: "Is an agency cheaper than hiring an in-house team?",
        a: "It depends on how much of each skill you actually need. If you need a little of many disciplines, an agency is usually cheaper than hiring a person for each. If you need a lot of one discipline every week, a full-time hire usually wins on cost. Compare total cost — salaries, benefits, tools, recruiting and management time — not just the salary line against the agency fee.",
      },
      {
        q: "Can an agency and an in-house team work well together?",
        a: "Yes, and it's often the strongest setup. It works when ownership is explicit: who sets priorities, who approves work, who owns which channel and which report. It breaks when the agency and the team compete for credit or duplicate each other's work.",
      },
      {
        q: "What should always stay in-house?",
        a: "Ownership of goals and budget, direct customer knowledge, and final say on the brand. You should also own every account and asset — ad accounts, analytics, your domain, your CMS and your design files — even when an agency operates them day to day.",
      },
      {
        q: "How do we avoid losing everything if an agency relationship ends?",
        a: "Make handover part of the work from the start. Keep accounts in your name, ask for documentation of campaigns, tracking and processes as they're built, and store files in your own systems. A good partner should make leaving easy, even if they'd rather you stayed.",
      },
      {
        q: "When does it make sense to bring agency work in-house?",
        a: "When the volume in one discipline has become steady and predictable, and you can describe the role precisely from what the agency has been doing. That's a healthy transition, not a failure. Plan a transition period where the new hire works alongside the outgoing team.",
      },
    ],
    related: {
      useCases: ["in-house-team-support"],
      alternatives: ["in-house-marketing-team", "traditional-marketing-agency"],
      compare: ["agency-vs-freelancers", "fractional-cmo-vs-agency"],
      guides: ["how-to-choose-a-marketing-agency"],
      solutions: ["go-to-market-strategy"],
    },
  },
  {
    slug: "agency-vs-freelancers",
    name: "Agency vs. Freelancers",
    metaTitle: "Agency vs. Freelancers: Which Is Right for the Work?",
    metaDescription:
      "Agency or freelancers? A plain comparison of cost, coordination, continuity, quality control and risk — and when freelancers are the better call.",
    primaryQuery: "agency vs freelancer",
    secondaryQueries: [
      "hire a freelancer or an agency",
      "marketing agency vs freelancer",
      "freelancers vs agency for website",
      "pros and cons of hiring freelancers",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Compare",
      title: ["Agency vs. freelancers.", "Who does the coordinating?"],
      lead:
        "A good freelancer can match an agency specialist skill for skill. The real difference is who joins the pieces together, checks the work, and covers when someone becomes unavailable. That job doesn't disappear when you hire freelancers — it moves to you.",
    },
    options: [
      {
        name: "Agency",
        summary:
          "A team under one contract, with someone accountable for connecting disciplines, reviewing quality and covering absences. You pay for that coordination layer in the fee.",
      },
      {
        name: "Freelancers",
        summary:
          "Independent specialists you hire directly, one skill at a time. Often excellent and flexible, with little overhead — and you become the project manager, the integrator and the backup plan.",
      },
    ],
    criteria: [
      { criterion: "Cost per unit of skilled work", a: "Higher — the fee carries management, review and the business around the specialist", b: "Lower — you pay mostly for the work itself" },
      { criterion: "Coordination across disciplines", a: "Handled for you; designers, developers and strategists already work together", b: "Handled by you; every handoff between freelancers is yours to manage" },
      { criterion: "Quality control", a: "Internal review before work reaches you, if the agency runs it properly", b: "Depends on the individual and on your ability to judge the work" },
      { criterion: "Continuity and cover", a: "Someone else picks up when a person is sick, busy or leaves", b: "Single point of failure; availability shifts with their other clients" },
      { criterion: "Flexibility", a: "Contract terms and minimum scopes apply", b: "Easy to start, stop or swap for a single task" },
      { criterion: "Accountability", a: "One party answers for the whole result", b: "Each person answers for their piece; the gaps between pieces are yours" },
      { criterion: "Choice of who does the work", a: "You get the agency's team, which may change over time", b: "You pick the exact person and work with them directly" },
    ],
    chooseA: [
      "The work spans disciplines that have to fit together — brand, content, development and analytics on one site",
      "Nobody on your side has the time or experience to brief, direct and integrate specialists",
      "Deadlines are fixed and a missing person would put the launch at risk",
      "You want one party accountable for whether the whole thing works, not just its parts",
    ],
    chooseB: [
      "The task is well defined and sits in one discipline — a set of illustrations, a landing page build, an email template",
      "You have an experienced marketer in-house who can write briefs, review work and integrate it",
      "Budget is tight and you'd rather spend it on output than on overhead",
      "You've found a specific person whose work you trust and you want them, not a team",
      "The need is occasional enough that a standing agency relationship would sit idle",
    ],
    verdict:
      "If you have someone who can brief, judge and integrate the work, and the job sits mostly in one discipline, freelancers are often the better choice — you get skilled output with less overhead, and you choose exactly who does it. The case for an agency grows with the number of moving parts: when brand, web, content and data all have to fit together, when the schedule can't slip, or when nobody inside has time to be the project manager. A sensible middle path is freelancers for well-scoped production work and an agency or senior lead for the system that ties it together. Before comparing rates, be honest about the coordination cost. It's real work, and when it lands on a founder or a busy marketing lead it's rarely free.",
    faqs: [
      {
        q: "Are freelancers cheaper than an agency?",
        a: "Their rates usually are. The total cost also includes your time spent briefing and coordinating, rework when pieces don't fit, and delays when someone isn't available. For single-discipline, well-scoped tasks, freelancers usually come out ahead; for multi-part projects the gap narrows or reverses.",
      },
      {
        q: "How do we manage a group of freelancers well?",
        a: "Give one person inside the company ownership of the whole project. Write briefs that describe the goal, constraints and how the piece connects to the rest. Keep files, accounts and credentials in your own systems, and agree on review steps before work starts rather than after it arrives.",
      },
      {
        q: "Can an agency work alongside our existing freelancers?",
        a: "Yes. It works best when roles are explicit — who owns the plan, who reviews what, who has final approval. We're comfortable slotting into a team that already includes freelancers you rely on, rather than replacing them.",
      },
      {
        q: "What's the biggest risk of relying on one freelancer?",
        a: "Continuity. When knowledge of how your site, tracking or campaigns work lives in one person's head, their availability becomes your risk. Ask for documentation as the work is done and keep ownership of every account.",
      },
      {
        q: "Will the people who pitch an agency engagement actually do the work?",
        a: "Not always, so ask directly who will be on the work day to day and how much of their time you'll get. Ask whether any part is subcontracted. You're entitled to meet the people doing the work before you sign.",
      },
    ],
    related: {
      alternatives: ["freelance-marketplaces", "traditional-marketing-agency"],
      compare: ["agency-vs-in-house", "full-service-vs-specialist-agency"],
      guides: ["how-to-choose-a-marketing-agency"],
      services: ["web-design", "content-marketing"],
      solutions: ["website-redesign"],
    },
  },
  {
    slug: "full-service-vs-specialist-agency",
    name: "Full-Service vs. Specialist Agency",
    metaTitle: "Full-Service vs. Specialist Agency: Which Fits You?",
    metaDescription:
      "Should one agency run everything, or should you hire a specialist for each channel? Compare integration, depth, accountability and cost, and see when each wins.",
    primaryQuery: "full service agency vs specialist",
    secondaryQueries: [
      "full service marketing agency vs specialist agency",
      "one agency or multiple agencies",
      "specialist marketing agency vs generalist",
      "should i use one marketing agency for everything",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Compare",
      title: ["Full-service vs. specialist.", "Integration or depth."],
      lead:
        "A full-service agency promises one team across brand, web, content and paid. A specialist promises to be excellent at one thing. Both promises can be true, and both can hide a weakness. The deciding question is where your problem actually lives — inside one channel, or in the gaps between them.",
    },
    options: [
      {
        name: "Full-service agency",
        summary:
          "One partner across several disciplines, with a shared plan, shared data and one point of accountability. Strong where the parts depend on each other; uneven if some disciplines are thinner than others.",
      },
      {
        name: "Specialist agency",
        summary:
          "A firm focused on one discipline or channel — paid social, technical SEO, lifecycle email. Deep expertise and pattern recognition in its lane, with no view of, or responsibility for, the rest.",
      },
    ],
    criteria: [
      { criterion: "Depth in a single discipline", a: "Varies by discipline — ask who actually does each piece", b: "Usually deep; it's the whole business" },
      { criterion: "Integration across channels", a: "Built in: one plan, one data set, one team talking to itself", b: "Your job, across several agencies with separate plans and reports" },
      { criterion: "Accountability", a: "One party for the whole result, with nowhere to point the finger", b: "Clear inside the channel; blurry for anything that crosses channels" },
      { criterion: "Reporting and attribution", a: "One consistent view, provided measurement is set up properly", b: "Each specialist reports its own channel, often claiming the same conversions" },
      { criterion: "Switching cost", a: "High — replacing the partner means replacing everything at once", b: "Low — you can swap one channel's agency without touching the others" },
      { criterion: "Management overhead for you", a: "One relationship, one meeting cadence, one invoice", b: "Several relationships, briefs and invoices to coordinate" },
      { criterion: "Built-in bias to watch for", a: "Recommending more of whatever services they sell most", b: "Seeing every problem as a problem in their channel" },
    ],
    chooseA: [
      "Your problem crosses disciplines: positioning, site, content and paid all need to change together",
      "You don't have a senior marketer with time to coordinate several vendors",
      "Separate agency reports are double-counting conversions and muddying budget decisions",
      "You're launching something new and need brand, web and growth moving on one plan",
    ],
    chooseB: [
      "One channel carries most of your growth and needs the deepest expertise you can find",
      "You have an in-house lead who owns strategy and can integrate the pieces",
      "The problem is narrow and technical — a migration, a tracking rebuild, a product feed issue",
      "A broader partner handles most things well but one discipline is visibly weak",
      "You want the option to replace one vendor without disrupting everything else",
    ],
    verdict:
      "If you have a strong in-house marketing lead and one or two channels carry the business, specialists usually win — you get the deepest people in the lanes that matter, and your lead does the integrating. Full-service makes more sense when the problem is the connections rather than any single channel: the site doesn't convert what paid sends it, the brand says one thing and the ads another, nobody can agree on what drove a sale. Whichever route you take, test depth discipline by discipline instead of trusting the list of services on a website. We work across several disciplines, and we'd still rather tell you a specialist is the better fit for a narrow problem than stretch into work that isn't ours.",
    faqs: [
      {
        q: "Can a full-service agency really be good at everything?",
        a: "Rarely equally. Ask to meet the person who leads each discipline you'd use, look at recent work in each one, and ask which parts are subcontracted. The honest ones will tell you where they're strongest.",
      },
      {
        q: "How do we stop several specialist agencies from double-counting results?",
        a: "Own the measurement yourself. Keep one analytics setup that you control, agree attribution rules with every vendor up front, and judge channels against total business outcomes rather than each platform's own reporting. Platform-reported conversions from different channels will almost always add up to more than your actual sales.",
      },
      {
        q: "Is it risky to put everything with one agency?",
        a: "There's concentration risk: if the relationship sours, everything moves at once. Reduce it by keeping every account, domain, data source and design file in your name, and by agreeing exit and handover terms before you start.",
      },
      {
        q: "Can we mix the two models?",
        a: "Yes, and many companies do — a broad partner for the core program plus a specialist for one demanding channel. Decide in writing who owns the overall plan and the reporting, or you'll recreate the coordination problem you were trying to avoid.",
      },
      {
        q: "Do full-service agencies subcontract work?",
        a: "Some do, particularly for development, video or niche channels. That isn't wrong in itself, but you should know who is doing the work, how quality is reviewed, and who is accountable when something goes wrong.",
      },
    ],
    related: {
      services: ["paid-media", "seo", "marketing-analytics"],
      solutions: ["marketing-attribution"],
      compare: ["agency-vs-freelancers", "agency-vs-in-house"],
      alternatives: ["traditional-marketing-agency"],
      guides: ["how-to-choose-a-marketing-agency", "marketing-attribution-models"],
    },
  },
  {
    slug: "retainer-vs-project",
    name: "Retainer vs. Project-Based Work",
    metaTitle: "Agency Retainer vs. Project-Based Work: How to Choose",
    metaDescription:
      "Retainer or fixed project? How the two agency engagement models differ on scope, cost predictability, flexibility and results — and which one fits your work.",
    primaryQuery: "retainer vs project based agency",
    secondaryQueries: [
      "agency retainer vs project",
      "marketing retainer vs one off project",
      "is a marketing retainer worth it",
      "retainer vs fixed fee agency",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Compare",
      title: ["Retainer vs. project.", "Ongoing or finished."],
      lead:
        "Some work has an end: a new site, a rebrand, a migration. Some work only improves if it keeps going: search, paid media, conversion testing. The engagement model should match the shape of the work — not an agency's preference for predictable revenue, and not a buyer's reflex to avoid commitment.",
    },
    options: [
      {
        name: "Retainer",
        summary:
          "An ongoing arrangement: a recurring fee for a team's capacity, a scope of work, or both. Suited to work that compounds, where what you learn this month shapes what you do next month.",
      },
      {
        name: "Project-based",
        summary:
          "A defined scope, timeline and set of deliverables, priced for the whole job. Suited to work with a clear finish line, where you want to know the cost and the end state before you start.",
      },
    ],
    criteria: [
      { criterion: "How scope is set", a: "At the level of goals and capacity; details decided as you go", b: "In detail up front; changes go through a change request" },
      { criterion: "Cost predictability", a: "Predictable per month; the total depends on how long it runs", b: "Predictable for the whole job, as long as the scope holds" },
      { criterion: "Changing priorities", a: "Easy — priorities can shift within the agreed capacity", b: "Harder — a new idea usually means new scope and a new estimate" },
      { criterion: "Fit for compounding work", a: "Strong: continuity lets testing and optimization build on themselves", b: "Weak: the work stops at handoff, and so does the learning" },
      { criterion: "Fit for work with a finish line", a: "Can drift; without milestones a retainer quietly becomes maintenance", b: "Strong: clear deliverables and a date to hold everyone to" },
      { criterion: "Commitment", a: "Ongoing, usually with a notice period", b: "Ends at delivery; continuing is a fresh decision" },
      { criterion: "Risk of paying for idle time", a: "Real when priorities are unclear or approvals are slow", b: "Low — you pay for what's delivered" },
    ],
    chooseA: [
      "The work compounds: SEO, paid media, conversion testing, lifecycle email, analytics upkeep",
      "Priorities shift month to month and you need a team that can respond without renegotiating",
      "You want the same people building context about your business over several quarters",
      "Someone on your side can give feedback and approvals on a regular cadence",
    ],
    chooseB: [
      "The work has a clear end state: a website, a rebrand, a migration, an audit",
      "You need a firm budget approved before anything starts",
      "It's your first engagement with an agency and you want to see how they work before committing",
      "An in-house team will run things after handover",
      "You need a short burst of specialist capacity rather than a standing team",
    ],
    verdict:
      "Match the model to the work. A project is the better choice for anything with a finish line, and usually for a first engagement — a defined scope is the fairest way to find out whether you work well together. A retainer earns its cost on work that improves with repetition, where stopping and restarting throws away what was learned. The mistake runs both ways: a retainer bought for what is really a project turns into paying for availability, and a project bought for what is really ongoing work ends with a launch and then nothing. Many relationships should use both — a project to build, then a smaller retainer to run and improve what was built, with a review point agreed in advance to decide whether it's still worth paying for.",
    faqs: [
      {
        q: "Is a retainer more expensive than a project?",
        a: "Not inherently. A retainer spreads cost over time and a project concentrates it, so compare them against the same amount of work. A retainer becomes expensive when the capacity goes unused, and a project becomes expensive when the scope keeps changing.",
      },
      {
        q: "What should a retainer agreement spell out?",
        a: "The goals it serves, the capacity or scope included, the planning and reporting cadence, what's explicitly out of scope, the notice period, and when you'll formally review whether it's working. Vague retainers are where most disappointment starts.",
      },
      {
        q: "How do we avoid paying for retainer time we don't use?",
        a: "Keep a prioritized backlog so there's always valuable work ready, plan together at the start of each cycle, and ask for a clear record of what was done. If capacity keeps going unused, reduce it at the next review rather than letting it sit.",
      },
      {
        q: "What happens when a project's scope changes midway?",
        a: "It should go through a change request: what's being added or removed, what it does to cost and timeline, and a decision before work continues. Changes are normal; surprises at invoice time shouldn't be. Flag new requirements as early as you can.",
      },
      {
        q: "Can we start with a project and move to a retainer?",
        a: "Yes, and it's a common and healthy path. The project gives both sides a real test of how you work together, and the retainer continues only if there's ongoing work that benefits from continuity.",
      },
      {
        q: "How long should a retainer run before we judge it?",
        a: "That depends on the work. Paid media and conversion testing produce readable signal within weeks; SEO usually needs a couple of quarters. Agree the review point and what good looks like before the retainer starts, not when you're frustrated.",
      },
    ],
    related: {
      services: ["seo", "cro", "web-design"],
      solutions: ["website-redesign"],
      useCases: ["website-migration"],
      compare: ["agency-vs-in-house", "fractional-cmo-vs-agency"],
      guides: ["how-to-choose-a-marketing-agency"],
    },
  },
  {
    slug: "fractional-cmo-vs-agency",
    name: "Fractional CMO vs. Agency",
    metaTitle: "Fractional CMO vs. Marketing Agency: Which Do You Need?",
    metaDescription:
      "A fractional CMO sets direction; an agency executes. Compare leadership, capacity, cost and accountability — and learn when you need one, the other or both.",
    primaryQuery: "fractional cmo vs agency",
    secondaryQueries: [
      "fractional cmo vs marketing agency",
      "do i need a fractional cmo",
      "fractional cmo or hire an agency",
      "what does a fractional cmo do",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Compare",
      title: ["Fractional CMO vs. agency.", "Direction or capacity."],
      lead:
        "A fractional CMO is a senior marketing leader working part-time inside your company. An agency is a team that ships work. One decides what to do; the other does it. Choosing between them starts with an honest question: is your problem knowing what to do, or getting it done?",
    },
    options: [
      {
        name: "Fractional CMO",
        summary:
          "An experienced marketing executive engaged part-time to own strategy, set budgets, hire and manage the team, and report to leadership. Executive judgment without a full-time executive hire — and very little execution capacity of their own.",
      },
      {
        name: "Agency",
        summary:
          "An outside team that plans and delivers — campaigns, sites, content, analytics. Substantial hands-on capacity across disciplines, but not a member of your leadership team and not in a position to run your organization.",
      },
    ],
    criteria: [
      { criterion: "Primary job", a: "Leadership: strategy, priorities, budget, hiring and reporting to the CEO and board", b: "Delivery: producing and running the work, with strategy for the areas in scope" },
      { criterion: "Authority inside the company", a: "Sits with the leadership team; can make and defend trade-offs internally", b: "Advises from outside; needs someone inside to champion decisions" },
      { criterion: "Execution capacity", a: "One senior person's part-time hours", b: "A team — designers, developers, strategists, analysts" },
      { criterion: "Managing your people", a: "Can hire, manage and develop your in-house team and vendors", b: "Manages its own people, not yours" },
      { criterion: "Craft depth", a: "Broad judgment across channels; rarely the hands-on specialist", b: "Deep in the disciplines the agency practices" },
      { criterion: "Best stage", a: "Building the function: the first plan, first hires and operating rhythm", b: "Delivering and improving specific programs once direction is set" },
      { criterion: "Typical failure mode", a: "A good plan with nobody to carry it out", b: "Busy execution without a clear strategy above it" },
    ],
    chooseA: [
      "Nobody in the company owns marketing at a senior level, and a full-time CMO hire isn't justified yet",
      "The core problem is direction: positioning, priorities, budget allocation, which channels to bet on",
      "You need to design and hire a marketing team and want someone who has done it before to lead that",
      "Leadership or the board needs a marketing owner who reports on results and is held to them",
      "You already have execution capacity — staff or vendors — that needs a manager",
    ],
    chooseB: [
      "Strategy is broadly clear and what's missing is people to deliver it",
      "You need several disciplines shipping at once: a site, campaigns, content, tracking",
      "You already have a marketing lead who can direct outside work",
      "The need is a defined program or project, not building a function from scratch",
    ],
    verdict:
      "If nobody in your company owns marketing at a senior level, a fractional CMO is often the better first move. An agency can't set your company's priorities, manage your staff or defend a budget in your leadership meetings, and without that owner even strong execution drifts. If you already have direction and a capable lead, an agency adds the capacity and craft that one part-time executive can't. Many growing companies need both: a fractional leader who owns the plan and holds vendors to it, and an agency or specialists who do the work. Be skeptical of either one claiming to fully replace the other. We'll bring strategy to the areas we run, but we won't pretend to be your CMO.",
    faqs: [
      {
        q: "What does a fractional CMO actually do?",
        a: "They act as your senior marketing leader on a part-time basis: setting strategy and priorities, owning the budget, hiring and managing the team and vendors, and reporting to the CEO or board. The value is judgment and authority, not hands-on production.",
      },
      {
        q: "Can an agency act as our fractional CMO?",
        a: "Some agencies offer strategic leadership, and it can be useful. The test is authority: can that person manage your staff, own the budget, sit in leadership meetings and recommend cutting the agency's own scope? If not, it's strategic advice, not a CMO.",
      },
      {
        q: "How do a fractional CMO and an agency work together?",
        a: "The CMO sets goals, budget and the scorecard; the agency proposes how to hit them and does the work. A regular cadence of planning and reporting keeps both honest. It works best when the CMO is involved in choosing the agency and the agency knows who has final say.",
      },
      {
        q: "When should we replace a fractional CMO with a full-time hire?",
        a: "When marketing needs daily leadership — a larger team to manage, constant cross-functional decisions, or a pace the part-time arrangement can't keep. A good fractional CMO will often help define that role and hire for it.",
      },
      {
        q: "Is a fractional CMO cheaper than an agency?",
        a: "They buy different things, so the comparison is rarely like for like. A fractional CMO buys senior leadership time; an agency buys a team's output. Compare each against what you'd otherwise have to pay to get the same outcome — a full-time executive, or several hires.",
      },
    ],
    related: {
      solutions: ["go-to-market-strategy", "marketing-attribution"],
      useCases: ["post-funding-growth", "in-house-team-support"],
      compare: ["agency-vs-in-house", "retainer-vs-project"],
      alternatives: ["in-house-marketing-team"],
      guides: ["how-to-choose-a-marketing-agency"],
    },
  },
];
