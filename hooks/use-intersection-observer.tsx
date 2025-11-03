"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Hook to detect if an element is in viewport using Intersection Observer API.
 * More performant than scroll listeners for triggering animations.
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {},
): [React.RefObject<HTMLElement>, boolean] => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already visible and frozen, don't observe again
    if (freezeOnceVisible && hasBeenVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && freezeOnceVisible) {
          setHasBeenVisible(true);
        }
      },
      { threshold, root, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, hasBeenVisible]);

  return [ref, isIntersecting || hasBeenVisible];
};
