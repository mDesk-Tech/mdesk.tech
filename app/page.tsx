"use cache";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";

// Dynamically import below-the-fold components
// Next.js will automatically code-split these into separate chunks
const Features = dynamic(() => import("@/components/Features"));
const Services = dynamic(() => import("@/components/Services"));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));

/**
 * Renders the homepage layout with a hero section and four below-the-fold sections loaded lazily.
 *
 * The page includes a static Hero component followed by Features, Services, About, and Contact
 * sections each wrapped in a LazySection to defer loading until they approach the viewport.
 *
 * @returns The React element tree for the homepage containing the hero and lazily loaded sections.
 */
export default async function Home() {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <LazySection minHeight="60vh" rootMargin="400px 0px">
        <Features />
      </LazySection>
      <LazySection minHeight="60vh" rootMargin="400px 0px">
        <Services />
      </LazySection>
      <LazySection minHeight="60vh" rootMargin="400px 0px">
        <About />
      </LazySection>
      <LazySection minHeight="60vh" rootMargin="400px 0px">
        <Contact />
      </LazySection>
    </div>
  );
}
