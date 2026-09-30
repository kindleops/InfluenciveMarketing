import type { AnswerPage } from "../types";

/** Answer pages: SEO. One question per page; see docs/search/keyword-map.md. */
export const seoAnswers: AnswerPage[] = [
  {
    slug: "how-much-does-seo-cost",
    question: "How much does SEO cost?",
    topic: "SEO",
    metaTitle: "How Much Does SEO Cost? What Sets the Price",
    metaDescription:
      "SEO costs what it takes to close the gap between your site and the ones already ranking. What drives the price, how firms bill, and how to set a budget.",
    primaryQuery: "how much does seo cost",
    secondaryQueries: [
      "how much does seo cost per month",
      "how much does seo cost for a small business",
      "how much do seo companies charge",
      "how much do marketing agencies charge for seo",
    ],
    updated: "2026-09-30",
    shortAnswer:
      "SEO costs whatever it takes to close the gap between your site and the sites already ranking for the searches you want, so there is no single honest price. The cost depends on how competitive those searches are, how much technical repair your site needs, how much new content you have to publish, and whether the work is done in-house, by a freelancer, or by an agency on a monthly retainer.",
    keyPoints: [
      "Scope sets the price: competition, technical debt and content volume matter more than any rate card.",
      "Ongoing SEO is usually billed as a monthly retainer; audits and migrations are usually quoted as fixed projects.",
      "Start the budget from what a new customer is worth to you, then work out how many you need to break even.",
      "A cheap retainer that buys a report and a couple of articles can cost more than it returns.",
      "Treat any promise of a specific ranking as a warning sign; nobody outside Google controls results.",
    ],
    sections: [
      {
        heading: "What drives the cost of SEO?",
        body: [
          "Two businesses can ask for SEO and need completely different amounts of work. A plumber competing in one suburb and a software company chasing national searches against funded rivals are not buying the same thing, even if both invoices say SEO.",
          "Before comparing quotes, get clear on which of these apply to you. They explain most of the difference between a small engagement and a large one.",
        ],
        list: [
          "Competition: who ranks today, and how much content and authority they have built.",
          "Site condition: indexing problems, slow templates, broken redirects or a platform that fights you.",
          "Content gap: how many useful pages you need that don't exist yet.",
          "Authority gap: whether you need links and mentions you haven't earned.",
          "Geography: one town, many locations, or a whole country.",
          "Who does it: your own time, a freelancer, or a team with technical, editorial and outreach roles.",
        ],
      },
      {
        heading: "How do SEO companies charge?",
        body: [
          "Most firms use one of four billing models. The model matters less than what it buys, so ask every provider to describe the month in hours, deliverables and named people.",
        ],
        table: {
          caption: "Common ways SEO work is billed",
          columns: ["Model", "How it works", "Fits when", "Watch for"],
          rows: [
            ["Monthly retainer", "A fixed fee for an agreed scope of ongoing work", "You need steady technical, content and link work", "Vague scope that drifts into reporting only"],
            ["Fixed project", "One price for a defined deliverable", "Audits, migrations, a content build", "Nothing planned for after handover"],
            ["Hourly consulting", "Advice billed by the hour", "Your team does the work and needs direction", "Hours without clear outputs"],
            ["Performance-based", "Fees tied to rankings or traffic", "Rarely a good fit", "Incentives to chase easy, low-value terms"],
          ],
        },
      },
      {
        heading: "How do you work out what SEO is worth to you?",
        body: [
          "Work backwards from customer value instead of forwards from a quote. Take a firm whose average new client is worth $8,000 in gross profit in the first year. If an SEO program costs $5,000 a month, or $60,000 a year, it breaks even at a little under eight new clients from organic search over that year.",
          "Then test whether that is realistic. If one in fifty organic visitors enquires and one in four enquiries becomes a client, eight clients need about 1,600 additional qualified visits across the year. If the searches you can win don't carry that much demand, the budget is wrong, or SEO is the wrong channel for now.",
          "Allow for the lag. The first months are mostly spent on fixes and publishing, so judge the investment over a year or more, not a quarter.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does SEO cost per month?",
        a: "A monthly fee is only meaningful next to what it buys. Ask how many hours go to technical work, content and outreach, and who does each. Two retainers at the same price can differ several times over in real output.",
      },
      {
        q: "How much does SEO cost for a small business?",
        a: "Less, usually, when the business serves one area and competes with other local firms rather than national brands. The essentials are a sound site, clear service pages, a complete Google Business Profile and a steady flow of reviews. Much of that can be done in-house with some expert review.",
      },
      {
        q: "How much do SEO companies charge?",
        a: "Pricing varies with scope, seniority and location, so published price lists tell you little. Compare quotes on the same brief, ask for a written monthly scope, and be cautious of any fee low enough that it can only cover automated reports.",
      },
      {
        q: "How much do marketing agencies charge for SEO?",
        a: "Full-service agencies often fold SEO into a wider retainer alongside paid media or content. Ask what share of the fee and hours goes to SEO specifically, and whether a specialist does the work or it is handled by generalists.",
      },
    ],
    related: {
      services: ["seo", "local-seo"],
      answers: ["how-long-does-seo-take", "is-seo-worth-it", "how-much-does-local-seo-cost"],
      compare: ["retainer-vs-project", "seo-vs-ppc"],
    },
  },
  {
    slug: "how-long-does-seo-take",
    question: "How long does SEO take to work?",
    topic: "SEO",
    metaTitle: "How Long Does SEO Take to Work? A Realistic Timeline",
    metaDescription:
      "SEO usually takes several months to show meaningful results. What speeds it up, what slows it down, and which early signals tell you it's working.",
    primaryQuery: "how long does seo take",
    secondaryQueries: [
      "how long does seo take to see results",
      "how long does seo take to work for a new website",
      "how long does seo take to kick in",
      "how long does seo take to rank",
    ],
    updated: "2026-09-30",
    shortAnswer:
      "SEO usually takes several months to produce meaningful results, and often a year or more to reach its full effect. How long it takes depends on where your site starts: an established site fixing technical problems can see movement within weeks of Google recrawling it, while a new domain competing for crowded searches needs time to publish depth, earn links and build the trust that lets pages rank.",
    keyPoints: [
      "Technical fixes can show results within weeks, once Google recrawls the affected pages.",
      "New pages generally need months to settle into stable positions.",
      "New domains are slowest, because links and trust accumulate gradually.",
      "Crowded searches take longer than specific ones, however hard you work.",
      "Early progress shows in impressions and indexed pages well before it shows in revenue.",
    ],
    sections: [
      {
        heading: "What determines how fast SEO works?",
        body: [
          "Google's own guidance on hiring an SEO describes a span of four months to a year to put improvements in place and start seeing benefit. That is a fair starting expectation, but your timeline depends on a handful of conditions you can assess up front.",
        ],
        list: [
          "Starting authority: an older site with real links moves faster than a new one.",
          "Competition: the depth and reputation of the pages already ranking.",
          "Technical state: pages blocked from indexing gain nothing until they are unblocked.",
          "Publishing pace: a steady run of useful pages compounds; sporadic posts don't.",
          "Crawl frequency: sites Google visits often get changes picked up sooner.",
        ],
      },
      {
        heading: "What does a realistic timeline look like?",
        body: [
          "The sequence below is illustrative, for an established site with some existing traffic. Treat it as the order things tend to happen, not a schedule anyone can promise.",
        ],
        table: {
          caption: "An illustrative SEO timeline for an established site",
          columns: ["Period", "What usually happens", "Signal to watch"],
          rows: [
            ["First weeks", "Audit, indexing fixes, redirects repaired", "More pages indexed in Search Console"],
            ["Months one to three", "New and improved pages get crawled", "Impressions rise on specific, long-tail searches"],
            ["Months three to six", "Positions firm up on less competitive terms", "First organic enquiries or sales you can attribute"],
            ["Beyond six months", "Authority builds; broader terms become reachable", "Leads and revenue from organic grow month over month"],
          ],
        },
      },
      {
        heading: "How long does SEO take to work for a new website?",
        body: [
          "Longer. A new domain has no history, few or no links, and nothing for Google to judge it on yet. Even excellent pages can sit on page three while the site earns a track record with searchers and other sites.",
          "The way through is to start narrow. Target specific searches, such as a service plus a location or a precise problem, where the current results are thin. Win those, build internal links from them, and widen the targets as authority grows.",
          "If the business needs leads while that happens, run paid search alongside and use its data to learn which searches actually convert.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does SEO take to see results?",
        a: "Most sites see early signals, like more impressions and more pages indexed, within the first few months. Traffic and leads that matter to the business usually follow later, and the gains keep compounding if the work continues.",
      },
      {
        q: "How long does SEO take to kick in after I make changes?",
        a: "Small changes such as a new title or a fixed redirect can register within days to a few weeks, depending on how often Google crawls the page. You can ask Google to recrawl a specific URL through Search Console's URL Inspection tool.",
      },
      {
        q: "How long does SEO take to rank a new page?",
        a: "On an established site, a new page often gets indexed quickly but drifts for a while before its position steadies. On a new site, or for a crowded search, it can take many months. Judge a page after it has had time to settle, not in its first week.",
      },
      {
        q: "Why do rankings jump around in the first few months?",
        a: "Google is still testing where the page fits against the others competing for the same search. Movement early on is normal. Look at the trend over several weeks rather than reacting to daily changes.",
      },
    ],
    related: {
      answers: ["how-much-does-seo-cost", "is-seo-worth-it", "why-is-my-website-not-ranking"],
      services: ["seo"],
      compare: ["seo-vs-ppc"],
      playbooks: ["topic-cluster-program"],
    },
  },
  {
    slug: "is-seo-worth-it",
    question: "Is SEO worth it?",
    topic: "SEO",
    metaTitle: "Is SEO Worth It? When It Pays Off and When It Doesn't",
    metaDescription:
      "SEO is worth it when people search for what you sell, customers are worth enough to fund the wait, and you can give it time. How to judge your own case.",
    primaryQuery: "is seo worth it",
    secondaryQueries: [
      "is seo worth it for small business",
      "is seo worth it in 2026",
      "does seo still work",
      "is seo worth it for ecommerce",
      "why is seo important for business",
    ],
    updated: "2026-09-30",
    shortAnswer:
      "SEO is worth it when people already search for what you sell, a new customer is worth enough to fund months of upfront work, and you can wait for results to compound. It usually isn't worth it yet when search demand is tiny, when you need leads this month, or when thin margins can't carry a slow payback. AI answers have changed which searches send clicks, not whether search matters.",
    keyPoints: [
      "Whether SEO pays depends on search demand, customer value and how long you can wait.",
      "Organic traffic keeps arriving after the work is done; paid clicks stop when spending stops.",
      "AI Overviews absorb simple factual questions, while commercial and local searches still send clicks.",
      "Ecommerce and local service businesses often have the clearest case, because the intent is explicit.",
      "If revenue has to arrive within weeks, paid search is the better first move.",
    ],
    sections: [
      {
        heading: "When is SEO worth it, and when isn't it?",
        body: [
          "Run your business against these signals. If most land in the left column, SEO deserves a real budget. If most land on the right, fix those first or put the money elsewhere for now.",
        ],
        table: {
          caption: "Signals that SEO will or won't pay back",
          columns: ["Signal", "Leans worth it", "Leans not yet"],
          rows: [
            ["Search demand", "People search for your service or product by name", "Buyers don't know the category exists"],
            ["Customer value", "A customer is worth well over the cost of acquiring them", "Margins are too thin to fund a long payback"],
            ["Time horizon", "You can invest for a year before judging", "You need leads this month"],
            ["Website", "The site converts visitors you already get", "Visitors arrive and leave without acting"],
            ["Competition", "Results include pages you could realistically beat", "Every result is a marketplace or national brand"],
          ],
        },
      },
      {
        heading: "Does SEO still work now that AI answers questions?",
        body: [
          "Yes, with a different shape. Google's AI Overviews and assistants like ChatGPT now answer many simple informational questions directly, so fewer of those searches end in a click. Searches where someone wants to compare, buy, book or hire still lead people to websites.",
          "AI answers also draw on pages that are crawlable, clear and well regarded, which is what SEO has always built. A site that ranks and explains things plainly is the site those systems tend to cite.",
          "The practical change is in what you measure. Track enquiries and sales from organic search, not total traffic, because the informational clicks that are disappearing were rarely the ones that paid.",
        ],
      },
      {
        heading: "How do you decide for your own business?",
        body: ["A short piece of homework gives you a better answer than any general rule."],
        list: [
          "Check demand: use Google's Keyword Planner and your Search Console data to see what people search and how often.",
          "Value a customer: gross profit over a realistic lifetime, not the first order.",
          "Test conversion: a small paid search test shows whether those searchers actually buy from you.",
          "Estimate payback: how many organic customers per year cover the cost, and how long it takes to get there.",
          "Decide the horizon: commit for at least a year, or don't start.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is SEO worth it for a small business?",
        a: "Often, especially for local service businesses whose customers search for a service in their area. The fundamentals are affordable and much of the value comes from the Google Business Profile, reviews and a handful of strong service pages rather than large content programs.",
      },
      {
        q: "Is SEO worth it in 2026?",
        a: "For most businesses with real search demand, yes. What has changed is that simple informational queries send fewer clicks, so the value sits in commercial, local and comparison searches and in being a source AI answers cite.",
      },
      {
        q: "Is SEO worth it for ecommerce?",
        a: "Usually, because shoppers search for specific products and categories with clear intent to buy. The work leans on category page structure, product data, faceted navigation that doesn't create endless duplicate URLs, and page speed.",
      },
      {
        q: "Why is SEO important for business?",
        a: "It puts you in front of people at the moment they are looking for what you sell, without paying for each visit. Over time it lowers blended acquisition cost and gives you a channel that doesn't disappear when an ad budget is cut.",
      },
    ],
    related: {
      answers: ["how-much-does-seo-cost", "how-long-does-seo-take", "will-ai-replace-seo"],
      compare: ["seo-vs-ppc"],
      research: ["organic-search-after-ai-overviews"],
      industries: ["ecommerce"],
    },
  },
  {
    slug: "what-does-an-seo-agency-do",
    question: "What does an SEO agency do?",
    topic: "SEO",
    metaTitle: "What Does an SEO Agency Do? The Work, Month by Month",
    metaDescription:
      "An SEO agency improves how often your site appears in organic search: technical fixes, keyword research, content, links and reporting. What to expect.",
    primaryQuery: "what does an seo agency do",
    secondaryQueries: ["what does an seo company do", "what does an seo specialist do"],
    updated: "2026-09-30",
    shortAnswer:
      "An SEO agency improves how often and how prominently your website appears in organic search results for the searches your customers make. In practice that means auditing and fixing technical problems, researching what buyers search, planning and producing content, improving pages that already rank, earning links and mentions, and reporting on traffic and leads. How much of that a given agency actually does varies widely, so check the scope before signing.",
    keyPoints: [
      "The core work is technical fixes, keyword research, content, on-page changes, links and reporting.",
      "A specialist is one person; an agency combines strategy, technical, editorial and outreach roles.",
      "Good agencies report on enquiries and revenue from organic search, not rankings alone.",
      "No agency controls Google's results, so promises of specific positions are a red flag.",
      "You still supply subject knowledge, approvals and access to your developers or CMS.",
    ],
    sections: [
      {
        heading: "What work does an SEO agency do each month?",
        body: [
          "The mix shifts over an engagement. Early months lean on diagnosis and repair; later months lean on publishing and authority. A capable agency covers all of these, or tells you plainly which it doesn't.",
        ],
        list: [
          "Technical SEO: crawling, indexing, redirects, site speed, structured data and rendering checks.",
          "Research: which searches matter, what intent sits behind them and who ranks today.",
          "Architecture: how pages are grouped and linked so authority reaches the ones that convert.",
          "Content: briefs, writing or editing, and updating pages that have gone stale.",
          "On-page work: titles, headings, internal links and copy on existing pages.",
          "Authority: digital PR and outreach that earn links and mentions from relevant sites.",
          "Reporting: organic traffic, enquiries and revenue, with notes on what changed and why.",
        ],
      },
      {
        heading: "Agency, company or specialist: what's the difference?",
        body: [
          "SEO agency and SEO company mean the same thing in practice. The real choice is between a single specialist, a dedicated SEO firm, a full-service marketing agency or someone on your own payroll.",
        ],
        table: {
          caption: "Ways to get SEO done",
          columns: ["Option", "Strength", "Limitation"],
          rows: [
            ["Freelance specialist", "Direct access to one experienced person", "Limited capacity; gaps outside their skill set"],
            ["SEO agency or company", "Several disciplines under one roof", "Quality depends on who is actually assigned"],
            ["Full-service agency", "SEO coordinated with paid, web and content", "SEO can get diluted inside a broad retainer"],
            ["In-house hire", "Deep knowledge of the business", "One person rarely covers technical, content and outreach"],
          ],
        },
      },
      {
        heading: "What does a good first quarter look like?",
        body: [
          "You should see decisions and shipped work early, not just a long audit. By the end of the first quarter, most of this should be done.",
          "If three months pass with only reports and no changes live on the site, raise it. The value of SEO comes from what gets published and fixed.",
        ],
        list: [
          "Access to Search Console, analytics, the CMS and a developer contact.",
          "An audit reduced to a ranked shortlist of problems.",
          "The first technical fixes live and annotated.",
          "A content plan tied to specific searches and pages.",
          "A baseline report showing where organic leads come from today.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does an SEO company do?",
        a: "The same work as an SEO agency: technical repair, research, content, links and reporting aimed at more qualified organic traffic. The label says nothing about quality, so judge a company by its scope, its people and how it measures results.",
      },
      {
        q: "What does an SEO specialist do?",
        a: "A specialist is an individual practitioner, freelance or in-house, who handles some or all of the SEO work. Many specialize further, in technical SEO, content or link building, so check which part of the job their experience actually covers.",
      },
      {
        q: "How do you tell a good SEO agency from a weak one?",
        a: "Good agencies explain their reasoning, name the people doing the work, ship changes early and report on business outcomes. Weak ones sell packages by the number of links or articles and lean on ranking screenshots.",
      },
      {
        q: "Do I need an agency, or can I do SEO myself?",
        a: "Small sites in modest markets can often be handled in-house with occasional expert help. Larger sites, crowded markets and migrations are where an experienced team usually saves more than it costs.",
      },
    ],
    related: {
      services: ["seo"],
      answers: ["can-i-do-seo-myself", "how-much-does-seo-cost"],
      guides: ["how-to-choose-a-marketing-agency", "technical-seo-audit"],
      compare: ["agency-vs-freelancers"],
    },
  },
  {
    slug: "can-i-do-seo-myself",
    question: "Can I do SEO myself?",
    topic: "SEO",
    metaTitle: "Can I Do SEO Myself? Yes, Here's Where It Gets Hard",
    metaDescription:
      "Yes, you can do SEO yourself on a small site in a modest market. The steps to follow, the free tools to use, and the jobs where outside help pays off.",
    primaryQuery: "can i do seo myself",
    secondaryQueries: ["how to do seo yourself", "can i do seo on my own", "can i do search engine optimization myself"],
    updated: "2026-09-30",
    shortAnswer:
      "Yes, you can do SEO yourself, and for a small local business or a new site in a modest market the fundamentals are learnable: a site Google can crawl, pages that answer what customers search, a complete Google Business Profile and a steady stream of reviews. Doing it alone gets harder when the site is large, the searches are crowded, a migration is involved, or your hours are worth more than the cost of help.",
    keyPoints: [
      "The fundamentals are free to learn, and the essential tools, like Google Search Console, cost nothing.",
      "Doing it yourself works best on small sites in local or low-competition markets.",
      "Migrations, large catalogs and JavaScript-heavy sites are where mistakes get expensive.",
      "A few steady hours every week beat occasional weekend bursts.",
      "Paying for an expert audit, then doing the work yourself, is a sensible middle path.",
    ],
    sections: [
      {
        heading: "How do you do SEO yourself, step by step?",
        body: [
          "Work through these in order. Each one builds on the last, and the early steps catch problems that would make the later ones pointless.",
        ],
        list: [
          "Verify your site in Google Search Console and Bing Webmaster Tools.",
          "Check the Pages report for anything important that isn't indexed, and find out why.",
          "List the searches a customer would type, in their words, not your industry's.",
          "Give each distinct intent its own page, with a clear title and heading that match it.",
          "Link related pages to each other so visitors and crawlers can move between them.",
          "If you serve a local area, complete your Google Business Profile and ask every happy customer for a review.",
          "Earn mentions from local press, suppliers, associations and partners.",
          "Review Search Console monthly: which pages gain impressions, and which searches you nearly rank for.",
        ],
      },
      {
        heading: "What can you handle alone, and what needs help?",
        body: [
          "The dividing line is usually technical risk. Anything where a mistake can remove pages from Google, or where the fix lives in code, is worth an expert's eye.",
        ],
        table: {
          caption: "Which SEO tasks suit doing it yourself",
          columns: ["Task", "Do it yourself?", "Why"],
          rows: [
            ["Search Console setup", "Yes", "Guided, free and low risk"],
            ["Writing service or product pages", "Yes", "You know the subject better than anyone"],
            ["Google Business Profile and reviews", "Yes", "Mostly consistency and follow-through"],
            ["Crawl or rendering problems", "Often needs help", "Diagnosis and fixes usually sit in code"],
            ["Redesign or platform migration", "Get help", "Missed redirects can wipe out rankings"],
            ["Large catalogs or templated pages", "Get help", "Duplication and crawl waste scale quickly"],
          ],
        },
      },
      {
        heading: "What does doing SEO yourself really cost?",
        body: [
          "The software is cheap; the time is not. Take an owner who bills $150 an hour and spends five hours a week on SEO. Over a year that is roughly 260 hours, or about $39,000 of time that could have gone to paying work.",
          "That can still be the right call if you enjoy it and the market is small. But compare it honestly with the cost of help, and remember that time spent learning by trial and error is part of the bill.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I do SEO on my own with no experience?",
        a: "Yes. Google's own SEO Starter Guide and Search Console's reports are a solid foundation, and most small sites need clarity and consistency more than advanced technique. Start with indexing and your most important pages before anything else.",
      },
      {
        q: "Can I do search engine optimization myself on WordPress, Wix or Squarespace?",
        a: "Yes. These platforms handle much of the technical baseline, such as sitemaps and mobile layouts, and let you edit titles and descriptions. Your effort goes into page content, structure and internal links.",
      },
      {
        q: "What free tools do I need to do SEO myself?",
        a: "Google Search Console, Bing Webmaster Tools, Google Business Profile if you serve a local area, and PageSpeed Insights. Google Keyword Planner is free with an Ads account and gives rough search volumes.",
      },
      {
        q: "When should I stop doing it myself and hire help?",
        a: "When traffic stalls despite steady work, before any redesign or migration, or when the time you spend costs more than help would. Many owners start with a one-off audit to get a prioritized list.",
      },
    ],
    related: {
      answers: ["what-does-an-seo-agency-do", "why-is-my-website-not-ranking", "what-is-technical-seo"],
      guides: ["technical-seo-audit"],
      services: ["seo", "local-seo"],
    },
  },
  {
    slug: "why-is-my-website-not-ranking",
    question: "Why is my website not ranking on Google?",
    topic: "SEO",
    metaTitle: "Why Is My Website Not Ranking on Google? Five Causes",
    metaDescription:
      "Websites usually fail to rank because pages aren't indexed, miss search intent, lack authority or hit a technical block. How to find which one is yours.",
    primaryQuery: "why is my website not ranking on google",
    secondaryQueries: ["why is my website not ranking", "how to improve your seo ranking", "how to rank higher on google search"],
    updated: "2026-09-30",
    shortAnswer:
      "A website usually isn't ranking on Google for one of five reasons: Google can't find or index the pages, the pages don't match what searchers want, stronger sites already own the results, the site lacks the links and reputation to compete, or a technical or manual problem is holding it back. Google Search Console shows which one applies, so check there before changing anything.",
    keyPoints: [
      "Check indexing first; a page Google hasn't indexed cannot rank at all.",
      "Match the format already ranking, whether that's a guide, product page, local listing or tool.",
      "New sites rarely win broad terms early; specific, long-tail searches come first.",
      "Authority comes from links and mentions on relevant, real websites.",
      "Rule out noindex tags, robots.txt blocks and manual actions before rewriting content.",
    ],
    sections: [
      {
        heading: "How do you diagnose why a site isn't ranking?",
        body: [
          "Start from the symptom, not a checklist. What you see in Search Console narrows the cause quickly and stops you fixing things that aren't broken.",
        ],
        table: {
          caption: "Ranking symptoms and where to look",
          columns: ["What you see", "Likely cause", "Where to check"],
          rows: [
            ["Not found even for your brand name", "Not indexed, blocked by robots.txt or a noindex tag", "Search Console Pages report and URL Inspection"],
            ["Indexed, but almost no impressions", "Targeting searches nobody makes, or the wrong intent", "Performance report, filtered by page"],
            ["Impressions, but stuck beyond page two", "Weaker content or authority than current results", "Compare your page with the top results"],
            ["Sudden drop after steady rankings", "Site change, migration, core update or manual action", "Manual actions report and your change log"],
            ["Good positions, few clicks", "Weak titles, or ads and AI Overviews above you", "Click-through rate in the Performance report"],
          ],
        },
      },
      {
        heading: "What are the most common fixes?",
        body: [
          "Most ranking problems trace back to a short list. Work through the ones your diagnosis points to, and change one thing at a time where you can so you know what helped.",
        ],
        list: [
          "Remove accidental noindex tags and robots.txt blocks, often left over from a staging site.",
          "Merge thin or overlapping pages that compete for the same search.",
          "Rewrite pages to answer the searcher's actual question near the top.",
          "Add internal links from your strongest pages to the ones you want to rank.",
          "Fix slow, broken or badly redirected templates.",
          "Earn links through useful resources, partnerships and genuine press coverage.",
        ],
      },
      {
        heading: "How do you rank higher on Google search once the basics are fixed?",
        body: [
          "Once Google can index your pages and they match intent, ranking higher is mostly about being the most useful and most trusted result. Look at what the top pages cover, and find what they leave out: a clearer answer, original examples, firsthand detail or better structure.",
          "Keep pages current, build clusters of related content that link together, and earn references from sites your customers already respect. Progress here is gradual, so measure it in months.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my website not ranking even though it's indexed?",
        a: "Being indexed only means Google has stored the page. It ranks when Google judges it more relevant and trustworthy than the alternatives. Compare your page with the current top results for intent, depth and authority.",
      },
      {
        q: "How do I improve my SEO ranking quickly?",
        a: "The fastest gains usually come from removing technical blocks, improving titles on pages that already get impressions, and adding internal links to pages sitting just off page one. Deeper gains take longer.",
      },
      {
        q: "How long after fixing problems will my rankings improve?",
        a: "Fixes register after Google recrawls the pages, which can take days to weeks. Positions often take longer to settle, particularly for competitive searches.",
      },
      {
        q: "Could a redesign have caused my rankings to drop?",
        a: "Yes, and it is one of the most common causes of a sudden drop. Changed URLs without redirects, removed content and leftover noindex tags from staging are the usual culprits.",
      },
    ],
    related: {
      answers: ["how-to-get-on-the-first-page-of-google", "what-is-technical-seo", "does-website-redesign-affect-seo"],
      guides: ["technical-seo-audit"],
      useCases: ["organic-traffic-drop"],
      services: ["seo"],
    },
  },
  {
    slug: "how-to-get-on-the-first-page-of-google",
    question: "How do you get on the first page of Google?",
    topic: "SEO",
    metaTitle: "How to Get on the First Page of Google",
    metaDescription:
      "To reach page one of Google, choose searches you can win, publish the best answer, make it indexable and earn trust. Plus the faster route for local firms.",
    primaryQuery: "how to get on the first page of google",
    secondaryQueries: [
      "how to get my website on the first page of google",
      "how to get your business on the first page of google",
      "how to be on the first page of google search",
    ],
    updated: "2026-09-30",
    shortAnswer:
      "To get on the first page of Google, choose searches you can realistically win, publish the page that best answers each one, make sure Google can crawl and index it, and earn enough links and mentions to be trusted over the pages already there. For a local business, a complete Google Business Profile and a steady flow of reviews can put you in the map results on page one sooner than organic rankings will.",
    keyPoints: [
      "Pick specific searches you can win before chasing broad, crowded ones.",
      "The current first page shows you the format and depth Google rewards for that search.",
      "Page one holds ads, map results and AI Overviews as well as organic links.",
      "Google Ads is the only immediate route, and it ends when the spending does.",
      "No one can promise a first-page position, because no one outside Google controls the results.",
    ],
    sections: [
      {
        heading: "What's actually on the first page of Google now?",
        body: [
          "The first page is no longer ten blue links. Depending on the search, it can include several kinds of result, and each has its own route in.",
        ],
        table: {
          caption: "Result types on Google's first page",
          columns: ["Result type", "Best suited to", "How you get there"],
          rows: [
            ["Sponsored ads", "Anyone needing visibility now", "Google Ads bidding; labelled as sponsored"],
            ["Map results", "Businesses serving a local area", "Google Business Profile, reviews, proximity and relevance"],
            ["Organic results", "Any site with a strong page for the search", "Relevant content, technical health, authority"],
            ["AI Overview sources", "Clear, well-structured, trusted pages", "The same fundamentals, written to be quotable"],
            ["Videos, images, shopping", "Visual products and how-to topics", "Optimized media and product feeds"],
          ],
        },
      },
      {
        heading: "How do you get your website on the first page, step by step?",
        body: [
          "Treat each target search as its own small project. The steps are the same whether you run a shop or a software company.",
        ],
        list: [
          "Search the term yourself and note what kind of pages rank and who owns them.",
          "Decide whether you can compete; if not, pick a more specific version of the search.",
          "Build one page that answers that search better than anything on page one.",
          "Confirm in Search Console that the page is indexed and has no technical issues.",
          "Link to it from relevant pages on your own site.",
          "Earn a few links or mentions from sites related to the topic.",
          "Watch impressions and average position, and improve the page as you learn.",
        ],
      },
      {
        heading: "How do you choose searches you can win?",
        body: [
          "If every result for a search is a national brand, a marketplace or a government site, a small site won't displace them soon. Add a qualifier: a location, a use case, a customer type or a comparison. Those searches are narrower, but the people making them are often closer to buying.",
          "A good target has results you can honestly beat, clear commercial intent and enough volume to matter. Win a handful of those, and the authority they bring makes the broader terms reachable later.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I get my business on the first page of Google?",
        a: "For a local business, the map results are usually the quickest way onto page one. Claim and complete your Google Business Profile, choose accurate categories, add real photos and ask customers for reviews consistently.",
      },
      {
        q: "Can I pay to be on the first page of Google?",
        a: "You can pay for ads, which appear at the top and bottom of results marked as sponsored. You cannot pay Google to rank organically, and anyone selling a paid organic placement is not telling you the truth.",
      },
      {
        q: "How long does it take to get on the first page of Google?",
        a: "For a specific, low-competition search on an established site, it can happen within weeks. For a crowded search, or on a new site, it can take many months of steady work.",
      },
      {
        q: "Is getting on the first page enough?",
        a: "Not always. Clicks concentrate toward the top of the page, and ads and AI Overviews can push organic results down. Aim for the top positions on your most valuable searches, and write pages clear enough to be cited in AI answers.",
      },
    ],
    related: {
      answers: ["why-is-my-website-not-ranking", "how-to-rank-higher-on-google-maps", "how-to-rank-in-ai-overviews", "how-much-does-google-ads-cost"],
      compare: ["seo-vs-ppc"],
      services: ["seo"],
    },
  },
  {
    slug: "what-is-programmatic-seo",
    question: "What is programmatic SEO?",
    topic: "SEO",
    metaTitle: "What Is Programmatic SEO? How It Works and When It Fails",
    metaDescription:
      "Programmatic SEO builds many search pages from one template and a dataset. How it works, which page types suit it, and why thin versions get filtered out.",
    primaryQuery: "what is programmatic seo",
    secondaryQueries: ["does programmatic seo still work", "programmatic seo pages"],
    updated: "2026-09-30",
    shortAnswer:
      "Programmatic SEO is the practice of generating many search-targeted pages from a template and a structured dataset, so each page answers one variation of a repeating query, such as a service in each city or an integration between two tools. It works when every page carries data or substance a searcher genuinely needs. Pages that only swap a keyword into the same text are treated by Google as thin or spam.",
    keyPoints: [
      "The model is a template plus a database: one layout, many rows, one page per row.",
      "It suits repeating queries where each variation has a genuinely different answer.",
      "Google's spam policies target content produced at scale mainly to rank, however it's produced.",
      "Quality thresholds decide which rows earn a page; not every combination should ship.",
      "Internal linking and crawl efficiency matter more as the page count grows.",
    ],
    sections: [
      {
        heading: "How does programmatic SEO work?",
        body: [
          "The work is mostly data and editorial judgment, with the page generation being the easy part. A typical build moves through these stages.",
        ],
        list: [
          "Find a query pattern that repeats, like a product for each use case or a service in each area.",
          "Assemble a dataset with real, distinct information for each variation.",
          "Design a template where the useful parts come from that data, not boilerplate.",
          "Set rules for when a row has enough substance to publish, and hold back the rest.",
          "Publish in batches, organized under hub pages that link to each one.",
          "Monitor how many pages get indexed and draw traffic, then prune or improve the laggards.",
        ],
      },
      {
        heading: "What separates useful programmatic pages from thin ones?",
        body: [
          "The test is simple: would the page still be worth reading if the keyword were removed from it? If the answer is no, it shouldn't exist.",
        ],
        table: {
          caption: "Programmatic page types, done well and done badly",
          columns: ["Page type", "Useful when it includes", "Thin when it's just"],
          rows: [
            ["Location pages", "Local service details, coverage, staff, reviews, pricing factors", "The city name swapped into identical copy"],
            ["Integration pages", "What syncs, setup steps, limits, use cases", "Two logos and a generic paragraph"],
            ["Comparison pages", "Real differences in features, fit and trade-offs", "An auto-filled table with no judgment"],
            ["Catalog or directory pages", "Filterable, current data a searcher can act on", "Listings copied from elsewhere"],
          ],
        },
      },
      {
        heading: "Does programmatic SEO still work?",
        body: [
          "Yes, when each page earns its place. Travel, real estate, software and marketplace sites have long ranked templated pages for repeating searches, because the underlying data answers the query.",
          "What has stopped working is volume for its own sake. Google's scaled content abuse policy targets large numbers of pages produced mainly to manipulate rankings, whether written by people, templates or AI. A section where most pages sit unindexed, or draw no impressions, is a signal to cut it back and strengthen what remains.",
        ],
      },
    ],
    faqs: [
      {
        q: "What are examples of programmatic SEO pages?",
        a: "Service-by-city pages for a multi-location business, integration pages for a software product, currency or unit conversion pages, and job or property listings by area. Each answers a query that repeats with different specifics.",
      },
      {
        q: "Is programmatic SEO the same as AI-generated content?",
        a: "No. Programmatic SEO is about structure: templates fed by data. AI can help write parts of those pages, but the value still has to come from real information, and the same quality standards apply however the text is produced.",
      },
      {
        q: "How many programmatic pages should you launch at once?",
        a: "Start with a batch big enough to learn from but small enough to review by hand. Check indexing and engagement, fix the template, then expand.",
      },
      {
        q: "Can programmatic pages hurt the rest of my site?",
        a: "They can. A large volume of low-value pages can waste crawl attention and weaken how Google sees the site overall. Keeping thresholds high and pruning pages that never get traction limits that risk.",
      },
    ],
    related: {
      services: ["seo"],
      answers: ["what-is-technical-seo"],
      playbooks: ["topic-cluster-program"],
      industries: ["multi-location", "b2b-saas"],
      guides: ["technical-seo-audit"],
    },
  },
  {
    slug: "does-website-redesign-affect-seo",
    question: "Does a website redesign affect SEO?",
    topic: "SEO",
    metaTitle: "Does a Website Redesign Affect SEO? What Changes Rankings",
    metaDescription:
      "A website redesign can affect SEO in either direction. Which changes are low risk, which cause traffic drops, and how to redesign without losing rankings.",
    primaryQuery: "does website redesign affect seo",
    secondaryQueries: ["does changing website design affect seo", "does changing your website affect seo", "website redesign seo"],
    updated: "2026-09-30",
    shortAnswer:
      "A website redesign can affect SEO significantly, in either direction. Changing only colors, fonts and layout rarely hurts rankings. Changing URLs, removing or merging pages, rewriting content, altering navigation, or moving to a new platform or domain can cause sharp traffic drops unless every old URL is redirected and the content that ranked is kept. Planned carefully, a redesign can also improve rankings.",
    keyPoints: [
      "Visual-only changes are low risk; URL, content and structure changes are where rankings move.",
      "Every old URL needs a permanent 301 redirect to its closest new equivalent.",
      "Keep content that currently ranks unless you are deliberately improving it.",
      "Crawl the staging site before launch and compare it with a crawl of the live one.",
      "Expect some movement for a few weeks while Google reprocesses the site.",
    ],
    sections: [
      {
        heading: "Which redesign changes affect SEO?",
        body: [
          "The risk depends on what changes underneath the design, not how different the site looks. Rate your project against this table before work starts.",
        ],
        table: {
          caption: "SEO risk by type of redesign change",
          columns: ["Change", "Risk", "What to do"],
          rows: [
            ["New visuals, same URLs and content", "Low", "Check page speed and that text is still in the HTML"],
            ["New navigation or menus", "Medium", "Keep key pages linked prominently"],
            ["Rewritten or trimmed content", "Medium to high", "Protect pages that bring traffic and leads"],
            ["New URL structure", "High", "Full redirect map, tested before launch"],
            ["New CMS or platform", "High", "Check rendering, metadata, canonicals and structured data"],
            ["New domain", "Highest", "Redirect everything and use Search Console's Change of Address tool"],
          ],
        },
      },
      {
        heading: "How do you redesign a website without losing SEO?",
        body: [
          "Most redesign traffic losses are avoidable. They come from steps skipped under launch pressure, so build these into the project plan rather than a final checklist.",
        ],
        list: [
          "Benchmark organic traffic, rankings and conversions by page before anything changes.",
          "Crawl the current site and export every URL, with its traffic and inbound links.",
          "Map each old URL to its new equivalent, and redirect retired pages to the closest match.",
          "Carry over titles, descriptions, headings and structured data on pages that perform.",
          "Keep staging out of Google's index, then remove that block at launch.",
          "Crawl staging to catch broken links, missing pages and redirect chains.",
          "After launch, submit the new sitemap and watch Search Console for errors daily.",
        ],
      },
      {
        heading: "Can a redesign improve SEO?",
        body: [
          "Yes. A redesign is a chance to fix what held rankings back: slow templates, a confusing structure, thin pages competing with each other, or important content buried several clicks deep.",
          "The sites that gain from a redesign usually treat SEO as a requirement from the first wireframe, not a task for launch week. That means agreeing the page inventory and URL plan before design begins.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does changing website design affect SEO?",
        a: "Changing only the look usually has little effect, provided the URLs, content and internal links stay the same and the new templates are not slower. Problems come from what changes underneath the design.",
      },
      {
        q: "Does changing your website affect SEO if you keep the same URLs?",
        a: "It can. Removing text, altering headings, dropping internal links or loading content with JavaScript can all shift rankings even with identical URLs. Compare before and after crawls to catch these.",
      },
      {
        q: "How long does it take to recover rankings after a redesign?",
        a: "When redirects and content are handled well, fluctuation usually settles within a few weeks. When they aren't, recovery can take months and needs the missing redirects and content restored first.",
      },
      {
        q: "What is the most common website redesign SEO mistake?",
        a: "Launching without a complete redirect map, closely followed by leaving the staging site's noindex tag in place. Both can remove pages from Google within days.",
      },
    ],
    related: {
      guides: ["website-migration-seo-checklist"],
      useCases: ["website-migration", "organic-traffic-drop"],
      solutions: ["website-redesign"],
      answers: ["how-much-does-a-website-redesign-cost", "when-to-redesign-a-website"],
    },
  },
  {
    slug: "what-is-technical-seo",
    question: "What is technical SEO?",
    topic: "SEO",
    metaTitle: "What Is Technical SEO? A Plain Explanation and Checklist",
    metaDescription:
      "Technical SEO makes a website easy for search engines to crawl, render and index. What it covers, a practical checklist, and how to prioritize the fixes.",
    primaryQuery: "what is technical seo",
    secondaryQueries: ["what is technical seo in simple words", "technical seo checklist"],
    updated: "2026-09-30",
    shortAnswer:
      "Technical SEO is the work that makes a website easy for search engines to crawl, render, understand and index, so its content has a fair chance to rank. In simple words, it's the plumbing behind the pages. It covers site structure, internal links, page speed, mobile rendering, redirects, canonical tags, structured data, sitemaps and robots rules, rather than the words on the page or the links pointing to it.",
    keyPoints: [
      "Technical SEO decides whether pages can be found and indexed; content decides whether they deserve to rank.",
      "Search Console's indexing reports are the starting point for any technical review.",
      "JavaScript-heavy sites need checks that the rendered page contains the content users see.",
      "A technical issue matters in proportion to the pages and traffic it affects.",
      "Revisit it after every migration, redesign, platform change or new template.",
    ],
    sections: [
      {
        heading: "How is technical SEO different from other SEO?",
        body: [
          "SEO is often split into three parts. They depend on each other: great content can't rank if it isn't indexed, and a flawless technical setup can't rescue pages nobody wants to read.",
        ],
        table: {
          caption: "The three broad parts of SEO",
          columns: ["Part", "Focus", "Examples"],
          rows: [
            ["Technical SEO", "Can search engines access and process the site?", "Crawling, indexing, speed, redirects, structured data"],
            ["On-page SEO", "Does each page answer the search well?", "Content, titles, headings, internal links"],
            ["Off-page SEO", "Do other sites vouch for it?", "Links, mentions, reviews, brand searches"],
          ],
        },
      },
      {
        heading: "What's on a technical SEO checklist?",
        body: [
          "The list below covers what most sites need checked. Large sites, international sites and ecommerce catalogs add more on top, but the core stays the same.",
        ],
        list: [
          "Crawlability: robots.txt allows the right sections, and internal links reach every important page.",
          "Indexability: no stray noindex tags; canonical tags point to the preferred version.",
          "Status codes: few broken pages, and redirects that go straight to their destination.",
          "XML sitemaps: current, submitted, and listing only pages you want indexed.",
          "Rendering: key content and links present once JavaScript runs.",
          "Page experience: Core Web Vitals, mobile layout and HTTPS.",
          "Architecture: important pages within a few clicks of the homepage.",
          "Duplication: parameters, filters and near-identical pages under control.",
          "Structured data: valid markup for the content types you publish.",
          "International: correct hreflang tags if you serve several languages or countries.",
        ],
      },
      {
        heading: "How do you prioritize technical fixes?",
        body: [
          "An audit tool will flag hundreds of issues, and most of them don't matter much. Rank each issue by how many valuable pages it affects and how badly it affects them.",
          "A noindex tag on your main service template outranks a thousand missing image descriptions. Fix what blocks indexing first, then what weakens important pages, then the cosmetic warnings.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is technical SEO in simple words?",
        a: "It is making sure search engines can reach, read and store your pages without obstacles. Think of it as the wiring and plumbing of a house: invisible when it works, and a serious problem when it doesn't.",
      },
      {
        q: "Do small websites need technical SEO?",
        a: "Less of it, but yes. Even a small site can be held back by a leftover noindex tag, a broken redirect or a slow theme. A short check of Search Console's reports catches most of these.",
      },
      {
        q: "Does page speed affect Google rankings?",
        a: "Page experience, including Core Web Vitals, is one of many signals Google uses, but relevance matters far more. Speed usually matters most when it is poor enough to frustrate visitors and hurt conversions.",
      },
      {
        q: "How often should you run a technical SEO audit?",
        a: "Run a full audit before and after any major site change, and a lighter review on a regular schedule, such as quarterly. Search Console's alerts help catch problems between reviews.",
      },
    ],
    related: {
      guides: ["technical-seo-audit", "website-migration-seo-checklist"],
      services: ["seo"],
      answers: ["why-is-my-website-not-ranking", "what-is-programmatic-seo", "does-website-redesign-affect-seo"],
    },
  },
];
