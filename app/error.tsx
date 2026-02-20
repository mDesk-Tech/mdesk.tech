"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, RefreshCw, AlertOctagon, Bug } from "lucide-react";
import { useEffect, useState } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [errorCode] = useState(() =>
    Math.floor(500 + Math.random() * 99).toString(),
  );

  useEffect(() => {
    // Log error to console for debugging
    console.error("Application error:", error);

    const scheduleHydration = () => {
      setIsHydrated(true);
    };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(scheduleHydration, { timeout: 100 });
    } else {
      timeoutId = setTimeout(scheduleHydration, 50);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [error]);

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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] py-20">
      {/* Background Effects */}
      <div className="grid-pattern absolute inset-0 opacity-[0.08]" />
      <div className="noise absolute inset-0" />
      <div className="scanlines absolute inset-0 opacity-20" />

      {/* Animated Warning Background */}
      {isHydrated && (
        <>
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-orange-500/5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 size-200 -translate-1/2 rounded-full bg-red-500/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Warning Stripes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 overflow-hidden">
        <motion.div
          className="flex h-full w-[200%]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="h-full w-8"
              style={{
                backgroundColor: i % 2 === 0 ? "#ff6b35" : "#0a0a0a",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-4xl">
          {/* Error Icon Animation */}
          <motion.div
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-500/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Inner Content */}
              <div className="relative flex size-24 items-center justify-center rounded-full border-2 border-red-500/50 bg-red-500/10 sm:size-32">
                <AlertOctagon className="size-12 text-red-500 sm:size-16" />
              </div>
            </motion.div>
          </motion.div>

          {/* Error Code */}
          <motion.div className="mb-6 text-center" variants={itemVariants}>
            <motion.div
              className="relative inline-block"
              animate={{
                x: [0, -2, 2, -2, 2, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              <span className="bg-linear-to-br from-red-500 via-orange-500 to-red-500 bg-clip-text text-7xl font-black text-transparent sm:text-8xl md:text-9xl">
                {errorCode}
              </span>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div className="mb-8 text-center" variants={itemVariants}>
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Something Went Wrong
            </h1>
            <p className="mx-auto max-w-lg text-base text-[#a0a0a0] sm:text-lg">
              We encountered an unexpected error while processing your request.
              Our team has been notified and we&apos;re working to fix this
              issue.
            </p>
          </motion.div>

          {/* Error Details */}
          {error.message && (
            <motion.div
              className="mx-auto mb-8 max-w-2xl"
              variants={itemVariants}
            >
              <div className="border border-red-500/30 bg-red-500/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Bug className="size-4 text-red-500" />
                  <span className="font-mono text-xs tracking-wider text-red-500 uppercase">
                    Error Details
                  </span>
                </div>
                <code className="block max-h-32 overflow-auto font-mono text-sm text-red-400">
                  {error.message}
                </code>
                {error.digest && (
                  <div className="mt-2 border-t border-red-500/20 pt-2">
                    <span className="font-mono text-xs text-[#666]">
                      Error ID: {error.digest}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <motion.button
              onClick={reset}
              className="group btn-neon inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="size-4 transition-transform group-hover:rotate-180" />
              <span>Try Again</span>
            </motion.button>

            <Link
              href="/"
              className="btn-retro-outline inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base sm:w-auto"
            >
              <Home className="size-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Decorative Status Grid */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-4 border-t-2 border-[#333] pt-8 sm:mt-20"
            variants={itemVariants}
          >
            {[
              { label: "Status", value: errorCode },
              { label: "Type", value: "Server Error" },
              { label: "Action", value: "Retry" },
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
                <div className="mt-1 font-mono text-sm font-bold text-red-500 sm:text-base">
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
            className="size-4 bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="size-4 border-2 border-red-500" />
          <div className="size-4 bg-red-500/50" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-8 bottom-24 hidden lg:block">
        <div className="flex flex-col items-end gap-2">
          <div className="size-4 border-2 border-orange-500" />
          <motion.div
            className="size-4 bg-orange-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <div className="size-4 bg-red-500/50" />
        </div>
      </div>

      {/* Bottom Warning Stripes */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 overflow-hidden">
        <motion.div
          className="flex h-full w-[200%]"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="h-full w-8"
              style={{
                backgroundColor: i % 2 === 0 ? "#0a0a0a" : "#ff6b35",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Error;
