import type { CSSProperties } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { Flow } from "@/content/flows";
import s from "./library.module.css";

/** Every example flow as a card: the chain of tools, what it does, where a person decides. */
export function FlowLibrary({ flows }: { flows: Flow[] }) {
  return (
    <ul className={s.grid} role="list" data-stagger="">
      {flows.map((f) => {
        const chain = f.steps.filter((st, i, a) => a.findIndex((x) => x.sys.name === st.sys.name) === i);
        return (
          <li key={f.id} className={s.card} data-pointer-light="">
            <p className={s.team}>{f.team}</p>
            <h3>{f.title}</h3>
            <ol className={s.chain} aria-label={`Tools: ${chain.map((c) => c.sys.name).join(", ")}`}>
              {chain.map((st, i) => (
                <li key={st.sys.name} style={{ "--i": i } as CSSProperties} data-ai={st.sys.mono === "AI" || undefined}>
                  <span className={s.mark} aria-hidden="true">
                    {st.sys.logo ? <BrandLogo slug={st.sys.logo} size={16} /> : <b>{st.sys.mono}</b>}
                  </span>
                  <span className={s.tip}>{st.sys.name}</span>
                </li>
              ))}
            </ol>
            <p className={s.summary}>{f.summary}</p>
            <ol className={s.steps}>
              {f.steps.map((st, i) => (
                <li key={i} data-kind={st.kind}>
                  <span>{st.sys.name}</span>
                  {st.says}
                </li>
              ))}
            </ol>
            <p className={s.person}>
              <i aria-hidden="true" />
              {f.person}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
