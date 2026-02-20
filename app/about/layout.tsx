import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type React from "react";

export const metadata: Metadata = pageMetadata({
  title: "About | mdesk.tech",
  description: "Learn more about mdesk.tech and our mission.",
  path: "/about",
});

/**
 * Layout component that renders its children without adding markup or behavior.
 *
 * @param children - Content to be rendered inside this layout
 * @returns The provided `children` wrapped in a React fragment
 */
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}