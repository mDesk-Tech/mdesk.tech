"use client";

import type React from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps children in a div keyed to the current pathname to enable remount-based page transitions and applies a base CSS class with an optional additional class.
 *
 * @param children - Content to render inside the transition wrapper.
 * @param className - Optional additional CSS class to append to `page-transition`.
 * @returns A JSX element: a div with the `page-transition` class (plus `className` if provided) and a `key` tied to the current pathname.
 */
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
