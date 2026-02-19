import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type React from "react";

export const metadata: Metadata = pageMetadata({
  title: "About | mdesk.tech",
  description: "Learn more about mdesk.tech and our mission.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
