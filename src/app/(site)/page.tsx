import Link from "next/link";
import type { CSSProperties } from "react";
import { AgentConsole } from "@/components/home/AgentConsole";
import { WorkflowCanvas } from "@/components/home/WorkflowCanvas";
import { BackEndPanel, FrontEndPanel, Pipeline } from "@/components/home/Engineering";
import { Production } from "@/components/home/Production";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Button, Arrow } from "@/components/ui/Button";
import { published } from "@/seo/registry";
import s from "@/components/home/home.module.css";

/**
 * The home page, in the order a buyer's questions arrive:
 *   Hero         What do you do?            an agent at work, end to end
 *   Build        What exactly do you build? agents · automation · software
 *   Automation   What does that look like?  a workflow with a human fork
 *   Engineering  Can you build the software? front end, back end, pipeline
 *   Production   Will it hold up?           evals, guardrails, people, cost
 *   Cadence      How do you work?           five steps, one owner
 *   Growth       What else?                 the marketing layer
 *   Questions    What should I know?        straight answers
 */

const STACK = ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Redis", "OpenAI", "Anthropic", "LangGraph", "n8n", "Supabase", "AWS", "Vercel"];

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
            <ul role="list" aria-label="Technologies we build with">
              {STACK.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul role="list" aria-hidden="true">
              {STACK.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- What we build ------------------------------------------ */}
      <section id="build" className={s.section} aria-labelledby="build-title">
        <div className="container">
          <Head id="build-title" label="What we build" title={["Three things,", "built to work as one."]} lead="Agents decide, automation carries the work between systems, and software gives people a place to see it, approve it and run the business on it." />
          <ul className={s.pillars} role="list" data-stagger="">
            {PILLARS.map((p) => (
              <li key={p.key} className={s.pillar} data-key={p.key}>
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

      {/* ---- Engineering -------------------------------------------- */}
      <section className={s.section} aria-labelledby="eng-title">
        <div className="container">
          <Head id="eng-title" label="Engineering" title={["Front end to back end.", "One team, one codebase."]} lead="The agent is only as good as the software around it. We build the interfaces people use and the services behind them, typed end to end and tested on every change." />
          <div className={s.engGrid}>
            <article className={s.engCard} data-reveal="up">
              <div className={s.engText}>
                <p className={s.pillarLabel}>Front end</p>
                <h3>Fast, accessible interfaces your team can extend.</h3>
                <p>React and Next.js on a design system, with performance and accessibility budgets agreed before the first screen ships.</p>
              </div>
              <FrontEndPanel />
            </article>
            <article className={s.engCard} data-reveal="up" style={{ "--reveal-delay": "100ms" } as CSSProperties}>
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
