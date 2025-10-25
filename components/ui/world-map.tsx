"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;

const projectPoint = (lat: number, lng: number) => {
  const x = ((lng + 180) * MAP_WIDTH) / 360;
  const y = ((90 - lat) * MAP_HEIGHT) / 180;
  return { x, y };
};

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number },
) => {
  const ctrlX = (start.x + end.x) / 2;
  const ctrlY =
    Math.min(start.y, end.y) - Math.max(Math.abs(start.x - end.x) * 0.15, 80);
  return `M ${start.x} ${start.y} Q ${ctrlX} ${ctrlY} ${end.x} ${end.y}`;
};

export default function WorldMap({ dots = [], lineColor }: MapProps) {
  const { line, glow } = useMemo(() => {
    const base = lineColor ?? "#38BDF8";
    const glowColor = `${base}55`;
    return { line: base, glow: glowColor };
  }, [lineColor]);

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(129,140,248,0.25),transparent_60%),radial-gradient(circle_at_45%_80%,rgba(20,184,166,0.2),transparent_55%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <motion.svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="route" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor={line} />
            <stop offset="85%" stopColor={line} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="24"
          y="24"
          width={MAP_WIDTH - 48}
          height={MAP_HEIGHT - 48}
          rx="28"
          fill="none"
          stroke="rgba(148,163,184,0.12)"
          strokeDasharray="12 16"
        />

        <g fill="rgba(148,163,184,0.25)" opacity="0.6">
          <motion.ellipse
            cx="220"
            cy="220"
            rx="140"
            ry="90"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.ellipse
            cx="420"
            cy="180"
            rx="110"
            ry="70"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25 }}
          />
          <motion.ellipse
            cx="600"
            cy="210"
            rx="90"
            ry="60"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.ellipse
            cx="780"
            cy="230"
            rx="70"
            ry="50"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
          />
          <motion.ellipse
            cx="520"
            cy="320"
            rx="120"
            ry="70"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </g>

        {dots.map((dot, index) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          const delay = index * 0.5;

          return (
            <g key={`route-${index}`} className="pointer-events-none">
              <motion.path
                d={createCurvedPath(start, end)}
                stroke="url(#route)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.8,
                  delay,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 4,
                }}
              />
              {[start, end].map((point, idx) => (
                <g key={`${index}-${idx}`}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill={line}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.85 }}
                    transition={{ duration: 0.35, delay: delay + idx * 0.15 }}
                  />
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r="14"
                    stroke={glow}
                    strokeWidth="2"
                    fill="none"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.05, 1.25],
                      opacity: [0.6, 0.4, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      delay,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              ))}
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}
