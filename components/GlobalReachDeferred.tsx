"use client";

import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";

const GlobalReach = dynamic(() => import("@/components/GlobalReach"), {
  ssr: false,
});

export default function GlobalReachDeferred() {
  return (
    <LazySection minHeight="40vh" rootMargin="300px 0px">
      <GlobalReach />
    </LazySection>
  );
}
