import type { IndustryPage } from "../types";

export const lawFirms: IndustryPage = {
  slug: "law-firms",
  name: "Law firms",
  metaTitle: "Law Firm Marketing Agency Measured on Signed Cases",
  metaDescription:
    "Law firm marketing judged on signed cases, not leads: Local Services Ads, map visibility, intake speed and ads written with state bar advertising rules in mind.",
  primaryQuery: "law firm marketing agency",
  secondaryQueries: [
    "legal marketing agency",
    "attorney marketing agency",
    "personal injury marketing agency",
    "lawyer advertising agency",
    "local services ads for lawyers",
  ],
  updated: "2026-09-29",
  hero: {
    eyebrow: "Law firms",
    title: ["A lead is a phone call.", "A case is a signed agreement."],
    lead:
      "Legal clicks are expensive because the matters behind them are valuable. We plan backwards from the retained client: which practice areas pay, how fast intake answers and what your state bar lets you say.",
  },
  context: {
    heading: "Case value sets the budget. Intake decides the return.",
    body: [
      "One retained matter can be worth more than months of ad spend, which is why legal keywords sit among the costliest in paid search. That value cuts both ways: a missed call or a poorly screened consultation wastes far more than the click behind it. The question is rarely how to get more inquiries. It is how many signed clients each dollar produces, and where between the first ring and the engagement letter they are lost.",
      "Practice areas behave like different businesses. Personal injury runs on contingency fees, fierce competition and urgency after an accident. Family law involves private, emotional decisions and people who compare several attorneys. Criminal defense calls come at night, often from a relative. Immigration clients may need another language and are wary of anything that sounds like a scam. Business and estate work moves slowly, arrives through referral and is chosen on credibility. One campaign and one intake script cannot serve them all.",
      "All of it sits inside professional regulation. Lawyer advertising is governed by each state's rules of professional conduct, most modeled on the ABA Model Rules and adapted differently. Common themes: no false or misleading statements, limits on past results and testimonials, restrictions on claiming to be a specialist without certification, rules on paying for referrals and, in some states, required labels or disclaimers. We write with those rules in view, and the responsible attorney reviews every launch.",
    ],
  },
  challenges: [
    {
      title: "Paying premium prices for calls nobody answers",
      detail:
        "Firms pay heavily for a ringing phone, then send it to voicemail at lunch, after five and all weekend. People with an urgent matter call the next firm and rarely leave a message.",
    },
    {
      title: "Lead counts that hide the wrong matters",
      detail:
        "A campaign can look healthy while filling intake with matters outside the firm's practice or jurisdiction. Without outcomes tied back to source, bad traffic keeps getting funded.",
    },
    {
      title: "Ad copy that invites a grievance",
      detail:
        "Settlement figures without context, superlatives and implied specialization can break the rules in many states. Review copy before it runs, not after a complaint.",
    },
    {
      title: "Reputation handled carelessly in public",
      detail:
        "Answering a bad review with details of the representation can breach confidentiality. Requests and replies need a firm-wide policy.",
    },
  ],
  channels: [
    { channel: "Local Services Ads", role: "Pay-per-lead placements above the results for many legal categories, behind Google's screening and license checks, managed for response rate and lead disputes." },
    { channel: "Google Business Profile", role: "Accurate categories, hours, attorney photos and a steady flow of reviews, which together shape map visibility near the firm." },
    { channel: "Paid search", role: "Practice-area campaigns split by matter type and urgency, with bids informed by retained-case value imported from the case management system." },
    { channel: "Practice-area and attorney pages", role: "Plain answers on process, timeline and fees for each matter type, and profiles showing who will handle the case." },
    { channel: "Referral relationships", role: "Other attorneys, past clients, accountants and advisors, kept warm with useful updates and tracked at intake." },
    { channel: "Intake and call handling", role: "Every call answered live, screened for fit and conflicts, and booked before the caller hangs up." },
  ],
  metrics: [
    { title: "Signed cases by source and practice area", detail: "Retained clients traced to the ad, listing, referral or page that produced them. The budget answers to this." },
    { title: "Cost per signed case", detail: "Spend divided by engagements, compared with expected fee value for that matter type." },
    { title: "Intake conversion at each step", detail: "Calls answered, callers qualified, consultations held and agreements signed, so the weak step is visible." },
    { title: "Time to first human response", detail: "Minutes from a form or missed call to a live conversation, by hour and weekday." },
  ],
  firstNinetyDays: [
    { title: "Weeks 1–3: Follow a lead to a signature", detail: "Connect call tracking and forms to intake or case management software, review recorded calls where lawful and disclosed, and map where people drop out." },
    { title: "Weeks 2–5: Review what the ads say", detail: "Audit copy, landing pages and profiles against the conduct rules where you practice, with the supervising attorney signing off." },
    { title: "Weeks 4–9: Restructure spend by practice area", detail: "Split paid search and Local Services Ads by matter type, drop unwanted categories and send signed-case data back to the platforms." },
    { title: "Weeks 8–13: Fix coverage and follow-up", detail: "Close after-hours gaps with live answering or a callback standard, start review requests and record referral sources at intake." },
  ],
  faqs: [
    {
      q: "Do you know the advertising rules for our state?",
      a: "We know the recurring patterns: misleading statements, past results, testimonials, specialization, referral payments and disclaimers. Details differ by state, so the responsible attorney at your firm reviews everything first.",
    },
    {
      q: "Are Local Services Ads worth it for a law firm?",
      a: "For many practice areas they hold the most visible spot and charge per lead, not per click. Whether they pay depends on answer speed, screening and disputing invalid leads.",
    },
    {
      q: "Can you promise a certain number of cases each month?",
      a: "No, and be wary of anyone who does. Case volume depends on intake, competition and matters outside marketing's control. We commit to tracking from click to signed agreement and steady work on the weakest link.",
    },
    {
      q: "Should we buy leads from a legal lead-generation service?",
      a: "Look carefully first. Some pay-per-lead arrangements raise questions under ethics rules on paying for recommendations and sharing fees. Ask ethics counsel, and compare signed-case cost against channels you own.",
    },
  ],
  related: {
    services: ["paid-media", "seo", "marketing-analytics"],
    industries: ["professional-services"],
    solutions: ["marketing-attribution"],
    playbooks: ["speed-to-lead"],
    research: ["paid-search-economics-high-ticket-services"],
  },
};
