"use client";

import React, { MouseEvent as ReactMouseEvent, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Defer loading of the heavy three.js canvas until actually needed (on hover)
const CanvasRevealEffect = dynamic(
  () =>
    import("@/components/ui/canvas-reveal-effect").then(
      (m) => m.CanvasRevealEffect,
    ),
  { ssr: false, loading: () => null },
);

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  /**
   * Update the overlay element's CSS mask to center a radial spotlight at the mouse cursor.
   *
   * Applies a radial-gradient mask (using the component's `radius`) to `overlayRef.current` so the spotlight follows the cursor.
   *
   * @param currentTarget - Event currentTarget used to compute cursor position relative to the container.
   * @param clientX - Pointer X coordinate in viewport space.
   * @param clientY - Pointer Y coordinate in viewport space.
   */
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const mask = `radial-gradient(${radius}px circle at ${x}px ${y}px, white, transparent 80%)`;
    const el = overlayRef.current;
    if (el) {
      el.style.setProperty("mask-image", mask);
      el.style.setProperty("-webkit-mask-image", mask);
    }
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{ backgroundColor: color }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </div>
      {children}
    </div>
  );
};