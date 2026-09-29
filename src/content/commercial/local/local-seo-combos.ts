import type { ComboPage } from "../types";

/**
 * Local SEO × industry pages. Each is written for its pairing; none shares
 * copy with another or with the local SEO service page.
 */
export const localSeoCombos: ComboPage[] = [
  {
    service: "local-seo",
    industry: "law-firms",
    metaTitle: "Local SEO for Law Firms: Map Pack, Reviews & Practice Areas",
    metaDescription:
      "Local SEO for law firms: practice-area categories, attorney profiles, review replies that protect confidentiality, and claims your state's advertising rules allow.",
    primaryQuery: "local seo for law firms",
    updated: "2026-09-29",
    lead:
      "Someone who needs a lawyer this week usually searches a practice area and a town, then reads reviews before dialing. For a firm, the map results decide whose names make that shortlist.",
    angle: [
      "Legal categories in a Business Profile are narrow on purpose. A firm listed only as a general law firm competes weakly for a DUI or estate planning search, while a primary category that matches the practice earning the most fees tells Google exactly which searches the office should answer. Firms with several practices must pick one primary, carefully.",
      "Everything a firm says in public is also lawyer advertising. State rules, most of them modeled on the ABA Model Rules, forbid misleading claims, and many restrict words like 'expert' or 'specialist', testimonials, and descriptions of past results. Those limits reach into profile posts, review replies and even the business name. The duty of confidentiality adds another: a lawyer cannot correct an unfair review by discussing the client's matter.",
    ],
    priorities: [
      {
        title: "Categories and profiles by practice",
        detail:
          "The primary category set to the highest-value practice, secondary categories for the rest, and individual attorney profiles only where Google's practitioner guidelines permit them and the lawyer actually works from that office.",
      },
      {
        title: "Practice pages rooted in the local courts",
        detail:
          "Pages explaining how a matter moves through the county courts or agencies involved, what a first consultation covers and which attorney handles it. A generic national legal article can't carry that detail.",
      },
      {
        title: "Review requests that fit the ethics rules",
        detail:
          "Asking satisfied clients for a review is generally allowed. Offering anything in return usually isn't, under Google's policy and under rules on giving value for recommendations. Requests go out once a matter closes, never mid-dispute.",
      },
      {
        title: "Replies that disclose nothing",
        detail:
          "A short, professional reply for critical reviews that acknowledges the comment, invites contact offline and never confirms the reviewer was a client. ABA Formal Opinion 496, on responding to online criticism, points the same way.",
      },
    ],
    pitfalls: [
      {
        title: "Keywords in the firm name",
        detail:
          "Listing the firm as 'Smith Law, Car Accident Lawyer' breaks Google's naming rules. Competitors report these edits, and a suspension can arrive with no warning.",
      },
      {
        title: "Virtual offices as locations",
        detail:
          "A shared suite or mail drop in a town the firm wants to reach isn't eligible for a profile unless staff are there during stated hours. Suspended profiles are slow to reinstate.",
      },
      {
        title: "Borrowed results language",
        detail:
          "Phrases about verdicts, settlements or being the top firm in town may pass in one state and violate the rules in another. Every claim is checked against the jurisdictions where the firm's lawyers are licensed.",
      },
    ],
    measures: [
      "Consultation calls and forms by practice area and office",
      "Signed matters traced back to local search, as recorded by intake",
      "Map visibility for each practice category across the county",
      "Review velocity and time to reply",
    ],
    faqs: [
      {
        q: "Should each attorney have their own Business Profile?",
        a: "Sometimes. Google allows profiles for public-facing practitioners, but a solo lawyer is generally better served by a single profile, as Google's own guidance suggests. At larger firms, attorney profiles help with name searches and need attention whenever someone leaves.",
      },
      {
        q: "Can we ask clients for reviews at all?",
        a: "In most states, yes, provided nothing of value is offered and the request doesn't script what the client writes. Your state bar's guidance has the final word, and the process is built around it.",
      },
      {
        q: "Where do Local Services Ads fit for a firm?",
        a: "In many legal categories and markets, Google shows Local Services Ads carrying a Google Screened badge above the map. They are paid and billed per lead. The reviews and profile strength earned through local SEO support them too.",
      },
    ],
  },
  {
    service: "local-seo",
    industry: "dental-medical-practices",
    metaTitle: "Dental Local SEO for General & Specialty Practices",
    metaDescription:
      "Dental local SEO: Business Profile categories for general and specialty care, procedure pages patients search for, and review replies that protect patient privacy.",
    primaryQuery: "dental local seo",
    updated: "2026-09-29",
    lead:
      "Most patients pick a dentist within a short drive. What they type into the search box, though, ranges from a routine checkup to a full-arch implant case, and a practice has to be visible for both.",
    angle: [
      "Proximity dominates routine dental searches; few people drive past several practices to reach one farther away for a cleaning. Elective and complex treatment works differently. Someone weighing implants, clear aligners or sedation will travel and read more before booking, so procedure pages, and reviews that mention that treatment, begin to outweigh the map pin.",
      "Every patient interaction is also protected health information. A reply that thanks a reviewer for their crown last week confirms a treatment relationship, and federal regulators have penalized dental practices for review replies that disclosed patient details. Photos carry the same caution: before-and-after images need the patient's written authorization before they appear on a profile or a page.",
    ],
    priorities: [
      {
        title: "Categories that match the chairs",
        detail:
          "Dentist as the primary category for most general practices, with specialty categories added only for care actually delivered on site. Orthodontists, periodontists and oral surgeons lead with their specialty instead.",
      },
      {
        title: "A page for each treatment worth traveling for",
        detail:
          "Implants, aligners, veneers, sleep appliances, same-day emergencies: each page covers who the treatment suits, what the visits involve, how the practice handles cost and financing, and which dentist provides it.",
      },
      {
        title: "Dentist profiles that follow the roster",
        detail:
          "Individual listings for dentists where Google's practitioner rules fit, edited promptly when an associate moves on, so a patient searching a name isn't sent to a chair that's now empty.",
      },
      {
        title: "Insurance and new-patient facts, everywhere",
        detail:
          "Accepted plans, whether new patients are being seen, emergency availability and booking links kept consistent across the profile, the website and dental directories.",
      },
    ],
    pitfalls: [
      {
        title: "Stock smiles",
        detail:
          "Stock photography of flawless teeth makes every practice look alike. Real pictures of the operatories, the front desk and the team build more trust and cost nothing.",
      },
      {
        title: "Friendly replies that confirm treatment",
        detail:
          "Even a warm thank-you can reveal that someone is a patient. Public replies stay general, and any detail moves to a phone call.",
      },
      {
        title: "Tags on the scheduling page",
        detail:
          "Online booking is where advertising and analytics tags are most likely to pick up health information. That page is audited before any conversion tracking touches it.",
      },
    ],
    measures: [
      "New-patient calls and online bookings by office",
      "Map visibility for general and procedure searches",
      "Consultation requests for elective and complex treatment",
      "Reviews that mention specific treatments, and reply compliance",
    ],
    faqs: [
      {
        q: "How do we collect reviews without a HIPAA problem?",
        a: "The risk sits mostly in how the practice replies, not in asking. Requests usually go out through a patient communication platform that has signed a business associate agreement, and every public reply leaves out names, treatments and appointment details.",
      },
      {
        q: "Should a group practice list each dentist separately?",
        a: "It can help people who search by a dentist's name, provided each one sees patients and the listings follow Google's practitioner guidelines. The practice listing stays the main profile for the office.",
      },
      {
        q: "Will several procedure pages compete with each other?",
        a: "Not when each covers a distinct treatment and decision. Implants and dentures answer different patient situations and deserve separate pages. Three near-identical pages about whitening do not.",
      },
    ],
  },
  {
    service: "local-seo",
    industry: "multi-location",
    metaTitle: "Multi-Location Local SEO for Brands & Franchises",
    metaDescription:
      "Multi-location local SEO: Business Profiles managed at scale, a real page for every site, and reporting that ranks branches, clinics or stores against each other.",
    primaryQuery: "multi-location local seo",
    updated: "2026-09-29",
    lead:
      "With one location, local SEO is a craft. With dozens, it becomes an operations problem: the same fields, pages and listings multiplied across sites, owned by different people, and drifting apart every month.",
    angle: [
      "At scale, the failures are rarely strategic. A branch changes its hours and nobody tells Google. A franchisee creates a second profile. A closed store still ranks and sends people to an empty lot. Each error is small; together they wear down how far Google trusts the brand's data, and they surface as angry reviews long before they show up in a report.",
      "Google offers chains tools a single-site business never needs: bulk verification for brands with many locations, location groups for sharing access, store codes in bulk uploads, and an API for syncing from a central system. Using them well means deciding who owns each field, with head office controlling names and categories while local managers supply photos and holiday hours, and writing that division down.",
    ],
    priorities: [
      {
        title: "One source of truth for location data",
        detail:
          "A master record per site covering name, address, phone, hours, services and attributes, feeding the profiles, the store locator and the directory network, so each change is made once.",
      },
      {
        title: "A location page for every site",
        detail:
          "Reachable from a plain directory of states and cities, not just a search box, with that site's staff, services, parking or access notes and reviews, plus LocalBusiness structured data that matches its profile.",
      },
      {
        title: "Governance for franchise and regional teams",
        detail:
          "Written rules on who may post, reply to reviews or edit categories, with access granted through the brand's own account so no profile walks out the door with a departing operator.",
      },
      {
        title: "Openings, moves and closures on a checklist",
        detail:
          "New sites verified before opening day. Relocations update the existing profile instead of starting a new one. Closures are marked correctly on Google and redirected on the website.",
      },
    ],
    pitfalls: [
      {
        title: "Hundreds of pages, one paragraph",
        detail:
          "Location pages that differ only by city name give Google no reason to rank any of them. Each needs facts that only that site has.",
      },
      {
        title: "Flagship categories everywhere",
        detail:
          "A category that fits the largest location can be wrong for a smaller branch with fewer services. Categories follow what each site actually offers.",
      },
      {
        title: "Averages that hide weak sites",
        detail:
          "A brand-wide dashboard can look healthy while a handful of locations have broken or suspended profiles. Reporting has to rank sites against one another.",
      },
    ],
    measures: [
      "Profile actions per location: calls, directions and website clicks",
      "Locations with complete, verified and accurate profiles",
      "Grid visibility by market for priority searches",
      "Rating, review volume and reply time per location",
      "Open duplicate or unverified listings",
    ],
    faqs: [
      {
        q: "Should franchisees own their Business Profiles?",
        a: "The brand should hold ownership in its own account and give franchisees manager access. That keeps profiles, reviews and history with the brand when a franchise changes hands.",
      },
      {
        q: "Does every location need its own web page?",
        a: "Yes, if customers use that location. The profile's website link should point to that page rather than the homepage, so a searcher lands on the right hours, phone number and directions.",
      },
      {
        q: "How do you report across so many sites?",
        a: "One view ranks locations on profile actions, visibility and reviews, so regional managers can see which sites need attention first. Individual location reports go to the managers who want them.",
      },
    ],
  },
  {
    service: "local-seo",
    industry: "home-services",
    metaTitle: "Local SEO for Contractors & Home Service Companies",
    metaDescription:
      "Local SEO for contractors: service-area setup, map reach beyond the shop address, project pages from real jobs, and organic work planned with Local Services Ads.",
    primaryQuery: "local seo for contractors",
    updated: "2026-09-29",
    lead:
      "In high-ticket trades such as roofing, HVAC replacement, remodeling and foundation repair, each lost job is felt. Local SEO decides whether the company is in front of the homeowner before they turn to a paid lead.",
    angle: [
      "Most contractors are service-area businesses: the crew goes to the customer, and the address behind the profile is a shop or a home office no customer visits. Google's guidelines expect that address hidden and a service area set in its place. The listing still ranks most strongly near the hidden base, so the program decides early which towns the map can realistically reach and which have to be won through the website.",
      "Paid and unpaid results share one page and should be planned as one. Where Google offers Local Services Ads for a trade, they sit above the map, bill per lead, and weigh reviews and responsiveness heavily. A healthy Business Profile, a steady stream of reviews and quick answers lift both. When organic visibility in a town is strong, ad budget can move to towns where it is weak.",
    ],
    priorities: [
      {
        title: "A service area drawn from the jobs you want",
        detail:
          "Towns chosen by job value, drive time and crew capacity, not by how many the profile will accept. Outlying towns are served by pages on the site, not by stretching the listing.",
      },
      {
        title: "Project pages that prove the work",
        detail:
          "Notable finished jobs written up by town or neighborhood, with the homeowner's permission: scope, materials, what was found once the old roof or system came off, and photos from the crew. Competitors can't copy it, and it's the best evidence a distant town will see.",
      },
      {
        title: "A calendar that runs ahead of the weather",
        detail:
          "Posts, page refreshes and review requests timed before each trade's peak, with quieter months used for replacement, financing and maintenance-plan content that feeds the next one.",
      },
      {
        title: "Organic and ads read on one sheet",
        detail:
          "Booked jobs from the map, organic pages and Local Services Ads reported side by side by town, so spend follows the places where unpaid visibility is thinnest.",
      },
    ],
    pitfalls: [
      {
        title: "A home address in plain view",
        detail:
          "Showing a residential address that customers never visit breaks the guidelines and invites strangers to the owner's door.",
      },
      {
        title: "Job photos that give away the house",
        detail:
          "House numbers, license plates and faces are checked and removed before an image is posted. The homeowner's privacy is part of the brand.",
      },
      {
        title: "Reviews stranded on lead platforms",
        detail:
          "Feedback collected on third-party lead marketplaces does little for the Business Profile. Review requests should point to Google first.",
      },
    ],
    measures: [
      "Booked jobs and average ticket by town and source",
      "Map visibility across a grid of the service area",
      "Share of booked jobs from organic versus Local Services Ads, by town",
      "Reviews earned per completed job",
    ],
    faqs: [
      {
        q: "If we run Local Services Ads, do we still need local SEO?",
        a: "Yes. Ads stop when the budget does, and they cover only some searches and services. The profile, reviews and pages keep working without a per-lead charge, and the reviews help the ads as well.",
      },
      {
        q: "Will adding towns to our service area help us rank there?",
        a: "Listing a town tells Google where you'll travel; in practice it rarely moves map rankings there by itself. Reach far from the base comes mostly from the website and from the business's overall prominence.",
      },
      {
        q: "Should we open a second location to cover more ground?",
        a: "Only if it's real and staffed, with crews dispatched from it. That can carry its own profile. A mailbox or a rented desk can't, and profiles built on one tend to be suspended.",
      },
    ],
  },
];
