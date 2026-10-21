"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import s from "./teams.module.css";

/*
 * Where agents and automations earn their keep, team by team. Each entry
 * names the work, what the system does with it, and where a person stays
 * in charge. These are kinds of work we build for, not past projects.
 */

type Job = { title: string; does: string; person: string; systems: string };

const TEAMS: { id: string; label: string; jobs: Job[] }[] = [
  {
    id: "sales",
    label: "Sales",
    jobs: [
      { title: "Inbound qualification", does: "Reads each inquiry, enriches the company, scores fit and books the right rep.", person: "Reps approve anything outside the rules.", systems: "Forms · CRM · Calendar" },
      { title: "Research briefs", does: "Pulls a prospect's site, filings and news into a one-page brief before the call.", person: "The rep edits and owns the brief.", systems: "Web · CRM · Docs" },
      { title: "Follow-up drafting", does: "Drafts the recap and next steps from call notes, in your tone, with sources.", person: "Nothing sends without the rep.", systems: "Call notes · Email · CRM" },
    ],
  },
  {
    id: "support",
    label: "Support",
    jobs: [
      { title: "Triage and routing", does: "Classifies every ticket by intent and urgency and sends it to the right queue.", person: "Agents see why it was routed.", systems: "Help desk · Slack" },
      { title: "Grounded answers", does: "Drafts replies from your policies and docs, citing the passage it used.", person: "Refunds and exceptions wait for approval.", systems: "Help desk · Knowledge base" },
      { title: "Account context", does: "Puts orders, plan and history next to the ticket before anyone opens it.", person: "Read-only until a person acts.", systems: "Billing · Orders · CRM" },
    ],
  },
  {
    id: "ops",
    label: "Operations",
    jobs: [
      { title: "Document intake", does: "Extracts fields from forms, PDFs and email into your systems, schema-checked.", person: "Low-confidence fields go to review.", systems: "Email · Storage · ERP" },
      { title: "Scheduling and dispatch", does: "Matches jobs to people by skill, location and availability, and confirms them.", person: "Dispatch can override any match.", systems: "Calendar · Field service · SMS" },
      { title: "Reconciliation", does: "Compares records across two systems nightly and flags every mismatch.", person: "Owners resolve; nothing is auto-corrected.", systems: "Database · Spreadsheets · ERP" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    jobs: [
      { title: "Invoice matching", does: "Matches invoices to purchase orders and receipts, and explains each exception.", person: "Payment runs need sign-off.", systems: "Accounting · Email" },
      { title: "Collections nudges", does: "Drafts reminders by account status and history, on the schedule you set.", person: "Sensitive accounts stay manual.", systems: "Accounting · CRM · Email" },
      { title: "Close prep", does: "Assembles the month-end checklist, pulls balances and lists what's missing.", person: "The controller closes the books.", systems: "Accounting · Bank feeds" },
    ],
  },
  {
    id: "legal",
    label: "Legal & compliance",
    jobs: [
      { title: "Contract review", does: "Compares a draft against your playbook and lists deviations, with clause references.", person: "Counsel decides every change.", systems: "Document storage · Email" },
      { title: "Policy questions", does: "Answers staff questions from your own policies, citing the section, or declines.", person: "Escalates anything not covered.", systems: "Intranet · Chat" },
      { title: "Evidence collection", does: "Gathers logs and records for audits into one folder, with a manifest.", person: "Compliance reviews before sharing.", systems: "Cloud · Ticketing · Storage" },
    ],
  },
  {
    id: "eng",
    label: "Engineering",
    jobs: [
      { title: "Internal tools", does: "Admin panels and portals that replace spreadsheets and ad-hoc scripts.", person: "Your team owns the code.", systems: "Postgres · APIs · Auth" },
      { title: "AI features in your product", does: "Search, summaries and assistants built on your data, with evals in CI.", person: "Releases ship behind flags.", systems: "Your app · Model APIs" },
      { title: "Integration layer", does: "Typed, monitored connections between the systems that run the business.", person: "Alerts go to a named owner.", systems: "Webhooks · Queues · APIs" },
    ],
  },
];

export function TeamAgents() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const n = TEAMS.length;
    const next = e.key === "ArrowRight" ? (active + 1) % n : e.key === "ArrowLeft" ? (active - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };
  const team = TEAMS[active];
  return (
    <div className={s.wrap}>
      <div className={s.tabs} role="tablist" aria-label="Teams" onKeyDown={onKey}>
        {TEAMS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`team-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="team-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="team-panel" className={s.panel} role="tabpanel" aria-labelledby={`team-tab-${team.id}`} key={team.id}>
        {team.jobs.map((j, i) => (
          <article key={j.title} className={s.job} data-pointer-light="" style={{ "--i": i } as CSSProperties}>
            <h3>{j.title}</h3>
            <p>{j.does}</p>
            <dl>
              <div>
                <dt>Person in the loop</dt>
                <dd>{j.person}</dd>
              </div>
              <div>
                <dt>Touches</dt>
                <dd>{j.systems}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
