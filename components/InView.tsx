"use client";

import type React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface InViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add delay in seconds for staggered effects, e.g. 0.1, 0.2 */
  delay?: number;
}

/**
 * Reveals children with a CSS transition when the element enters the viewport.
 *
 * The component starts hidden and translated downward, then transitions to visible and aligned when at least 10% of the element is in view. Once visible, it stays visible.
 *
 * Uses CSS transitions instead of JavaScript animations for better INP performance.
 *
 * @param delay - Optional delay in seconds applied to the transition (useful for staggering).
 * @returns A div wrapping `children` that applies the in-view reveal transition and forwards remaining props.
 */
export default function InView({
  className,
  style,
  delay = 0,
  children,
  ...rest
}: InViewProps) {
  const [ref, visible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        // Use CSS transitions for smoother animations
        "transition-[opacity,transform] duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
      style={{
        transitionDelay: delay ? `${delay}s` : undefined,
        // will-change hints browser about upcoming animation, reset to 'auto' after visible
        willChange: visible ? "auto" : "opacity, transform",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
