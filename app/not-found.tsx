"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

// Animation variants
const glitchVariants = {
  initial: { x: 0 },
  animate: {
    x: [0, -2, 2, -2, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const textShadowAnimation = {
  textShadow: [
    "0 0 60px rgba(255, 107, 53, 0.3)",
    "0 0 80px rgba(255, 107, 53, 0.5)",
    "0 0 60px rgba(255, 107, 53, 0.3)",
  ],
};

const statusIndicatorAnimation = {
  rotate: [0, 10, -10, 0],
};

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHydrated, setIsHydrated] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pendingMousePos = useRef({ x: 0, y: 0 });

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    pendingMousePos.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    };

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition(pendingMousePos.current);
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  // Memoize parallax style to prevent rerenders
  const parallaxStyle = useMemo(
    () => ({
      x: mousePosition.x,
      y: mousePosition.y,
    }),
    [mousePosition.x, mousePosition.y],
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] py-20">
      {/* Background Effects */}
      <div className="grid-pattern absolute inset-0 opacity-[0.08]" />
      <div className="noise absolute inset-0" />
      <div className="scanlines absolute inset-0 opacity-20" />

      {/* Animated Background Blobs */}
      {isHydrated && (
        <>
          <motion.div
            className="absolute top-1/4 -left-1/4 size-150 rounded-full bg-coral/5 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-1/4 size-125 rounded-full bg-teal/5 blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      )}

      {/* Floating Particles */}
      {isHydrated && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-2 rounded-full bg-coral/30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-4xl">
          {/* 404 Display with Parallax */}
          <motion.div
            className="relative mb-8 text-center"
            style={parallaxStyle}
          >
            {/* Decorative Frame */}
            <div className="absolute inset-0 -m-4 border border-coral/20 sm:-m-8">
              <div className="absolute -top-px left-0 h-px w-16 bg-linear-to-r from-transparent via-coral to-transparent" />
              <div className="absolute top-0 -right-px h-16 w-px bg-linear-to-b from-transparent via-teal to-transparent" />
              <div className="absolute right-0 -bottom-px h-px w-16 bg-linear-to-l from-transparent via-coral to-transparent" />
              <div className="absolute bottom-0 -left-px h-16 w-px bg-linear-to-t from-transparent via-teal to-transparent" />
            </div>

            {/* 404 Number with Glitch Effect */}
            <motion.div
              className="relative inline-block"
              variants={glitchVariants}
              animate="animate"
            >
              {/* Shadow layers for glitch effect */}
              <span
                className="absolute top-1 left-1 text-[120px] font-black text-coral/20 sm:text-[180px] md:text-[220px]"
                aria-hidden="true"
              >
                404
              </span>
              <span
                className="absolute -top-1 -left-1 text-[120px] font-black text-teal/20 sm:text-[180px] md:text-[220px]"
                aria-hidden="true"
              >
                404
              </span>

              {/* Main 404 */}
              <motion.span
                className="relative block bg-linear-to-br from-coral via-coral-bright to-teal bg-clip-text text-[120px] font-black text-transparent sm:text-[180px] md:text-[220px]"
                style={{
                  textShadow: "0 0 60px rgba(255, 107, 53, 0.3)",
                }}
                animate={textShadowAnimation}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                404
              </motion.span>
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              className="absolute top-0 -right-4 sm:top-4 sm:-right-8"
              animate={statusIndicatorAnimation}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2 border border-amber/50 bg-amber/10 px-3 py-1">
                <AlertTriangle className="size-4 text-amber" />
                <span className="font-mono text-xs tracking-wider text-amber uppercase">
                  Error
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-lg text-base text-[#a0a0a0] sm:text-lg">
              The page you&apos;re looking for seems to have vanished into the
              digital void. It might have been moved, deleted, or never existed
              in the first place.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Link
              href="/"
              className="group btn-neon inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base sm:w-auto"
            >
              <Home className="size-4 transition-transform group-hover:scale-110" />
              <span>Back to Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn-retro-outline inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base sm:w-auto"
            >
              <ArrowLeft className="size-4" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Grid Lines */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-4 border-t-2 border-[#333] pt-8 sm:mt-20"
            variants={itemVariants}
          >
            {[
              { label: "Status", value: "404" },
              { label: "Code", value: "NOT_FOUND" },
              { label: "Type", value: "Client Error" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-mono text-xs tracking-wider text-[#666] uppercase">
                  {item.label}
                </div>
                <div className="mt-1 font-mono text-sm font-bold text-coral sm:text-base">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="pointer-events-none absolute top-24 left-8 hidden lg:block">
        <div className="flex flex-col gap-2">
          <motion.div
            className="size-4 bg-coral"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="size-4 bg-teal" />
          <div className="size-4 border-2 border-coral" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-8 bottom-24 hidden lg:block">
        <div className="flex flex-col items-end gap-2">
          <div className="size-4 border-2 border-teal" />
          <motion.div
            className="size-4 bg-coral"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <div className="size-4 bg-teal" />
        </div>
      </div>

      {/* Gradient Line */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-coral via-teal to-coral" />
    </div>
  );
};

export default NotFound;
