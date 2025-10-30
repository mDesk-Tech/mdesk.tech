"use cache";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components for better TBT and FCP
// Use ssr: false for components that don't need server-side rendering
const Features = dynamic(() => import("@/components/Features"), {
  loading: () => <div style={{ minHeight: "900px" }} />,
  ssr: true,
});

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div style={{ minHeight: "800px" }} />,
  ssr: true,
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div style={{ minHeight: "800px" }} />,
  ssr: true,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div style={{ minHeight: "600px" }} />,
  ssr: true,
});

export default async function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero is loaded immediately for LCP */}
      <Hero />
      {/* Below-the-fold components are lazy loaded */}
      <Features />
      <Services />
      <About />
      <Contact />
    </div>
  );
}
