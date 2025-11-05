import type { Metadata } from "next";

type PageMetaInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "https://mdesk.tech";
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const href = getSiteUrl();
  let base: URL;
  try {
    base = new URL(href);
  } catch {
    base = new URL("https://mdesk.tech");
  }
  return {
    title,
    description,
    metadataBase: base,
    alternates: { canonical: path },
  } satisfies Metadata;
}
