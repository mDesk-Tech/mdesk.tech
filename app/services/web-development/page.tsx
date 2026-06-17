import type { Metadata } from "next";
import WebDevelopmentContent from "./web-development-content";

export const metadata: Metadata = {
  title: "Web Development | mdesk.tech",
  description:
    "Build powerful, scalable applications with modern technologies. React, Next.js, TypeScript, API integration, database architecture, and progressive web apps.",
  openGraph: {
    title: "Web Development | mdesk.tech",
    description:
      "Build scalable applications with React, Next.js, TypeScript, API integration, and database architecture.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Web Development - mdesk.tech",
      },
    ],
  },
};

/**
 * Render the Web Development page content.
 *
 * @returns A JSX element that renders the WebDevelopmentContent component for this page.
 */
export default function WebDevelopmentPage() {
  return <WebDevelopmentContent />;
}
