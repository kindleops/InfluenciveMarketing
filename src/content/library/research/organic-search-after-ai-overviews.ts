import type { Research } from "../types";

export const aiOverviews: Research = {
  slug: "organic-search-after-ai-overviews",
  title: "Organic Search After AI Overviews: What Actually Changed",
  dek: "AI answers on the results page changed where some clicks go. They did not change what decides who gets surfaced. This report separates the two and shows how to re-plan an organic program around the difference.",
  metaTitle: "AI Overviews and SEO: What Changed and What Didn't",
  metaDescription:
    "How AI Overviews and AI search change organic traffic, what still decides visibility, and how to re-plan and measure an SEO program by query type.",
  primaryQuery: "ai overviews seo",
  secondaryQueries: [
    "how ai overviews affect organic traffic",
    "seo for ai search",
    "getting cited in ai overviews",
    "measuring seo after ai overviews",
    "generative engine optimization",
  ],
  topic: "organic",
  published: "2026-09-29",
  updated: "2026-09-29",
  format: "analysis",
  number: 3,
  keyPoints: [
    "For simple informational queries, the answer is now often composed on the results page, so some clicks that once reached publishers no longer happen.",
    "AI answers still retrieve from crawlable, indexable, trusted pages. Technical foundations and genuine expertise still decide who gets surfaced and cited.",
    "Commercial and navigational queries still send buyers to pages, and searches for your brand name matter more than before, not less.",
    "Plan and measure by query type. A single organic traffic line now hides as much as it shows.",
  ],
  basis:
    "An analysis drawn from how search programs are planned, built and measured, and from the search engines' own published guidance on AI features. It is not a survey, cites no third-party study and contains no client data.",
  reviewed: false,
  body: [
    { type: "p", text: "Most of what has been said about AI in search falls into two camps. One says organic search is finished. The other says nothing has changed and good SEO is still good SEO. Both are wrong in ways that cost money." },
    { type: "p", text: "Something real did change: for a large set of questions, the answer is now assembled on the results page, and the click that used to follow often doesn't. But the machinery underneath is familiar. The systems writing those answers still have to find, read and trust pages first. The work is to tell the two apart, then move effort toward what still pays." },

    { type: "h2", text: "What changed on the results page" },
    { type: "p", text: "Google's AI Overviews, and conversational search products that answer in paragraphs, do the same basic thing. They take a question, retrieve a set of pages, and write a summary with links back to some of those sources. For a searcher who wanted a definition, a quick fact or a short explanation, the summary is often enough. They read it and leave." },
    { type: "p", text: "That removes a class of visit that many content programs were built on. A page that ranked well for \"what is X\" used to collect a steady stream of readers. Some of those readers now get what they need without clicking. The ranking may hold while the traffic thins." },
    { type: "p", text: "Three other things changed with it. Being cited inside the AI answer is a new kind of visibility, separate from ranking in the list below it. Reporting got murkier, because impressions can hold steady while clicks fall. And the value of generic explainer content dropped sharply, because it is exactly what a summary replaces." },
    { type: "figure", title: "How an AI answer is built", caption: "A simplified view of the mechanics, left to right. Every stage before the answer depends on ordinary search fundamentals; only the last stage decides whether a visit happens.", figure: { kind: "flow", steps: [
      { label: "Query", detail: "A searcher asks a question, often longer and more specific than a classic keyword." },
      { label: "Retrieval", detail: "The system pulls candidate pages from its index. Pages that can't be crawled or indexed are never candidates." },
      { label: "Selection", detail: "It favors pages that answer clearly and come from sources it has reason to trust." },
      { label: "Composition", detail: "It writes a summary and attaches links to some of the sources it drew on." },
      { label: "Click or no click", detail: "Simple needs end on the page. Decisions, purchases and depth still send people through." },
    ] } },

    { type: "h2", text: "What didn't change" },
    { type: "p", text: "The answer is new. The supply chain behind it is not. Google's documentation on AI features says the same foundations apply: a page has to be indexed and eligible to appear with a snippet to be shown as a supporting link, and there is no separate technical requirement to qualify. The snippet controls a site already uses, such as nosnippet and max-snippet, also govern how its content can appear in these features." },
    { type: "p", text: "So the things that decided visibility before still decide it now. A site that search engines can crawl and render. A clear structure, where each important question has one obvious page. Content written by people who know the subject, with evidence a system can pick up on. None of that became less important. It became the price of being a source at all." },
    { type: "p", text: "Buyers didn't change either. Someone comparing vendors, checking pricing or ready to book still wants to see the page. And when a searcher types your company's name, no summary replaces the visit. That demand is worth more now, because it is the traffic least exposed to the new page." },
    { type: "table", caption: "What changed and what didn't", columns: ["Area", "What changed", "What didn't"], rows: [
      ["Simple informational queries", "The answer is often composed on the page; fewer clicks follow", "Someone still has to be the source the answer draws on"],
      ["Visibility", "Being cited inside the AI answer is a new placement", "Crawlable, indexable, trusted pages are still the only candidates"],
      ["Commercial queries", "Summaries may frame the options before the click", "Buyers still visit pages to compare, price and decide"],
      ["Brand searches", "More of the journey happens before the search", "Searches for your name still end on your site, and matter more"],
      ["Reporting", "Clicks and impressions can move apart; averages mislead", "Search Console is still the primary source; it now needs segmenting"],
      ["Content value", "Generic explainers lost most of their value", "Original, specific, expert content still earns links and visits"],
    ] },

    { type: "h2", text: "Re-plan the program by query type" },
    { type: "p", text: "The mistake is to treat organic search as one channel with one trend line. It is several markets, and AI answers hit them differently. Sort your target queries by two questions: how simple is a complete answer, and how close is the searcher to acting? The answers put each query in one of four quadrants, and each quadrant gets a different plan." },
    { type: "figure", title: "Four kinds of query, four plans", caption: "Place each query you target by how simple a complete answer is (left to right) and how close the searcher is to acting (bottom to top). The quadrant tells you what the page is for.", figure: { kind: "matrix", x: ["Simple answer", "Complex answer"], y: ["Learning", "Ready to act"], quadrants: [
      { label: "Navigational: protect it", detail: "Brand name, login, pricing, contact. Make sure your own pages answer these cleanly so nothing else frames them. Low effort, high value." },
      { label: "Commercial: invest here", detail: "Comparisons, alternatives, \"best for\" and service queries. Build deep, honest pages with specifics a summary can't carry. This is where buyers still click." },
      { label: "Informational, simple: stop producing", detail: "Definitions and quick facts. The answer page absorbs these. Keep one strong page per core concept for citation, and stop scaling the rest." },
      { label: "Informational, complex: go deeper", detail: "Trade-offs, methods, how to decide. Summaries point here but can't replace it. Original data, worked examples and clear opinions earn both citation and the click." },
    ] } },
    { type: "p", text: "Most content calendars are heavy in the bottom-left quadrant, because those topics were easy to find with keyword tools and easy to write. That is where to cut. Move the effort up and to the right: fewer pieces, more depth, closer to a buying decision." },

    { type: "h2", text: "Measure it in a way that survives the new page" },
    { type: "p", text: "A falling organic sessions line is no longer enough to judge a program. It may mean the work is failing. It may mean informational clicks are being absorbed while the queries that matter are growing. You need to see which." },
    { type: "p", text: "Google's documentation says traffic from its AI features is counted within the ordinary Search Console performance data, not reported as a separate line. That means you can't isolate it directly, but you can segment around it. The useful cuts are these." },
    { type: "checklist", items: [
      "Search Console clicks and impressions by query class: branded, commercial, simple informational, complex informational. Tag queries with regular-expression filters and track each class on its own.",
      "Branded search volume over time. It is the clearest signal that the market knows your name, and it is the demand least exposed to AI answers.",
      "Click-through rate by query class. Impressions holding while clicks fall on simple queries is expected; the same pattern on commercial queries is a problem.",
      "Assisted conversions in your analytics: organic landing pages that appear earlier in paths that end in a lead or sale, not only the last touch.",
      "Visits from AI assistants, where the referrer or a link tag shows them. Some assistants pass this and some don't, so treat it as a floor, not a total.",
      "Pipeline or revenue from organic landing pages, reviewed quarterly. Traffic is the input; this is the output.",
    ] },
    { type: "callout", title: "Expect some of it to hide", text: "Some people will read an AI answer, remember your name and come back later by typing it in or going direct. That visit won't carry an organic label. Rising branded search and direct traffic alongside flat organic clicks can be the program working, not failing." },

    { type: "h2", text: "Content that can't be summarized away" },
    { type: "p", text: "A summary replaces what is common to many pages. It can't replace what exists on only one. The test for any piece is simple: if a system condensed every page on this topic into one paragraph, would anything on ours survive that isn't elsewhere?" },
    { type: "list", items: [
      "Original data. Numbers you collected, with the method shown. A summary can cite them but has to credit where they came from.",
      "Tools. Calculators, templates, checkers. The value is in using them, which happens on the page.",
      "Opinions with evidence. A clear position on a contested question, with the reasoning laid out. Consensus gets summarized; a well-argued view gets cited and read.",
      "Deep comparisons. Side-by-side detail on options a buyer is choosing between, including where each one is the wrong fit.",
      "Worked examples. Real steps, real inputs, real trade-offs, the parts a summary drops first.",
    ] },
    { type: "pullquote", text: "A summary replaces what every page says. It can't replace what only your page says." },
    { type: "p", text: "This also changes who should write. Content produced to fill keyword gaps by people new to the subject is the easiest to condense and the least likely to be chosen as a source. Put the people who do the work into the content, even if it means publishing less." },

    { type: "h2", text: "What to do this quarter" },
    { type: "steps", items: [
      { title: "Classify your queries", detail: "Export the queries that brought clicks in the last few months from Search Console and sort them into the four quadrants. Most teams have never seen their traffic this way, and it changes the conversation immediately." },
      { title: "Set up segmented reporting", detail: "Build branded, commercial and informational views in Search Console and your analytics. Record where each stands now so next quarter has a baseline." },
      { title: "Fix the foundations first", detail: "Confirm key pages are crawlable, indexed and eligible for snippets, and that no stray nosnippet or noindex is removing them. Being a source starts here." },
      { title: "Cut and consolidate", detail: "Stop commissioning new generic explainers. Merge thin overlapping ones into a single strong page per concept, redirecting the rest." },
      { title: "Rebuild the commercial pages", detail: "Pick the comparison, alternative and service pages closest to revenue and make them the most specific, honest pages on the topic." },
      { title: "Commit to one thing only you can publish", detail: "An original dataset, a tool, or a position backed by evidence. One of these is worth more than a month of routine posts." },
    ] },
    { type: "p", text: "None of this calls for abandoning organic search. It calls for being clear about which part of it the new results page absorbed, and putting the budget where searchers still need to visit. Be wary of anyone offering a guarantee of placement inside AI answers; no one controls how those answers are composed." },
  ],
  faqs: [
    { q: "Do AI Overviews reduce organic traffic?", a: "For many simple informational queries, yes: the answer is shown on the results page and fewer people click through. Commercial and branded queries are far less exposed, because the searcher still needs to visit a page to compare, buy or log in. The overall effect on a site depends on its mix of query types." },
    { q: "How do I get my site cited in AI Overviews?", a: "Google's guidance is that there are no special technical requirements beyond ordinary search eligibility: the page has to be indexed and able to show a snippet. In practice, pages that are crawlable, clearly structured and genuinely expert on a specific question are the ones selected as sources. No one can promise a citation." },
    { q: "Can I see AI Overview traffic in Google Search Console?", a: "Not as its own line. Google's documentation says clicks and impressions from AI features are included in the standard performance report. The practical approach is to segment queries by type and watch how clicks and impressions move within each segment." },
  ],
  related: {
    services: ["seo", "content-marketing", "marketing-analytics"],
    guides: ["technical-seo-audit"],
    playbooks: ["topic-cluster-program"],
    useCases: ["organic-traffic-drop"],
  },
};
