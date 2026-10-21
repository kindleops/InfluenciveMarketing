import type { ServicePage } from "../types";

/**
 * Engineering services: AI automation, agents, workflow automation, custom
 * AI, and product software (web apps, front end, back end). Same rules as
 * every commercial page: no invented results, clients, prices or numbers.
 */
export const engineeringServices: ServicePage[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "ai-automation",
    name: "AI Automation",
    discipline: "automation",
    metaTitle: "AI Automation Agency: Agents, Workflows & Integrations",
    metaDescription:
      "AI automation for the operational work across a company: intake, triage, documents and back-office tasks, built with evaluation, human approval and cost in view.",
    primaryQuery: "ai automation agency",
    secondaryQueries: [
      "ai automation services",
      "ai automation for businesses",
      "ai automation company",
      "ai automation for small businesses",
      "ai automation services for small businesses",
    ],
    updated: "2026-10-21",
    hero: {
      eyebrow: "AI Automation",
      title: ["Automate the work that eats the week.", "Use a model only where a rule can't do it."],
      lead:
        "We find the repetitive operational work inside a company, from inboxes and intake forms to invoices, tickets and handoffs between systems, and automate it. Plain rules do the predictable parts. Language models handle the reading, sorting and drafting that rules can't, with a person approving anything that would be costly to get wrong.",
    },
    problem: {
      heading: "Most AI automation is a demo that never met real data.",
      body: [
        "The usual path starts with a tool, not a problem. Someone wires a chat model to a spreadsheet, it works on the five examples they tried, and it goes live. Then it meets the real inbox: scanned PDFs, forwarded threads, a customer who writes in two languages, an invoice with the total in the wrong box. Nobody measured how often it was right before launch, so nobody can say whether it is getting worse.",
        "The second failure is using a model where a rule would do. If the logic is 'when a form arrives with this field set, create a record and notify this person', an if-statement is cheaper, faster, and right every time. Language models are probabilistic. They earn their cost on unstructured input, such as reading an email to work out what it is asking for, and they need checking when they do.",
        "Automation that lasts starts with a measured baseline of the work, a set of real examples with known correct answers, and a design that says which steps are rules, which are model calls, and where a person signs off. It logs every run, tracks what each run costs, and sends anything uncertain to a queue a named person works through. That is less exciting than a demo. It is also the version still running next year.",
      ],
    },
    included: [
      {
        title: "Process discovery and selection",
        detail:
          "We sit with the people doing the work, count how often each task happens and how long it takes, and rank candidates by volume, error cost and how structured the input is. Some tasks are poor candidates and we say so.",
      },
      {
        title: "Document and inbox handling",
        detail:
          "Reading incoming email, PDFs, forms and attachments, classifying them, pulling out the fields that matter into a fixed schema, and validating those fields against your own records before anything is written.",
      },
      {
        title: "Integrations with your systems of record",
        detail:
          "Connections to the CRM, help desk, accounting, scheduling or ERP tools you already use, through their APIs where they exist and through careful workarounds where they don't, so results land where your team already looks.",
      },
      {
        title: "Rules first, models second",
        detail:
          "Deterministic logic for anything predictable, and a model call only for the step that needs judgment over messy input. This keeps each run cheaper, easier to test and easier to explain when someone asks why it did what it did.",
      },
      {
        title: "Human approval and exception queues",
        detail:
          "Approval steps before anything goes to a customer, moves money or changes an important record, plus a queue for low-confidence or failed items with a clear owner and a target time to clear it.",
      },
      {
        title: "Evaluation, logging and cost tracking",
        detail:
          "A test set built from your real examples, run before launch and after every prompt or model change, with a log of each run's inputs, outputs and model spend so quality and cost are visible rather than guessed.",
      },
    ],
    approach: [
      {
        title: "Find the work",
        detail:
          "Interview the team, shadow the process and pull a sample of real items. We record volume, handling time and where mistakes happen today, which becomes the baseline everything is measured against.",
      },
      {
        title: "Prove it on real samples",
        detail:
          "Build an evaluation set of labelled examples, including the awkward ones, and test candidate approaches against it. If accuracy isn't good enough for the stakes, we narrow the scope or recommend a rule-based design instead.",
      },
      {
        title: "Build the narrow version",
        detail:
          "Automate one well-defined task end to end, with integrations, validation, logging and an exception path. Breadth comes later. A narrow automation that works teaches more than a broad one that half works.",
      },
      {
        title: "Run it behind a person",
        detail:
          "Start in shadow mode or with approval on every item, so your team sees what it would have done and corrects it. Approval is relaxed only for categories where the logs show it has earned that.",
      },
      {
        title: "Widen and hand over",
        detail:
          "Extend to the next task, document how each automation works and who owns it, set alerts on failure rates and spend, and train your team to review outputs and update the test set as the work changes.",
      },
    ],
    measures: [
      "Manual hours removed against the measured baseline",
      "Accuracy on the evaluation set, by task and category",
      "Items routed to human review, and why",
      "Cost per completed run, including model calls and retries",
      "Time from item arrival to finished handling",
      "Errors found downstream that the automation passed",
    ],
    fit: {
      for: [
        "Operations, finance or support teams buried in repetitive reading, sorting and data entry",
        "Companies with clear, repeatable processes and enough volume to justify the build",
        "Leaders who want AI used carefully, with review and logs, rather than everywhere",
        "Small businesses where one or two tasks consume a disproportionate share of someone's week",
      ],
      notFor: [
        "Anyone who wants a model to act on customers or money with no human checkpoint",
        "Processes that change every month or that nobody can describe yet",
        "Teams looking for a chatbot on the website to count as an AI strategy",
        "Work so low in volume that a checklist would serve better than software",
      ],
    },
    engagement: {
      model: "Discovery and evaluation first, then a fixed-scope build per automation, with optional ongoing operation",
      duration: "A first automation is usually live within weeks of discovery; each further task is scoped on its own",
      team: "Automation lead, AI engineer, integration engineer, with your process owner involved throughout",
    },
    faqs: [
      {
        q: "How much does AI automation cost?",
        a: "It depends on how many tasks are in scope, how many systems they touch, how messy the input is and how much review the stakes demand. Running costs depend on volume and on the model used for each step. To estimate value, multiply how often the task happens by the minutes it takes and the loaded cost of that time. For example, if a task happens 400 times a month and takes 6 minutes, that is 40 hours a month to compare against build and running costs.",
      },
      {
        q: "What's the difference between AI automation and ordinary automation?",
        a: "Ordinary automation follows fixed rules: when this happens, do that. AI automation adds a model for steps that need reading or judgment, such as understanding what an email is asking for. Most good systems use both. The rules handle everything predictable, and the model handles only the part a rule can't.",
      },
      {
        q: "What happens when the AI gets something wrong?",
        a: "It will, sometimes. Models can misread input or state something false with confidence. We design for that: validation against your records, confidence thresholds that send uncertain items to a person, approval on anything high-stakes, and logs so mistakes can be traced and the test set updated so the same error is caught next time.",
      },
      {
        q: "Is our data sent to an AI provider?",
        a: "Only what a given step needs, and only to providers whose data terms you have approved. We review retention and training policies with you, strip or mask fields the model doesn't need, and can use models hosted in your own cloud account where policy requires it.",
      },
      {
        q: "Do you work with small businesses?",
        a: "Yes, when there's a clear task with enough volume to pay back. Smaller companies often get the most from a single well-built automation, such as intake or invoice handling, rather than a broad program.",
      },
    ],
    related: {
      services: ["ai-agent-development", "workflow-automation", "custom-ai-development", "marketing-automation"],
      industries: ["professional-services", "home-services", "ecommerce", "law-firms"],
      answers: ["how-much-does-ai-automation-cost", "how-to-use-ai-in-business", "n8n-vs-zapier-vs-make", "what-is-an-ai-agent"],
      playbooks: ["speed-to-lead"],
      useCases: ["in-house-team-support"],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "ai-agent-development",
    name: "AI Agent Development",
    discipline: "intelligence",
    metaTitle: "AI Agent Development Company: Tools, Evals & Guardrails",
    metaDescription:
      "Custom AI agents that use your tools and data to finish real tasks, with scoped permissions, evaluation before launch, tracing, cost limits and human approval.",
    primaryQuery: "ai agent development company",
    secondaryQueries: [
      "ai agent development services",
      "custom ai agent development",
      "ai agents for business",
      "ai agent development cost",
      "custom ai agents for business",
    ],
    updated: "2026-10-21",
    hero: {
      eyebrow: "AI Agents",
      title: ["Agents that finish the task.", "And stop when they should."],
      lead:
        "An agent is a model that can decide which tools to call, in what order, to reach a goal: look up the order, check the policy, draft the refund, ask a person to approve it. We build agents around a small set of well-defined tools and your own data, test them on realistic cases before anyone relies on them, and keep every step visible.",
    },
    problem: {
      heading: "An agent is only as good as its tools, its tests and its limits.",
      body: [
        "Agent demos are easy to make impressive. Give a capable model a browser and a vague goal, and it will do something that looks clever. Put that into production and the problems arrive quickly. It loops on a failed API call, picks the wrong customer record because two share a name, burns through model spend on a task that should have taken three steps, or confidently reports success on work it never did.",
        "Most of those failures aren't about the model. They come from tools that return ambiguous results, permissions wider than the task needs, no ceiling on steps or spend, and no evaluation beyond someone trying it a few times. When something goes wrong there is often no trace of which tool was called with what arguments, so nobody can tell whether the fault was in the prompt, the data or the integration.",
        "A production agent is closer to a carefully designed piece of software than to a prompt. It has a narrow job, tools with clear inputs and outputs, read and write permissions scoped to that job, a hard limit on steps and cost, a human approval step before irreversible actions, and a test suite of realistic tasks that it must pass before every release. Many problems pitched as agents are better solved by a fixed workflow with one model call in it, and we'll tell you when that's the case.",
      ],
    },
    included: [
      {
        title: "Task and tool design",
        detail:
          "Defining exactly what the agent is for, then building the tools it calls through function calling: typed inputs, predictable outputs, useful error messages and descriptions written so the model chooses the right one.",
      },
      {
        title: "Retrieval over your own knowledge",
        detail:
          "Search across your documents, tickets, policies or product data so the agent answers from your sources rather than its training, with the passages it relied on recorded alongside each answer.",
      },
      {
        title: "Permissions and guardrails",
        detail:
          "Least-privilege credentials per tool, read-only access by default, allow-lists for actions, input and output checks, limits on steps, time and spend per run, and defenses against instructions hidden in the content it reads.",
      },
      {
        title: "Human-in-the-loop approval",
        detail:
          "Checkpoints where the agent pauses and asks a person before it sends, pays, deletes or commits. The approval screen shows what it plans to do and why, so the reviewer can decide in seconds.",
      },
      {
        title: "Evaluation suites",
        detail:
          "A set of realistic tasks with known good outcomes, scored on final results and on the path taken, run automatically before every release and whenever the model, prompt or tools change.",
      },
      {
        title: "Tracing, cost and model fallback",
        detail:
          "Every run traced step by step, with tool calls, arguments, outputs, latency and spend. Model choice made per step on quality and cost, with a fallback provider or model when the primary is slow or unavailable.",
      },
    ],
    approach: [
      {
        title: "Define the job",
        detail:
          "Write down the goal, the inputs, the systems involved, what a finished task looks like and what the agent must never do. We decide here whether this needs an agent at all, or a simpler fixed sequence.",
      },
      {
        title: "Build the evaluation set",
        detail:
          "Collect real cases, including edge cases and adversarial ones, with the expected outcome for each. This set is the definition of 'working' and is agreed before significant build time is spent.",
      },
      {
        title: "Build tools and the loop",
        detail:
          "Implement the tools against your systems, wire them to the model through function calling, add retrieval where needed, and set limits and approval points. We iterate against the evaluation set, not against impressions.",
      },
      {
        title: "Pilot with supervision",
        detail:
          "Release to a small group with approval on every consequential action. Review traces daily, fix the failures we find, and add each new failure type to the evaluation set.",
      },
      {
        title: "Operate and hand over",
        detail:
          "Set dashboards and alerts for success rate, escalations and spend, document every tool and prompt, and train the owners on your side to read traces and extend the evaluation set themselves.",
      },
    ],
    measures: [
      "Task success rate on the evaluation set, per release",
      "Tasks completed without human correction in production",
      "Escalations to a person, by reason",
      "Steps and tool calls per completed task",
      "Model and infrastructure cost per run",
      "Latency from request to finished task",
    ],
    fit: {
      for: [
        "Teams with a multi-step task that today means switching between several systems by hand",
        "Companies with documented policies and data an agent can be grounded in",
        "Product teams adding agent features to their own software",
        "Organizations prepared to review agent work during a supervised pilot",
      ],
      notFor: [
        "Anyone who wants a fully autonomous agent on irreversible actions from day one",
        "Tasks a fixed workflow handles reliably, where an agent adds cost and unpredictability",
        "Situations where no one can say what a correct outcome looks like",
        "Projects without access to the systems and data the agent would need",
      ],
    },
    engagement: {
      model: "Scoping and evaluation design, then iterative build in short cycles, with optional ongoing tuning and support",
      duration: "A supervised pilot usually follows a few weeks of build; production rollout depends on what the pilot shows",
      team: "AI engineering lead, back-end engineer for tools and integrations, product lead, with your domain expert reviewing cases",
    },
    faqs: [
      {
        q: "How much does AI agent development cost?",
        a: "Build cost depends on how many tools the agent needs, how hard your systems are to integrate, how much retrieval is involved and how thorough the evaluation must be for the stakes. Running cost depends on how many runs you expect, how many steps each takes and which models you use. A useful estimate is runs per month times average model spend per run, plus hosting and the human time spent on approvals.",
      },
      {
        q: "What's the difference between an AI agent and a chatbot?",
        a: "A chatbot answers in conversation. An agent takes actions: it calls tools, reads and writes to systems, and works through several steps toward a goal. Many useful products sit between the two, such as an assistant that answers from your documents and can open a ticket when it can't help.",
      },
      {
        q: "Which models and frameworks do you use?",
        a: "We choose per project. The major model providers, including OpenAI and Anthropic, support tool use through their APIs, and open-weight models can be self-hosted when data policy requires it. For orchestration we use plain code, the providers' own agent SDKs or frameworks such as LangGraph, depending on how much control over state and branching the agent needs.",
      },
      {
        q: "Can an agent make things up?",
        a: "Yes. Models can produce plausible but false statements and can misreport what a tool returned. Grounding answers in retrieved sources, validating tool outputs, requiring citations, testing on known cases and keeping people on consequential actions reduce that risk. Nothing removes it entirely, which is why we design for review.",
      },
      {
        q: "How do you keep an agent from doing something harmful?",
        a: "By limiting what it can do in the first place. Each tool gets the narrowest permissions the task needs, irreversible actions require approval, runs have step and spend ceilings, and content the agent reads is treated as untrusted so instructions hidden in a document or email can't redirect it.",
      },
    ],
    related: {
      services: ["custom-ai-development", "ai-automation", "backend-development", "workflow-automation"],
      industries: ["healthcare", "b2b-saas", "fintech"],
      answers: ["what-is-an-ai-agent", "ai-agent-vs-chatbot", "what-is-agentic-ai", "how-much-does-it-cost-to-build-an-ai-agent", "how-to-build-an-ai-agent"],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "workflow-automation",
    name: "Workflow & Process Automation",
    discipline: "automation",
    metaTitle: "Business Process Automation Services: n8n, Make & Code",
    metaDescription:
      "Process mapping, then automation on n8n, Make, Zapier or custom code, built with retries, error queues, owners and monitoring so workflows keep running unattended.",
    primaryQuery: "business process automation services",
    secondaryQueries: [
      "workflow automation services",
      "business process automation consultant",
      "n8n automation agency",
      "workflow automation ai",
      "business process automation company",
    ],
    updated: "2026-10-21",
    hero: {
      eyebrow: "Workflow Automation",
      title: ["Map the process first.", "Then make it run without anyone pushing it."],
      lead:
        "We automate the handoffs that hold a company together: an order becoming an invoice, a signed contract becoming a project, a new hire getting accounts on day one. We start by mapping how the work really moves, choose the simplest platform that can carry it, and build each workflow so it recovers from failure and someone owns it.",
    },
    problem: {
      heading: "Workflows fail in the gaps nobody wrote down.",
      body: [
        "Most companies already have automation. It's just scattered: a few dozen zaps built by whoever needed them, a script on someone's laptop, a scheduled export that a spreadsheet macro picks up. Each one made sense when it was built. Together they form a system nobody designed, with no map, no owner, and failures that surface only when a customer complains or month-end numbers don't reconcile.",
        "The technical faults are predictable. An API times out and the step runs twice, creating duplicate invoices. A webhook is missed and an order never reaches fulfillment. A vendor renames a field and a workflow keeps running while writing blanks. A password rotates and everything stops, but the only alert goes to an inbox of someone who left last spring.",
        "Durable process automation starts with a written map of the process as it really runs, exceptions included. Each workflow is idempotent, so a retry can't double-charge or double-create. Failures go to an error queue with a named owner rather than disappearing. Credentials live in one managed place. And someone can open a single document and see every automation, what it touches and who to call when it breaks.",
      ],
    },
    included: [
      {
        title: "Process mapping",
        detail:
          "Interviews and walk-throughs with the people doing the work, producing a map of each step, system, decision and exception. Often the map alone shows steps that can simply be removed before anything is automated.",
      },
      {
        title: "Platform selection",
        detail:
          "A recommendation between n8n, Make, Zapier, your existing iPaaS or custom code, based on volume, complexity, hosting and data requirements, and who on your team will maintain it.",
      },
      {
        title: "Workflow build",
        detail:
          "Triggers, transformations, branching and integrations built and tested against real scenarios, with secrets kept in the platform's credential store and every workflow versioned so changes can be reviewed and rolled back.",
      },
      {
        title: "Reliability engineering",
        detail:
          "Idempotency keys and duplicate checks, retries with backoff for transient failures, timeouts, rate-limit handling and an error queue where failed runs wait with their full context until a person resolves them.",
      },
      {
        title: "AI steps where they help",
        detail:
          "A model call inside a workflow when a step needs to read free text, classify a request or draft a reply, with structured output, validation and a human review path for anything uncertain.",
      },
      {
        title: "Ownership, documentation and monitoring",
        detail:
          "A catalog of every workflow with its owner, purpose, systems and failure procedure, plus alerts on failed runs, unusual volume and expiring credentials, routed to people who can act on them.",
      },
    ],
    approach: [
      {
        title: "Map",
        detail:
          "Document the current process and the automations already running, including the unofficial ones. Measure volume and handling time, and mark where errors and delays actually happen.",
      },
      {
        title: "Redesign",
        detail:
          "Simplify the process on paper before automating it. Remove redundant approvals and duplicate data entry, agree the rules for exceptions, and decide which steps stay with people.",
      },
      {
        title: "Choose and build",
        detail:
          "Pick the platform, then build workflows one at a time in a test environment, with sample data that covers the normal path and the known exceptions, and a review before each goes live.",
      },
      {
        title: "Cut over",
        detail:
          "Run the new workflow alongside the old process for a short period, compare outputs, then switch over with a documented way back if something is wrong.",
      },
      {
        title: "Monitor and hand off",
        detail:
          "Watch error queues and alerts through the first weeks of real load, fix what surfaces, then hand the catalog, runbooks and access to the owners on your side.",
      },
    ],
    measures: [
      "Hours of manual handling removed per process",
      "Failed runs, and time from failure to resolution",
      "Duplicate or missing records created by automation",
      "Cycle time from process start to finish",
      "Workflows with a named owner and current documentation",
      "Platform and API cost per thousand runs",
    ],
    fit: {
      for: [
        "Operations teams retyping data between systems that don't talk to each other",
        "Companies whose existing zaps and scripts have grown into something nobody can map",
        "Businesses preparing to grow volume without growing headcount at the same rate",
        "Teams that want to own and maintain the automation themselves afterward",
      ],
      notFor: [
        "Processes still being invented, where automation would freeze the wrong version",
        "Anyone wanting a large number of workflows built without owners or documentation",
        "Work that happens a handful of times a month and is fine done by hand",
      ],
    },
    engagement: {
      model: "Process mapping as a defined first phase, then fixed-scope builds per process, with optional monitoring and support",
      duration: "Mapping takes a few weeks; most single-process builds go live within weeks after that",
      team: "Process lead, automation engineer, software engineer for custom code, with your process owners",
    },
    faqs: [
      {
        q: "Should we use n8n, Make or Zapier?",
        a: "It depends on volume, complexity and hosting needs. Zapier is the quickest to start with and connects to a very large catalog of apps. Make offers a visual builder with fine control over data mapping and branching. n8n can be self-hosted, which suits teams with strict data requirements or high volumes, and allows custom code inside workflows. We pick based on who will maintain it.",
      },
      {
        q: "When is custom code better than an automation platform?",
        a: "When volume is high enough that per-task pricing becomes significant, when logic is complex enough that a visual canvas becomes hard to read, when you need proper testing and code review, or when the workflow is core to your product. Many companies run both: a platform for simple glue and code for the critical paths.",
      },
      {
        q: "What is idempotency and why does it matter?",
        a: "An idempotent step can run twice and produce the same result as running once. It matters because automations retry after timeouts and webhooks are sometimes delivered more than once. Without it, a retry can create a second invoice or send a second email. We use unique keys and existence checks so retries are safe.",
      },
      {
        q: "Can you fix automations someone else built?",
        a: "Yes. We start by inventorying what exists, documenting it and adding monitoring. Then we decide with you which workflows to keep, which to rebuild and which to retire.",
      },
      {
        q: "Where does AI fit in workflow automation?",
        a: "In specific steps that need judgment over unstructured input, such as reading an email to decide which queue it belongs in. The rest of the workflow stays deterministic. That keeps runs cheaper and predictable, and limits model errors to steps where they can be checked.",
      },
    ],
    related: {
      services: ["ai-automation", "marketing-automation", "backend-development", "ai-agent-development"],
      industries: ["professional-services", "ecommerce", "multi-location"],
      answers: ["n8n-vs-zapier-vs-make", "is-n8n-free", "how-much-does-ai-automation-cost", "how-to-use-ai-in-business"],
      useCases: ["in-house-team-support", "post-funding-growth"],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "custom-ai-development",
    name: "Custom AI & LLM Development",
    discipline: "intelligence",
    metaTitle: "Custom AI Development Company: LLM Apps, RAG & Chatbots",
    metaDescription:
      "Custom LLM applications built on your own data: retrieval (RAG), assistants, extraction and AI features in your product, with evaluation and privacy designed in.",
    primaryQuery: "custom ai development company",
    secondaryQueries: [
      "custom ai development services",
      "llm development company",
      "rag development services",
      "ai integration services",
      "ai chatbot development services",
    ],
    updated: "2026-10-21",
    hero: {
      eyebrow: "Custom AI",
      title: ["Language models, grounded in your data.", "Tested before anyone depends on them."],
      lead:
        "We build applications on large language models for the jobs off-the-shelf tools don't fit: an assistant that answers from your policies and contracts, extraction that turns documents into clean records, AI features inside your own product. The work is mostly engineering around the model: retrieval, permissions, evaluation and the interface people use.",
    },
    problem: {
      heading: "The model is the easy part.",
      body: [
        "Calling a model API takes an afternoon. Making it useful on your data takes much more. A chatbot over your documents fails in ways that are hard to see at first: it retrieves the outdated version of a policy, cites a document the user isn't allowed to read, merges two similar products into one answer, or invents a clause when the right passage wasn't found. Each answer sounds equally sure of itself.",
        "Most of these failures trace back to retrieval and data, not the model. Documents are split in places that cut a table in half. Search matches on words and misses meaning, or matches on meaning and misses an exact part number. Nobody built a test set, so nobody knows whether a prompt change improved answers or broke them. And sensitive data gets sent to an external API without anyone checking the provider's retention terms.",
        "Good LLM development treats the model as one component among several. Ingestion is cleaned and kept current. Retrieval combines keyword and semantic search and respects the user's permissions. Answers cite their sources and say plainly when they don't know. A labelled evaluation set measures quality before launch and after every change. Fine-tuning comes later, if at all, once retrieval and prompting have been pushed as far as they go.",
      ],
    },
    included: [
      {
        title: "Retrieval-augmented generation (RAG)",
        detail:
          "Ingestion from your file stores, wikis, tickets and databases; chunking that respects document structure; hybrid keyword and vector search; reranking; and answers that cite the passages used.",
      },
      {
        title: "Permission-aware access",
        detail:
          "Retrieval filtered by who is asking, mirroring the access rules in your source systems, so the assistant never surfaces a document the user couldn't open directly.",
      },
      {
        title: "Assistants and chatbots",
        detail:
          "Internal and customer-facing assistants with clear scope, a refusal path for questions outside it, handoff to a person and conversation logs your team can review and learn from.",
      },
      {
        title: "Extraction and classification",
        detail:
          "Structured data pulled from contracts, invoices, forms and emails into a defined schema, with validation rules, confidence scores and a review queue for the cases the model is unsure about.",
      },
      {
        title: "AI features in your product",
        detail:
          "Search, summarization, drafting and recommendations built into your application, with streaming responses, rate limits, usage metering and graceful degradation when a model call fails.",
      },
      {
        title: "Evaluation and model selection",
        detail:
          "Labelled test sets, automated scoring and side-by-side comparison of models on your tasks, weighing quality against latency and cost, with the choice revisited as models and prices change.",
      },
    ],
    approach: [
      {
        title: "Frame the use case",
        detail:
          "Define who uses it, what questions or documents it handles, what a good answer looks like and what a bad one costs. We check that the data needed actually exists and can be accessed.",
      },
      {
        title: "Prepare the data",
        detail:
          "Audit the sources, remove duplicates and stale versions, decide what is in and out of scope, and build ingestion that keeps the index current as documents change.",
      },
      {
        title: "Prototype against a test set",
        detail:
          "Build a working retrieval and prompting pipeline and measure it on labelled examples. We tune chunking, search and prompts against the scores, and try more than one model.",
      },
      {
        title: "Harden for production",
        detail:
          "Add authentication and permission filters, logging and tracing, input and output checks, cost controls, fallbacks and the interface. Then a limited release with feedback collected on every answer.",
      },
      {
        title: "Measure and improve",
        detail:
          "Review flagged answers and logs, add failures to the test set, re-run evaluation before every change and report quality and cost trends to the owners on your side.",
      },
    ],
    measures: [
      "Answer accuracy on the labelled evaluation set",
      "Retrieval quality: whether the right source appears in results",
      "Answers with valid citations to the source passage",
      "Questions correctly declined as out of scope",
      "Latency to first token and to full response",
      "Model and infrastructure cost per query",
    ],
    fit: {
      for: [
        "Companies with substantial internal knowledge that people struggle to find",
        "Teams processing high volumes of similar documents by hand",
        "Software companies adding AI features their customers will rely on",
        "Organizations with privacy or compliance needs that rule out generic consumer tools",
      ],
      notFor: [
        "Anyone expecting a model to be right every time with no review",
        "Use cases where the source documents are missing, contradictory or badly out of date",
        "Problems a good search box or a database query would solve more cheaply",
        "Projects starting with fine-tuning before anyone has tried retrieval and prompting",
      ],
    },
    engagement: {
      model: "Discovery and a measured prototype, then a production build, with optional ongoing evaluation and tuning",
      duration: "A tested prototype typically comes within weeks; production timing depends on integrations and data cleanup",
      team: "AI engineering lead, data engineer, full-stack engineer, with a subject-matter reviewer on your side",
    },
    faqs: [
      {
        q: "What is RAG, and do we need it?",
        a: "Retrieval-augmented generation means searching your own content for relevant passages and giving them to the model with the question, so it answers from your sources rather than memory. If the answers depend on your documents, policies or data, you almost certainly need it. If the task is general writing or reasoning, you may not.",
      },
      {
        q: "Should we fine-tune a model on our data?",
        a: "Usually not first. Fine-tuning changes how a model writes or behaves, but it is a poor way to teach it facts that change. Retrieval keeps answers current and traceable. Fine-tuning can help later for consistent formatting, tone or narrow classification tasks once there's enough labelled data.",
      },
      {
        q: "Can the model run in our own cloud?",
        a: "Often, yes. Major cloud providers offer hosted access to commercial models inside your account, and open-weight models can be deployed on your own infrastructure. The trade-offs are capability, cost and operational effort, which we compare against your data requirements.",
      },
      {
        q: "How do you stop the chatbot from making things up?",
        a: "We can reduce it a lot but not eliminate it. Answers are grounded in retrieved passages, the model is instructed to say when it can't find support, citations are checked, and out-of-scope questions are declined. Where a wrong answer would be costly, a person reviews before it goes out.",
      },
      {
        q: "Do you integrate AI into existing software?",
        a: "Yes. Much of our work is adding AI features to products and internal systems that already exist, through their APIs and data stores, rather than building something separate that people have to remember to open.",
      },
    ],
    related: {
      services: ["ai-agent-development", "ai-automation", "backend-development", "web-app-development"],
      industries: ["law-firms", "healthcare", "b2b-saas", "fintech"],
      answers: ["what-is-rag-in-ai", "ai-agent-vs-chatbot", "how-to-use-ai-in-business", "how-much-does-it-cost-to-build-an-ai-agent"],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "web-app-development",
    name: "Web App Development",
    discipline: "product",
    metaTitle: "Web App Development Agency: SaaS, MVPs & Internal Tools",
    metaDescription:
      "Senior product engineering for SaaS, MVPs and internal tools in TypeScript, React, Next.js and Postgres, tested, documented and built for your team to own after.",
    primaryQuery: "web app development agency",
    secondaryQueries: [
      "web app development services",
      "custom software development agency",
      "saas development company",
      "mvp development services",
      "custom software development company",
    ],
    updated: "2026-10-21",
    hero: {
      eyebrow: "Web App Development",
      title: ["Software your team can own.", "Not just software that ships."],
      lead:
        "We design and build web applications end to end: SaaS products, MVPs, customer portals and the internal tools a business runs on. A small senior team works in TypeScript across the stack, ships in short increments you can use, and leaves behind a codebase, tests and documentation your own engineers can pick up without us.",
    },
    problem: {
      heading: "Most rebuilds are paying for shortcuts taken in the first build.",
      body: [
        "Software projects rarely fail on the first day. They fail at the handover. The app works in the demo, but there are no tests, deploys happen from one developer's machine, the database schema grew by accident, and the only person who understands authentication has moved on. Every new feature takes longer than the last, until a rewrite looks cheaper than continuing.",
        "The other common failure is building too much before learning anything. An MVP turns into a nine-month project with every feature anyone suggested, launched to users who wanted something narrower. Scope grew because nobody wrote down what the first release was for or what would count as evidence it was working.",
        "Good product engineering is boring in the right places. The first release is small and aimed at a specific question. The stack is mainstream, so hiring and support are easy. There's a test suite, automated deploys, preview environments for every change, error tracking and a written record of the important decisions. When we leave, your team inherits a system it can read, run and change with confidence.",
      ],
    },
    included: [
      {
        title: "Product scoping",
        detail:
          "Working sessions to define users, core jobs, the first release and what success looks like, turned into a short written scope and a backlog ordered by what you need to learn first.",
      },
      {
        title: "Front-end engineering",
        detail:
          "Interfaces in React and Next.js with TypeScript, built from a component library, accessible by keyboard and screen reader, and held to performance budgets on real devices.",
      },
      {
        title: "Back end, data and auth",
        detail:
          "APIs, a Postgres schema designed for how the data is queried, migrations under version control, authentication with roles and permissions, and background jobs for anything slow or scheduled.",
      },
      {
        title: "Integrations",
        detail:
          "Payments, email, file storage, CRM, accounting and the third-party APIs your product depends on, with webhooks verified, retries handled and failures logged.",
      },
      {
        title: "Testing and delivery",
        detail:
          "Unit and integration tests on business logic, end-to-end tests on critical user paths, CI that runs on every change, preview deployments for review and production releases you can roll back.",
      },
      {
        title: "Observability and handover",
        detail:
          "Error tracking, structured logs and uptime checks from the first release, plus a README, architecture notes, decision records and paired sessions with your engineers before we step back.",
      },
    ],
    approach: [
      {
        title: "Scope",
        detail:
          "Agree the problem, the users and the smallest release that tests the core idea. Write down what is out of scope, the main technical risks and how we'll know the release is working.",
      },
      {
        title: "Design and architect",
        detail:
          "Sketch the key flows and the data model together, choose hosting and services, and set up the repository, CI, environments and monitoring before the first feature is written.",
      },
      {
        title: "Build in increments",
        detail:
          "Ship working slices every week or two to a preview environment, review them with you, and adjust the backlog based on what you see and what users say, not on the original guess.",
      },
      {
        title: "Launch",
        detail:
          "Load and security checks, a data backup and restore drill, a release plan with a way back, and close monitoring through the first days of real traffic.",
      },
      {
        title: "Iterate and hand over",
        detail:
          "Continue on the roadmap or transfer ownership: documentation, access, paired work on real tickets and a period of support while your team takes the lead.",
      },
    ],
    measures: [
      "Lead time from merged change to production",
      "Failed deployments and time to restore service",
      "Error rate and slowest pages in production",
      "Core Web Vitals on the key user flows",
      "Test coverage of critical business logic and paths",
      "Activation and retention on the first release's core job",
    ],
    fit: {
      for: [
        "Founders building a first product who want a codebase that survives the first hire",
        "Companies replacing spreadsheets and email with a proper internal tool",
        "SaaS teams that need senior help shipping a significant new capability",
        "Organizations with an existing app that needs stabilizing before it can grow",
      ],
      notFor: [
        "Projects where the full feature list is fixed and learning from users isn't wanted",
        "Anyone looking for the lowest hourly rate rather than a team that makes decisions",
        "Simple marketing sites, which a website build serves better than an application",
        "Teams unwilling to make time for weekly reviews of working software",
      ],
    },
    engagement: {
      model: "A short scoping phase, then a dedicated team working in increments, priced by scope or by team over time",
      duration: "First usable release usually within weeks to a few months, depending on scope; ongoing work by agreement",
      team: "Tech lead, full-stack engineers, product designer, with QA and DevOps support as needed",
    },
    faqs: [
      {
        q: "How much does it cost to build a web app?",
        a: "It depends mainly on the number of distinct user roles and core flows, the integrations involved, data and compliance requirements, and how polished the first release must be. The clearest way to estimate is to agree a narrow first release, size it in weeks of a small team's time, and multiply by that team's rate. Be wary of a fixed number given before scope is written down.",
      },
      {
        q: "What stack do you use?",
        a: "Usually TypeScript throughout, React and Next.js on the front end, Node.js on the back end and Postgres for data, hosted on a mainstream cloud platform. It's widely known, which makes hiring and handover easier. We'll use something else when your team or constraints call for it.",
      },
      {
        q: "What is an MVP, and how small should it be?",
        a: "A minimum viable product is the smallest release that lets real users do the core job so you can learn whether it's worth building more. It should be small enough to ship quickly and complete enough that people use it for real. Leave out anything that doesn't help answer that question.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The repository, infrastructure and accounts live in your organization from the start, and we work inside them. When the engagement ends, nothing needs to be transferred because it was always yours.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Yes. We start with a short assessment of the code, infrastructure, tests and deployment process, then propose what to stabilize first. A full rewrite is rarely the right first move.",
      },
    ],
    related: {
      services: ["frontend-development", "backend-development", "custom-ai-development", "web-design"],
      industries: ["b2b-saas", "fintech", "healthcare"],
      answers: ["how-much-does-it-cost-to-build-a-web-app", "how-much-does-it-cost-to-build-a-saas-product", "what-is-an-mvp", "front-end-vs-back-end-development"],
      useCases: ["product-launch", "post-funding-growth"],
      compare: ["agency-vs-in-house", "agency-vs-freelancers"],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "frontend-development",
    name: "Front-End Development",
    discipline: "web",
    metaTitle: "Front-End Development Agency: React & Next.js Engineering",
    metaDescription:
      "Front-end engineering in React, Next.js and TypeScript: design systems, accessible components, performance budgets and tests, built for your team to extend.",
    primaryQuery: "front end development agency",
    secondaryQueries: [
      "frontend development services",
      "react development agency",
      "next.js development agency",
      "front end web development agency",
      "front end development services company",
    ],
    updated: "2026-10-21",
    hero: {
      eyebrow: "Front-End Development",
      title: ["Interfaces that feel fast.", "Code that stays easy to change."],
      lead:
        "We build the part of a product people actually touch, in React, Next.js and TypeScript. That means a component system shared by design and engineering, pages that load quickly on ordinary phones, interfaces that work with a keyboard and a screen reader, and tests that let your team change things without fear.",
    },
    problem: {
      heading: "Front ends decay one quick fix at a time.",
      body: [
        "A front end usually starts clean. Then each deadline adds a one-off button, a copied modal, a slightly different shade of the brand color and another state library someone preferred. A year later there are four ways to show an error, the bundle has doubled, and changing a form means touching a dozen files with no tests to say what else broke.",
        "Performance and accessibility are usually the first casualties. Pages load heavy scripts users don't need. Images arrive unoptimized. Data is fetched in the browser in waterfalls that could have run on the server. Custom dropdowns can't be used with a keyboard, focus disappears after a dialog closes, and nobody notices because nobody tested with a screen reader.",
        "A healthy front end has a design system that encodes decisions once, tokens for color, type and spacing, and components that are accessible by default. Rendering strategy is chosen per route: static where content rarely changes, server-rendered where it's personal, client-side only where interaction demands it. Performance budgets are checked in CI, so regressions fail a build instead of reaching users.",
      ],
    },
    included: [
      {
        title: "Design systems and component libraries",
        detail:
          "Design tokens, a documented component library and usage guidelines, kept in sync with design files so designers and engineers draw from the same source and new screens are assembled, not invented.",
      },
      {
        title: "React and Next.js applications",
        detail:
          "Routing, layouts, data fetching and rendering choices made per route, using server components and server rendering where they cut client JavaScript, and client components where interaction needs them.",
      },
      {
        title: "Accessibility",
        detail:
          "Semantic markup, keyboard support, focus management, color contrast and screen-reader testing built into components, assessed against the WCAG AA success criteria.",
      },
      {
        title: "Performance budgets",
        detail:
          "Limits on JavaScript size, image weight and Core Web Vitals (loading, responsiveness and layout stability) for key pages, measured in CI and in the field so regressions are caught before release.",
      },
      {
        title: "State, forms and data",
        detail:
          "A deliberate approach to server state, client state and caching, forms with validation that matches the back end, and clear loading, empty and error states for every view.",
      },
      {
        title: "Testing and tooling",
        detail:
          "Unit tests for logic, component tests for behavior, end-to-end tests on critical paths, visual regression checks for the design system, and linting and type checks that run on every change.",
      },
    ],
    approach: [
      {
        title: "Audit",
        detail:
          "For an existing product, review the codebase, bundle, performance data and accessibility, and list the problems in order of user impact. For a new one, agree the routes, data needs and design inputs.",
      },
      {
        title: "Set foundations",
        detail:
          "Establish tokens, core components, linting, type checks, testing setup and performance budgets before building screens, so every later page inherits them without extra effort.",
      },
      {
        title: "Build features",
        detail:
          "Ship screens and flows in small reviewed increments to preview deployments, each meeting the budgets, accessibility checks and tests before it merges.",
      },
      {
        title: "Measure in production",
        detail:
          "Track real-user performance and errors after release, fix regressions quickly and adjust budgets as the product grows.",
      },
      {
        title: "Document and transfer",
        detail:
          "Write the component documentation, contribution guidelines and architecture notes, and pair with your engineers until they're comfortable extending the system on their own.",
      },
    ],
    measures: [
      "Core Web Vitals from real users on key pages",
      "JavaScript shipped per route against budget",
      "Accessibility issues found by automated and manual testing",
      "Components reused versus one-off implementations",
      "Front-end error rate in production",
      "Time for your team to build a new screen from the system",
    ],
    fit: {
      for: [
        "Product teams whose front end has become slow to change or slow to load",
        "Companies building a design system to keep several products consistent",
        "Teams adopting Next.js or moving from an older React setup",
        "Organizations with accessibility obligations they need to meet properly",
      ],
      notFor: [
        "Projects that need a full product built end to end, where web app development fits better",
        "Anyone wanting a pixel copy of a design with no say in how it behaves",
        "Simple brochure sites better served by a website build on a CMS",
      ],
    },
    engagement: {
      model: "A focused audit or foundation phase, then embedded front-end engineering alongside your team",
      duration: "Foundations typically take weeks; embedded work runs as long as the roadmap needs",
      team: "Front-end lead, front-end engineers, design-system designer, accessibility specialist as needed",
    },
    faqs: [
      {
        q: "Should we use Next.js or plain React?",
        a: "React is a library for building user interfaces; Next.js is a framework built on React that adds routing, server rendering, static generation and server-side data handling. For most public-facing products and anything that benefits from fast first loads and search visibility, Next.js is a strong default. For an app behind a login with no search needs, a lighter React setup can be simpler.",
      },
      {
        q: "Do you work with our existing design team?",
        a: "Yes, and that's the best case. We work from your design files, help turn recurring patterns into tokens and components, and flag where a design will be hard to build accessibly or will cost performance, before engineering time is spent.",
      },
      {
        q: "How do you make a front end accessible?",
        a: "By building it into components rather than auditing at the end. That means semantic HTML, keyboard navigation, visible focus, proper labels, sufficient contrast and testing with screen readers, plus automated checks in CI. Automated tools catch only some issues, so manual testing stays part of the process.",
      },
      {
        q: "Can you improve our site's speed without a rebuild?",
        a: "Often. Common gains come from moving data fetching to the server, splitting bundles by route, removing unused dependencies, optimizing images and fonts, and deferring third-party scripts. An audit shows which of these apply before anything is rewritten.",
      },
    ],
    related: {
      services: ["web-app-development", "backend-development", "web-design", "cro"],
      industries: ["b2b-saas", "ecommerce"],
      answers: ["next-js-vs-react", "front-end-vs-back-end-development", "how-much-does-it-cost-to-build-a-web-app"],
      solutions: ["website-redesign"],
      useCases: ["website-migration"],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "backend-development",
    name: "Back-End & API Development",
    discipline: "product",
    metaTitle: "Backend Development Services: APIs, Data & Integrations",
    metaDescription:
      "Back-end engineering: contract-first APIs, Postgres data models, auth, background jobs, integrations and internal tools, observable and documented for handoff.",
    primaryQuery: "backend development services",
    secondaryQueries: [
      "api development services",
      "custom backend development services",
      "api development and integration services",
      "internal tools development",
      "rest api development services",
    ],
    updated: "2026-10-21",
    hero: {
      eyebrow: "Back-End & APIs",
      title: ["The part nobody sees.", "And everybody notices when it breaks."],
      lead:
        "We build the services, data models and integrations behind products and operations: APIs other teams can rely on, a database designed for how the data is used, background jobs that recover from failure, and the internal tools staff use every day. Everything is tested, observable and documented well enough for your engineers to run it.",
    },
    problem: {
      heading: "Back ends fail at the edges: bad data, retries, and nobody watching.",
      body: [
        "A back end can pass every demo and still be fragile. The API returns slightly different shapes depending on the path taken. The schema has columns nobody can explain, missing foreign keys and no plan for migrations. Slow work like sending emails or generating reports runs inside the web request, so a third-party outage takes the whole app down with it.",
        "Integrations are where most of the pain collects. A partner's webhook arrives twice and creates two orders. Another arrives unsigned and nobody checks. A rate limit is hit at month-end and requests are silently dropped. Authentication works, but authorization was bolted on later, so one customer can sometimes see another's records if they guess an ID.",
        "Solid back-end engineering starts from contracts: an API described before it's built, with types shared with the front end, and a data model designed around the questions the business asks of it. Slow and unreliable work moves to queues with retries and idempotency. Every request is traced and logged. Permissions are checked at the data layer, not just the screen. And the system is documented for whoever runs it next.",
      ],
    },
    included: [
      {
        title: "API design and build",
        detail:
          "REST or GraphQL APIs designed contract-first with OpenAPI or a typed schema, consistent errors, pagination and versioning, and documentation generated from the same source as the code.",
      },
      {
        title: "Data modeling and Postgres",
        detail:
          "Schemas with proper constraints and indexes, migrations under version control, query performance reviewed against real access patterns, and backups that are tested by restoring them.",
      },
      {
        title: "Authentication and authorization",
        detail:
          "Sign-in with sessions, single sign-on or a managed identity provider, plus role- and tenant-based permissions enforced on the server and, where useful, in the database itself.",
      },
      {
        title: "Background jobs and queues",
        detail:
          "Email, exports, imports, scheduled tasks and slow third-party calls moved out of the request path into queues with retries, backoff, idempotency keys and a dead-letter queue for failures.",
      },
      {
        title: "Integrations and webhooks",
        detail:
          "Connections to payment, CRM, ERP, logistics and other APIs, with signature verification on incoming webhooks, rate-limit handling and reconciliation jobs that catch anything missed.",
      },
      {
        title: "Internal tools",
        detail:
          "Admin panels, back-office dashboards and operational tools on top of your data, with audit logs of who changed what, so staff stop working from exports and shared spreadsheets.",
      },
    ],
    approach: [
      {
        title: "Assess",
        detail:
          "Review the current architecture, data, integrations, security posture and incidents, or for a new system, the product requirements and expected load. We list risks in order of likely damage.",
      },
      {
        title: "Design contracts and data",
        detail:
          "Write the API contract and data model first and review them with front-end and product, because these are the hardest things to change later.",
      },
      {
        title: "Build with tests",
        detail:
          "Implement endpoints, jobs and integrations with automated tests at the unit and integration level, against a real database in CI, and with security checks on dependencies and common vulnerabilities.",
      },
      {
        title: "Instrument and release",
        detail:
          "Add structured logs, traces and metrics, set alerts on error rates, latency and queue depth, and release in stages with a rollback plan.",
      },
      {
        title: "Document and hand over",
        detail:
          "Provide API documentation, architecture and data diagrams, runbooks for common incidents and on-call guidance, then work alongside your team until they own it fully.",
      },
    ],
    measures: [
      "API latency at the median and the slow tail",
      "Error rate by endpoint and integration",
      "Failed jobs, retries and dead-letter queue depth",
      "Slow queries and database load",
      "Mean time to detect and resolve incidents",
      "Endpoints covered by contract and integration tests",
    ],
    fit: {
      for: [
        "Products whose back end has become the bottleneck for every new feature",
        "Companies connecting several third-party systems that must stay in sync",
        "Teams that need a reliable public or partner API",
        "Operations teams running the business from spreadsheets that should be an internal tool",
      ],
      notFor: [
        "Work that a no-code automation platform would handle more cheaply and simply",
        "Teams that want features shipped with no time for tests or monitoring",
        "Projects with no one on your side to own the system after handover",
      ],
    },
    engagement: {
      model: "An assessment or design phase, then fixed-scope builds or an embedded back-end team",
      duration: "Assessments take a few weeks; builds are sized to scope, from a single integration to a full service",
      team: "Back-end lead, back-end engineers, with DevOps and security review as needed",
    },
    faqs: [
      {
        q: "REST or GraphQL?",
        a: "REST is simpler to cache, monitor and secure, and suits most APIs, especially public ones. GraphQL helps when many clients need different shapes of the same data and you want to avoid many round trips. We choose per case, and either way we write the contract first.",
      },
      {
        q: "Which languages and databases do you use?",
        a: "Most often TypeScript on Node.js with Postgres, because it shares types with a React front end and is widely understood. We also work in Python where data or AI work makes it the better fit. Postgres covers most needs; we add caching, search or queues when the workload calls for them.",
      },
      {
        q: "How do you handle security?",
        a: "As part of the build rather than as a final step: validated inputs, parameterized queries, authorization checked on every request, secrets in a managed store, dependencies scanned, and common web vulnerabilities reviewed. For regulated data we work with your security and compliance team on the specific requirements.",
      },
      {
        q: "Can you build internal tools on our existing database?",
        a: "Yes. Internal tools often sit directly on the data you already have. We add an API layer with permissions and audit logs rather than giving tools raw database access, so changes are controlled and traceable.",
      },
      {
        q: "What is an idempotency key?",
        a: "A unique value sent with a request so that if the same request arrives twice, the server performs the action only once. It's how payment and order APIs avoid duplicate charges when a client retries after a timeout, and we use the same pattern for webhooks and jobs.",
      },
    ],
    related: {
      services: ["web-app-development", "frontend-development", "workflow-automation", "ai-agent-development"],
      industries: ["fintech", "b2b-saas", "ecommerce"],
      answers: ["what-is-backend-development", "front-end-vs-back-end-development", "how-much-does-it-cost-to-build-a-saas-product"],
      compare: ["retainer-vs-project"],
    },
  },
];
