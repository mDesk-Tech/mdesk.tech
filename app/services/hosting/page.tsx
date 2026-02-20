import type { Metadata } from "next";
import HostingContent from "./hosting-content";

export const metadata: Metadata = {
  title: "Hosting Solutions | mdesk.tech",
  description:
    "Enterprise-grade hosting infrastructure with 99.9% uptime guarantee, SSL certificates, automated backups, and 24/7 monitoring. Reliable hosting for your business.",
  openGraph: {
    title: "Hosting Solutions | mdesk.tech",
    description:
      "Enterprise-grade hosting with 99.9% uptime, SSL certificates, automated backups, and 24/7 monitoring.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hosting Solutions - mdesk.tech",
      },
    ],
  },
};

/**
 * Renders the hosting service page content.
 *
 * @returns A React element containing the hosting page content
 */
export default function HostingPage() {
  return <HostingContent />;
}