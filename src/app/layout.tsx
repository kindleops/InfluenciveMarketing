import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { brand } from "@/config/brand";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/system/RevealObserver";
import { InteractionLayer } from "@/components/system/InteractionLayer";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Intro } from "@/components/system/Intro";
import "./globals.css";

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
      className={`${GeistSans.variable} ${GeistMono.variable} ${editorial.variable}`}
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
      <body>
        <Intro />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
        <RevealObserver />
        <InteractionLayer />
        <SmoothScroll />
      </body>
    </html>
  );
}
