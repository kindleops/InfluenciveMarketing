import Link from "next/link";
import type { CSSProperties } from "react";
import { AgentConsole } from "@/components/home/AgentConsole";
import { WorkflowCanvas } from "@/components/home/WorkflowCanvas";
import { BackEndPanel, FrontEndPanel, Pipeline } from "@/components/home/Engineering";
import { Production } from "@/components/home/Production";
import { TeamAgents } from "@/components/home/TeamAgents";
import { Integrations } from "@/components/home/Integrations";
import { StreamFaqs } from "@/components/answers/Chat";
import { JsonLd } from "@/components/seo/blocks";
import { faqLd } from "@/seo/jsonld";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Button, Arrow } from "@/components/ui/Button";
import { published } from "@/seo/registry";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { LogoSlug } from "@/content/logos";
import s from "@/components/home/home.module.css";

/**
 * The home page, in the order a buyer's questions arrive:
 *   Hero         What do you do?            an agent at work, end to end
 *   Build        What exactly do you build? agents · automation · software
 *   Teams        Where would it help us?    agents by department
 *   Automation   What does that look like?  a workflow with a human fork
 *   Integrations Will it work with our stack? the systems it connects
 *   Engineering  Can you build the software? front end, back end, pipeline
 *   Production   Will it hold up?           evals, guardrails, people, cost
 *   Cadence      How do you work?           five steps, one owner
 *   Growth       What else?                 the marketing layer
 *   Questions    What should I know?        straight answers
 *   FAQ          The last objections        answered, streamed, in schema
 */

/** What we build with. A mark where the owner permits redistribution; the name alone otherwise. */
const STACK: [string, LogoSlug | null][] = [
  ["TypeScript", "typescript"],
  ["React", "react"],
  ["Next.js", "nextdotjs"],
  ["Node.js", "nodedotjs"],
  ["Python", "python"],
  ["PostgreSQL", "postgresql"],
  ["Redis", "redis"],
  ["OpenAI", null],
  ["Anthropic", "anthropic"],
  ["LangGraph", "langgraph"],
  ["n8n", "n8n"],
  ["Supabase", "supabase"],
  ["AWS", null],
  ["Vercel", "vercel"],
];

const PILLARS = [
  {
    key: "agents",
    label: "AI agents",
    title: "Agents that use your tools.",
    text: "Intake, support, research, document review. Agents that read your systems, take real actions and hand off to a person when the stakes rise.",
    links: [
      ["AI agent development", "/services/ai-agent-development"],
      ["Custom AI & LLM apps", "/services/custom-ai-development"],
    ],
  },
  {
    key: "automation",
    label: "Automation",
    title: "Workflows that never drop a step.",
    text: "The busywork between your apps, mapped, automated and monitored, from n8n and Make to custom code when volume or logic outgrows them.",
    links: [
      ["AI automation", "/services/ai-automation"],
      ["Workflow & process automation", "/services/workflow-automation"],
    ],
  },
  {
    key: "software",
    label: "Engineering",
    title: "Software, front end to back end.",
    text: "Web apps, customer portals and internal tools in TypeScript, React and Next.js, on APIs and data models your own team can run.",
    links: [
      ["Web app development", "/services/web-app-development"],
      ["Front-end development", "/services/frontend-development"],
      ["Back-end & API development", "/services/backend-development"],
    ],
  },
] as const;

const STEPS = [
  ["Map", "We sit with the people doing the work and write down the process as it really runs, with its exceptions and costs."],
  ["Prototype", "A working version on your real data, in front of the people who'll use it, before anything is hardened."],
  ["Evaluate", "A test set from your own cases, scored. We tune until it clears the bar you set, or tell you it won't."],
  ["Launch", "Shipped behind approvals and limits, with logs, alerts and a rollback, to a small group first."],
  ["Operate", "Monitored, measured against the baseline and improved monthly, or handed over with the docs to run it."],
];

const GROWTH = [
  ["SEO", "/services/seo"],
  ["Paid media", "/services/paid-media"],
  ["Conversion", "/services/cro"],
  ["Web design", "/services/web-design"],
  ["Brand", "/services/branding"],
  ["Analytics", "/services/marketing-analytics"],
];

const FAQS = [
  {
    q: "What does ascndix build?",
    a: "AI agents that work inside your tools, workflow automation between your systems, and the web apps, portals and internal tools around them, front end to back end. We also run the growth work (search, paid media, conversion) that brings demand into those systems.",
  },
  {
    q: "Will it work with the software we already use?",
    a: "Usually, yes. Most business systems have an API or webhooks, and that's what we build on: CRMs, help desks, accounting, email, chat, databases. Where a system has no usable API, we say so early and find the next-best route rather than promising one.",
  },
  {
    q: "How do you stop an AI agent from making costly mistakes?",
    a: "Four ways. We test it against a set of your real cases before launch. We constrain what it can read, write and say. We put a person in front of anything costly, public or irreversible. And we log every step so a wrong answer can be traced and fixed. Some tasks shouldn't be given to a model at all, and we'll tell you which.",
  },
  {
    q: "Where does our data go?",
    a: "Only where it needs to. We review each model provider's retention and training terms with you, redact personal data before it reaches a model where we can, and can run on your own cloud account. Access is scoped per agent and logged.",
  },
  {
    q: "Who owns the code and the workflows?",
    a: "You do. Code lives in your repository, workflows in your accounts, with documentation your team can run from. We can keep operating and improving the system, or hand it over.",
  },
  {
    q: "How does an engagement start?",
    a: "With the work itself. We map one process with the people who run it, estimate what automating it is worth, and build a working prototype on your real data before anything is hardened or launched widely.",
  },
];

const QUESTIONS = [
  "what-is-an-ai-agent",
  "how-much-does-it-cost-to-build-an-ai-agent",
  "ai-agent-vs-chatbot",
  "n8n-vs-zapier-vs-make",
  "how-much-does-it-cost-to-build-a-web-app",
  "front-end-vs-back-end-development",
  "what-is-rag-in-ai",
  "how-to-rank-in-ai-overviews",
];

function Head({ id, label, title, lead }: { id: string; label: string; title: [string, string]; lead: string }) {
  return (
    <header className={s.head}>
      <p className={s.label} data-reveal="fade">
        <i aria-hidden="true" />
        {label}
      </p>
      <h2 id={id} className={s.h2} data-reveal="up">
        {title[0]} <span>{title[1]}</span>
      </h2>
      <p className={s.lead} data-reveal="up" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
        {lead}
      </p>
    </header>
  );
}

export default function Home() {
  const live = new Set(published.services.map((p) => p.slug));
  const has = (href: string) => !href.startsWith("/services/") || live.has(href.split("/")[2]);
  const questions = QUESTIONS.map((slug) => published.answers.find((a) => a.slug === slug)).filter((a) => a !== undefined);

  return (
    <>
      {/* ---- Hero ---------------------------------------------------- */}
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={s.heroGrid} aria-hidden="true" />
        <div className={s.heroBeam} aria-hidden="true" />
        <div className={`container ${s.heroInner}`}>
          <Link href="/answers/what-is-an-ai-agent" className={s.pill} data-reveal="fade">
            <span className={s.pillTag}>AI agents</span>
            What makes one production-ready
            <Arrow />
          </Link>
          <h1 id="hero-title" className={s.h1} data-reveal="up">
            AI that does the work.
            <span>Software that holds it together.</span>
          </h1>
          <p className={s.heroLead} data-reveal="up" style={{ "--reveal-delay": "90ms" } as CSSProperties}>
            ascndix designs and engineers AI agents, workflow automation and the web apps around them, front end to back end, with the evaluation, guardrails and monitoring that production needs.
          </p>
          <div className={s.ctas} data-reveal="up" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
            <Button href="/start" size="lg" arrow magnetic>
              Start a project
            </Button>
            <Button href="#build" size="lg" variant="secondary">
              See what we build
            </Button>
          </div>
        </div>

        <figure className={`container ${s.stage}`}>
          <div className={s.frame}>
            <AgentConsole />
          </div>
          <figcaption className={s.caption}>
            <span className="sr-only">
              An illustration of an AI agent handling a website inquiry: it checks the CRM, searches company documents, classifies the request, drafts a reply with citations, waits for a salesperson to approve, then logs the result.
            </span>
            <span aria-hidden="true">Illustrative interface · every value shown is an example</span>
          </figcaption>
        </figure>

        <div className={s.stack}>
          <p className={s.stackLabel}>Built with</p>
          <div className={s.marquee}>
            {[0, 1].map((k) => (
              <ul key={k} role="list" aria-label={k ? undefined : "Technologies we build with"} aria-hidden={k ? true : undefined}>
                {STACK.map(([name, slug]) => (
                  <li key={name}>
                    {slug && <BrandLogo slug={slug} size={22} className={s.logo} />}
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What we build ------------------------------------------ */}
      <section id="build" className={s.section} aria-labelledby="build-title">
        <div className="container">
          <Head id="build-title" label="What we build" title={["Three things,", "built to work as one."]} lead="Agents decide, automation carries the work between systems, and software gives people a place to see it, approve it and run the business on it." />
          <ul className={s.pillars} role="list" data-stagger="">
            {PILLARS.map((p) => (
              <li key={p.key} className={s.pillar} data-key={p.key} data-pointer-light="">
                <div className={s.pillarArt} aria-hidden="true">
                  <PillarArt k={p.key} />
                </div>
                <p className={s.pillarLabel}>{p.label}</p>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul role="list" className={s.pillarLinks}>
                  {p.links.filter(([, href]) => has(href)).map(([label, href]) => (
                    <li key={href}>
                      <Link href={href}>
                        {label}
                        <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Teams -------------------------------------------------- */}
      <section className={s.section} aria-labelledby="teams-title">
        <div className="container">
          <Head id="teams-title" label="Where it helps" title={["Every team has work", "a system should do."]} lead="The best first agent is rarely the flashiest. It's the repetitive, rules-heavy work that eats hours every week, with a clear place for a person to stay in charge." />
          <TeamAgents />
        </div>
      </section>

      {/* ---- Automation --------------------------------------------- */}
      <section className={s.section} aria-labelledby="flow-title">
        <div className="container">
          <Head id="flow-title" label="Automation" title={["The model decides the route.", "A person owns the fork."]} lead="Most automations fail quietly at the edges. Ours log every run, retry what can be retried and send the rest to a named owner, with the model's reasoning attached." />
          <figure className={s.wide} data-reveal="up">
            <WorkflowCanvas />
            <figcaption className={s.caption}>Illustrative workflow · switch the request to see the route change</figcaption>
          </figure>
        </div>
      </section>

      {/* ---- Integrations ------------------------------------------- */}
      <section className={s.section} aria-labelledby="int-title">
        <div className="container">
          <Head id="int-title" label="Integrations" title={["It works inside your stack,", "not next to it."]} lead="Agents are only useful if they can read and act where the work already lives. We connect to the systems you run, through typed, monitored integrations your team can see." />
          <div data-reveal="up">
            <Integrations />
          </div>
          <p className={s.caption}>And anything else with an API or webhooks. Logos and names belong to their owners and show common integration targets, not partnerships or endorsements.</p>
        </div>
      </section>

      {/* ---- Engineering -------------------------------------------- */}
      <section className={s.section} aria-labelledby="eng-title">
        <div className="container">
          <Head id="eng-title" label="Engineering" title={["Front end to back end.", "One team, one codebase."]} lead="The agent is only as good as the software around it. We build the interfaces people use and the services behind them, typed end to end and tested on every change." />
          <div className={s.engGrid}>
            <article className={s.engCard} data-pointer-light="" data-reveal="up">
              <div className={s.engText}>
                <p className={s.pillarLabel}>Front end</p>
                <h3>Fast, accessible interfaces your team can extend.</h3>
                <p>React and Next.js on a design system, with performance and accessibility budgets agreed before the first screen ships.</p>
              </div>
              <FrontEndPanel />
            </article>
            <article className={s.engCard} data-pointer-light="" data-reveal="up" style={{ "--reveal-delay": "100ms" } as CSSProperties}>
              <div className={s.engText}>
                <p className={s.pillarLabel}>Back end</p>
                <h3>APIs, data and jobs that stay up when things go wrong.</h3>
                <p>Typed APIs, Postgres, queues and background workers, with retries, idempotency and tracing built in from the first endpoint.</p>
              </div>
              <BackEndPanel />
            </article>
          </div>
          <div className={s.pipeRow}>
            <p className={s.pipeLabel}>Every change</p>
            <Pipeline />
          </div>
        </div>
      </section>

      {/* ---- Production --------------------------------------------- */}
      <section className={s.section} aria-labelledby="prod-title">
        <div className="container">
          <Head id="prod-title" label="Production, not demos" title={["Impressive in a meeting is easy.", "Reliable on a Tuesday is the work."]} lead="Six things every agent we ship has from day one, because a confident wrong answer at scale costs more than the work it saved." />
          <Production />
        </div>
      </section>

      {/* ---- Cadence ------------------------------------------------- */}
      <section className={s.section} aria-labelledby="ship-title">
        <div className="container">
          <Head id="ship-title" label="How we work" title={["Small team, senior people,", "working software early."]} lead="One accountable lead, the engineers and designers doing the work, and a working version in your hands long before a big launch." />
          <ol className={s.steps} role="list" data-stagger="">
            {STEPS.map(([t, d], i) => (
              <li key={t} style={{ "--i": i } as CSSProperties}>
                <span className={s.stepNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Growth -------------------------------------------------- */}
      <section className={s.sectionTight} aria-labelledby="growth-title">
        <div className={`container ${s.growth}`}>
          <div>
            <p className={s.label}>
              <i aria-hidden="true" />
              And the growth layer
            </p>
            <h2 id="growth-title" className={s.h3}>
              When the system is built, we help fill it.
            </h2>
          </div>
          <ul role="list" className={s.growthList}>
            {GROWTH.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>
                  {label}
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Questions ---------------------------------------------- */}
      {questions.length > 0 && (
        <section className={s.section} aria-labelledby="q-title">
          <div className="container">
            <Head id="q-title" label="Answers" title={["Straight answers", "to what buyers ask first."]} lead="What agents are, what they cost, which tools fit and how the software around them gets built, answered in the first paragraph." />
            <ul className={s.questions} role="list" data-stagger="">
              {questions.map((a) => (
                <li key={a.slug}>
                  <Link href={`/answers/${a.slug}`}>
                    <span className={s.qTopic}>{a.topic}</span>
                    <span className={s.qText}>{a.question}</span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
            <p className={s.more}>
              <Link href="/answers">
                All answers <Arrow />
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ---- FAQ ----------------------------------------------------- */}
      <section className={s.section} aria-labelledby="faq-title">
        <JsonLd data={faqLd(FAQS)} />
        <div className="container">
          <Head id="faq-title" label="Questions" title={["Before you ask,", "here's the answer."]} lead="Open one and it answers itself." />
          <StreamFaqs faqs={FAQS} />
        </div>
      </section>

      <ProjectCTA />
    </>
  );
}

function PillarArt({ k }: { k: string }) {
  if (k === "agents")
    return (
      <div className={s.artAgents}>
        {["crm.lookup", "docs.search", "classify", "reply.draft"].map((x, i) => (
          <span key={x} style={{ "--i": i } as CSSProperties}>
            <i />
            <code>{x}</code>
          </span>
        ))}
        <span className={s.artAsk}>Ask a person</span>
      </div>
    );
  if (k === "automation")
    return (
      <div className={s.artFlow}>
        {["Trigger", "Enrich", "Decide", "Act"].map((x, i) => (
          <span key={x} style={{ "--i": i } as CSSProperties}>
            {x}
          </span>
        ))}
      </div>
    );
  return (
    <div className={s.artCode}>
      <span>
        <b>&lt;Approvals</b> queue=<em>&quot;sales&quot;</em> <b>/&gt;</b>
      </span>
      <span>
        <b>GET</b> /api/approvals <em>200</em>
      </span>
      <span>
        <b>SELECT</b> * <b>FROM</b> requests
      </span>
    </div>
  );
}
