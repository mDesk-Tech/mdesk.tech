import type React from "react";

export default function PassthroughLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
