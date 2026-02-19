import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "mdesk.tech - Designing and hosting your digital future",
  description:
    "mdesk.tech specializes in cutting-edge web design and reliable hosting solutions.",
  path: "/",
});

// Lazy load sections below the fold
const Features = dynamic(() => import("@/components/Features"));
const Services = dynamic(() => import("@/components/Services"));
const About = dynamic(() => import("@/components/About"));
const Contact = dynamic(() => import("@/components/Contact"));

/**
 * Homepage - hero + lazy-loaded sections
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
