"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll, useMotionValue } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

    const deferAnimations = () => {
      if (typeof window !== "undefined" && !isMobile) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            mouseMoveHandler = (e: MouseEvent) => {
              if (!containerRef.current) return;
              const { clientX, clientY } = e;
              const { left, top, width, height } =
                containerRef.current.getBoundingClientRect();
              const x = (clientX - left) / width;
              const y = (clientY - top) / height;
              mouseX.set(x);
              mouseY.set(y);
            };
            window.addEventListener("mousemove", mouseMoveHandler, {
              passive: true,
            });
          }
        });
      }
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(deferAnimations);
    } else {
      setTimeout(deferAnimations, 200);
    }

    return () => {
      clearTimeout(mountTimer);
      if (mouseMoveHandler) {
        window.removeEventListener("mousemove", mouseMoveHandler);
      }
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY, isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{
        contain: "layout style paint",
        containIntrinsicSize: "0 100vh",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      {isMounted && !isMobile && (
        <>
          <motion.div
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      <motion.div
        className="container relative z-10 px-4 sm:px-6 py-20 sm:py-32"
        style={{ opacity, y }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6 sm:mb-8"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Next-Generation Web Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 tracking-tight leading-tight"
            data-lcp-element="true"
          >
            <span className="block">Designing Your</span>
            <span className="block bg-clip-text text-transparent bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] animate-gradient-x">
              Digital Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4"
          >
            Cutting-edge web design and reliable hosting solutions for
            businesses that want to stand out in the digital landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 overflow-hidden cursor-pointer touch-manipulation"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full border-2 border-primary/20 bg-transparent text-foreground font-bold text-base sm:text-lg transition-all hover:bg-primary/10 hover:border-primary cursor-pointer touch-manipulation"
            >
              Explore Services
            </button>
          </motion.div>

          {isMounted && !isMobile && (
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="w-6 h-10 sm:w-8 sm:h-12 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"
                  animate={{ y: [0, 16, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
