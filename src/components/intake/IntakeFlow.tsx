"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import { brand } from "@/config/brand";
import { companySizes, needs, scopes, timelines, validIds } from "@/content/intake";
import { Button } from "@/components/ui/Button";
import { getLenis } from "@/components/system/SmoothScroll";
import styles from "./IntakeFlow.module.css";

/**
 * Project intake — a consultation, not a contact form.
 * One question at a time, keyboard-first, draft saved locally, and every
 * answer summarised in the rail so the visitor always knows where they are.
 */

type Answers = {
  building: string;
  needs: string[];
  size: string;
  scope: string;
  timeline: string;
  context: string;
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
};

const EMPTY: Answers = {
  building: "",
  needs: [],
  size: "",
  scope: "",
  timeline: "",
  context: "",
  name: "",
  email: "",
  company: "",
  role: "",
  website: "",
};

const DRAFT_KEY = "intake-draft-v1";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LETTERS = "ABCDEFGH";

type StepId = "building" | "needs" | "size" | "scope" | "timeline" | "context" | "contact" | "review";

const STEPS: { id: StepId; label: string; question: string; hint?: string }[] = [
  { id: "building", label: "Company", question: "What are you building?", hint: "In a sentence or two — the company, and where it is going." },
  { id: "needs", label: "Needs", question: "What do you need help with?", hint: "Choose all that apply." },
  { id: "size", label: "Size", question: "How large is the company?" },
  { id: "scope", label: "Scope", question: "What is the approximate scope?", hint: "A range is fine. It helps us propose the right shape of engagement." },
  { id: "timeline", label: "Timeline", question: "When would you like to start?" },
  { id: "context", label: "Context", question: "Anything else we should know?", hint: "Goals, constraints, current stack, links. Optional — but useful." },
  { id: "contact", label: "Contact", question: "Where should we reply?" },
  { id: "review", label: "Review", question: "Ready when you are." },
];

const labelOf = (list: readonly { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? "";

function summary(id: StepId, a: Answers): string {
  switch (id) {
    case "building":
      return a.building;
    case "needs":
      return a.needs.map((n) => labelOf(needs, n)).join(", ");
    case "size":
      return labelOf(companySizes, a.size);
    case "scope":
      return labelOf(scopes, a.scope);
    case "timeline":
      return labelOf(timelines, a.timeline);
    case "context":
      return a.context ? "Added" : "";
    case "contact":
      return a.email;
    default:
      return "";
  }
}

function validate(id: StepId, a: Answers): string | null {
  switch (id) {
    case "building":
      return a.building.trim().length < 3 ? "A short description helps us prepare." : null;
    case "needs":
      return a.needs.length ? null : "Choose at least one — “Multiple / Not sure” is fine.";
    case "size":
      return a.size ? null : "Choose the closest range.";
    case "scope":
      return a.scope ? null : "Choose a range, or “Not sure yet”.";
    case "timeline":
      return a.timeline ? null : "Choose a timeline.";
    case "contact":
      if (!a.name.trim()) return "Please add your name.";
      if (!EMAIL.test(a.email.trim())) return "Please add a valid work email.";
      if (!a.company.trim()) return "Please add your company.";
      return null;
    default:
      return null;
  }
}

export function IntakeFlow() {
  const params = useSearchParams();
  const [a, setA] = useState<Answers>(EMPTY);
  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [honey, setHoney] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mounted = useRef(false);

  // Restore draft, then apply a deep-linked need (?need=website).
  useEffect(() => {
    let draft: Answers = EMPTY;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) draft = { ...EMPTY, ...JSON.parse(raw) };
    } catch {}
    const need = params.get("need");
    if (need && validIds.needs.includes(need) && !draft.needs.includes(need)) {
      draft = { ...draft, needs: [...draft.needs, need] };
    }
    setA(draft);
  }, [params]);

  useEffect(() => {
    if (!mounted.current) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(a));
    } catch {}
  }, [a]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    // Keep the question in view: if the panel's top has scrolled under the
    // header, bring it back.
    const top = formRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 96) {
      const y = window.scrollY + top - 110;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 0.9 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [step]);

  const current = STEPS[step];
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => {
    setA((prev) => ({ ...prev, [k]: v }));
    setError(null);
  };

  const go = useCallback(
    (to: number) => {
      setError(null);
      setStep(to);
      setFurthest((f) => Math.max(f, to));
    },
    [],
  );

  const next = useCallback(() => {
    const err = validate(current.id, a);
    if (err) {
      setError(err);
      return;
    }
    go(Math.min(step + 1, STEPS.length - 1));
  }, [a, current.id, go, step]);

  const back = () => go(Math.max(0, step - 1));

  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    for (let i = 0; i < STEPS.length - 1; i++) {
      const err = validate(STEPS[i].id, a);
      if (err) {
        go(i);
        setError(err);
        return;
      }
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...a, _hp: honey }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
    } catch {
      setStatus("failed");
    }
  };

  // Choice shortcuts: press A, B, C… on option steps.
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    const typing = target.tagName === "TEXTAREA" || (target.tagName === "INPUT" && (target as HTMLInputElement).type !== "checkbox" && (target as HTMLInputElement).type !== "radio");
    if (e.key === "Enter" && !e.shiftKey && target.tagName !== "TEXTAREA" && target.tagName !== "BUTTON") {
      e.preventDefault();
      if (current.id === "review") submit();
      else next();
      return;
    }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    const idx = LETTERS.indexOf(e.key.toUpperCase());
    if (idx < 0) return;
    if (current.id === "needs" && needs[idx]) {
      const id = needs[idx].id;
      set("needs", a.needs.includes(id) ? a.needs.filter((n) => n !== id) : [...a.needs, id]);
    } else if (current.id === "size" && companySizes[idx]) set("size", companySizes[idx].id);
    else if (current.id === "scope" && scopes[idx]) set("scope", scopes[idx].id);
    else if (current.id === "timeline" && timelines[idx]) set("timeline", timelines[idx].id);
  };

  const progress = useMemo(() => step / (STEPS.length - 1), [step]);

  if (status === "sent") {
    return (
      <div className={`glass ${styles.done}`} data-level="3" role="status">
        <span className={styles.doneMark} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 10 10" fill="none">
            <path d="M2 5.2 4.1 7.3 8 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className={styles.doneTitle}>Thank you, {a.name.split(" ")[0]}.</h2>
        <p className={styles.doneLead}>Your brief is in. Here is what happens next.</p>
        <ol className={styles.nextSteps} role="list">
          <li>
            <span>01</span>We review your answers and any links you shared.
          </li>
          <li>
            <span>02</span>We reply to <b>{a.email}</b> to arrange a first conversation.
          </li>
          <li>
            <span>03</span>If there is a fit, we propose a focused diagnostic to scope the work.
          </li>
        </ol>
        <Button href="/work" variant="secondary" arrow>
          Explore our work meanwhile
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.shell} style={{ "--progress": progress } as CSSProperties}>
      {/* Rail: where you are, and what you've said. */}
      <nav className={styles.rail} aria-label="Intake progress">
        <div className={styles.bar} aria-hidden="true">
          <span />
        </div>
        <ol role="list">
          {STEPS.map((s, i) => {
            const sum = summary(s.id, a);
            const reachable = i <= furthest;
            return (
              <li key={s.id} data-state={i === step ? "current" : i < step ? "done" : "todo"}>
                <button type="button" disabled={!reachable} onClick={() => go(i)} aria-current={i === step ? "step" : undefined}>
                  <span className={styles.railIdx}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.railLabel}>{s.label}</span>
                  {sum && i !== step && <span className={styles.railSum}>{sum}</span>}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <form ref={formRef} className={`glass ${styles.panel}`} data-level="3" data-pointer-light="" onSubmit={submit} onKeyDown={onKeyDown} noValidate>
        <div className={styles.mobileProgress} aria-hidden="true">
          <span>
            {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <i>
            <b />
          </i>
        </div>

        {/* Honeypot — invisible to people, tempting to bots. */}
        <div className={styles.hp} aria-hidden="true">
          <label>
            Leave empty
            <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
          </label>
        </div>

        <fieldset className={styles.step} key={current.id}>
          <legend className="sr-only">{current.question}</legend>
          <p className={styles.stepIdx} aria-hidden="true">
            {String(step + 1).padStart(2, "0")} — {current.label}
          </p>
          <h2 ref={headingRef} tabIndex={-1} className={styles.question}>
            {current.question}
          </h2>
          {current.hint && <p className={styles.hint}>{current.hint}</p>}

          <div className={styles.field}>
            {current.id === "building" && (
              <textarea
                className={styles.textarea}
                rows={3}
                autoFocus
                maxLength={600}
                placeholder="e.g. A B2B platform for logistics teams, expanding into Europe next year."
                value={a.building}
                onChange={(e) => set("building", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    next();
                  }
                }}
                aria-label={current.question}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "intake-error" : undefined}
              />
            )}

            {current.id === "needs" && (
              <div className={styles.options} data-cols="2">
                {needs.map((n, i) => {
                  const on = a.needs.includes(n.id);
                  return (
                    <label key={n.id} className={styles.option} data-on={on || undefined}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => set("needs", on ? a.needs.filter((x) => x !== n.id) : [...a.needs, n.id])}
                      />
                      <span className={styles.key}>{LETTERS[i]}</span>
                      <span className={styles.optLabel}>{n.label}</span>
                      <span className={styles.check} aria-hidden="true" />
                    </label>
                  );
                })}
              </div>
            )}

            {(current.id === "size" || current.id === "scope" || current.id === "timeline") && (
              <div className={styles.options} data-cols={current.id === "timeline" ? "1" : "2"} role="radiogroup" aria-label={current.question}>
                {(current.id === "size" ? companySizes : current.id === "scope" ? scopes : timelines).map((o, i) => {
                  const key = current.id as "size" | "scope" | "timeline";
                  const on = a[key] === o.id;
                  return (
                    <label key={o.id} className={styles.option} data-on={on || undefined}>
                      <input type="radio" name={key} checked={on} onChange={() => set(key, o.id)} />
                      <span className={styles.key}>{LETTERS[i]}</span>
                      <span className={styles.optLabel}>
                        {o.label}
                        {"hint" in o && <small>{o.hint}</small>}
                      </span>
                      <span className={styles.radio} aria-hidden="true" />
                    </label>
                  );
                })}
              </div>
            )}

            {current.id === "context" && (
              <textarea
                className={styles.textarea}
                rows={6}
                autoFocus
                maxLength={4000}
                placeholder="What does success look like in twelve months? What has been tried? Anything we should read first?"
                value={a.context}
                onChange={(e) => set("context", e.target.value)}
                aria-label={current.question}
              />
            )}

            {current.id === "contact" && (
              <div className={styles.contact}>
                {(
                  [
                    ["name", "Name", "text", "name", true],
                    ["email", "Work email", "email", "email", true],
                    ["company", "Company", "text", "organization", true],
                    ["role", "Role", "text", "organization-title", false],
                    ["website", "Website", "url", "url", false],
                  ] as const
                ).map(([k, label, type, ac, req], i) => (
                  <label key={k} className={styles.input}>
                    <span>
                      {label}
                      {!req && <i> — optional</i>}
                    </span>
                    <input
                      type={type}
                      autoComplete={ac}
                      autoFocus={i === 0}
                      required={req}
                      maxLength={200}
                      value={a[k]}
                      onChange={(e) => set(k, e.target.value)}
                      aria-invalid={Boolean(error) && req && !a[k]}
                    />
                  </label>
                ))}
              </div>
            )}

            {current.id === "review" && (
              <dl className={styles.review}>
                {STEPS.slice(0, -1).map((s, i) => {
                  const val = s.id === "context" ? a.context || "—" : s.id === "contact" ? `${a.name} · ${a.email} · ${a.company}` : summary(s.id, a);
                  return (
                    <div key={s.id}>
                      <dt>{s.label}</dt>
                      <dd>{val}</dd>
                      <button type="button" onClick={() => go(i)}>
                        Edit
                      </button>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>

          <p id="intake-error" className={styles.error} role="alert" aria-live="assertive">
            {error}
          </p>
          {status === "failed" && (
            <p className={styles.error} role="alert">
              Something went wrong sending your brief. Please try again, or email us at{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
          )}
        </fieldset>

        <div className={styles.actions}>
          {step > 0 ? (
            <button type="button" className={styles.back} onClick={back}>
              ← Back
            </button>
          ) : (
            <span />
          )}
          <div className={styles.actionsRight}>
            <span className={styles.enterHint} aria-hidden="true">
              Press <kbd>Enter ↵</kbd>
            </span>
            {current.id === "review" ? (
              <Button type="submit" size="lg" arrow magnetic disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send brief"}
              </Button>
            ) : (
              <Button type="button" size="lg" arrow onClick={next}>
                {current.id === "context" && !a.context ? "Skip" : "Continue"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
