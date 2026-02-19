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

  rootMargin?: string;
  /** IntersectionObserver threshold */
  threshold?: number | number[];
}

/**
 * Lazy load section content when it enters viewport
 * Preserves layout with placeholder
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

  // Compute height values once
  const { height, containIntrinsicSize } = useMemo(() => {
    const h = typeof minHeight === "number" ? `${minHeight}px` : minHeight;
    return {
      height: h,
      containIntrinsicSize: `auto ${h}`,
    };
  }, [minHeight]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("content-visibility-auto", className)}
      style={
        !isVisible
          ? {
              // Optimize offscreen rendering
              contentVisibility: "auto",
              containIntrinsicSize,
            }
          : undefined
      }
    >
      {isVisible ? (
        children
      ) : (
        // Placeholder maintains layout
        <div aria-hidden style={{ minHeight: height }} />
      )}
    </div>
  );
}
