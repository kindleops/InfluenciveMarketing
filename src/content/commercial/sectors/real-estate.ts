import type { IndustryPage } from "../types";

export const realEstate: IndustryPage = {
  slug: "real-estate",
  name: "Real estate",
  metaTitle: "Real Estate Marketing Agency for Brokerages & Teams",
  metaDescription:
    "Real estate marketing for brokerages, teams, developers and property managers, built on owned channels and patient follow-up, and measured on closings and GCI.",
  primaryQuery: "real estate marketing agency",
  secondaryQueries: [
    "real estate brokerage marketing",
    "real estate team marketing",
    "new construction marketing agency",
    "luxury real estate marketing",
    "property management marketing agency",
  ],
  updated: "2026-09-29",
  hero: {
    eyebrow: "Real estate",
    title: ["Most buyers aren't ready yet.", "Be the name they remember when they are."],
    lead:
      "A home search can run for a year or more before anyone signs. We build real estate marketing for that timeline: owned audiences instead of rented portal leads, follow-up that doesn't give up, and reporting that counts closed transactions.",
  },
  context: {
    heading: "Five businesses share one industry label.",
    body: [
      "A brokerage is recruiting agents and building a consumer brand at the same time. A team is usually one producing agent's reputation stretched across several people, with lead flow as the glue. A developer selling new construction has a fixed inventory, a sales center and a deadline tied to financing. A luxury practice sells discretion and reach to a small pool of buyers who often find properties privately. A property management company markets to owners and investors, not to tenants, and competes on trust with someone's largest asset. Each buys marketing for different reasons, so each needs a different plan.",
      "What they share is a long, uneven path to a closing. Most people who register on a site or ask about a listing are months away from a transaction, and many will buy or sell with whichever agent is still in touch when they finally move. That makes the CRM the center of the operation. Lead sources, search behavior, saved listings and every conversation should live in one place, with follow-up that adapts to where each person is rather than a fixed drip that ends after a few weeks.",
      "Advertising here carries legal weight. The federal Fair Housing Act prohibits ads that indicate a preference or limitation based on race, color, religion, sex, disability, familial status or national origin, and many states and cities protect more classes. Meta requires housing ads to run under a special ad category that removes targeting by age, gender and detailed location, and Google applies similar limits. State license law adds its own requirements, commonly that ads identify the supervising brokerage, and sometimes rules on team names or license numbers. We build campaigns inside those limits from the start.",
    ],
  },
  challenges: [
    {
      title: "Renting demand from the portals",
      detail:
        "Portal programs deliver leads, but the audience, the listing data and the relationship stay with the portal, and the price is set by them. A brokerage relying on portals alone is funding someone else's brand.",
    },
    {
      title: "Follow-up that stops too early",
      detail:
        "Agents chase the hottest inquiries and let the rest go cold. The person who asked about a condo in spring and heard nothing afterward often buys in the fall, with someone else.",
    },
    {
      title: "Targeting habits that break housing rules",
      detail:
        "Audience tactics that work in other industries, such as narrowing by age, family status or neighborhood demographics, are restricted or unlawful for housing. Copy phrased around who a home suits can cross the line too.",
    },
    {
      title: "Agent brands and the brokerage pulling apart",
      detail:
        "Agents want their own name on everything, brokerages need consistency and compliant disclosures, and the website ends up satisfying neither. Clear brand architecture settles it before the next listing launches.",
    },
  ],
  channels: [
    { channel: "Website with IDX search", role: "Listing search the brokerage owns, plus neighborhood and market pages written by people who know the area, so visitors register with you rather than a portal." },
    { channel: "CRM and lifecycle email", role: "Saved-search alerts, market updates and personal check-ins that keep long-cycle prospects and past clients engaged until they are ready." },
    { channel: "Paid social under housing rules", role: "Listing, open-house and seller campaigns run in the housing category, leaning on creative and location radius rather than audience demographics." },
    { channel: "Paid search", role: "Seller-intent and home-valuation searches, new-development names and relocation queries, measured on appointments rather than form fills." },
    { channel: "Portals", role: "A deliberate, measured channel where the math works, compared against owned channels on cost per closing rather than volume." },
    { channel: "Agent and listing brand", role: "Consistent listing presentation, agent profiles and past-client referrals, the repeat business that usually outlasts every paid channel." },
  ],
  metrics: [
    { title: "Closed transactions by source", detail: "Every closing traced to the channel that produced the first inquiry, even when it arrived a year earlier." },
    { title: "Gross commission income per channel", detail: "GCI attributed to each source, which reveals whether cheap leads produce small deals or none." },
    { title: "Appointment and agreement rate", detail: "How many inquiries become listing appointments or signed buyer agreements, by agent and by source." },
    { title: "Database reach and engagement", detail: "How much of the CRM heard from you this quarter and how many replied, the leading indicator for future closings." },
  ],
  firstNinetyDays: [
    { title: "Weeks 1–3: One database, one source of truth", detail: "Consolidate lead sources into the CRM, fix source tagging, and match past closings to their original inquiry so GCI by channel is visible." },
    { title: "Weeks 2–6: Compliance and brand review", detail: "Check ads, listings and agent materials for fair housing language and brokerage disclosures, and set rules for how team and agent brands appear." },
    { title: "Weeks 4–9: Rebuild long-cycle follow-up", detail: "Segment the database by timeline and intent, then launch alerts, market updates and agent tasks that keep every prospect in contact." },
    { title: "Weeks 8–13: Shift spend toward owned demand", detail: "Measure portal and paid channels on cost per closing, move budget toward sources that produce your own registrants, and launch seller campaigns inside housing ad rules." },
  ],
  faqs: [
    {
      q: "Can we target ads to a specific kind of buyer?",
      a: "Not the way other industries can. Housing ads on Meta and Google restrict demographic and narrow location targeting, and fair housing law governs the wording itself. Strong creative, clear offers and your own first-party data do the work instead.",
    },
    {
      q: "Should we stop paying for portal leads?",
      a: "Not automatically. Compare what each portal costs per closing and per dollar of GCI against your owned channels. Many firms keep a portal where the numbers hold and build their own audience so they aren't dependent on it.",
    },
    {
      q: "Do you work with developers and new construction?",
      a: "Yes. A project launch has a fixed inventory and a timeline, so the work centers on the project site, a registration list built before sales open, co-op messaging for outside agents and weekly reporting against the sales schedule.",
    },
    {
      q: "What about property management companies?",
      a: "The buyer there is an owner or investor choosing who looks after their asset. That calls for search visibility on management services, clear fee explanations and proof of how properties are cared for, a different plan from a brokerage.",
    },
    {
      q: "Who approves ads for compliance?",
      a: "Your designated broker or compliance contact. We flag fair housing and disclosure questions as we write, keep required brokerage details in every template and schedule approval before anything goes live.",
    },
  ],
  related: {
    services: ["paid-media", "marketing-automation", "email-marketing", "web-design"],
    solutions: ["marketing-attribution"],
    playbooks: ["speed-to-lead"],
    research: ["anatomy-of-a-50k-month-acquisition-system"],
  },
};
