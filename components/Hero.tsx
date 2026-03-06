"use client";

import { useRef, useEffect, useState, memo } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Static data defined outside component to prevent recreations
const stats = [
  { value: "40+", label: "Sites Launched" },
  { value: "5+", label: "Years Building" },
  { value: "24/7", label: "Support Available" },
] as const;

const Hero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [isHydrated, setIsHydrated] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // Scroll-based transforms
  const opacityRef = useRef(1);
  const translateYRef = useRef(0);

  // Delay effects until hydration
  useEffect(() => {
    const scheduleHydration = () => {
      setIsHydrated(true);
    };

    let idleCallbackId: ReturnType<typeof requestIdleCallback> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof requestIdleCallback !== "undefined") {
      idleCallbackId = requestIdleCallback(scheduleHydration, { timeout: 100 });
    } else {
      timeoutId = setTimeout(scheduleHydration, 50);
    }

    return () => {
      if (idleCallbackId) cancelIdleCallback(idleCallbackId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    let resizeTimeout: ReturnType<typeof setTimeout>;
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

  // Mouse glow effect
  useEffect(() => {
    if (!isHydrated || isMobile !== false) return;

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const glow = glowRef.current;
        if (glow) {
          glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 107, 53, 0.12) 0%, transparent 20%)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isHydrated, isMobile]);

  // Scroll transforms
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
        const progress = Math.min(1, Math.max(0, -rect.top / height));
        const nextOpacity = 1 - Math.min(1, progress / 0.3);
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

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="grid-pattern pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />

      {/* Scanlines */}
      <div
        className="scanlines pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      {/* Noise */}
      <div
        className="noise pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Border frame */}
      <div
        className="pointer-events-none absolute inset-8 border border-[#333] opacity-30 sm:inset-12"
        aria-hidden="true"
      >
        <div className="absolute -top-px left-0 h-px w-16 animate-pulse bg-linear-to-r from-transparent via-coral to-transparent" />
        <div
          className="absolute top-0 -right-px h-16 w-px animate-pulse bg-linear-to-b from-transparent via-teal to-transparent"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute right-0 -bottom-px h-px w-16 animate-pulse bg-linear-to-l from-transparent via-coral to-transparent"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-0 -left-px h-16 w-px animate-pulse bg-linear-to-t from-transparent via-teal to-transparent"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Blobs */}
      {isHydrated && isMobile === false && (
        <>
          <div className="animate-blob pointer-events-none absolute top-1/4 -left-1/4 size-96 rounded-full bg-coral/10 blur-3xl will-change-transform" />
          <div className="animate-blob animation-delay-2000 pointer-events-none absolute -right-1/4 bottom-1/4 size-96 rounded-full bg-teal/10 blur-3xl will-change-transform" />
        </>
      )}

      {/* Corners */}
      <div className="pointer-events-none absolute top-24 left-8 hidden lg:block">
        <div className="flex flex-col gap-2">
          <div className="size-4 bg-coral" />
          <div className="size-4 bg-teal" />
          <div className="size-4 border-2 border-coral" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-8 bottom-24 hidden lg:block">
        <div className="flex flex-col items-end gap-2">
          <div className="size-4 border-2 border-teal" />
          <div className="size-4 bg-coral" />
          <div className="size-4 bg-teal" />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 container px-4 py-20 sm:px-6 sm:py-32"
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Headline */}
          <h1
            className="mb-6 text-4xl font-black tracking-tight sm:mb-8 sm:text-6xl md:text-7xl lg:text-8xl"
            data-lcp-element="true"
          >
            <span className="block text-white">Websites That</span>
            <span className="neon-text-coral mt-2 block">Work For You</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up animation-delay-200 mx-auto mb-8 max-w-3xl px-4 text-base/relaxed font-light text-[#a0a0a0] sm:mb-12 sm:text-xl md:text-2xl">
            Small team, focused work. We design and build sites
            <br className="hidden sm:block" />
            that help your business grow without the headaches.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animation-delay-300 flex flex-col justify-center gap-4 px-4 sm:flex-row">
            <Link
              href="/contact"
              className="group btn-neon inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:px-10 sm:py-5 sm:text-lg"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
            </Link>
            <Link
              href="/services"
              className="btn-retro-outline inline-flex items-center justify-center px-8 py-4 text-base transition-all duration-300 sm:px-10 sm:py-5 sm:text-lg"
            >
              Explore Services
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up animation-delay-400 mt-16 grid grid-cols-3 gap-4 border-t-2 border-[#333] pt-8 sm:mt-20 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="font-mono text-2xl font-bold text-coral transition-all duration-300 sm:text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-[#666] sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-coral via-teal to-coral" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
