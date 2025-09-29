"use client";

import { useEffect, useRef } from "react";

// Define the LCP entry type
interface LargestContentfulPaintEntry extends PerformanceEntry {
  element: Element | null;
  size: number;
  startTime: number;
  renderTime: number;
  loadTime: number;
  url?: string;
  id?: string;
}

export default function LcpOptimizer() {
  const observerRef = useRef<PerformanceObserver | null>(null);
  const optimized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || optimized.current) return;
    optimized.current = true;

    // Register a PerformanceObserver to identify the actual LCP element
    if ("PerformanceObserver" in window) {
      try {
        observerRef.current = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const lcpEntry = entries[
              entries.length - 1
            ] as LargestContentfulPaintEntry;

            if (process.env.NODE_ENV === "development") {
              console.debug("LCP element:", lcpEntry);
            }

            if (lcpEntry.element && lcpEntry.element instanceof HTMLElement) {
              lcpEntry.element.setAttribute("data-lcp-element", "true");

              // Optimize the actual LCP element
              requestAnimationFrame(() => {
                lcpEntry.element?.setAttribute("fetchpriority", "high");
                if (lcpEntry.element instanceof HTMLImageElement) {
                  lcpEntry.element.loading = "eager";
                  lcpEntry.element.decoding = "sync";
                }
              });
            }

            observerRef.current?.disconnect();
          }
        });

        observerRef.current.observe({
          type: "largest-contentful-paint",
          buffered: true,
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error setting up LCP observer:", error);
        }
      }
    }

    // Pre-allocate space using requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      // Pre-allocate space for the grid pattern
      const gridPattern = document.querySelector(".grid-pattern");
      if (gridPattern instanceof HTMLElement) {
        // Use CSS classes instead of inline styles when possible
        gridPattern.style.contain = "layout style";

        // Only set background if not already set
        if (!gridPattern.style.backgroundImage) {
          const svgBackground = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='rgba(255,255,255,0.05)' strokeWidth='1'/%3E%3C/svg%3E")`;
          gridPattern.style.backgroundImage = svgBackground;
        }
      }

      // Pre-allocate space for the hero section
      const heroSection = document.querySelector("section");
      if (heroSection instanceof HTMLElement && !heroSection.style.minHeight) {
        heroSection.style.minHeight = "100vh";
        heroSection.style.contain = "layout style";
      }
    });

    // Resource hints removed - fonts are not used from external sources

    // Cleanup function
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return null;
}
