import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type React from "react";

export const metadata: Metadata = pageMetadata({
  title: "Contact | mdesk.tech",
  description: "Get in touch with the mdesk.tech team.",
  path: "/contact",
});

/**
 * Layout component that renders content for the Contact page.
 *
 * @param children - The React nodes to render inside the contact layout.
 * @returns A React element (fragment) that contains `children`.
 */
export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
