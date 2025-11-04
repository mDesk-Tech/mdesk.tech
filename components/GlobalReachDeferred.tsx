"use client";

import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";

const GlobalReach = dynamic(() => import("@/components/GlobalReach"), {
  ssr: false,
});

/**
 * Defers rendering of the GlobalReach component until its section meets the lazy-loading threshold.
 *
 * @returns A section element that lazily loads and renders the `GlobalReach` component.
 */
export default function GlobalReachDeferred() {
  return (
    <LazySection minHeight="40vh" rootMargin="300px 0px">
      <GlobalReach />
    </LazySection>
  );
}