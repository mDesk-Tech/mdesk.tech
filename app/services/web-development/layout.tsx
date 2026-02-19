import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services | mdesk.tech",
  description:
    "Build powerful, scalable web applications with modern technologies. React, Next.js, TypeScript, and more.",
};

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
