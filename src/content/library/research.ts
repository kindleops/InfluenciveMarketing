import type { Research, StudyInDesign } from "./types";
import { saasHomepages } from "./research/why-saas-homepages-lose-the-sale";
import { paidSearchEconomics } from "./research/paid-search-economics-high-ticket-services";
import { aiOverviews } from "./research/organic-search-after-ai-overviews";
import { acquisitionAnatomy } from "./research/anatomy-of-a-50k-month-acquisition-system";

/**
 * The research publication, in series order. Analyses, models and
 * blueprints state their basis; a study is published only with a complete,
 * reviewed methodology (see src/seo/quality.ts).
 */
export const research: Research[] = [saasHomepages, paidSearchEconomics, aiOverviews, acquisitionAnatomy];

/**
 * Studies announced with their question and protocol — never with results.
 * Each gets a page only when it has real data and a reviewed method.
 */
export const inDesign: StudyInDesign[] = [
  {
    title: "What 100 High-Converting Landing Pages Have in Common",
    question:
      "Across landing pages whose owners can show us their real conversion data, which structural choices — offer, proof, form length, page length, speed — actually travel with higher conversion, and which are folklore?",
    protocol: [
      "A sample of 100 pages drawn only from owners who share analytics access; pages without verifiable conversion data are excluded rather than estimated.",
      "Each page coded against a fixed scheme of around thirty attributes by two reviewers working independently, with disagreements resolved and logged.",
      "Conversion measured over the same period for every page, on each page's own primary action, and reported with its traffic volume so small samples are visible.",
      "Findings published as associations, not causes, with every limitation stated — including what kinds of businesses the sample does not represent.",
    ],
    status: "In design",
    topic: "web",
  },
];
