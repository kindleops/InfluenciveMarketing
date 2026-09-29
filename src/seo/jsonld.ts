import { brand } from "@/config/brand";
import type { Faq } from "@/content/commercial/types";
import { abs, SITE } from "./site";

/** Serialise for a <script type="application/ld+json">, escaping "<". */
export const ld = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export const organization = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: brand.name,
  url: SITE,
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceLd({ name, description, path, serviceType, audience }: { name: string; description: string; path: string; serviceType: string; audience?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: abs(path),
    provider: organization,
    ...(audience ? { audience: { "@type": "BusinessAudience", audienceType: audience } } : {}),
  };
}

export function articleLd({ title, description, path, published, updated }: { title: string; description: string; path: string; published: string; updated: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: abs(path),
    datePublished: published,
    dateModified: updated,
    author: organization,
    publisher: organization,
  };
}

export function collectionLd({ name, description, path, items }: { name: string; description: string; path: string; items: { name: string; path: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: abs(path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
    },
  };
}
