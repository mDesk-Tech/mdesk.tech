"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-20">
      {/* Background elements */}
      <div className="grid-pattern absolute inset-0 z-0 opacity-10" />
      <div className="noise absolute inset-0 z-0" />

      <motion.div
        className="absolute size-125 rounded-full bg-linear-to-r from-cyan-500/10 to-teal-500/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute size-75 rounded-full bg-linear-to-r from-teal-500/10 to-cyan-500/10 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <motion.div
              className="inline-block bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text text-9xl font-bold text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              404
            </motion.div>
          </div>

          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-lg text-lg text-muted-foreground">
              We couldn&apos;t find the page you&apos;re looking for. It might
              have been moved, deleted, or never existed.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Home className="mr-2 size-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
            >
              <ArrowLeft className="mr-2 size-4" />
              Go Back
            </button>
          </motion.div>

          {/* 404 Illustration */}
          <motion.div
            className="relative mx-auto mt-16 max-w-md"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-br from-cyan-500/20 to-teal-500/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative size-3/4">
                  {/* Circular grid pattern */}
                  <div
                    className="absolute inset-0 animate-spin rounded-full border-4 border-dashed border-muted/30"
                    style={{ animationDuration: "30s" }}
                  />

                  {/* Broken link visualization */}
                  <div className="absolute top-1/2 left-1/2 flex w-1/2 -translate-1/2 transform items-center">
                    <div className="h-4 w-1/2 rounded-l-full bg-primary/50" />
                    <div className="ml-4 size-4 rounded-full border-2 border-primary/50 bg-background" />
                  </div>

                  {/* Animated dots */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute size-3 rounded-full bg-primary/70"
                      style={{
                        top: `${Math.sin((i / 6) * Math.PI * 2) * 45 + 50}%`,
                        left: `${Math.cos((i / 6) * Math.PI * 2) * 45 + 50}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
