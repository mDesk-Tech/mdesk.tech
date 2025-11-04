"use client";

import type React from "react";
import { useMemo } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  /** CSS min-height for the placeholder while not visible */
  minHeight?: number | string;
  /** IntersectionObserver rootMargin, e.g. "200px 0px" to pre-render slightly before visible */
  rootMargin?: string;
  /** IntersectionObserver threshold */
  threshold?: number | number[];
}

/**
 * Mounts children only when scrolled into view to reduce initial JS work.
 * Renders a lightweight placeholder to preserve layout and avoid CLS.
 */
export default function LazySection({
  children,
  className,
  minHeight = "40vh",
  rootMargin = "200px 0px",
  threshold = 0.1,
}: LazySectionProps) {
  const [ref, isVisible] = useIntersectionObserver({
    rootMargin,
    threshold,
    freezeOnceVisible: true,
  });

  const placeholderStyle = useMemo<React.CSSProperties>(() => {
    return typeof minHeight === "number"
      ? { minHeight: `${minHeight}px` }
      : { minHeight };
  }, [minHeight]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("content-visibility-auto", className)}
    >
      {isVisible ? children : <div aria-hidden style={placeholderStyle} />}
    </div>
  );
}
