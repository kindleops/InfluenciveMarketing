import type { AlternativePage } from "./types";

/**
 * Alternatives pages. Each lists realistic options — including ones that
 * aren't us — with honest tradeoffs. None of them claims we're the right
 * answer for everyone, because we aren't.
 */
export const alternativePages: AlternativePage[] = [
  {
    slug: "in-house-marketing-team",
    name: "Alternatives to Hiring an In-House Marketing Team",
    metaTitle: "Alternatives to Hiring a Marketing Team, Compared",
    metaDescription:
      "The realistic alternatives to building an in-house marketing team — a senior hire, fractional leaders, freelancers, agencies or doing less — with tradeoffs.",
    primaryQuery: "alternatives to hiring a marketing team",
    secondaryQueries: [
      "outsource marketing vs hire",
      "alternatives to in-house marketing",
      "do i need a marketing team",
      "hire marketing team or agency",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Alternatives",
      title: ["Before you build a team,", "know what shape it needs."],
      lead:
        "A full in-house marketing team is a big, fixed commitment. Here are the realistic alternatives — including ones that don't involve us — and what each is actually good for.",
    },
    replacing: {
      heading: "Why companies look for another way before hiring a department.",
      body: [
        "A full in-house team is the natural ambition for a growing company, and for many it's the right end state. It is also a significant fixed commitment: salaries and benefits, management attention, tools, and months of recruiting before anyone ships work. A team comes with a fixed shape, too. The skills you hire for this year may not be the ones you need next year, and changing a team's shape is slower and harder than changing a plan.",
        "Companies usually look for alternatives when the need is real but the shape is unclear. They know marketing has to do more, but not yet which channels will work or which roles deserve a full-time seat. Others need senior judgment they can't yet attract or afford full-time, or specialist depth for work that arrives in bursts — a relaunch, a migration, a new market.",
        "The options below each solve a different part of that problem. Most companies end up combining two or three of them, and moving between them as they grow. None is right for everyone, including us.",
      ],
    },
    reasons: [
      "Recruiting takes months, and the plan can't wait that long",
      "The work spans several specialties, none of them full-time",
      "Leadership doesn't yet know which channels will work",
      "A senior marketing leader is hard to attract or justify at this stage",
      "Fixed headcount feels risky while revenue or funding is uncertain",
    ],
    options: [
      {
        name: "Hire one senior generalist first",
        bestFor:
          "Companies that know marketing will be central long term and want someone inside the business owning it from the start.",
        tradeoffs:
          "One person can't be expert in every channel, so even a strong generalist will need outside help for specialist work. A mis-hire at this level is expensive and slow to undo, and the search itself can take a long time.",
      },
      {
        name: "A fractional marketing leader",
        bestFor:
          "Companies that need strategy, prioritization and help building a team, but not a full-time executive yet.",
        tradeoffs:
          "You get direction and judgment, usually with little hands-on execution — someone still has to do the work. Their attention is shared with other clients, and the arrangement is meant to be temporary.",
      },
      {
        name: "Freelancers",
        bestFor:
          "Well-defined tasks with clear briefs: a set of articles, an ad creative batch, a landing page, a one-off analytics fix.",
        tradeoffs:
          "Usually the lowest cost per unit of work, but someone internal has to plan, brief, coordinate and review. Quality and availability vary, and a connected program is hard to assemble from several independent people.",
      },
      {
        name: "A senior agency or studio, like us",
        bestFor:
          "Companies that need several disciplines — brand, web, growth, analytics, automation — working together without hiring each one.",
        tradeoffs:
          "More expensive per hour than freelancers, and less day-to-day context than employees. It works only with an internal owner setting priorities, and it creates dependency if the agency doesn't document its work and hand it over.",
      },
      {
        name: "Do less, deliberately",
        bestFor:
          "Early companies whose growth still comes mainly from founder-led sales, referrals or a single channel that's working.",
        tradeoffs:
          "It may cap growth, and it requires the discipline to say no to activities that look like progress. But one channel done well often beats five done thinly, and it keeps options open until the need is clearer.",
      },
    ],
    howToDecide: [
      "Start from the constraint. If nobody knows what to do, you need judgment first — a senior hire or a fractional leader. If you know what to do but can't get it done, you need capacity.",
      "Be honest about duration. Work that fills a full week indefinitely usually justifies a hire. Work that comes in projects or bursts usually doesn't.",
      "Count the coordination cost. The cheapest option per hour is often the most expensive in management time.",
      "Keep ownership inside. Whatever you choose, someone internal should own the goals, and your company should own the accounts, data and creative files.",
      "Pick the option that makes the next step easier. Most companies move through several of these models, so choose one that documents its work and hands over cleanly.",
    ],
    faqs: [
      {
        q: "Is an agency cheaper than an in-house marketing team?",
        a: "Sometimes. When you need several specialties part-time, an agency often costs less than hiring each role. When you need one function full-time and indefinitely, a hire is usually more cost-effective over time. Compare total costs, including recruiting, management time and tools, not just salary against fees.",
      },
      {
        q: "Can we combine these options?",
        a: "Yes, and most companies do. Common combinations are a fractional leader directing freelancers, or a small internal team with an agency for specialist and project work. The important thing is that one person owns how the pieces fit together.",
      },
      {
        q: "When is it the right time to build an in-house team?",
        a: "When the work is steady, central to how you compete, and you know which roles you need because you've seen what works. Building the team after that clarity arrives is far cheaper than reshaping one built before it.",
      },
      {
        q: "What does a fractional CMO actually do?",
        a: "Typically they set strategy and priorities, build the plan and budget, manage outside partners, and help hire the permanent team — part-time, often for a defined period. They rarely do much of the execution themselves.",
      },
      {
        q: "How do we avoid becoming dependent on an agency?",
        a: "Own every account and file, require documentation of anything built, keep an internal owner in the loop on decisions, and agree up front how work gets handed over. A good agency will expect and welcome those terms.",
      },
    ],
    related: {
      compare: ["agency-vs-in-house", "fractional-cmo-vs-agency", "agency-vs-freelancers"],
      useCases: ["in-house-team-support", "post-funding-growth"],
      alternatives: ["freelance-marketplaces", "traditional-marketing-agency"],
      guides: ["how-to-choose-a-marketing-agency"],
    },
  },
  {
    slug: "traditional-marketing-agency",
    name: "Alternatives to a Traditional Marketing Agency",
    metaTitle: "Alternatives to a Marketing Agency: Options Compared",
    metaDescription:
      "What to consider instead of a traditional marketing agency — in-house hires, specialists, fractional leaders, consultants and studios — and how to choose.",
    primaryQuery: "alternatives to a marketing agency",
    secondaryQueries: [
      "marketing agency alternatives",
      "alternative to agency retainer",
      "instead of a marketing agency",
      "better than a marketing agency",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Alternatives",
      title: ["Not every problem", "needs another agency."],
      lead:
        "Frustration with an agency usually comes from something specific — seniority, speed, reporting or fragmentation. Each points to a different alternative. We're one of them, and not always the right one.",
    },
    replacing: {
      heading: "What people are usually trying to get away from.",
      body: [
        "When companies look for an alternative to a marketing agency, they're rarely rejecting outside help altogether. They're reacting to a model: senior people in the pitch and junior people on the account, retainers priced on hours rather than outcomes, monthly reports full of activity, and channels run in isolation because each sits with a different team or a different agency.",
        "Some of those complaints are about one particular agency. Others are structural. An agency paid on retained hours has little reason to reduce the hours. An agency that owns one channel will naturally argue for that channel. An agency that holds your ad accounts and data creates a dependency that's hard to exit. None of that requires bad intent — it's what the incentives produce.",
        "We are an agency of a kind, so read this with that in mind. The alternatives below are real, and several of them will be a better choice than us for some companies.",
      ],
    },
    reasons: [
      "Senior attention during the sale, junior execution afterward",
      "Reporting that describes activity rather than business results",
      "Slow turnaround caused by layers of account management",
      "Channels run separately, each optimized for its own metrics",
      "Accounts, data and know-how held by the agency rather than the client",
      "Long contracts that are hard to exit when things aren't working",
    ],
    options: [
      {
        name: "Build in-house",
        bestFor:
          "Steady, ongoing work that is central to how the company competes, where deep product and customer context matters every day.",
        tradeoffs:
          "Slow to recruit, fixed in cost and shape, and usually narrower in skills than an outside team. You also take on management, training and retention.",
      },
      {
        name: "A specialist agency",
        bestFor:
          "One channel that matters a great deal — paid search, SEO, lifecycle email — where depth beats breadth.",
        tradeoffs:
          "Deep but narrow. Connecting its work to the rest of your marketing falls to you, and it will tend to see its own channel as the answer.",
      },
      {
        name: "A fractional leader with freelancers",
        bestFor:
          "Companies that want senior direction and flexible execution without a large retainer.",
        tradeoffs:
          "Leaner and often cheaper, but coordination is heavy, quality depends on the leader's network, and it can be hard to scale when the workload grows.",
      },
      {
        name: "A consultant or advisor",
        bestFor:
          "Companies with capable internal teams that need an outside view on strategy, a specific decision or an audit.",
        tradeoffs:
          "You get advice, not execution. The value depends entirely on your team's ability and capacity to act on it.",
      },
      {
        name: "A senior, integrated studio — our model",
        bestFor:
          "Companies that need brand, web, growth and data working as one system, and want the people who scope the work to be the ones doing it.",
        tradeoffs:
          "Small senior teams have limited capacity and are often more expensive per hour than volume agencies. It's a poor fit for large volumes of routine production, and it still needs an internal owner to set direction.",
      },
    ],
    howToDecide: [
      "Name the specific problem with your current or past agency. Seniority, speed, reporting and fragmentation each point to a different alternative.",
      "Ask who will actually do the work, and meet them before you sign.",
      "Insist that your company owns its ad accounts, analytics, CRM and creative files, whichever option you choose.",
      "Match the commitment to your certainty. A defined project or a short initial term makes sense when you're unsure; a retainer makes sense for ongoing work that has proven itself.",
      "Decide who integrates. If several partners are involved, someone — inside or outside — has to own how their work fits together.",
    ],
    faqs: [
      {
        q: "What's the difference between a studio and an agency?",
        a: "The labels are used loosely and overlap. 'Studio' usually suggests a smaller, senior team doing hands-on work across disciplines; 'agency' covers everything from narrow specialists to large networks. Judge by who does the work and how they're paid, not by the label.",
      },
      {
        q: "Is a specialist agency better than a full-service one?",
        a: "It depends on how many channels matter to you. If one channel drives most of your growth, a specialist's depth is valuable. If results depend on several channels and the site working together, integration matters more, and you either need a partner who provides it or someone in-house who does.",
      },
      {
        q: "How do we leave an agency relationship cleanly?",
        a: "Check the notice terms, confirm your company owns every account and file, and ask for documentation of campaigns, automations and tracking. Plan a short overlap with whoever takes over so performance history and learnings aren't lost.",
      },
      {
        q: "Should we bring marketing in-house instead?",
        a: "If the work is steady, central to how you compete and you know which roles you need, often yes. If you need several specialties part-time or the plan is still changing, an outside partner usually gives more range for the money.",
      },
      {
        q: "How do we evaluate a new partner before committing?",
        a: "Meet the people who will do the work, ask how they'd approach your specific problem, check how they measure and report, and start with a defined project or short initial term. How they handle scoping tells you a lot about how they'll handle the work.",
      },
    ],
    related: {
      compare: [
        "full-service-vs-specialist-agency",
        "agency-vs-in-house",
        "retainer-vs-project",
        "fractional-cmo-vs-agency",
      ],
      alternatives: ["in-house-marketing-team", "freelance-marketplaces"],
      guides: ["how-to-choose-a-marketing-agency"],
      insights: ["connected-systems"],
    },
  },
  {
    slug: "diy-website-builders",
    name: "Alternatives to DIY Website Builders",
    metaTitle: "Alternatives to Website Builders: When to Move On",
    metaDescription:
      "When a DIY website builder stops fitting, what are the alternatives? Using it better, themes with expert help, custom CMS builds and headless — compared.",
    primaryQuery: "alternatives to website builders",
    secondaryQueries: [
      "website builder alternatives",
      "outgrowing website builder",
      "website builder vs custom website",
      "move off website builder",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Alternatives",
      title: ["Outgrowing your builder?", "Rebuilding isn't the only answer."],
      lead:
        "Hosted website builders are the right tool for many businesses. When the site's job grows past what they allow, there are several ways forward — from using the builder better to a fully custom build.",
    },
    replacing: {
      heading: "Builders are good at what they're for. The limits show as the job grows.",
      body: [
        "Hosted, drag-and-drop website builders solve a real problem. They let a small team publish a professional-looking site quickly, without developers, hosting decisions or ongoing maintenance. For many businesses they remain the right choice, and moving off one is not automatically an upgrade.",
        "The friction appears as the site's job gets bigger. Marketing wants landing pages assembled from reusable components rather than duplicated one-offs. SEO needs control over templates, URLs, structured data or performance that the builder doesn't expose. Sales needs forms connected properly to the CRM. Content grows past what page-by-page editing handles well, or several people need to publish with roles and approvals. And the design starts to look like the template it came from.",
        "When that happens, there are several paths forward, and not all of them involve starting over. The right one depends on which limit you've actually hit.",
      ],
    },
    reasons: [
      "Limited control over templates, URLs, metadata or structured data",
      "Page speed you can't improve because the platform controls the code",
      "CRM, automation or product-data integrations that are fragile or missing",
      "A design that's hard to tell apart from other sites on the same templates",
      "Content that has outgrown page-by-page editing",
      "Several editors who need roles, workflows and approvals",
    ],
    options: [
      {
        name: "Stay, and use the builder better",
        bestFor:
          "Sites whose problems come from how the builder is being used — weak structure, cluttered pages, slow images — rather than hard platform limits.",
        tradeoffs:
          "The cheapest and fastest option, and often underrated. A designer or developer who knows the platform can fix a lot. But genuine ceilings on code, data and integrations remain.",
      },
      {
        name: "A premium theme with expert customization",
        bestFor:
          "Smaller sites that need better design and structure on a modest budget, usually on an established open-source or hosted CMS.",
        tradeoffs:
          "Faster and cheaper than custom work, but you inherit the theme's code and constraints. Plugins add features and also add maintenance, performance and security upkeep.",
      },
      {
        name: "A custom build on a traditional CMS",
        bestFor:
          "Marketing sites that need their own design system, flexible page building and proper control over SEO and integrations, without heavy engineering.",
        tradeoffs:
          "More upfront design and development, and someone has to maintain it. The choice of CMS and the quality of the build matter more than the label on either.",
      },
      {
        name: "A headless CMS with a custom front end",
        bestFor:
          "Sites that sit close to a product, need very fast performance, serve several channels or handle complex data — with developers available to support them.",
        tradeoffs:
          "The most flexible option and very fast when done well, but the most expensive and the most dependent on engineering. Editors can lose visual editing convenience unless it's deliberately built back in.",
      },
      {
        name: "A studio-led build, like ours",
        bestFor:
          "Companies whose website is a core sales and brand asset and who want positioning, content, design and engineering handled as one project.",
        tradeoffs:
          "A significant investment with a timeline measured in weeks to months. It's more than a simple brochure site needs — if a builder serves you well, keep it.",
      },
    ],
    howToDecide: [
      "List the specific limits you've hit. If they're about design or content, the builder may still work. If they're about control of code, data or integrations, it probably won't.",
      "Decide who will maintain the site afterward. More flexibility means more ongoing care, and someone has to own it.",
      "Treat any platform change as a migration. URLs and templates change, and organic traffic depends on redirects and careful testing.",
      "Match the platform to the people who publish. The best system is one your marketing team can use without filing a ticket for every change.",
      "Compare the full cost over several years — hosting, licenses, plugins, maintenance and the next redesign — not just the build price.",
    ],
    faqs: [
      {
        q: "Will moving off a website builder improve our SEO?",
        a: "Not by itself. Builder sites can rank well. Moving helps only when the builder is blocking something specific — technical control, performance, templates at scale — and a poorly handled migration can cost traffic rather than gain it.",
      },
      {
        q: "Can we keep our domain if we change platforms?",
        a: "Yes. Domains are independent of the platform that hosts the site. What changes is the DNS configuration and, usually, the URL structure, which is why redirects need planning before launch.",
      },
      {
        q: "How long does a custom website take?",
        a: "It depends on scope. A small marketing site can take a matter of weeks; a larger site with new content, integrations and a design system usually takes a quarter or more. Content is often the longest part, not the code.",
      },
      {
        q: "Is a headless CMS worth it for a marketing site?",
        a: "Sometimes. It makes sense when performance, multiple channels or product integration really matter and you have developers to support it. For a straightforward marketing site, a well-built traditional CMS is often simpler to run.",
      },
      {
        q: "Will we still be able to edit the site ourselves?",
        a: "You should. Any alternative worth choosing gives your team a way to publish and update pages without a developer — reusable components, sensible permissions and a preview before anything goes live.",
      },
    ],
    related: {
      services: ["web-design", "seo"],
      solutions: ["website-redesign"],
      useCases: ["website-migration"],
      guides: ["website-migration-seo-checklist", "landing-page-optimization"],
      insights: ["website-as-operating-system"],
      work: ["the-relaunch"],
    },
  },
  {
    slug: "freelance-marketplaces",
    name: "Alternatives to Freelance Marketplaces",
    metaTitle: "Alternatives to Freelance Marketplaces for Marketing",
    metaDescription:
      "Looking beyond freelance marketplaces? Compare direct freelancers, vetted networks, specialist agencies, studios and in-house hires, with honest tradeoffs.",
    primaryQuery: "alternatives to freelance marketplaces",
    secondaryQueries: [
      "freelance marketplace alternatives",
      "alternatives to freelance platforms",
      "vetted freelance network vs agency",
      "where to hire marketing freelancers",
    ],
    updated: "2026-09-29",
    hero: {
      eyebrow: "Alternatives",
      title: ["Hiring is the easy part.", "Connecting the work isn't."],
      lead:
        "Freelance marketplaces make it quick to find people. Getting consistent quality and a connected program out of them is harder. Here are the realistic alternatives, and what each trades away.",
    },
    replacing: {
      heading: "Marketplaces make hiring fast. Managing the work is another matter.",
      body: [
        "Freelance marketplaces give you fast access to a very large pool of talent, flexible terms and clear pricing. For a well-defined task with a clear brief — a logo refresh, a batch of product descriptions, a one-off landing page — they can work very well, and there's no reason to replace them.",
        "The problems usually appear as the work gets bigger or more connected. Vetting takes time, and profiles and ratings don't always predict how someone performs on your project. Good freelancers get booked up or move on, taking context with them. And a marketing program assembled from several independent contractors — a designer here, a copywriter there, someone running ads — needs someone to set direction, write briefs, connect the pieces and check the quality. On a marketplace, that someone is you.",
        "Companies looking for alternatives are usually trying to get more consistent quality, less coordination work, or both. Different options deliver different amounts of each.",
      ],
    },
    reasons: [
      "Time spent screening profiles and running trial projects",
      "Quality that varies from one hire to the next",
      "Freelancers who become unavailable partway through a project",
      "No one responsible for how separate pieces of work fit together",
      "Platform fees and terms that shape the working relationship",
      "Context that has to be rebuilt every time someone new starts",
    ],
    options: [
      {
        name: "Direct relationships with trusted freelancers",
        bestFor:
          "Ongoing work where you've found people you trust — often through referrals, professional communities or past colleagues.",
        tradeoffs:
          "Better continuity and no platform in the middle, but you still coordinate everything, and the program depends on a few individuals' availability.",
      },
      {
        name: "A curated or vetted talent network",
        bestFor:
          "Companies that want pre-screened specialists without running a long search themselves.",
        tradeoffs:
          "Screening lowers the risk of a bad hire, usually at higher rates. You're still managing individual contractors, and integration is still your job.",
      },
      {
        name: "A specialist agency",
        bestFor:
          "A single channel that needs consistent depth, coverage when people are away, and quality control built in.",
        tradeoffs:
          "More continuity and review than individual freelancers, at a higher cost. It covers one channel, so connecting it to everything else stays with you.",
      },
      {
        name: "An integrated studio or agency, like us",
        bestFor:
          "Work spanning several disciplines where direction and integration matter as much as execution — a relaunch, a growth program, a measurement overhaul.",
        tradeoffs:
          "Costs more than individual freelancers and is a poor fit for small, one-off tasks. You still need an internal owner who sets priorities and makes decisions.",
      },
      {
        name: "A part-time or full-time hire",
        bestFor:
          "Recurring work that fills a meaningful part of someone's week and benefits from deep product and customer context.",
        tradeoffs:
          "The most context and continuity, but slow to recruit and a fixed cost. One person rarely covers every skill the work requires.",
      },
    ],
    howToDecide: [
      "Separate tasks from programs. Single, well-briefed tasks suit marketplaces; connected programs need someone coordinating them.",
      "Price the coordination. Include the hours you spend briefing, reviewing and stitching work together when you compare costs.",
      "Pay for continuity where context matters most. Brand, analytics and ongoing campaigns suffer most from turnover.",
      "Keep ownership of files, accounts and credentials in your company, whoever does the work.",
      "Mix models. Many teams keep a bench of trusted freelancers for production and use a senior lead or agency for direction.",
    ],
    faqs: [
      {
        q: "Are freelancers cheaper than an agency?",
        a: "Per hour, usually yes. The total cost depends on how much time you spend finding, briefing, reviewing and replacing them, and on how much rework happens when pieces don't fit. For small, well-defined tasks freelancers are often the better value.",
      },
      {
        q: "What is a vetted freelance network?",
        a: "A service that screens freelancers before introducing them to clients, typically through portfolio review, interviews or test projects. It reduces the time and risk of hiring, usually in exchange for higher rates.",
      },
      {
        q: "Can an agency work with our existing freelancers?",
        a: "Yes. We can set direction, write briefs and review work while your freelancers keep producing. That combination is often a sensible way to add senior oversight without replacing people who are doing good work.",
      },
      {
        q: "How do we protect our company when hiring freelancers?",
        a: "Use written agreements that cover scope, payment and ownership of the work, keep accounts and files under your company's control, and remove access when the engagement ends. Have your own legal counsel review contract terms.",
      },
      {
        q: "When is a marketplace still the right choice?",
        a: "When the task is well defined, doesn't depend on much context and has a clear finish line. For that kind of work, the speed and flexibility of a marketplace are hard to beat.",
      },
    ],
    related: {
      compare: ["agency-vs-freelancers", "full-service-vs-specialist-agency", "retainer-vs-project"],
      alternatives: ["in-house-marketing-team", "traditional-marketing-agency"],
      useCases: ["in-house-team-support"],
      guides: ["how-to-choose-a-marketing-agency"],
    },
  },
];
