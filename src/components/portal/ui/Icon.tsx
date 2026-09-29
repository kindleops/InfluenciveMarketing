import type { SVGProps } from "react";

/*
 * One icon family: 20-unit grid, 1.5 stroke, round joins. Drawn for this
 * product — geometric, quiet, no sparkles.
 */
const P: Record<string, string> = {
  command: "M4 10.5 10 4l6 6.5M6.5 8v7.5h7V8",
  campaigns: "M3.5 12.5V7.5l10-4v13l-10-4Zm0 0 1.5 4.5h2.5l-1-3.8M16 8.2a2.5 2.5 0 0 1 0 3.6",
  content: "M5 3.5h7l3 3v10H5v-13Zm7 0v3h3M7.5 10h5M7.5 13h5",
  creative: "M3.5 5.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9Zm0 8 4-4 3 3 2-2 3.5 3.5M12.5 7.5h.01",
  analytics: "M3.5 16.5h13M5.5 13.5l3-4 3 2 4-5.5",
  growth: "M10 16.5V8m0 0-3.5 3.5M10 8l3.5 3.5M4 4.5h12",
  approvals: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm-3-7 2 2 4-4",
  messages: "M4 5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-3.5 3v-3H6a2 2 0 0 1-2-2v-6Z",
  deliverables: "M3.5 6.5 10 3.5l6.5 3v7L10 16.5l-6.5-3v-7Zm0 0L10 9.5m0 0 6.5-3M10 9.5v7",
  billing: "M3.5 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V6Zm0 2.5h13M6.5 12.5h3",
  integrations: "M8 6.5 6.5 5a2.5 2.5 0 0 0-3.5 3.5L4.5 10m7.5 3.5 1.5 1.5a2.5 2.5 0 0 0 3.5-3.5L15.5 10M7.5 12.5l5-5",
  team: "M7.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-4 7a4 4 0 0 1 8 0m2-7.5a2.2 2.2 0 1 0 0-4.4M14 11.5a3.5 3.5 0 0 1 3 3.5",
  account: "M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.5 6.5a5.5 5.5 0 0 1 11 0",
  settings: "M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.9-1.4.1-1.1-.1-1.1 1.6-1.3-1.5-2.6-2 .7a6 6 0 0 0-1.9-1.1L11.7 2.5H8.3l-.4 2.1c-.7.3-1.3.6-1.9 1.1l-2-.7-1.5 2.6 1.6 1.3-.1 1.1.1 1.1-1.6 1.3 1.5 2.6 2-.7c.6.5 1.2.8 1.9 1.1l.4 2.1h3.4l.4-2.1c.7-.3 1.3-.6 1.9-1.1l2 .7 1.5-2.6-1.6-1.3Z",
  help: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm-2-8.5a2 2 0 1 1 2.8 1.8c-.5.2-.8.7-.8 1.2v.5m0 2.5h.01",
  search: "M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm7.5 1.5L13.3 13.3",
  bell: "M6 13.5V9a4 4 0 1 1 8 0v4.5l1.5 1.5h-11L6 13.5Zm2.5 3a1.5 1.5 0 0 0 3 0",
  check: "M4.5 10.5 8 14l7.5-8",
  x: "M5.5 5.5l9 9m0-9-9 9",
  arrowRight: "M4 10h12m-4.5-4.5L16 10l-4.5 4.5",
  arrowLeft: "M16 10H4m4.5-4.5L4 10l4.5 4.5",
  arrowUpRight: "M6 14 14 6m-6.5 0H14v6.5",
  up: "M10 15V5m-4 4 4-4 4 4",
  down: "M10 5v10m-4-4 4 4 4-4",
  chevronDown: "M5.5 8 10 12.5 14.5 8",
  chevronRight: "M8 5.5 12.5 10 8 14.5",
  chevronLeft: "M12 5.5 7.5 10l4.5 4.5",
  plus: "M10 4.5v11M4.5 10h11",
  paperclip: "M15 9.5 9.8 14.7a3.2 3.2 0 0 1-4.5-4.5l5.4-5.4a2.1 2.1 0 0 1 3 3L8.4 13a1 1 0 0 1-1.5-1.5L11.5 7",
  download: "M10 3.5v9m-3.5-3.5L10 12.5l3.5-3.5M4 15.5h12",
  expand: "M11.5 3.5h5v5m0-5-5.5 5.5M8.5 16.5h-5v-5m0 5L9 11",
  compare: "M10 3v14M4 5.5h4v9H4zM12 5.5h4v9h-4z",
  comment: "M4 5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8.5L5 16.5v-3H6",
  calendar: "M4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm0 2.5h12M7.5 2.5V5m5-2.5V5",
  clock: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-10v3.5l2.5 1.5",
  eye: "M2.5 10S5 4.5 10 4.5 17.5 10 17.5 10 15 15.5 10 15.5 2.5 10 2.5 10Zm7.5 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  send: "M4 10 16.5 4 12 16.5 9.5 11 4 10Zm5.5 1 3-3",
  more: "M5 10h.01M10 10h.01M15 10h.01",
  switch: "M5 7.5h10l-3-3M15 12.5H5l3 3",
  lock: "M5.5 9.5h9v7h-9v-7Zm2-2.5a2.5 2.5 0 0 1 5 0v2.5",
  logout: "M8 16.5H5.5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2H8m4.5 10 3.5-3.5L12.5 6.5M16 10H8",
  flag: "M5 17V3.5m0 0h9l-2 3.5 2 3.5H5",
  bolt: "M11 3 5 11h4.5L9 17l6-8h-4.5L11 3Z",
  layers: "M10 3.5 17 7.5l-7 4-7-4 7-4Zm-7 7 7 4 7-4M3 13.5l7 4 7-4",
  target: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-3.5h.01",
  play: "M7 5.5v9l7.5-4.5L7 5.5Z",
  pause: "M7.5 5v10M12.5 5v10",
  file: "M5.5 3.5h6l3 3v10h-9v-13Zm6 0v3h3",
  image: "M3.5 5.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9Zm0 8 4-4 3 3 2-2 3.5 3.5",
  video: "M3.5 6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V6Zm10 2.5 3-2v7l-3-2",
  link: "M8.5 11.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-.9.9M11.5 8.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l.9-.9",
  sheet: "M4 4h12v12H4V4Zm0 4h12M4 12h12M8 4v12",
  filter: "M3.5 5h13M6 10h8M8.5 15h3",
  grid: "M4 4h5v5H4V4Zm7 0h5v5h-5V4ZM4 11h5v5H4v-5Zm7 0h5v5h-5v-5Z",
  list: "M7 5.5h9.5M7 10h9.5M7 14.5h9.5M3.5 5.5h.01M3.5 10h.01M3.5 14.5h.01",
  columns: "M3.5 4h4v12h-4V4Zm5.5 0h2.5v8H9V4Zm4 0h3.5v10H13V4Z",
  signal: "M10 10h.01M7 13a4.2 4.2 0 0 1 0-6m6 0a4.2 4.2 0 0 1 0 6M4.5 15.5a7.8 7.8 0 0 1 0-11m11 0a7.8 7.8 0 0 1 0 11",
  refresh: "M15.5 7.5A6 6 0 0 0 4.3 8.5M4.5 12.5a6 6 0 0 0 11.2-1M15.5 4v3.5H12M4.5 16v-3.5H8",
};

export type IconName = keyof typeof P;

export function Icon({ name, size = 18, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={P[name]} />
    </svg>
  );
}
