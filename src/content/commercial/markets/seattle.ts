import type { LocationPage } from "../types";

export const seattle: LocationPage = {
  slug: "seattle",
  metaTitle: "Seattle Marketing Agency for Tech, Health & Ecommerce",
  metaDescription:
    "Remote marketing for Seattle-area software, ecommerce and health businesses, with measurement built for Washington's My Health My Data Act and email law.",
  primaryQuery: "seattle marketing agency",
  secondaryQueries: [
    "marketing agency in seattle",
    "seattle digital marketing agency",
    "bellevue marketing agency",
    "puget sound marketing agency",
  ],
  updated: "2026-09-29",
  city: "Seattle",
  region: "Washington",
  regionCode: "WA",
  country: "US",
  presence: "remote",
  timeZone: "Pacific Time",
  area: "West",
  hero: {
    eyebrow: "Seattle · Remote",
    title: ["Engineering culture.", "Unusually strict health-data rules."],
    lead:
      "Seattle teams are data-literate and allergic to fluff, and Washington regulates consumer health data more broadly than most states. We help companies here with search, paid media and measurement that respect both — working remotely, on Pacific hours.",
  },
  market: {
    heading: "Cloud, commerce and aircraft.",
    body: [
      "A few very large employers and the ecosystems around them shape the Puget Sound economy. Cloud computing and enterprise software cluster in Seattle, Bellevue and Redmond. Ecommerce runs deep, from marketplace sellers to the software vendors and service firms that support them. Aerospace manufacturing anchors Everett and the south end, and major hospital systems and research centers make health care one of the region's biggest employers.",
      "Buyers here tend to be analytical. Plenty of them have worked inside large technology companies and know how experimentation and attribution should work, so thin reporting gets noticed fast. Consumers are practical too: outdoor gear, home projects and health decisions are researched, compared and reviewed before anyone picks up the phone.",
      "Weather and water matter more than they seem. Roofing, drainage, heating and remodeling demand follows the long wet season, and the lake and sound separating Seattle from the Eastside and Kitsap change what counts as nearby.",
    ],
  },
  landscape: [
    {
      title: "Marketplace-first brands",
      detail:
        "Many consumer brands here grew up on Amazon before building their own store. Search strategy has to decide which demand belongs on the marketplace and which on the brand's site, and paid budgets should follow margin rather than habit.",
    },
    {
      title: "The Eastside is its own audience",
      detail:
        "Bellevue, Redmond and Kirkland have different buyer profiles and commute patterns from Seattle proper or the South Sound. Geo-targeting and listings should reflect that instead of one metro radius.",
    },
    {
      title: "Health advertisers work with fewer pixels",
      detail:
        "Since Washington's health-data law took effect, many clinics, dental groups and wellness brands have removed or restricted third-party tags on health-related pages. Campaigns lean on consented, server-side measurement and on search, where intent is stated outright.",
    },
    {
      title: "Enterprise buyers want the architecture",
      detail:
        "Cloud and enterprise buyers ask for diagrams, security documentation and straight comparisons. Integration pages and developer-facing content earn more attention than generic thought leadership.",
    },
  ],
  sectors: [
    {
      industry: "b2b-saas",
      note: "Cloud, data and developer-tool companies selling into technical buying groups that expect evidence at every step.",
    },
    {
      industry: "ecommerce",
      note: "Marketplace sellers and DTC brands balancing Amazon against their own store, where margin decides which channel gets the next dollar.",
    },
    {
      industry: "dental-medical-practices",
      note: "Dental, dermatology and wellness practices, where the My Health My Data Act changes what can be tracked, targeted and shared.",
    },
    {
      industry: "home-services",
      note: "Roofing, remodeling and heating companies whose demand tracks the rainy season and whose jobs carry real ticket sizes.",
    },
  ],
  rules: [
    {
      title: "My Health My Data Act",
      detail:
        "Washington's law defines consumer health data far more broadly than HIPAA — it can include information that merely suggests a health condition, such as browsing a treatment page or buying certain products. Collecting or sharing it needs specific consent, selling it needs a signed authorization, and consumers can sue under the state Consumer Protection Act. That reaches straight into ad pixels and audience building.",
    },
    {
      title: "No geofencing around care",
      detail:
        "The same law bars geofences around places that provide in-person health care when used to identify or track people, send them messages, or collect health data. Location-based campaigns near clinics need a different design.",
    },
    {
      title: "Email subject lines under CEMA",
      detail:
        "Washington's Commercial Electronic Mail Act prohibits false or misleading information in the subject line of commercial email to Washington residents, and the state Supreme Court has read it broadly. Fake deadlines and invented urgency are a legal exposure here, not just a tone problem.",
    },
    {
      title: "Commercial text messages",
      detail:
        "State law also restricts commercial texts to Washington numbers without consent. SMS programs need clean opt-in records and suppression that works across every sending tool.",
    },
  ],
  serviceArea: [
    "Bellevue",
    "Redmond",
    "Kirkland",
    "Bothell",
    "Issaquah",
    "Renton",
    "Everett",
    "Tacoma",
    "King County",
    "Snohomish County",
  ],
  remote: {
    heading: "How a Seattle engagement runs from a distance.",
    body: [
      "We don't have an office or staff in Seattle. The engagement runs on your clock: working hours agreed around the Pacific day, a standing weekly review, and launch windows set for when your team can watch the first hours of data. If your organization lives in documents, we write there; if it lives in dashboards, we build there.",
      "Asynchronous work carries most of the load. Experiment plans are written before tests start, results arrive with the method attached, and decisions are logged so a product manager or finance lead can check the reasoning later without a meeting. That habit fits how many teams here already operate.",
    ],
  },
  services: ["paid-media", "seo", "marketing-analytics", "email-marketing"],
  faqs: [
    {
      q: "Where is your team located?",
      a: "Not in Seattle. We're a remote studio and say so plainly. You get senior people keeping hours that overlap with yours, clear written communication, and reporting you can open whenever you like instead of waiting for a meeting.",
    },
    {
      q: "We're a dental group. Can we still advertise under My Health My Data?",
      a: "Yes, but differently. We audit what your site collects today, remove or restrict tags on health-related pages, move toward consented and server-side measurement, and lean on search and first-party lists. Your counsel signs off on the consent design; we build to it.",
    },
    {
      q: "Can you help an Amazon-first brand grow its own site?",
      a: "Yes. We work out which products and customers are better served on your own store, build the site and email program around them, and set paid budgets by contribution margin across both channels.",
    },
  ],
  related: {
    industries: ["dental-medical-practices", "ecommerce"],
    services: ["marketing-analytics"],
    solutions: ["marketing-attribution"],
    guides: ["marketing-attribution-models"],
  },
};
