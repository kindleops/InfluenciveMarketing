/** Options for the project intake. Shared by the flow, the CTA and the API. */

export const needs = [
  { id: "website", label: "Website" },
  { id: "brand", label: "Brand" },
  { id: "product", label: "Product" },
  { id: "growth", label: "Growth" },
  { id: "seo", label: "SEO" },
  { id: "automation", label: "Automation" },
  { id: "ai", label: "AI" },
  { id: "unsure", label: "Multiple / Not sure" },
] as const;

export const companySizes = [
  { id: "1-10", label: "1–10", hint: "Founding team" },
  { id: "11-50", label: "11–50", hint: "Early growth" },
  { id: "51-200", label: "51–200", hint: "Scaling" },
  { id: "201-1000", label: "201–1,000", hint: "Established" },
  { id: "1000+", label: "1,000+", hint: "Enterprise" },
] as const;

export const scopes = [
  { id: "10-25", label: "$10k – $25k", hint: "Focused engagement" },
  { id: "25-50", label: "$25k – $50k", hint: "Brand or platform build" },
  { id: "50-100", label: "$50k – $100k", hint: "Multi-discipline system" },
  { id: "100+", label: "$100k+", hint: "Transformation program" },
  { id: "retainer", label: "Ongoing retainer", hint: "Continuous growth partner" },
  { id: "unsure", label: "Not sure yet", hint: "Help me scope it" },
] as const;

export const timelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "1-3", label: "In 1–3 months" },
  { id: "3-6", label: "In 3–6 months" },
  { id: "exploring", label: "Just exploring" },
] as const;

export type NeedId = (typeof needs)[number]["id"];

const ids = <T extends readonly { id: string }[]>(list: T) => list.map((x) => x.id) as string[];
export const validIds = {
  needs: ids(needs),
  size: ids(companySizes),
  scope: ids(scopes),
  timeline: ids(timelines),
};
