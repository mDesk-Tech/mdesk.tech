import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | mdesk.tech",
  description:
    "Explore our web design, development, hosting, and SEO services.",
  openGraph: {
    title: "Services | mdesk.tech",
    description:
      "Explore our web design, development, hosting, and SEO services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "mdesk.tech Services",
      },
    ],
  },
};

/**
 * Layout component for the Services section that renders its children.
 *
 * @param children - Content to render inside the Services layout
 * @returns The React element that renders the provided `children`
 */
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
