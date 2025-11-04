"use client";

import type React from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className={`page-transition ${className ?? ""}`}>
      {children}
    </div>
  );
}
