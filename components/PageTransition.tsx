"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Wraps page content to apply a keyed enter/exit animation when the route changes.
 *
 * When rendering on the client, returns the children wrapped in an AnimatePresence-driven
 * motion container keyed to the current pathname so each route change animates in and out.
 * Before client hydration completes, returns the children unchanged to avoid hydration mismatch.
 *
 * @param children - The page content to be animated during route transitions.
 * @returns The children wrapped with motion animations after mount; the raw children before mount.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          willChange: "opacity, transform",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
