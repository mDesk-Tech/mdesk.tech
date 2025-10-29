"use cache";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components for better TBT
const Features = dynamic(() => import("@/components/Features"), {
  loading: () => <div style={{ minHeight: "900px" }} />,
});

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div style={{ minHeight: "800px" }} />,
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div style={{ minHeight: "800px" }} />,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div style={{ minHeight: "600px" }} />,
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
