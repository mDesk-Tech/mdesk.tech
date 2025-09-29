"use client";

import { useEffect, useRef } from "react";
import {
  initializePerformanceOptimizations,
  cleanupObservers,
  deferWork,
  optimizeImages,
  setupLazyLoading,
} from "@/lib/performance-util";

export default function PerformanceOptimizer() {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || initialized.current) return;
    initialized.current = true;

    // Initialize all performance optimizations
    initializePerformanceOptimizations();

    // Optimize LCP elements that are marked
    const optimizeLcpElements = () => {
      const lcpElements =
        document.querySelectorAll<HTMLElement>("[data-lcp-element]");

      lcpElements.forEach((element) => {
        if (element instanceof HTMLImageElement) {
          element.fetchPriority = "high";
          element.loading = "eager";
          element.decoding = "sync";
        } else {
          element.setAttribute("fetchpriority", "high");
        }
      });
    };

    // Run LCP optimization immediately
    optimizeLcpElements();

    // Defer layout shift prevention
    deferWork(() => {
      const dynamicElements =
        document.querySelectorAll<HTMLElement>(".motion-safe");

      // Use requestAnimationFrame for accurate measurements
      requestAnimationFrame(() => {
        dynamicElements.forEach((element) => {
          if (!element.style.minHeight && element.offsetHeight > 0) {
            element.style.minHeight = `${element.offsetHeight}px`;
          }
        });
      });
    });

    // Re-run optimizations when new content is added
    const observer = new MutationObserver(() => {
      deferWork(() => {
        optimizeImages();
        setupLazyLoading();
      }, "timeout");
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
      cleanupObservers();
    };
  }, []);

  return null;
}
