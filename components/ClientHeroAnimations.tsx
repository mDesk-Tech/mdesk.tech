"use client";

import dynamic from "next/dynamic";

const HeroAnimations = dynamic(() => import("@/components/HeroAnimations"), {
  ssr: false,
  loading: () => null,
});

export default function ClientHeroAnimations() {
  return <HeroAnimations />;
}
