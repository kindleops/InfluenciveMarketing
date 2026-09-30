import { brand } from "@/config/brand";
import { allEntries, published, type Kind } from "@/seo/registry";
import { abs } from "@/seo/site";

/* llms.txt — a plain-markdown map of the site for language-model crawlers
   and agents (a proposed convention, not a standard: it costs nothing and
   says clearly what each page is for). Built once at build time. */
export const dynamic = "force-static";

const clip = (s: string, n = 180) => (s.length > n ? `${s.slice(0, n).replace(/\s+\S*$/, "")}…` : s);

export function GET() {
  const all = allEntries();
  const section = (title: string, kinds: Kind[]) => {
    const rows = all.filter((e) => kinds.includes(e.kind));
    return rows.length ? `## ${title}\n\n${rows.map((e) => `- [${e.title}](${abs(e.path)}): ${clip(e.summary)}`).join("\n")}\n` : "";
  };
  const body = [
    `# ${brand.name}`,
    "",
    `> ${brand.description}`,
    "",
    "A growth studio: brand, websites, SEO and AI search, paid media, conversion, analytics and automation — for companies with meaningful deal values. Pages below answer buyers' questions directly; reports state what they rest on; nothing on the site invents statistics or client results.",
    "",
    section("Answers", ["answer"]),
    section("Services", ["service", "combo"]),
    section("Industries", ["industry"]),
    published.locations.length ? section("Markets", ["location"]) : "",
    section("Research", ["research"]),
    section("Guides and playbooks", ["guide", "playbook"]),
    section("Comparisons and alternatives", ["compare", "alternative"]),
    section("Solutions and use cases", ["solution", "use-case"]),
    "## Contact",
    "",
    `- [Start a project](${abs("/start")}): tell us what you need — about three minutes.`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
