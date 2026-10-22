"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Screen } from "@/content/flow-screens";
import s from "./director.module.css";

/*
 * Directs a recreated screen like a screen recording: a cursor travels to
 * named targets and clicks them, fields type themselves, panes scroll, and
 * state flips (Pending → Succeeded, Approve → Approved) as the step lands.
 *
 * Targets are plain data attributes in the screen markup:
 *   data-cue="x"     something the cursor can move to, hover or click
 *   data-type="x"    text that types itself in
 *   data-scroll="x"  a pane that scrolls
 *   data-after="x"   hidden until cue x fires; data-before="x" leaves when it does
 * Missing targets are skipped, so one script serves every variant of a type.
 * With reduced motion (or a still theater) the screen shows its final state.
 */

type Act =
  | ["wait", number]
  | ["move", string]
  | ["hover", string]
  | ["click", string]
  | ["type", string]
  | ["fire", string]
  | ["scroll", string, number];

const SCRIPTS: Record<Screen["t"], Act[]> = {
  order: [["wait", 500], ["fire", "arrive"], ["wait", 500], ["hover", "item0"], ["hover", "item2"], ["scroll", "pane", 40], ["hover", "risk"]],
  payment: [["wait", 500], ["hover", "amount"], ["fire", "capture"], ["wait", 500], ["hover", "method"], ["hover", "risk"]],
  agent: [["wait", 400], ["type", "input"], ["fire", "out"], ["wait", 1100], ["hover", "verdict"]],
  receipt: [["wait", 500], ["hover", "line0"], ["hover", "line2"], ["click", "save"], ["wait", 500]],
  email: [["wait", 400], ["type", "body"], ["hover", "attach"], ["click", "attach"], ["click", "send"], ["wait", 500]],
  chat: [["wait", 400], ["fire", "post"], ["wait", 700], ["click", "approve"], ["wait", 300], ["click", "react"], ["wait", 400]],
  form: [["wait", 500], ["hover", "a0"], ["scroll", "pane", 54], ["hover", "a3"]],
  crm: [["wait", 400], ["fire", "saved"], ["hover", "p0"], ["click", "advance"], ["click", "owner"], ["wait", 500]],
  calendar: [["wait", 400], ["move", "slot"], ["click", "slot"], ["fire", "drop"], ["wait", 800]],
  ticket: [["wait", 400], ["hover", "message"], ["type", "draft"], ["click", "submit"], ["wait", 500]],
  doc: [["wait", 400], ["scroll", "pane", 30], ["fire", "hl"], ["hover", "hl"], ["wait", 600]],
  table: [["wait", 400], ["hover", "row0"], ["hover", "row1"], ["click", "match"], ["type", "cell"], ["wait", 500]],
  chart: [["wait", 600], ["hover", "spike"], ["fire", "tip"], ["wait", 900]],
  commits: [["wait", 400], ["hover", "c1"], ["click", "c0"], ["fire", "suspect"], ["wait", 600]],
  issue: [["wait", 300], ["type", "title"], ["click", "priority"], ["fire", "urgent"], ["wait", 600]],
  incident: [["wait", 500], ["fire", "page"], ["hover", "notify"], ["wait", 700]],
  tasks: [["wait", 400], ["hover", "t0"], ["hover", "t2"], ["click", "assign"], ["wait", 500]],
  files: [["wait", 400], ["click", "new"], ["fire", "folder"], ["wait", 800]],
  esign: [["wait", 400], ["fire", "sign"], ["wait", 1100], ["fire", "done"], ["hover", "doneBar"]],
  terminal: [["wait", 300], ["type", "query"], ["fire", "run"], ["wait", 900]],
};

const MOVE = 650;
const TYPE_MS = 22;

/** How long a screen's choreography runs, so the theater can hold the step. */
export function scriptMs(screen: Screen) {
  let t = 0;
  for (const a of SCRIPTS[screen.t]) {
    if (a[0] === "wait") t += a[1];
    else if (a[0] === "type") t += 900;
    else if (a[0] === "fire") t += 150;
    else if (a[0] === "scroll") t += 700;
    else t += MOVE + (a[0] === "click" ? 260 : 120);
  }
  return t + 700;
}

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Director({ screen, still, children }: { screen: Screen; still?: boolean; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const cur = cursor.current;
    if (!el || !cur) return;
    const q = (sel: string) => el.querySelector<HTMLElement>(sel);
    const fire = (cue: string) => {
      el.querySelectorAll<HTMLElement>(`[data-after="${cue}"]`).forEach((n) => n.setAttribute("data-shown", ""));
      el.querySelectorAll<HTMLElement>(`[data-before="${cue}"]`).forEach((n) => n.setAttribute("data-gone", ""));
    };
    const finish = () => {
      el.querySelectorAll<HTMLElement>("[data-type]").forEach((n) => {
        if (n.dataset.full !== undefined) n.textContent = n.dataset.full;
        n.removeAttribute("data-typing");
      });
      for (const a of SCRIPTS[screen.t]) if (a[0] === "fire" || a[0] === "click") fire(a[1]);
      el.querySelectorAll<HTMLElement>("[data-cue='match'], [data-cue='advance'], [data-cue='c0']").forEach((n) => n.setAttribute("data-clicked", ""));
      el.setAttribute("data-final", "");
    };
    if (still || reduced()) {
      finish();
      return;
    }

    // Typing targets start empty and remember their text.
    const typed = Array.from(el.querySelectorAll<HTMLElement>("[data-type]"));
    typed.forEach((n) => {
      // Captured once: a re-run of this effect must not read the cleared text.
      if (n.dataset.full === undefined) n.dataset.full = n.textContent ?? "";
      n.textContent = "";
    });

    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sleep = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));
    const pos = { x: el.clientWidth * 0.62, y: el.clientHeight * 0.82 };
    cur.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    const moveTo = async (n: HTMLElement) => {
      const R = el.getBoundingClientRect();
      const r = n.getBoundingClientRect();
      pos.x = r.left - R.left + Math.min(r.width * 0.5, 60);
      pos.y = r.top - R.top + r.height * 0.55;
      cur.setAttribute("data-on", "");
      cur.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      await sleep(MOVE);
    };

    (async () => {
      await sleep(250);
      for (const a of SCRIPTS[screen.t]) {
        if (!alive) return;
        const [kind, cue] = a;
        if (kind === "wait") {
          await sleep(a[1]);
          continue;
        }
        if (kind === "fire") {
          fire(cue);
          await sleep(150);
          continue;
        }
        if (kind === "type") {
          const n = q(`[data-type="${cue}"]`);
          if (!n) continue;
          const full = n.dataset.full ?? "";
          n.setAttribute("data-typing", "");
          const per = Math.max(8, Math.min(TYPE_MS, 900 / Math.max(1, full.length)));
          for (let i = 1; i <= full.length && alive; i += 2) {
            n.textContent = full.slice(0, i);
            await sleep(per * 2);
          }
          n.textContent = full;
          n.removeAttribute("data-typing");
          continue;
        }
        if (kind === "scroll") {
          const n = q(`[data-scroll="${cue}"]`);
          if (!n) continue;
          n.style.transform = `translateY(-${a[2]}px)`;
          await sleep(700);
          continue;
        }
        const n = q(`[data-cue="${cue}"]`);
        if (!n) continue;
        await moveTo(n);
        if (kind === "hover") {
          n.setAttribute("data-hover", "");
          await sleep(120);
          timers.push(setTimeout(() => n.removeAttribute("data-hover"), 500));
        } else if (kind === "click") {
          cur.removeAttribute("data-click");
          void cur.offsetWidth;
          cur.setAttribute("data-click", "");
          n.setAttribute("data-pressed", "");
          await sleep(160);
          n.removeAttribute("data-pressed");
          n.setAttribute("data-clicked", "");
          fire(cue);
          await sleep(100);
        }
      }
      if (alive) {
        cur.removeAttribute("data-on");
        typed.forEach((n) => (n.textContent = n.dataset.full ?? ""));
      }
    })();

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [screen, still]);

  return (
    <div ref={root} className={s.director}>
      {children}
      <span ref={cursor} className={s.cursor} aria-hidden="true">
        <svg width="18" height="22" viewBox="0 0 18 22">
          <path d="M1.5 1.5v16.2l4.3-4 2.8 6.6 2.9-1.3-2.8-6.4h5.9L1.5 1.5Z" fill="#fff" stroke="#111" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
