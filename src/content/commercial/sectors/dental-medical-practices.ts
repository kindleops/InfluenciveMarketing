import type { IndustryPage } from "../types";

export const dentalMedical: IndustryPage = {
  slug: "dental-medical-practices",
  name: "Dental & medical practices",
  metaTitle: "Dental Marketing Agency for Implants, Aligners & Aesthetics",
  metaDescription:
    "Patient acquisition for dental and elective medical practices: implants, aligners, cosmetic and aesthetic care, built on local search, reviews and case acceptance.",
  primaryQuery: "dental marketing agency",
  secondaryQueries: [
    "dental implant marketing",
    "orthodontic marketing agency",
    "cosmetic dentistry marketing",
    "med spa marketing agency",
    "plastic surgery marketing agency",
  ],
  updated: "2026-09-29",
  hero: {
    eyebrow: "Dental & medical practices",
    title: ["Fill the schedule with the cases you want.", "Not only the ones that walk in."],
    lead:
      "Implants, clear aligners, cosmetic dentistry and aesthetic medicine are considered purchases, mostly paid out of pocket. We build the local visibility, paid media and phone-to-consult path that bring those patients in, inside HIPAA, platform and licensing board rules.",
  },
  context: {
    heading: "An elective case is a sales process with a clinical ending.",
    body: [
      "Someone weighing implants or a smile makeover isn't picking the closest office for a cleaning. They compare practices, study reviews and before-and-after work, and worry about cost. Insurance typically covers little, so price and financing come up on the first call. One accepted case can outweigh years of routine visits, which is why marketing for these procedures should be judged on treatment started, not inquiries collected.",
      "Whoever answers the phone, the coordinator running the consult, and the follow-up after a patient says they need to think decide more of the outcome than any ad. We work both sides: attracting good candidates, then turning calls into consults and consults into plans.",
      "Compliance runs through all of it. HIPAA limits what patient information reaches analytics and ad platforms, and when a patient's story or photos can appear in marketing. Google and Meta restrict health targeting and some treatments. State dental and medical boards set their own advertising standards. Health systems are a different problem; this is about local practices.",
    ],
  },
  challenges: [
    {
      title: "Inquiries counted, cases not",
      detail:
        "Ad platforms report calls and forms. Accepted treatment lives in the practice management system, and until the two connect, budget drifts toward the cheapest inquiries.",
    },
    {
      title: "Calls lost before the consult",
      detail:
        "Elective callers ask about cost, pain and financing. A rushed answer or voicemail over lunch sends them to the next office on the map. Recorded calls, where recording is lawful and disclosed, show where they drop.",
    },
    {
      title: "Tracking that identifies patients",
      detail:
        "A pixel on an implant consult form can tell an ad platform who wants which treatment. Tags need scoping and vendors need vetting for business associate agreements. Uploading patient lists to build audiences raises the same issue and generally needs patient authorization, so we usually leave it out.",
    },
    {
      title: "Claims a board could object to",
      detail:
        "Calling a general practice specialists, promising outcomes, or using testimonials and before-and-after images without consent and required disclaimers can prompt a board complaint. Rules differ by state and profession, and they change.",
    },
  ],
  channels: [
    { channel: "Local search & Business Profile", role: "Categories and services matching each procedure line, and real photos of the office and team." },
    { channel: "Procedure pages", role: "A substantial page per high-value treatment covering candidacy, steps, recovery, cost drivers and financing, reviewed by the treating clinician." },
    { channel: "Paid search", role: "Implant, aligner and aesthetic campaigns with tight radius targeting, and conversions imported from booked consults." },
    { channel: "Paid social", role: "Cosmetic and aesthetic offers written so the ad never implies knowledge of the viewer's health, measured without sending patient data back." },
    { channel: "Reviews", role: "An incentive-free request after treatment milestones that invites mention of the procedure, and replies that never confirm the reviewer was treated." },
    { channel: "Calls & consult follow-up", role: "Call tracking from a vendor that will sign a business associate agreement, talk tracks for cost questions, and paced follow-up for undecided patients." },
  ],
  metrics: [
    { title: "Consults by procedure line", detail: "Booked consults for implants, orthodontics, cosmetic or aesthetic work, kept apart from hygiene and general visits." },
    { title: "Case acceptance from marketing", detail: "How many marketing-sourced consults became accepted plans, and what that treatment is worth." },
    { title: "Cost per started case", detail: "Spend divided by patients who actually began treatment." },
    { title: "Call-to-consult conversion", detail: "Answered calls that became scheduled consults, by who answered." },
  ],
  firstNinetyDays: [
    { title: "Weeks 1–3: Economics and compliance baseline", detail: "Agree which procedures to grow and what a case is worth, audit tags and forms for patient-data exposure, and check current claims and testimonials against board rules with the practice's advisor." },
    { title: "Weeks 2–6: Tie marketing to the schedule", detail: "Set up call tracking and a privacy-conscious match from inquiry to consult to accepted plan." },
    { title: "Weeks 4–9: Procedure pages and local search", detail: "Build a page for each priority treatment, tune Business Profile services, and start a steady review routine." },
    { title: "Weeks 7–13: Paid media and the consult path", detail: "Rebuild campaigns around booked consults, and coach the front desk on cost and financing questions." },
  ],
  faqs: [
    {
      q: "Do you work with medical practices as well as dental?",
      a: "Yes, where the model matches: elective or largely self-pay care competing locally, such as aesthetic medicine, cosmetic dermatology, plastic surgery and vision correction.",
    },
    {
      q: "Can we use patient testimonials and before-and-after photos?",
      a: "Often, with care. Using a patient's identifiable information or images in marketing generally requires their written HIPAA authorization, and many boards add rules on testimonials, disclaimers and photo editing. We settle both before any patient story goes live.",
    },
    {
      q: "Will Google and Meta let us advertise implants or injectables?",
      a: "Dental procedures are generally allowed. Prescription-only treatments, including some injectables and weight-loss medications, face tighter rules and sometimes certification. Both platforms limit health-based targeting and remarketing, and Meta rejects copy implying it knows the viewer's health. We check current policy per service.",
    },
    {
      q: "Is it safe to run an ad pixel on our website?",
      a: "It depends on what it collects and where. Tags that tie a person to a treatment or appointment can involve protected health information, and federal guidance on tracking technologies has been revised and challenged in court. We default to minimal browser tracking and server-side setups that strip identifiers; your privacy advisor or counsel makes the final call.",
    },
  ],
  related: {
    services: ["local-seo", "paid-media", "web-design"],
    industries: ["healthcare", "multi-location"],
    playbooks: ["speed-to-lead"],
    research: ["paid-search-economics-high-ticket-services"],
  },
};
