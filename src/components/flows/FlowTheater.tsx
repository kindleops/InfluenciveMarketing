"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LOGOS } from "@/content/logos";
import type { Flow, FlowStep, FlowSystem } from "@/content/flows";
import { SCREENS } from "@/content/flow-screens";
import { ScreenWindow } from "./Screens";
import { Director, scriptMs } from "./Director";
import s from "./theater.module.css";

/*
 * The automation theater: one flow at a time, played across the real tools
 * it touches. A camera follows the work from system to system, a packet of
 * light carries the event along the wire, each card shows the payload as it
 * lands and the log underneath records it, line by line. Then the next flow.
 *
 * Every value is an example (labelled on screen). Plays only while visible,
 * pauses on request, and with reduced motion shows each flow complete and
 * still, chosen by hand.
 */

const STEP_MS = 1500;
const HUMAN_MS = 2300;
const END_MS = 2800;

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function brandOf(sys: FlowSystem) {
  if (!sys.logo) return sys.mono === "AI" ? "#a9b2ff" : "#f4f5f7";
  const hex = LOGOS[sys.logo].hex;
  const lum = (0.299 * parseInt(hex.slice(0, 2), 16) + 0.587 * parseInt(hex.slice(2, 4), 16) + 0.114 * parseInt(hex.slice(4, 6), 16)) / 255;
  return lum < 0.28 ? "#f4f5f7" : `#${hex}`;
}

function Mark({ sys, size = 22 }: { sys: FlowSystem; size?: number }) {
  if (sys.logo) return <BrandLogo slug={sys.logo} size={size} />;
  return (
    <span className={s.mono} data-ai={sys.mono === "AI" || undefined}>
      {sys.mono}
    </span>
  );
}

const KIND: Record<FlowStep["kind"], string> = { trigger: "Trigger", ai: "AI step", check: "Lookup", human: "Person", action: "Action" };

function stamp(base: number, offset: number) {
  const d = new Date(base + offset);
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}.${String(d.getUTCMilliseconds()).padStart(3, "0")}`;
}

export function FlowTheater({ flows, label = "Automation examples" }: { flows: Flow[]; label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [f, setF] = useState(0);
  // SSR and reduced motion: the whole flow, complete.
  const [step, setStep] = useState(flows[0].steps.length);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(true);
  const flow = flows[f];
  const n = flow.steps.length;
  const done = step >= n;

  useEffect(() => {
    if (reduced()) return;
    setStill(false);
    setStep(0);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The clock: advance a step, hold on people and on the finish, then move on.
  useEffect(() => {
    if (still || !playing || !visible) return;
    const current = flow.steps[Math.min(step, n - 1)];
    const sc = SCREENS[flow.id]?.[step - 1];
    const base = current.kind === "human" ? HUMAN_MS : STEP_MS;
    const wait = step >= n ? END_MS : step === 0 ? 700 : Math.max(base, sc ? scriptMs(sc) : 0);
    const t = setTimeout(() => {
      if (step >= n) {
        setF((x) => (x + 1) % flows.length);
        setStep(0);
      } else setStep(step + 1);
    }, wait);
    return () => clearTimeout(t);
  }, [step, playing, visible, still, flow, n, flows.length]);

  const choose = useCallback(
    (i: number) => {
      setF(i);
      setStep(still ? flows[i].steps.length : 0);
    },
    [still, flows],
  );

  const active = Math.min(Math.max(step - 1, 0), n - 1);
  // The window shows the tool the work is in; the one before recedes.
  const screens = SCREENS[flow.id] ?? [];
  const shownIdx = still ? n - 1 : active;
  const curKey = `${flow.id}:${shownIdx}`;
  const [layers, setLayers] = useState<{ cur: string; prev: string | null }>({ cur: curKey, prev: null });
  useEffect(() => {
    setLayers((l) => (l.cur === curKey ? l : { cur: curKey, prev: l.cur }));
  }, [curKey]);
  const layerOf = (key: string) => {
    const [fid, i] = key.split(":");
    const fl = flows.find((x) => x.id === fid);
    const sc = SCREENS[fid]?.[Number(i)];
    return fl && sc ? { sys: fl.steps[Number(i)].sys, sc } : null;
  };
  const base = Date.UTC(2026, 0, 1, 14, 2, 31, 218);
  let t = 0;
  const times = flow.steps.map((st) => (t += st.ms + 40));
  const total = flow.steps.reduce((a, st) => a + st.ms, 0);
  const people = flow.steps.filter((st) => st.kind === "human").length;

  return (
    <div ref={root} className={s.theater} data-still={still || undefined} data-done={done || undefined}>
      {/* Scenes */}
      <div className={s.top}>
        <div className={s.scenes} role="group" aria-label={label}>
          {flows.map((x, i) => (
            <button key={x.id} type="button" className={s.scene} aria-pressed={i === f} onClick={() => choose(i)}>
              <span className={s.sceneTeam}>{x.team}</span>
              <span className={s.sceneTitle}>{x.title}</span>
              <span className={s.sceneBar} aria-hidden="true">
                <i
                  key={`${x.id}-${i === f ? f : "x"}`}
                  style={{ "--p": i === f ? (still ? 1 : step / n) : 0 } as CSSProperties}
                />
              </span>
            </button>
          ))}
        </div>
        {!still && (
          <button type="button" className={s.play} onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause the examples" : "Play the examples"}>
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <rect x="2" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
                <rect x="7" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 1.8v8.4a.6.6 0 0 0 .9.5l6.6-4.2a.6.6 0 0 0 0-1L3.9 1.3a.6.6 0 0 0-.9.5Z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* For assistive tech: the flow as a list. */}
      <div className="sr-only">
        <p>
          {flow.title}: {flow.summary}
        </p>
        <ol>
          {flow.steps.map((st, i) => (
            <li key={i}>
              {st.sys.name}: {st.says}
            </li>
          ))}
        </ol>
        <p>{flow.person}</p>
      </div>

      {/* Stage: the camera follows the active system. */}
      <div className={s.stage} aria-hidden="true">
        <div className={s.floor} />
        <div className={s.headline}>
          <span className={s.flowTitle}>{flow.title}</span>
          <span className={s.flowSummary}>{flow.summary}</span>
        </div>
        <div className={s.screens}>
          {layers.prev && layers.prev !== layers.cur && layerOf(layers.prev) && (
            <div className={s.layer} data-role="out" key={`out-${layers.prev}`}>
              <Director screen={layerOf(layers.prev)!.sc} still>
                <ScreenWindow sys={layerOf(layers.prev)!.sys} screen={layerOf(layers.prev)!.sc} />
              </Director>
            </div>
          )}
          {screens[shownIdx] && (
            <div className={s.layer} data-role="in" key={`in-${curKey}`}>
              <Director screen={screens[shownIdx]} still={still || !playing}>
                <ScreenWindow sys={flow.steps[shownIdx].sys} screen={screens[shownIdx]} />
              </Director>
            </div>
          )}
          <span className={s.screenNote}>Illustrative recreation · not a screenshot</span>
        </div>
        <div className={s.track} style={{ "--i": still ? (n - 1) / 2 : active, "--n": n } as CSSProperties} key={flow.id}>
          {flow.steps.map((st, i) => {
            const state = still || i < active || (done && i === active) ? "done" : i === active && step > 0 ? "active" : "idle";
            return (
              <div key={st.action + i} className={s.node} data-state={state} data-kind={st.kind} style={{ "--brand": brandOf(st.sys), "--k": i } as CSSProperties}>
                {i > 0 && (
                  <span className={s.wire} data-lit={i <= active || still || undefined}>
                    {i === active && !still && step > 0 && <i className={s.packet} key={`${flow.id}-${i}`} />}
                  </span>
                )}
                <div className={s.card}>
                  <div className={s.cardHead}>
                    <span className={s.logo}>
                      <Mark sys={st.sys} />
                    </span>
                    <span className={s.sys}>
                      {st.sys.name}
                      <small>{KIND[st.kind]}</small>
                    </span>
                    <span className={s.tick} />
                  </div>
                  <code className={s.action}>{st.action}</code>
                  <p className={s.says}>{st.says}</p>
                  {st.kind === "human" && <span className={s.approve}>{state === "active" ? "Waiting for approval" : "Approved"}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className={s.result} data-on={done || undefined}>
          <span className={s.resultDot} />
          <b>{flow.outcome}</b>
          <span>
            {n} steps · {people ? `${people} approval · ` : ""}
            {(total / 1000).toFixed(1)} s machine time
          </span>
        </div>
      </div>

      {/* The log: what the system recorded. */}
      <div className={s.log} aria-hidden="true">
        <div className={s.logHead}>
          <span>Run log</span>
          <span>Illustrative · every value is an example</span>
        </div>
        <ol>
          {flow.steps.slice(0, still ? n : step).map((st, i) => (
            <li key={`${flow.id}-${i}`} data-kind={st.kind}>
              <span className={s.ts}>{stamp(base, times[i])}</span>
              <span className={s.lsys} style={{ "--brand": brandOf(st.sys) } as CSSProperties}>
                <Mark sys={st.sys} size={12} />
                {st.sys.name.toLowerCase()}
              </span>
              <span className={s.lact}>{st.action}</span>
              <span className={s.lsays}>{st.says}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className={s.person}>
        <i aria-hidden="true" />
        {flow.person}
      </p>
    </div>
  );
}
