import { IntentLink as Link } from "./IntentLink";
import type { ComponentPropsWithoutRef, ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from "react";
import type { Delta as DeltaT } from "@/portal/format";
import { initials } from "@/portal/format";
import type { Tone } from "@/portal/status";
import { Icon, type IconName } from "./Icon";
import s from "./ui.module.css";

export { Icon, type IconName };

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/* ---- Status ------------------------------------------------------------ */
export function Status({ tone, label, className }: { tone: Tone; label: string; className?: string }) {
  return (
    <span className={cx(s.status, className)} data-tone={tone}>
      <span className={s.dot} data-pulse={tone === "live" ? "" : undefined} aria-hidden="true" />
      {label}
    </span>
  );
}

export function ToneDot({ tone }: { tone: Tone }) {
  return (
    <span className={s.status} data-tone={tone}>
      <span className={s.dot} data-pulse={tone === "live" ? "" : undefined} aria-hidden="true" />
    </span>
  );
}

/* ---- People -------------------------------------------------------------- */
const HUES = ["var(--light-blue)", "var(--light-violet)", "var(--light-gold)", "var(--light-teal)"];
function hueFor(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return HUES[Math.abs(h) % HUES.length];
}

export function Avatar({
  name,
  id,
  size = 28,
  side = "studio",
  label,
}: {
  name: string;
  id?: string;
  size?: number;
  side?: "studio" | "client";
  /** Accessible name; decorative by default because a name sits beside it. */
  label?: boolean;
}) {
  return (
    <span
      className={s.avatar}
      data-side={side}
      style={{ "--s": `${size}px`, "--h": hueFor(id ?? name) } as CSSProperties}
      role={label ? "img" : undefined}
      aria-label={label ? name : undefined}
      aria-hidden={label ? undefined : true}
    >
      {initials(name)}
    </span>
  );
}

export function AvatarStack({ people, size = 24 }: { people: { id: string; name: string; side?: "studio" | "client" }[]; size?: number }) {
  return (
    <span className={s.stack}>
      {people.map((p) => (
        <Avatar key={p.id} id={p.id} name={p.name} side={p.side} size={size} />
      ))}
    </span>
  );
}

export function Person({
  person,
  size = 28,
  sub,
}: {
  person?: { id: string; name: string; title: string; side: "studio" | "client" };
  size?: number;
  sub?: ReactNode;
}) {
  if (!person) return null;
  return (
    <span className={s.person}>
      <Avatar id={person.id} name={person.name} side={person.side} size={size} />
      <span className={s.personText}>
        <span className={s.personName}>{person.name}</span>
        <span className={s.personTitle}>{sub ?? person.title}</span>
      </span>
    </span>
  );
}

/* ---- Panels -------------------------------------------------------------- */
export function Panel({
  as: Tag = "section",
  glass,
  className,
  children,
  ...rest
}: { as?: ElementType; glass?: boolean; className?: string; children?: ReactNode } & Record<string, unknown>) {
  return (
    <Tag className={cx(s.panel, className)} data-glass={glass ? "" : undefined} {...rest}>
      {children}
    </Tag>
  );
}

export function PanelHead({
  title,
  id,
  count,
  countTone,
  meta,
  action,
  as: H = "h2",
}: {
  title: ReactNode;
  id?: string;
  count?: number;
  countTone?: "attention";
  meta?: ReactNode;
  action?: ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <header className={s.panelHead}>
      <H className={s.panelTitle} id={id}>
        {title}
        {count !== undefined && (
          <span className={s.count} data-tone={countTone}>
            {count}
          </span>
        )}
        {meta && <span className={s.panelMeta}>{meta}</span>}
      </H>
      {action}
    </header>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cx(s.link, className)}>
      {children}
      <Icon name="arrowRight" size={14} />
    </Link>
  );
}

export function Count({ n, tone }: { n: number; tone?: "attention" }) {
  return (
    <span className={s.count} data-tone={tone}>
      {n}
    </span>
  );
}

/* ---- Buttons ------------------------------------------------------------- */
type BtnCommon = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  iconOnly?: boolean;
  pending?: boolean;
  className?: string;
  children?: ReactNode;
};

export function PButton({
  variant = "secondary",
  size = "md",
  icon,
  iconOnly,
  pending,
  className,
  children,
  type = "button",
  ...rest
}: BtnCommon & Omit<ComponentPropsWithRef<"button">, "children" | "className">) {
  return (
    <button
      type={type}
      className={cx(s.btn, className)}
      data-variant={variant}
      data-size={size}
      data-icon={iconOnly ? "" : undefined}
      data-pending={pending ? "" : undefined}
      aria-busy={pending || undefined}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
    </button>
  );
}

export function PLink({
  variant = "secondary",
  size = "md",
  icon,
  iconOnly,
  className,
  children,
  href,
  ...rest
}: BtnCommon & { href: string; scroll?: boolean } & Omit<ComponentPropsWithoutRef<"a">, "children" | "className" | "href">) {
  return (
    <Link href={href} className={cx(s.btn, className)} data-variant={variant} data-size={size} data-icon={iconOnly ? "" : undefined} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
    </Link>
  );
}

/** For downloads and external destinations (no client-side routing). */
export function PAnchor({
  variant = "secondary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: BtnCommon & Omit<ComponentPropsWithoutRef<"a">, "children" | "className">) {
  return (
    <a className={cx(s.btn, className)} data-variant={variant} data-size={size} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children}
    </a>
  );
}

/* ---- Numbers ------------------------------------------------------------- */
export function Delta({ d, suffix }: { d: DeltaT; suffix?: string }) {
  if (d.change === null) return <span className={s.delta}>—</span>;
  const sr = `${d.direction === "up" ? "Up" : d.direction === "down" ? "Down" : "Unchanged"} ${d.label.replace(/^[+−]/, "")}${suffix ? ` ${suffix}` : ""}${d.good === null ? "" : d.good ? ", better" : ", worse"}`;
  return (
    <span className={s.delta} data-good={d.good === null ? undefined : String(d.good)}>
      {d.direction !== "flat" && <Icon name={d.direction === "up" ? "up" : "down"} />}
      <span aria-hidden="true">
        {d.label.replace(/^[+−]/, "")}
        {suffix && <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> {suffix}</span>}
      </span>
      <span className="sr-only">{sr}</span>
    </span>
  );
}

export function Segments({ done, total, tone = "progress", label }: { done: number; total: number; tone?: Tone; label: string }) {
  const n = Math.min(total, 24);
  const on = Math.round((done / total) * n);
  return (
    <div
      className={s.segments}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-label={label}
      style={{ "--seg": `var(--tone-${tone})` } as CSSProperties}
    >
      {Array.from({ length: n }, (_, i) => (
        <span key={i} data-on={i < on ? "" : undefined} />
      ))}
    </div>
  );
}

export function Meter({ value, max, tone = "progress", label }: { value: number; max: number; tone?: Tone; label: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div
      className={s.meter}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      style={{ "--seg": `var(--tone-${tone})` } as CSSProperties}
    >
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---- States -------------------------------------------------------------- */
export function Empty({
  icon = "check",
  title,
  body,
  action,
  center,
}: {
  icon?: IconName;
  title: string;
  body?: ReactNode;
  action?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={s.empty} data-center={center ? "" : undefined}>
      <span className={s.emptyGlyph} aria-hidden="true">
        <Icon name={icon} size={18} />
      </span>
      <p className={s.emptyTitle}>{title}</p>
      {body && <p className={s.emptyBody}>{body}</p>}
      {action}
    </div>
  );
}

export function PageHead({
  title,
  lead,
  eyebrow,
  actions,
  id = "page-title",
}: {
  title: ReactNode;
  lead?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  id?: string;
}) {
  return (
    <header className={s.pageHead}>
      <div>
        {eyebrow && <div className={s.eyebrow}>{eyebrow}</div>}
        <h1 className={s.pageTitle} id={id}>
          {title}
        </h1>
        {lead && <p className={s.pageLead}>{lead}</p>}
      </div>
      {actions && <div className={s.pageActions}>{actions}</div>}
    </header>
  );
}

export function Tip({ tip, children, align = "end" }: { tip: string; children: ReactNode; align?: "center" | "end" | "start" }) {
  return (
    <span className={s.tipWrap} data-align={align}>
      {children}
      <span className={s.tip} role="tooltip">
        {tip}
      </span>
    </span>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className={s.kbd}>{children}</kbd>;
}

export function Chip({ href, icon, children }: { href?: string; icon?: IconName; children: ReactNode }) {
  const inner = (
    <>
      {icon && <Icon name={icon} />}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{children}</span>
    </>
  );
  return href ? (
    <Link href={href} className={s.chip}>
      {inner}
    </Link>
  ) : (
    <span className={s.chip}>{inner}</span>
  );
}

export function Skeleton({ h = 16, w = "100%", r }: { h?: number | string; w?: number | string; r?: number }) {
  return <span className={s.skeleton} style={{ display: "block", height: h, width: w, borderRadius: r }} aria-hidden="true" />;
}
