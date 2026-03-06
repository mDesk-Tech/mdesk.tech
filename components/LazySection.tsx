"use client";

import type React from "react";
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
 * Lazily renders children when the section enters the viewport while preserving layout with a placeholder.
 *
 * The component renders a placeholder element with the provided `minHeight` until the section becomes visible,
 * then replaces the placeholder with the actual `children`.
 *
 * @param children - Content to render once the section is visible
 * @param className - Additional CSS class names applied to the container
 * @param minHeight - CSS `min-height` for the placeholder (e.g., `"40vh"` or `200` for `200px`)
 * @param rootMargin - IntersectionObserver `rootMargin` used to trigger visibility
 * @param threshold - IntersectionObserver `threshold` used to determine visibility
 * @returns A React element that preserves layout with a placeholder until the section is visible, then renders `children`
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

  const height = typeof minHeight === "number" ? `${minHeight}px` : minHeight;
  const containIntrinsicSize = `auto ${height}`;

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
