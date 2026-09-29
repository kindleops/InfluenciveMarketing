import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { brand } from "@/config/brand";
import "./globals.css";

/* Inter, variable with an optical-size axis: text sizes get the text cut,
   display sizes the tighter Display cut, automatically. */
const sans = localFont({
  src: [
    { path: "../fonts/inter-latin-var.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/inter-latin-var-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/* The research publication's reading face. */
const text = localFont({
  src: [
    { path: "../fonts/newsreader-latin-var.woff2", style: "normal", weight: "200 800" },
    { path: "../fonts/newsreader-latin-var-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

const editorial = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.positioning}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${GeistMono.variable} ${editorial.variable} ${text.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal states are only applied when scripts run — no-JS visitors see everything. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'&&!sessionStorage.getItem('intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='running'}}catch(e){}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
