import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const SITE = brand.url.replace(/\/$/, "");
export const abs = (path: string) => `${SITE}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Metadata for an indexable page: canonical, Open Graph and Twitter set
 * from one place so every page is consistent.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  published,
  updated,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  published?: string;
  updated?: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: brand.name,
      ...(type === "article" ? { publishedTime: published, modifiedTime: updated } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
