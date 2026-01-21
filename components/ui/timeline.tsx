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

    // Truncate stale refs if data shrank to avoid measuring old elements
    if (itemRefs.current.length > data.length) {
      itemRefs.current.length = data.length;
    }

    let measured = false;
    const measure = () => {
      positions.length = 0;
      itemRefs.current.forEach((el) => {
        if (!el) return positions.push(0);
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        positions.push(top);
      });
      measured = true;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Re-measure lazily if we haven't yet or the initial measurement was invalid (hidden state)
        if (!measured || positions.every((p) => p === 0)) {
          measure();
        }
        const center = window.scrollY + window.innerHeight * 0.4; // focus band ~40% from top
        let idx = 0;
        for (let i = 0; i < positions.length; i++) {
          if (positions[i] <= center) idx = i;
        }
        setActiveIndex(idx);
        ticking = false;
      });
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, [data, height]);

  return (
    <div className="w-full bg-background font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex size-10 items-center justify-center rounded-full bg-background md:left-3">
                <div
                  className={`size-4 rounded-full border p-2 transition-colors ${
                    activeIndex === index
                      ? "border-primary bg-primary"
                      : "border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800"
                  }`}
                />
              </div>
              <h3
                className={`hidden text-xl font-bold transition-colors md:block md:pl-20 md:text-5xl ${
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
              className="relative w-full pr-4 pl-20 md:pl-4"
            >
              <h3
                className={`mb-4 block text-left text-2xl font-bold transition-colors md:hidden ${
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
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:via-neutral-700"
        >
          <div
            style={{
              height: `${progressHeight}px`,
              opacity: progressHeight > 0 ? 1 : 0,
              transition: "height 80ms linear, opacity 150ms ease-out",
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-linear-to-t from-cyan-500 from-0% via-teal-500 via-10% to-transparent will-change-[height,opacity]"
          />
        </div>
      </div>
    </div>
  );
};
