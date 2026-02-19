import type { Metadata } from "next";
import WebDesignContent from "./web-design-content";

export const metadata: Metadata = {
  title: "Web Design Services | mdesk.tech",
  description:
    "Professional web design services including UI/UX design, prototyping, branding, design systems, and visual design. Transform your vision into stunning digital experiences.",
  openGraph: {
    title: "Web Design Services | mdesk.tech",
    description:
      "Professional web design services including UI/UX design, prototyping, branding, design systems, and visual design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Web Design Services - mdesk.tech",
      },
    ],
  },
};

export default function WebDesignPage() {
  return <WebDesignContent />;
}
