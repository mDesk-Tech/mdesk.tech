import type { Metadata } from "next";
import SEOContent from "./seo-content";

export const metadata: Metadata = {
  title: "SEO Optimization | mdesk.tech",
  description:
    "Data-driven SEO strategies to improve your search rankings. Keyword research, technical SEO audits, on-page optimization, and performance tracking.",
  openGraph: {
    title: "SEO Optimization | mdesk.tech",
    description:
      "Data-driven SEO strategies including keyword research, technical audits, and on-page optimization.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SEO Optimization - mdesk.tech",
      },
    ],
  },
};

export default function SEOPage() {
  return <SEOContent />;
}
