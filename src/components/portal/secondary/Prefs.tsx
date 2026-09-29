"use client";

import { useState, useTransition } from "react";
import { savePrefs } from "@/app/portal/actions";
import type { NotificationPrefs } from "@/portal/model";
import s from "./secondary.module.css";

const ROWS: { key: Exclude<keyof NotificationPrefs, "digest">; title: string; sub: string }[] = [
  { key: "approvals", title: "Your approval is needed", sub: "The moment a decision is waiting on you" },
  { key: "launches", title: "Campaign launched", sub: "When something goes live" },
  { key: "deliverables", title: "Deliverable ready", sub: "New files and reports in your vault" },
  { key: "replies", title: "Your team replied", sub: "Replies in conversations you’re part of" },
  { key: "reports", title: "Weekly report available", sub: "A summary of the week, every Monday" },
];

/** High-signal notifications only; each one is switchable. */
export function Prefs({ initial }: { initial: NotificationPrefs }) {
  const [prefs, setPrefs] = useState(initial);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);
  const update = (next: NotificationPrefs) => {
    setPrefs(next);
    start(async () => {
      const r = await savePrefs(next);
      setSaved(r.ok ? "Saved" : r.error);
    });
  };
  return (
    <>
      <ul className={s.prefs} role="list">
        {ROWS.map((r) => (
          <li key={r.key} className={s.pref}>
            <span className={s.prefText} id={`pref-${r.key}`}>
              <strong>{r.title}</strong>
              <span>{r.sub}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={prefs[r.key]}
              aria-labelledby={`pref-${r.key}`}
              className={s.switch}
              onClick={() => update({ ...prefs, [r.key]: !prefs[r.key] })}
            />
          </li>
        ))}
        <li className={s.pref}>
          <label className={s.prefText} htmlFor="pref-digest">
            <strong>Email digest</strong>
            <span>Everything above, collected into one email</span>
          </label>
          <select id="pref-digest" className={s.select} value={prefs.digest} onChange={(e) => update({ ...prefs, digest: e.target.value as NotificationPrefs["digest"] })}>
            <option value="off">Off</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </li>
      </ul>
      <p className={s.pad}>
        <span className={s.saved} aria-live="polite">
          {pending ? "Saving…" : saved ?? "Changes save automatically."}
        </span>
      </p>
    </>
  );
}
