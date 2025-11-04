import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "About | mdesk.tech",
  description: "Learn more about mdesk.tech and our mission.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
