import type { AnswerPage } from "../types";
import { seoAnswers } from "./seo";
import { localAiAnswers } from "./local-ai";
import { paidAnswers } from "./paid";
import { agencyWebBrandAnswers } from "./agency-web-brand";
import { measurementContentAnswers } from "./measurement-content";
import { industryAnswers } from "./industries";

/** Every published answer, by topic file. */
export const answers: AnswerPage[] = [...seoAnswers, ...localAiAnswers, ...paidAnswers, ...agencyWebBrandAnswers, ...measurementContentAnswers, ...industryAnswers];
