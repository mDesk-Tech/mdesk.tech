"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Hook to detect when component is mounted on client.
 * Useful for preventing hydration mismatches with client-only features.
 */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      // Use requestAnimationFrame to avoid cascading renders
      requestAnimationFrame(() => {
        setIsMounted(true);
      });
    }
  }, []);

  return isMounted;
};
