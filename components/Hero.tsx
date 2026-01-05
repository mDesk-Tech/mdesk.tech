"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      {/* Defer decorative blobs until after hydration for better INP */}
      {isHydrated && !isMobile && (
        <>
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none will-change-transform animate-blob-a" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none will-change-transform animate-blob-b" />
        </>
      )}

      <div
        ref={contentRef}
        className="container relative z-10 px-4 sm:px-6 py-20 sm:py-32"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6 sm:mb-8 animate-fade-up delay-0">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Next-Generation Web Solutions
            </span>
          </div>

          {/* LCP element - visible immediately, no animation delay */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 tracking-tight leading-tight"
            data-lcp-element="true"
          >
            <span className="block">Designing Your</span>
            <span className="block bg-clip-text text-transparent bg-linear-to-b from-primary to-accent">
              Digital Future
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4 animate-fade-up delay-200">
            Cutting-edge web design and reliable hosting solutions
            <br />
            for businesses that want to stand out in the digital landscape
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-up delay-300">
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 overflow-hidden cursor-pointer touch-manipulation"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full border-2 border-primary/20 bg-transparent text-foreground font-bold text-base sm:text-lg transition-all hover:bg-primary/10 hover:border-primary cursor-pointer touch-manipulation"
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
