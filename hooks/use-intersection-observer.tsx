"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type React from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Detect if element is in viewport using Intersection Observer
 * More performant than scroll listeners
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {},
): [React.RefObject<HTMLElement | null>, boolean] => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Stable callback that won't cause effect re-runs
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const isVisible = entry.isIntersecting;
      setIsIntersecting(isVisible);

      if (isVisible && freezeOnceVisible) {
        setHasBeenVisible(true);
      }
    },
    [freezeOnceVisible],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip observation if already visible and frozen
    if (freezeOnceVisible && hasBeenVisible) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    handleIntersection,
    threshold,
    root,
    rootMargin,
    freezeOnceVisible,
    hasBeenVisible,
  ]);

  return [ref, isIntersecting || hasBeenVisible];
};
