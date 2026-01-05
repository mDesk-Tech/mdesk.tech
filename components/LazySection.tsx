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
 * Delays mounting children until the section scrolls into view while preserving layout with a configurable placeholder.
 *
 * Uses content-visibility: auto and contain-intrinsic-size for better rendering performance
 * and reduced INP by skipping layout/paint work for off-screen content.
 *
 * @param children - Content to render after the section becomes visible
 * @param className - Additional CSS classes applied to the wrapper element
 * @param minHeight - Minimum height for the placeholder; if a number, it's treated as pixels (e.g., `100` -> `100px`)
 * @param rootMargin - IntersectionObserver `rootMargin` used to pre-render before the element fully enters the viewport
 * @param threshold - IntersectionObserver `threshold` (number or array) that determines when the section is considered visible
 * @returns A wrapper `div` that renders a layout-preserving placeholder until the children are mounted
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

  // Compute height and contain-intrinsic-size values once
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
              // Optimize rendering for offscreen content
              contentVisibility: "auto",
              containIntrinsicSize,
            }
          : undefined
      }
    >
      {isVisible ? (
        children
      ) : (
        <div aria-hidden style={{ minHeight: height, containIntrinsicSize }} />
      )}
    </div>
  );
}
