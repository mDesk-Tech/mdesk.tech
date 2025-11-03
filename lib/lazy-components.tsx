"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

/**
 * Lazy load motion components to reduce initial bundle size.
 * These will only be loaded when they enter the viewport or after initial render.
 */

export const LazyMotion = dynamic(
  () => import("motion/react").then((mod) => ({ default: mod.motion.div })),
  {
    loading: () => <div />,
    ssr: false,
  },
);

export const LazyAnimatePresence = dynamic(
  () =>
    import("motion/react").then((mod) => ({ default: mod.AnimatePresence })),
  {
    ssr: false,
  },
);

/**
 * Higher-order component to lazy load heavy animation components.
 * Use this for components that are below the fold or not critical for FCP/LCP.
 */
export const withLazyLoad = <P extends object>(
  Component: ComponentType<P>,
  loadingComponent?: React.ReactNode,
) => {
  return dynamic(() => Promise.resolve(Component), {
    loading: () => <>{loadingComponent || null}</>,
    ssr: true,
  });
};
