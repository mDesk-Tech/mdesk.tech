"use cache";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Dynamically import below-the-fold components
// Next.js will automatically code-split these into separate chunks
const Features = dynamic(() => import("@/components/Features"));
const Services = dynamic(() => import("@/components/Services"));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));

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
