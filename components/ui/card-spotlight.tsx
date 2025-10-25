"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import type React from "react";
import {
  type MouseEvent as ReactMouseEvent,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const gradientId = useId();
  const gradientStops = useMemo(
    () => [
      { offset: "0%", color: "rgba(59,130,246,0.35)" },
      { offset: "40%", color: "rgba(139,92,246,0.15)" },
      { offset: "100%", color: "transparent" },
    ],
    [],
  );
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
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        <motion.svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <defs>
            <radialGradient id={gradientId} cx="50%" cy="50%" r="65%">
              {gradientStops.map((stop) => (
                <stop
                  key={stop.offset}
                  offset={stop.offset}
                  stopColor={stop.color}
                />
              ))}
            </radialGradient>
          </defs>
          <rect
            width="100"
            height="100"
            fill={`url(#${gradientId})`}
            opacity={0.85}
          />
          {isHovering && (
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.5"
              fill="none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </motion.svg>
      </motion.div>
      {children}
    </div>
  );
};
