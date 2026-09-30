import { allEntries, KIND_LABEL } from "@/seo/registry";

/* The site-search index, built once at build time: every published page's
   title, kind, path and a short summary. The command palette fetches it on
   first open, so it costs nothing on pages where nobody searches. */
export const dynamic = "force-static";

const clip = (s: string, n = 160) => (s.length > n ? `${s.slice(0, n).replace(/\s+\S*$/, "")}…` : s);

export function GET() {
  const core = [
    { t: "Services", k: "Page", p: "/services", s: "Eight disciplines and the specialist services inside them." },
    { t: "Industries", k: "Page", p: "/industries", s: "How the work changes by market and buyer." },
    { t: "Markets", k: "Page", p: "/locations", s: "The US markets we work in, with live local time." },
    { t: "Research", k: "Page", p: "/research", s: "Reports, models and field guides." },
    { t: "Work", k: "Page", p: "/work", s: "Systems we have designed and shipped." },
    { t: "Approach", k: "Page", p: "/approach", s: "How engagements run." },
    { t: "Start a project", k: "Page", p: "/start", s: "Tell us what you need — about three minutes." },
  ];
  const pages = allEntries().map((e) => ({ t: e.title, k: KIND_LABEL[e.kind], p: e.path, s: clip(e.summary) }));
  return Response.json([...core, ...pages]);
}
