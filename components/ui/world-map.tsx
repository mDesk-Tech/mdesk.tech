"use client";

import { useRef, useEffect, useState, useMemo, memo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

const STATIC_MAP = new DottedMap({ height: 100, grid: "diagonal" });

const MapSvg = memo(function MapSvg({
  bg,
  dotColor,
}: {
  bg: string;
  dotColor: string;
}) {
  const inner = useMemo(
    () =>
      STATIC_MAP.getSVG({
        radius: 0.22,
        color: dotColor,
        shape: "circle",
        backgroundColor: bg,
      }),
    [bg, dotColor],
  );
  return <div dangerouslySetInnerHTML={{ __html: inner }} />;
});

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

function WorldMap({ dots = [], lineColor }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);

  // Track mount state for hydration-safe theme access
  // This is a common pattern for components that need client-only APIs
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Defer heavy animations using requestIdleCallback for better INP
  useEffect(() => {
    if (!mounted) return;

    const scheduleAnimations = () => {
      setAnimationsReady(true);
    };

    if (typeof requestIdleCallback !== "undefined") {
      const handle = requestIdleCallback(scheduleAnimations, { timeout: 200 });
      return () => cancelIdleCallback(handle);
    } else {
      // Fallback: use setTimeout with a small delay
      const t = setTimeout(scheduleAnimations, 100);
      return () => clearTimeout(t);
    }
  }, [mounted]);

  const currentTheme = mounted ? resolvedTheme || theme : "dark";

  /* ------------- memoised colours ---------------------------------- */
  const defaultLineColor = useMemo(
    () => (currentTheme === "dark" ? "#06b6d4" : "#0891b2"),
    [currentTheme],
  );
  const finalLineColor = lineColor || defaultLineColor;

  const mapColors = useMemo(() => {
    const dark = currentTheme === "dark";
    return {
      bg: dark ? "black" : "white",
      dotColor: dark ? "#FFFFFF40" : "#00000040",
    };
  }, [currentTheme]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const projectedDots = useMemo(
    () =>
      dots.map((d) => ({
        start: projectPoint(d.start.lat, d.start.lng),
        end: projectPoint(d.end.lat, d.end.lng),
      })),
    [dots],
  );

  if (!mounted) {
    return (
      <div className="w-full aspect-2/1 dark:bg-black bg-white rounded-lg" />
    );
  }

  return (
    <div className="w-full aspect-2/1 dark:bg-black bg-white rounded-lg relative font-sans overflow-hidden">
      <div className="h-full w-full mask-[linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none">
        <MapSvg bg={mapColors.bg} dotColor={mapColors.dotColor} />
      </div>

      {/* Defer animated elements to reduce INP */}
      {animationsReady && (
        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="w-full h-full absolute inset-0 pointer-events-none select-none"
        >
          {/* curved paths */}
          {projectedDots.map((d, i) => (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(d.start, d.end)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                delay: 0.8 * i,
                ease: "easeOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
              }}
            />
          ))}

          <defs>
            <linearGradient
              id="path-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={finalLineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={finalLineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* start & end circles with pulse - using SVG SMIL animations */}
          {projectedDots.map((d, i) => (
            <g key={`points-${i}`}>
              {/* start */}
              <circle
                cx={d.start.x}
                cy={d.start.y}
                r="2"
                fill={finalLineColor}
              />
              <circle
                cx={d.start.x}
                cy={d.start.y}
                r="2"
                fill={finalLineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* end */}
              <circle cx={d.end.x} cy={d.end.y} r="2" fill={finalLineColor} />
              <circle
                cx={d.end.x}
                cy={d.end.y}
                r="2"
                fill={finalLineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

export default memo(WorldMap);
