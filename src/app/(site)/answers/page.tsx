import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { AnswerTopic } from "@/content/commercial/types";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { AnswersIndex } from "@/components/answers/AnswersIndex";
import { Chapter, LandingHero } from "@/components/landing/Landing";
import { JsonLd } from "@/components/seo/blocks";
import { breadcrumbLd, collectionLd } from "@/seo/jsonld";
import { published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

const description = "Straight answers to the questions people ask about SEO, AI search, paid media, websites, agencies and measurement — the answer first, then the reasoning.";

export const metadata: Metadata = pageMetadata({ title: "Answers", description, path: "/answers" });

const ORDER: AnswerTopic[] = ["SEO", "Local SEO", "AI search", "Paid media", "Websites & CRO", "Agencies", "Brand", "Measurement", "Content & email", "Industries"];

export default function AnswersHub() {
  const items = published.answers;
  if (!items.length) notFound();
  const topics = ORDER.filter((t) => items.some((a) => a.topic === t));
  return (
    <>
      <JsonLd data={collectionLd({ name: "Answers", description, path: "/answers", items: items.map((a) => ({ name: a.question, path: `/answers/${a.slug}` })) })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Answers", path: "/answers" }])} />
      <LandingHero
        crumbs={[{ name: "Answers", path: "/answers" }]}
        eyebrow="Answers"
        tone="teal"
        title={["Straight answers.", "Then the reasoning."]}
        lead="The questions buyers actually ask — about SEO, AI search, paid media, websites, agencies and measurement. Each answered in the first paragraph, honestly, including when the answer is “it depends”."
        primary={{ label: "Browse the questions", href: "#index" }}
        secondary={{ label: "Ask us yours", href: "/start" }}
      />
      <Chapter id="index" eyebrow={`${items.length} questions`} title={["Find your", "question."]}>
        <AnswersIndex items={items.map((a) => ({ slug: a.slug, question: a.question, topic: a.topic, lead: a.shortAnswer.split(/(?<=[.!?])\s/)[0] }))} topics={topics} />
      </Chapter>
      <ProjectCTA />
    </>
  );
}
