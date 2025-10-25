"use client";

import { useEffect, useState } from "react";

export function useReducedMotion() {
  // Initialize with the value to avoid synchronous setState in effect
  const [shouldReduceMotion, setShouldReduceMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => setShouldReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return shouldReduceMotion;
}
