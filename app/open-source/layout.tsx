import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Open Source | mdesk.tech",
  description:
    "Free website development offer and our commitment to open source.",
  alternates: { canonical: "/open-source" },
};

export default function OpenSourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
