"use cache";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Dynamically import below-the-fold components with no SSR
// This reduces initial JavaScript bundle size
const Features = dynamic(() => import("@/components/Features"), {
  ssr: false,
});
const Services = dynamic(() => import("@/components/Services"), {
  ssr: false,
});
const About = dynamic(() => import("@/components/About"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false,
});

export default async function Home() {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <Features />
      <Services />
      <About />
      <Contact />
    </div>
  );
}
