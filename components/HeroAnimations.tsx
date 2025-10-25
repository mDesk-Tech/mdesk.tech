"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export default function HeroAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showBlurs, setShowBlurs] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    // Set isMobile only in response to resize to avoid cascading renders
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set initial value on mount

    // Delay blur animations to not block LCP
    const timer = setTimeout(() => setShowBlurs(true), 100);

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Scroll-based fade overlay */}
      <motion.div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-5"
        style={{ opacity, y }}
      />

      {/* Background blur animations - loaded after LCP */}
      {showBlurs && !isMobile && (
        <>
          <motion.div
            className="fixed top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none will-change-transform z-0"
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
            className="fixed bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none will-change-transform z-0"
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
    </>
  );
}
