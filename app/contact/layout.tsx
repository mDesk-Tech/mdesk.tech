import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Contact | mdesk.tech",
  description: "Get in touch with the mdesk.tech team.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
