"use client";
import type React from "react";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const Cover = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);

  // Generate random values once when beamPositions changes
  const [beamConfig, setBeamConfig] = useState<
    Array<{ duration: number; delay: number }>
  >([]);

  useEffect(() => {
    if (beamPositions.length > 0 && beamConfig.length === 0) {
      const randomValues = Array.from({ length: beamPositions.length }, () => ({
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2 + 1,
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBeamConfig(randomValues);
    }
  }, [beamPositions.length, beamConfig.length]);

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContainerWidth(ref.current?.clientWidth ?? 0);

      const height = ref.current?.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1)),
      );
      setBeamPositions(positions);
    }
  }, []);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
      className="group/cover relative inline-block rounded-sm bg-neutral-100 p-2 transition duration-200 hover:bg-neutral-900 dark:bg-neutral-900"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(147,197,253,0.25), transparent 55%), radial-gradient(circle at 50% 80%, rgba(192,132,252,0.2), transparent 45%)",
                filter: "blur(1px)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(120deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 12px)",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          hovered={hovered}
          duration={beamConfig[index]?.duration}
          delay={beamConfig[index]?.delay}
          width={containerWidth}
          style={{
            top: `${position}px`,
          }}
        />
      ))}
      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.8 : 1,
          x: hovered ? [0, -30, 30, -30, 30, 0] : 0,
          y: hovered ? [0, 30, -30, 30, -30, 0] : 0,
        }}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          x: {
            duration: 0.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
          y: {
            duration: 0.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
          scale: {
            duration: 0.2,
          },
          filter: {
            duration: 0.2,
          },
        }}
        className={cn(
          "relative z-20 inline-block text-neutral-900 transition duration-200 group-hover/cover:text-white dark:text-white",
          className,
        )}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -top-[2px] -right-[2px]" />
      <CircleIcon className="absolute -right-[2px] -bottom-[2px]" delay={0.4} />
      <CircleIcon className="absolute -top-[2px] -left-[2px]" delay={0.8} />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px]" delay={1.6} />
    </span>
  );
};

const Beam = ({
  className,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) => {
  const id = useId();

  const [randomDelay] = useState(() => Math.random() * (1 - 0.2) + 0.2);
  const [randomRepeatDelay] = useState(() => Math.random() * (2 - 1) + 1);

  return (
    <motion.svg
      width={width ?? "600"}
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-x-0 w-full", className)}
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          id={`svgGradient-${id}`}
          key={String(hovered)}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: hovered ? "-10%" : "-5%",
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: "110%",
            x2: hovered ? "100%" : "105%",
            y1: 0,
            y2: 0,
          }}
          transition={{
            duration: hovered ? 0.5 : (duration ?? 2),
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            delay: hovered ? randomDelay : 0,
            repeatDelay: hovered ? randomRepeatDelay : randomDelay,
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

const CircleIcon = ({ className }: { className?: string; delay?: number }) => {
  return (
    <span
      className={cn(
        `group pointer-events-none inline-block size-2 animate-pulse rounded-full bg-neutral-600 opacity-20 group-hover/cover:hidden group-hover/cover:bg-white group-hover/cover:opacity-100 dark:bg-white`,
        className,
      )}
    ></span>
  );
};
