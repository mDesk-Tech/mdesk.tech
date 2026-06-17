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
  },
};

/**
 * Page component that renders the web design service content.
 *
 * @returns The React element for the Web Design page containing the full content.
 */
export default function WebDesignPage() {
  return <WebDesignContent />;
}
