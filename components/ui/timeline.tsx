"use client";
import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [progressHeight, setProgressHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Lightweight scroll progress without motion/framer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const computeProgress = () => {
      if (!container || !ref.current) return;
      const containerRect = container.getBoundingClientRect();
      const start = window.innerHeight * 0.2; // ~20% from top
      const end = window.innerHeight * 0.8; // ~80% from top

      // distance the top of the container is from the start threshold
      const distanceFromStart = start - containerRect.top;
      const totalScrollable =
        containerRect.height - (start + (window.innerHeight - end));
      const rawProgress =
        totalScrollable > 0 ? distanceFromStart / totalScrollable : 0;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProgressHeight(clamped * height);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeProgress();
        ticking = false;
      });
    };

    computeProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeProgress);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeProgress);
    };
  }, [height]);

  useEffect(() => {
    const positions: number[] = [];

    const measure = () => {
      positions.length = 0;
      itemRefs.current.forEach((el) => {
        if (!el) return positions.push(0);
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        positions.push(top);
      });
    };

    const onScroll = () => {
      const center = window.scrollY + window.innerHeight * 0.4; // focus band ~40% from top
      let idx = 0;
      for (let i = 0; i < positions.length; i++) {
        if (positions[i] <= center) idx = i;
      }
      setActiveIndex(idx);
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, [data.length]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Changelog from our journey
        </h2>
        <p className="text-foreground text-sm md:text-base max-w-sm">
          We&apos;ve been working on building amazing web experiences.
          Here&apos;s a timeline of our journey.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full border p-2 transition-colors ${
                    activeIndex === index
                      ? "bg-primary border-primary"
                      : "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                  }`}
                />
              </div>
              <h3
                className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold transition-colors ${
                  activeIndex === index
                    ? "text-foreground"
                    : "text-neutral-500 dark:text-neutral-500"
                }`}
              >
                {item.title}
              </h3>
            </div>

            <div
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative pl-20 pr-4 md:pl-4 w-full"
            >
              <h3
                className={`md:hidden block text-2xl mb-4 text-left font-bold transition-colors ${
                  activeIndex === index
                    ? "text-foreground"
                    : "text-neutral-500 dark:text-neutral-500"
                }`}
              >
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <div
            style={{
              height: `${progressHeight}px`,
              opacity: progressHeight > 0 ? 1 : 0,
              transition: "height 80ms linear, opacity 150ms ease-out",
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-linear-to-t from-cyan-500 via-teal-500 to-transparent from-0% via-10% rounded-full will-change-[height,opacity]"
          />
        </div>
      </div>
    </div>
  );
};
