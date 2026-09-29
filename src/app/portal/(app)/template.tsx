import s from "./template.module.css";

/** Each section settles in from slightly below, out of a soft blur. */
export default function PortalTemplate({ children }: { children: React.ReactNode }) {
  return <div className={s.page}>{children}</div>;
}
