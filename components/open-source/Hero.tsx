"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const initialX = Math.floor(Math.random() * 100);
        const initialY = Math.floor(Math.random() * 100);
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${initialX}%`,
              top: `${initialY}%`,
              backgroundColor:
                Math.random() > 0.5
                  ? "rgba(99, 102, 241, 0.7)"
                  : "rgba(139, 92, 246, 0.7)",
              boxShadow: `0 0 ${size * 3}px ${size}px rgba(99, 102, 241, 0.5)`,
              filter: "blur(1px)",
            }}
            animate={{
              x: [
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
              ],
              y: [
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
                Math.random() * 200 - 100,
              ],
              opacity: [0.3, 0.7, 0.5, 0.3],
            }}
            transition={{
              duration: duration,
              times: [0, 0.33, 0.66, 1],
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        );
      })}
    </>
  );
};

export default function OpenSourceHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add smooth scrolling behavior
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');

      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        if (!targetId) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);

    return () => {
      document.removeEventListener("click", handleSmoothScroll);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
      suppressHydrationWarning
    >
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
          }}
        />

        {mounted && (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
                "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                "radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
                "radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {mounted && <FloatingElements />}
      </div>

      <div className="container px-6 relative z-10" suppressHydrationWarning>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative inline-flex items-center justify-center p-3 rounded-full bg-primary/20 text-primary">
              <Heart className="h-6 w-6 relative z-10" />

              {mounted && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.2, 0, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We{" "}
              <span className="text-primary relative">
                ♥
                <motion.div
                  className="absolute -inset-4 bg-primary/20 rounded-full blur-xl -z-10"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </span>{" "}
              Open Source
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Supporting the community that powers the web. We offer free
              website development for selected open source projects.
            </motion.p>
          </motion.div>

          {/* Animated buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 relative overflow-hidden group"
                asChild
              >
                <Link href="#apply">
                  Apply for Free Website
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating code snippets */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-1/4 left-4 md:left-10 bg-black/30 backdrop-blur-md border border-primary/20 rounded-lg p-4 text-xs font-mono text-primary/70 w-[180px] sm:w-60 transform -rotate-6 z-10"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre>
              <code>
                {`pnpm dlx create-next-project
pnpm build
pnpm start`}
              </code>
            </pre>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-4 md:right-10 bg-black/30 backdrop-blur-md border border-primary/20 rounded-lg p-4 text-xs font-mono text-primary/70 w-[220px] sm:w-72 transform rotate-6 z-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre>
              <code>
                {`export default function Page() {
  return <h1>Hello, World!</h1>
}`}
              </code>
            </pre>
          </motion.div>
        </>
      )}

      {/* Transition element to content section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black z-5"></div>

      <style jsx global suppressHydrationWarning>{`
        @keyframes moveGradient {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }

        .text-gradient {
          background: linear-gradient(to right, #6366f1, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}
