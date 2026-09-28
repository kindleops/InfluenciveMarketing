export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  category: "Systems" | "Intelligence" | "Experience" | "Growth";
  date: string; // ISO
  readingTime: string;
  body: Block[];
};

export const insights: Insight[] = [
  {
    slug: "connected-systems",
    title: "The disconnected stack is the most expensive thing in marketing",
    dek: "Brand, web, acquisition and automation are usually bought separately. That is why they rarely compound.",
    category: "Systems",
    date: "2026-08-18",
    readingTime: "6 min",
    body: [
      { type: "p", text: "Most companies assemble their growth infrastructure the way they buy office furniture: one piece at a time, from whoever is available, to solve whatever is most urgent. A brand agency delivers guidelines. A web shop builds a site from those guidelines, loosely. A performance team buys traffic to pages it did not design. Someone else wires up a CRM. Reporting is stitched together at the end of the month." },
      { type: "p", text: "Each vendor can be excellent and the system can still fail. Not because any single part is broken, but because nothing was designed to connect." },
      { type: "h2", text: "Where the value actually leaks" },
      { type: "p", text: "The losses in a disconnected stack are rarely visible in any one dashboard. They live in the seams:" },
      { type: "list", items: [
        "Positioning that never reaches the landing pages paid traffic arrives on.",
        "Conversion events defined differently by the site, the ad platforms and the CRM.",
        "Leads that wait hours for routing because no one owns the handoff.",
        "Experiments whose learning never reaches the brand or the product.",
      ] },
      { type: "p", text: "Every seam is a place where effort goes in and nothing comes out. Multiply that across a year of campaigns and releases and the cost is larger than any single line item." },
      { type: "h2", text: "Designing the connections first" },
      { type: "p", text: "The alternative is not to do everything in-house, or to buy from one giant vendor. It is to design the system before designing its parts: decide how brand informs experience, how experience is measured, how measurement routes decisions, and which decisions can be automated." },
      { type: "quote", text: "Strategy becomes design. Design becomes infrastructure. Infrastructure compounds." },
      { type: "p", text: "When the connections are designed, improvements travel. A clearer value proposition raises conversion on every page it touches. Cleaner event data makes every channel's bidding smarter. Faster routing makes every lead more valuable. The system gets better as a whole, not just in the corner someone happened to optimise." },
      { type: "h2", text: "A simple test" },
      { type: "p", text: "Ask whether the last meaningful thing you learned about your customers changed your website, your ads, your sales process and your product within the same month. If it did not, you do not have a system. You have a collection of services — and you are paying for the seams." },
    ],
  },
  {
    slug: "ai-is-infrastructure",
    title: "AI is infrastructure, not a feature",
    dek: "The companies getting real leverage from AI are not adding chatbots. They are redesigning workflows.",
    category: "Intelligence",
    date: "2026-07-02",
    readingTime: "5 min",
    body: [
      { type: "p", text: "The first wave of AI adoption in most companies looked like a feature launch: a chat widget on the site, a writing assistant in the CMS, a pilot that impressed in a demo and then quietly stalled. The tools were capable. The problem was where they were placed." },
      { type: "h2", text: "Workflows, not widgets" },
      { type: "p", text: "Durable value comes from treating AI as a component inside an operational system — one step in a workflow with defined inputs, outputs, owners and fallbacks. Framed that way, the questions change from ‘what can the model do?’ to ‘where does judgement repeat, and what does a good decision look like?’" },
      { type: "list", items: [
        "Classify and route every inbound request in seconds, with a confidence threshold that sends edge cases to a person.",
        "Enrich and summarise accounts before a sales conversation, from sources the team already trusts.",
        "Draft first versions of repeatable content inside guardrails set by the brand system.",
        "Answer internal questions from company knowledge, with citations, instead of from someone’s inbox.",
      ] },
      { type: "h2", text: "Guardrails are the design" },
      { type: "p", text: "Reliable AI systems are mostly not model work. They are evaluation sets, human checkpoints, audit logs, clear escalation paths and interfaces that make it obvious when to trust an output. That is design and engineering discipline, applied to a new kind of component." },
      { type: "quote", text: "The goal is not to replace judgement. It is to stop spending judgement on work that does not need it." },
      { type: "p", text: "Measured this way, the returns are concrete: faster speed-to-lead, fewer manual handoffs, hours returned to the team every week. None of it requires a moonshot. It requires treating AI the way you would treat any other piece of critical infrastructure — deliberately." },
    ],
  },
  {
    slug: "website-as-operating-system",
    title: "Your website is an operating system for demand",
    dek: "A modern site is not a brochure. It is the interface between your market and every system behind it.",
    category: "Experience",
    date: "2026-05-21",
    readingTime: "4 min",
    body: [
      { type: "p", text: "Redesigns are usually justified aesthetically: the brand evolved, the site looks dated, a competitor launched something sharper. Those are real reasons. They are also the least valuable way to think about a website." },
      { type: "h2", text: "The site is where every system meets" },
      { type: "p", text: "Paid media lands there. Search indexes it. Sales sends prospects to it. The CRM depends on what it captures, analytics depends on what it tracks, and the brand is judged by how it feels. A website is the one surface every growth system shares — which makes it the most leveraged piece of infrastructure a company owns." },
      { type: "list", items: [
        "Architecture decides what search engines understand and what buyers can find.",
        "Components decide how quickly marketing can launch and test.",
        "Instrumentation decides whether anyone can tell what worked.",
        "Performance decides how much of your paid traffic survives the first second.",
      ] },
      { type: "h2", text: "Beautiful is the baseline" },
      { type: "p", text: "None of this is an argument against craft. Premium design changes how a company is perceived before a word is read, and that perception shows up in pricing power and win rates. But beauty is the baseline. The requirement is a site engineered to be operated — measured, extended and improved every week by the team that owns it." },
      { type: "quote", text: "Every interaction should move the business forward." },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
