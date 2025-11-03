"use cache";

import { Suspense, lazy } from "react";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components for better FCP and LCP
const Features = lazy(() => import("@/components/Features"));
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));

// Simple loading fallback
const LoadingSection = () => (
  <div className="py-20 sm:py-32 relative overflow-hidden bg-muted/20">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="h-32 animate-pulse bg-muted/50 rounded-lg" />
    </div>
  </div>
);

export default async function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero is not lazy loaded as it's above the fold (LCP element) */}
      <Hero />
      
      {/* Below-the-fold components are lazy loaded */}
      <Suspense fallback={<LoadingSection />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<LoadingSection />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<LoadingSection />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<LoadingSection />}>
        <Contact />
      </Suspense>
    </div>
  );
}
