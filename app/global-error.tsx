"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, RefreshCw, AlertTriangle, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Animation configurations
const pulseRingAnimation = {
  scale: [1, 1.5],
  opacity: [0.5, 0],
};

const pulseRingTransition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeOut" as const,
};

const iconGlowAnimation = {
  boxShadow: [
    "0 0 20px rgba(239, 68, 68, 0.3)",
    "0 0 40px rgba(239, 68, 68, 0.5)",
    "0 0 20px rgba(239, 68, 68, 0.3)",
  ],
};

const borderPulseAnimation = {
  borderColor: [
    "rgba(239, 68, 68, 0.5)",
    "rgba(239, 68, 68, 1)",
    "rgba(239, 68, 68, 0.5)",
  ],
};

const blinkAnimation = {
  opacity: [1, 0.3, 1],
};

const bottomLineAnimation = {
  opacity: [0.5, 1, 0.5],
};

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    console.error("Critical application error:", error);

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
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a]">
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-20">
          {/* Dark Background */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="grid-pattern absolute inset-0 opacity-[0.05]" />
          <div className="noise absolute inset-0" />

          {/* Critical Error Glow */}
          {isHydrated && (
            <>
              <motion.div
                className="absolute top-1/2 left-1/2 size-250 -translate-1/2 rounded-full bg-red-600/10 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/4 left-1/4 size-100 rounded-full bg-orange-600/10 blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          {/* Critical Frame */}
          <div className="pointer-events-none absolute inset-4 border-2 border-red-500/20 sm:inset-8">
            <div className="absolute -top-2 left-0 h-2 w-24 bg-red-500" />
            <div className="absolute top-0 -right-2 h-24 w-2 bg-red-500" />
            <div className="absolute right-0 -bottom-2 h-2 w-24 bg-red-500" />
            <div className="absolute bottom-0 -left-2 h-24 w-2 bg-red-500" />

            {/* Animated corner accents */}
            {isHydrated && (
              <>
                <motion.div
                  className="absolute -top-2 left-24 h-2 w-8 bg-orange-500"
                  animate={blinkAnimation}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-24 -right-2 h-8 w-2 bg-orange-500"
                  animate={blinkAnimation}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
                />
                <motion.div
                  className="absolute right-24 -bottom-2 h-2 w-8 bg-orange-500"
                  animate={blinkAnimation}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-24 -left-2 h-8 w-2 bg-orange-500"
                  animate={blinkAnimation}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
                />
              </>
            )}
          </div>

          {/* Main Content */}
          <motion.div
            className="relative z-10 container mx-auto px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto max-w-4xl">
              {/* Critical Warning Icon */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <div className="relative">
                  {/* Pulsing rings */}
                  {isHydrated && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-500/30"
                        animate={pulseRingAnimation}
                        transition={pulseRingTransition}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-500/20"
                        animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                        transition={{ ...pulseRingTransition, delay: 0.5 }}
                      />
                    </>
                  )}

                  {/* Main icon */}
                  <motion.div
                    className="relative flex size-28 items-center justify-center rounded-full border-2 border-red-500 bg-red-500/10 sm:size-36"
                    animate={iconGlowAnimation}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <AlertTriangle className="size-14 text-red-500 sm:size-20" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Critical Error Text */}
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="mb-2 inline-flex items-center gap-2 border border-red-500/50 bg-red-500/10 px-4 py-1"
                  animate={borderPulseAnimation}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Terminal className="size-4 text-red-500" />
                  <span className="font-mono text-xs font-bold tracking-wider text-red-500 uppercase">
                    Critical System Error
                  </span>
                </motion.div>
              </motion.div>

              {/* Error Code */}
              <motion.div
                className="mb-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="mb-4 text-5xl font-black text-white sm:text-6xl md:text-7xl">
                  <span className="text-red-500">5</span>
                  <motion.span
                    animate={blinkAnimation}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    0
                  </motion.span>
                  <span className="text-red-500">0</span>
                </h1>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  System Failure
                </h2>
              </motion.div>

              {/* Error Message */}
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="mx-auto max-w-lg text-base text-[#a0a0a0] sm:text-lg">
                  A critical error has occurred that prevents the application
                  from loading. This could be due to a system configuration
                  issue or an unexpected runtime error.
                </p>
              </motion.div>

              {/* Technical Details */}
              {error.message && (
                <motion.div
                  className="mx-auto mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="border border-red-500/30 bg-black/50 p-4 font-mono text-sm">
                    <div className="mb-2 flex items-center gap-2 text-red-500">
                      <Terminal className="size-4" />
                      <span className="text-xs tracking-wider uppercase">
                        Stack Trace
                      </span>
                    </div>
                    <div className="max-h-32 overflow-auto text-xs text-red-400/80">
                      {error.message}
                    </div>
                    {error.digest && (
                      <div className="mt-3 border-t border-red-500/20 pt-2 text-xs text-[#666]">
                        Error ID: {error.digest}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  onClick={reset}
                  className="group inline-flex w-full items-center justify-center gap-2 border-2 border-red-500 bg-red-500 px-8 py-4 font-bold tracking-wider text-black uppercase transition-all hover:bg-red-600 sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="size-4 transition-transform group-hover:rotate-180" />
                  <span>Restart Application</span>
                </motion.button>

                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center gap-2 border-2 border-red-500/50 bg-transparent px-8 py-4 font-bold tracking-wider text-red-500 uppercase transition-all hover:bg-red-500/10 sm:w-auto"
                >
                  <Home className="size-4" />
                  <span>Return Home</span>
                </Link>
              </motion.div>

              {/* Status Grid */}
              <motion.div
                className="mt-16 grid grid-cols-2 gap-4 border-t-2 border-red-500/20 pt-8 sm:mt-20 sm:grid-cols-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { label: "Status", value: "CRITICAL" },
                  { label: "Error", value: "500" },
                  { label: "Module", value: "SYSTEM" },
                  { label: "Action", value: "REBOOT" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
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

          {/* Bottom Line */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1 bg-red-500"
            animate={bottomLineAnimation}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
