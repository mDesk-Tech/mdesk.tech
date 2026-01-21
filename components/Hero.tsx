"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [isHydrated, setIsHydrated] = useState(false);

  // Track scroll-driven fade/translate without animation library
  const opacityRef = useRef(1);
  const translateYRef = useRef(0);

  // Defer non-critical visual effects until after hydration
  useEffect(() => {
    // Use requestIdleCallback if available for non-critical work
    const scheduleHydration = () => {
      setIsHydrated(true);
    };

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(scheduleHydration, { timeout: 100 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(scheduleHydration, 50);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Apply scroll-based transforms via a lightweight handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const height = Math.max(1, rect.height);
        // Emulate Framer Motion's useScroll with offsets ["start start", "end start"]
        // progress = clamp(-top / height, 0, 1)
        const progress = Math.min(1, Math.max(0, -rect.top / height));
        // Fade out over the first 30% of scroll range
        const nextOpacity = 1 - Math.min(1, progress / 0.3);
        // Translate up to 50px over the first 50% of range
        const nextTranslateY = Math.min(50, Math.min(1, progress / 0.5) * 50);
        opacityRef.current = nextOpacity;
        translateYRef.current = nextTranslateY;
        if (contentRef.current) {
          contentRef.current.style.opacity = String(nextOpacity);
          contentRef.current.style.transform = `translateY(${nextTranslateY}px)`;
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Defer decorative blobs until after hydration for better INP */}
      {isHydrated && isMobile === false && (
        <>
          <div className="animate-blob-a pointer-events-none absolute top-1/4 -left-1/4 size-96 rounded-full bg-primary/20 blur-3xl will-change-transform" />
          <div className="animate-blob-b pointer-events-none absolute -right-1/4 bottom-1/4 size-96 rounded-full bg-accent/20 blur-3xl will-change-transform" />
        </>
      )}

      <div
        ref={contentRef}
        className="relative z-10 container px-4 py-20 sm:px-6 sm:py-32"
      >
        <div className="mx-auto max-w-6xl text-center">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm delay-0 sm:mb-8 sm:px-6 sm:py-3">
            <Sparkles className="size-3 text-primary sm:size-4" />
            <span className="text-xs font-semibold text-primary sm:text-sm">
              Next-Generation Web Solutions
            </span>
          </div>

          {/* LCP element - visible immediately, no animation delay */}
          <h1
            className="mb-6 text-4xl/tight font-black tracking-tight sm:mb-8 sm:text-6xl md:text-7xl lg:text-8xl"
            data-lcp-element="true"
          >
            <span className="block">Designing Your</span>
            <span className="block bg-linear-to-b from-primary to-accent bg-clip-text text-transparent">
              Digital Future
            </span>
          </h1>

          <p className="animate-fade-up mx-auto mb-8 max-w-4xl px-4 text-base/relaxed font-light text-muted-foreground delay-200 sm:mb-12 sm:text-xl md:text-2xl lg:text-3xl">
            Cutting-edge web design and reliable hosting solutions
            <br />
            for businesses that want to stand out in the digital landscape
          </p>

          <div className="animate-fade-up flex flex-col justify-center gap-3 px-4 delay-300 sm:flex-row sm:gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative inline-flex cursor-pointer touch-manipulation items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 sm:px-10 sm:py-5 sm:text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="inline-flex cursor-pointer touch-manipulation items-center justify-center rounded-full border-2 border-primary/20 bg-transparent px-6 py-4 text-base font-bold text-foreground transition-all hover:border-primary hover:bg-primary/10 sm:px-10 sm:py-5 sm:text-lg"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
