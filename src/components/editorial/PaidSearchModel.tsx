"use client";

import { useId, useState, type CSSProperties } from "react";
import s from "./figure.module.css";

/*
 * The paid search economics model, run with the reader's own numbers.
 * Works backwards from what a customer is worth to the most a lead and a
 * click can cost. Defaults reproduce the report's worked example; nothing
 * leaves the page.
 */

type Key = "deal" | "margin" | "allowance" | "qualified" | "won" | "conversion";
const FIELDS: { key: Key; label: string; unit: "$" | "%"; min: number; max: number; step: number; hint: string }[] = [
  { key: "deal", label: "Average deal value", unit: "$", min: 1000, max: 250000, step: 500, hint: "Revenue from a new customer’s first engagement" },
  { key: "margin", label: "Gross margin", unit: "%", min: 5, max: 95, step: 1, hint: "What’s left after the cost of delivery" },
  { key: "allowance", label: "Acquisition allowance", unit: "%", min: 5, max: 100, step: 1, hint: "Share of gross profit you’ll spend to win a customer" },
  { key: "qualified", label: "Lead → qualified", unit: "%", min: 1, max: 100, step: 1, hint: "Leads that turn out to be real prospects" },
  { key: "won", label: "Qualified → won", unit: "%", min: 1, max: 100, step: 1, hint: "Qualified leads that sign" },
  { key: "conversion", label: "Landing page conversion", unit: "%", min: 0.5, max: 40, step: 0.5, hint: "Visitors who become leads" },
];
const DEFAULTS: Record<Key, number> = { deal: 30000, margin: 60, allowance: 30, qualified: 40, won: 25, conversion: 5 };

const usd = (n: number, cents = false) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: cents ? 2 : 0, minimumFractionDigits: cents ? 2 : 0 }).format(n);

export function PaidSearchModel() {
  // What the reader typed is kept as typed ("5." mid-entry stays "5.");
  // the model reads the parsed value.
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const initial = Object.fromEntries((Object.keys(DEFAULTS) as Key[]).map((k) => [k, fmt(DEFAULTS[k])])) as Record<Key, string>;
  const [raw, setRaw] = useState(initial);
  const id = useId();
  const parse = (x: string) => {
    const n = Number(x.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };
  const v = Object.fromEntries((Object.keys(raw) as Key[]).map((k) => [k, parse(raw[k])])) as Record<Key, number>;
  const set = (k: Key, x: string) => setRaw((o) => ({ ...o, [k]: x.replace(/[^0-9.,]/g, "") }));

  const gp = v.deal * (v.margin / 100);
  const cac = gp * (v.allowance / 100);
  const l2c = (v.qualified / 100) * (v.won / 100);
  const cpl = cac * l2c;
  const cpc = cpl * (v.conversion / 100);
  const leadsPer = l2c > 0 ? 1 / l2c : 0;
  const changed = (Object.keys(DEFAULTS) as Key[]).some((k) => v[k] !== DEFAULTS[k]);

  const out = [
    { label: "Gross profit per customer", value: usd(gp) },
    { label: "Allowable acquisition cost", value: usd(cac) },
    { label: "Leads per customer", value: leadsPer ? (Math.round(leadsPer * 10) / 10).toLocaleString("en-US") : "—" },
    { label: "Allowable cost per lead", value: usd(cpl) },
  ];

  return (
    <div className={s.model}>
      <fieldset className={s.inputs}>
        <legend className="sr-only">Your numbers</legend>
        {FIELDS.map((f) => (
          <div key={f.key} className={s.field}>
            <label htmlFor={`${id}-${f.key}`}>
              <span>{f.label}</span>
              <small>{f.hint}</small>
            </label>
            <div className={s.control}>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={Math.min(f.max, Math.max(f.min, v[f.key]))}
                onChange={(e) => set(f.key, fmt(Number(e.target.value)))}
                aria-hidden="true"
                tabIndex={-1}
                style={{ "--p": `${((Math.min(f.max, Math.max(f.min, v[f.key])) - f.min) / (f.max - f.min)) * 100}%` } as CSSProperties}
              />
              <span className={s.num}>
                {f.unit === "$" && <i>$</i>}
                <input
                  id={`${id}-${f.key}`}
                  inputMode="decimal"
                  autoComplete="off"
                  value={raw[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  onBlur={() => set(f.key, fmt(v[f.key]))}
                />
                {f.unit === "%" && <i>%</i>}
              </span>
            </div>
          </div>
        ))}
      </fieldset>

      <div className={s.outputs} aria-live="polite">
        <dl>
          {out.map((o) => (
            <div key={o.label}>
              <dt>{o.label}</dt>
              <dd>{o.value}</dd>
            </div>
          ))}
        </dl>
        <div className={s.answer}>
          <span>Allowable cost per click</span>
          <b>{usd(cpc, cpc < 100)}</b>
          <small>The most an average click can cost while each customer costs no more than your allowance.</small>
        </div>
        {changed && (
          <button type="button" className={s.reset} onClick={() => setRaw(initial)}>
            Reset to the worked example
          </button>
        )}
      </div>
    </div>
  );
}
