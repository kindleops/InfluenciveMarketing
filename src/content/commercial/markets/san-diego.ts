import type { LocationPage } from "../types";

export const sanDiego: LocationPage = {
  slug: "san-diego",
  metaTitle: "San Diego Marketing Agency for Life Sciences & Health",
  metaDescription:
    "Remote marketing for San Diego biotech, healthcare, defense-adjacent and hospitality companies — search, content and paid media built around review and privacy.",
  primaryQuery: "san diego marketing agency",
  secondaryQueries: [
    "marketing agency in san diego",
    "san diego biotech marketing",
    "san diego healthcare marketing agency",
    "san diego digital marketing",
  ],
  updated: "2026-09-29",
  city: "San Diego",
  region: "California",
  regionCode: "CA",
  country: "US",
  presence: "remote",
  timeZone: "Pacific Time",
  area: "West",
  hero: {
    eyebrow: "San Diego · Remote",
    title: ["Science, service and shoreline.", "Each with its own buyer."],
    lead:
      "San Diego's largest industries don't share a playbook. A biotech selling to lab directors, a defense supplier bidding on programs and a dental group filling chairs need very different marketing. We work with companies here remotely, on whichever of those problems is yours.",
  },
  market: {
    heading: "A research town with a coastline.",
    body: [
      "The region's anchors are familiar. A dense life sciences cluster around Torrey Pines and Sorrento Valley draws on UC San Diego and the research institutes on the mesa. A large Navy and Marine Corps presence supports shipbuilders, defense contractors and engineering firms. A wireless and telecom base grew up around Qualcomm, and a visitor economy fills hotels from the Gaslamp Quarter to Coronado.",
      "Each of those sells differently. Life sciences companies market to scientists, procurement and investors, with regulatory review on every word. Defense and engineering firms win through relationships, capability statements and contract vehicles more than ads. Hospitality is seasonal and ruthlessly price-compared. Health care — hospital systems, specialty clinics, dental and aesthetics — fights for patients who search close to home and read reviews carefully.",
      "The cross-border economy with Tijuana and a large bilingual population add one more layer, especially for consumer health and home services in the South Bay.",
    ],
  },
  landscape: [
    {
      title: "Technical content opens the funnel",
      detail:
        "Scientists find vendors through application notes, protocols, publications and conference posters. Search programs for tools, reagents and contract research are built around methods and assay terms, not generic industry keywords.",
    },
    {
      title: "North County and the South Bay are different markets",
      detail:
        "Carlsbad, Encinitas and Oceanside search differently from Chula Vista or National City. Ads, listings and landing pages for clinics and home services work better split along those lines than set to one county-wide radius.",
    },
    {
      title: "Visitor demand swings with the calendar",
      detail:
        "Hotels, attractions and experience businesses see demand move with summer, holidays and the convention schedule. Flat monthly budgets overspend in shoulder months and run dry at the peak.",
    },
    {
      title: "Health targeting is narrower than it used to be",
      detail:
        "The major ad platforms restrict targeting by health condition and limit what can be tracked on health-related pages. Biotech and care providers here rely more on search, contextual placements and consented first-party data.",
    },
  ],
  sectors: [
    {
      industry: "healthcare",
      note: "Biotech, diagnostics, digital health and hospital systems, where marketing runs through medical-legal review and privacy rules shape measurement.",
    },
    {
      industry: "dental-medical-practices",
      note: "Dental groups, dermatology and specialty clinics from the coast to the inland valleys, competing for patients who compare reviews before booking.",
    },
    {
      industry: "professional-services",
      note: "Engineering, government contracting and advisory firms whose buyers need evidence of capability and past performance, not slogans.",
    },
    {
      industry: "b2b-saas",
      note: "Software and wireless companies from the region's engineering base, often selling complex products into regulated industries.",
    },
  ],
  rules: [
    {
      title: "Medical privacy beyond HIPAA",
      detail:
        "California's Confidentiality of Medical Information Act reaches further than HIPAA in places, including businesses that offer apps or software designed to hold people's medical information. Digital health products built here should be checked against it before pixels or retargeting are switched on.",
    },
    {
      title: "Health data is sensitive personal information",
      detail:
        "Under the state privacy law, information about health is a sensitive category that consumers can ask a business to limit. Intake forms, symptom tools and condition-specific landing pages need consent and tagging designed with that right in mind.",
    },
    {
      title: "Compliance programs for drug makers",
      detail:
        "California requires pharmaceutical companies to adopt a compliance program for their dealings with health care professionals, aligned with federal guidance, and to publish a declaration that they follow it. Clinician-facing events, sponsored content and promotional spend belong inside that program.",
    },
    {
      title: "Export controls on technical content",
      detail:
        "Not a state rule, but it shapes marketing for many firms here: technical data covered by federal export controls such as ITAR can't simply appear in a blog post, white paper or trade-show deck. Defense and dual-use content plans need an export review step.",
    },
  ],
  serviceArea: [
    "La Jolla",
    "Del Mar",
    "Carlsbad",
    "Encinitas",
    "Oceanside",
    "Escondido",
    "Chula Vista",
    "El Cajon",
    "Coronado",
    "Temecula",
  ],
  remote: {
    heading: "No local office, a documented review path.",
    body: [
      "We have no San Diego office and no local team. Engagements are built for that: shared hours inside your Pacific day, one recurring working session a week, and every review — clinical, legal, export — routed through a written approval path so nothing waits on someone being in the room.",
      "For life sciences companies the rhythm follows the review cycle: drafts go to medical-legal early, comments land in one place, and approved language is tracked so it can be reused without starting over. For clinics and hospitality it runs faster — weekly reporting, monthly planning and a direct line for anything time-sensitive.",
    ],
  },
  services: ["content-marketing", "seo", "paid-media", "web-design"],
  faqs: [
    {
      q: "Is there a local office we can visit?",
      a: "No. We work with San Diego companies remotely, over video calls, shared documents and dashboards. Hours, review steps and reporting are all arranged so the engagement runs well without anyone sharing a building.",
    },
    {
      q: "Can you work within our medical-legal-regulatory review?",
      a: "Yes. We put the review step on the calendar instead of treating it as a delay, write claims with their supporting references attached, and keep an approved-language library so later campaigns move faster.",
    },
    {
      q: "Do you market to defense and government buyers?",
      a: "We support positioning, capability content, websites and targeted campaigns for firms selling into defense. We don't handle contracting or capture, and technical material passes your export and security review before anything is published.",
    },
  ],
  related: {
    industries: ["healthcare", "dental-medical-practices"],
    services: ["content-marketing"],
    solutions: ["lead-generation"],
    guides: ["technical-seo-audit"],
  },
};
