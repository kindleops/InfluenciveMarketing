import type { AnswerPage } from "./types";
import { answers } from "./answers/index";

/**
 * Answers: one page per question people actually ask. The question list and
 * how each maps to a page is in docs/search/keyword-map.md.
 */
export const answerPages: AnswerPage[] = [...answers];
