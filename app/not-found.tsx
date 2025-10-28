"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      <div className="absolute inset-0 noise z-0" />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-linear-to-r from-cyan-500/10 to-teal-500/10 blur-3xl"
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
        className="absolute w-[300px] h-[300px] rounded-full bg-linear-to-r from-teal-500/10 to-cyan-500/10 blur-3xl"
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              className="inline-block text-9xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-teal-500"
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              We couldn&apos;t find the page you&apos;re looking for. It might
              have been moved, deleted, or never existed.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </motion.div>

          {/* 404 Illustration */}
          <motion.div
            className="mt-16 relative max-w-md mx-auto"
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
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-cyan-500/20 to-teal-500/20 animate-pulse" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4">
                  {/* Circular grid pattern */}
                  <div
                    className="absolute inset-0 rounded-full border-4 border-dashed border-muted/30 animate-spin"
                    style={{ animationDuration: "30s" }}
                  />

                  {/* Broken link visualization */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 flex items-center">
                    <div className="w-1/2 h-4 bg-primary/50 rounded-l-full" />
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-primary/50 ml-4" />
                  </div>

                  {/* Animated dots */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-primary/70"
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
