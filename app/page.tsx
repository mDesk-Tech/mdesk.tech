"use cache";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

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
