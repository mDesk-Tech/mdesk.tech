// Performance observer cleanup registry
const observers = new Set<PerformanceObserver>();

// Cleanup all observers
export function cleanupObservers() {
  observers.forEach((observer) => observer.disconnect());
  observers.clear();
}

// Optimized script loading with deduplication
const optimizedScripts = new WeakSet<HTMLScriptElement>();

export function optimizeScriptLoading() {
  if (typeof window === "undefined") return;

  const scripts = document.querySelectorAll<HTMLScriptElement>(
    'script[src*="gtag"], script[src*="analytics"], script[src*="googletagmanager"]',
  );

  scripts.forEach((script) => {
    if (!optimizedScripts.has(script)) {
      optimizedScripts.add(script);
      script.defer = true;
      script.async = true;
      script.setAttribute("fetchpriority", "low");
    }
  });
}

// Optimized image loading
const processedImages = new WeakSet<HTMLImageElement>();

export function optimizeImages() {
  if (typeof window === "undefined") return;

  const images = document.querySelectorAll<HTMLImageElement>("img");

  images.forEach((img) => {
    if (!processedImages.has(img)) {
      processedImages.add(img);

      // Skip already optimized images
      if (!img.hasAttribute("loading") && !img.hasAttribute("fetchpriority")) {
        img.loading = "lazy";
        img.decoding = "async";
      }
    }
  });
}

// Efficient intersection observer for lazy loading
let lazyLoadObserver: IntersectionObserver | null = null;

export function setupLazyLoading() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window))
    return;

  // Reuse existing observer
  if (!lazyLoadObserver) {
    lazyLoadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;

            if (element instanceof HTMLImageElement && element.dataset.src) {
              element.src = element.dataset.src;
              delete element.dataset.src;
              lazyLoadObserver?.unobserve(element);
            }
          }
        });
      },
      { rootMargin: "50px" }, // Reduced margin for better performance
    );
  }

  document
    .querySelectorAll<HTMLImageElement>("img[data-src]")
    .forEach((img) => {
      lazyLoadObserver?.observe(img);
    });
}

// Monitor Core Web Vitals with proper cleanup
export function monitorWebVitals(
  onLCP?: (value: number) => void,
  onFID?: (value: number) => void,
  onCLS?: (value: number) => void,
) {
  if (typeof window === "undefined" || !("PerformanceObserver" in window))
    return;

  // LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (onLCP) onLCP(lastEntry.startTime);
      lcpObserver.disconnect();
      observers.delete(lcpObserver);
    });

    observers.add(lcpObserver);
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {}

  // FID
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as PerformanceEntry & {
        processingStart?: number;
      };
      if (onFID && firstEntry.processingStart && firstEntry.startTime) {
        onFID(firstEntry.processingStart - firstEntry.startTime);
        fidObserver.disconnect();
        observers.delete(fidObserver);
      }
    });

    observers.add(fidObserver);
    fidObserver.observe({ type: "first-input", buffered: true });
  } catch {}

  // CLS
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as Array<
        PerformanceEntry & { value?: number; hadRecentInput?: boolean }
      >;
      entries.forEach((entry) => {
        if (!entry.hadRecentInput && entry.value) {
          clsValue += entry.value;
        }
      });
      if (onCLS) onCLS(clsValue);
    });

    observers.add(clsObserver);
    clsObserver.observe({ type: "layout-shift", buffered: true });
  } catch {}
}

// Defer non-critical work efficiently
export function deferWork(
  callback: () => void,
  priority: "idle" | "timeout" = "idle",
) {
  if (typeof window === "undefined") return;

  if (priority === "idle" && "requestIdleCallback" in window) {
    window.requestIdleCallback(callback);
  } else {
    setTimeout(callback, priority === "idle" ? 100 : 0);
  }
}

// Optimize analytics with batching
let analyticsQueue: Array<{ event: string; params: Record<string, unknown> }> =
  [];
let analyticsTimer: NodeJS.Timeout | null = null;

export function optimizeAnalytics(
  event: string,
  params: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;

  type GtagFunction = (
    command: string,
    action: string,
    params: Record<string, unknown>,
  ) => void;
  const w = window as Window & { gtag?: GtagFunction };
  if (!w.gtag) return;

  analyticsQueue.push({ event, params });

  // Batch analytics events
  if (!analyticsTimer) {
    analyticsTimer = setTimeout(() => {
      const w = window as Window & { gtag?: GtagFunction };
      if (w.gtag && analyticsQueue.length > 0) {
        analyticsQueue.forEach(({ event, params }) => {
          w.gtag!("event", event, params);
        });
        analyticsQueue = [];
      }
      analyticsTimer = null;
    }, 1000); // Batch every second
  }
}

// Resource hints optimization
const addedHints = new Set<string>();

export function addResourceHint(
  href: string,
  rel: "preconnect" | "prefetch" | "preload",
  attributes?: Record<string, string>,
) {
  if (typeof window === "undefined") return;

  const key = `${rel}:${href}`;
  if (addedHints.has(key)) return;

  addedHints.add(key);

  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
  }

  document.head.appendChild(link);
}

// Main initialization function
export function initializePerformanceOptimizations() {
  if (typeof window === "undefined") return;

  // Critical optimizations first
  optimizeScriptLoading();

  // Setup lazy loading early
  setupLazyLoading();

  // Defer non-critical optimizations
  deferWork(() => {
    optimizeImages();

    // Add critical resource hints
    addResourceHint("https://fonts.googleapis.com", "preconnect");
    addResourceHint("https://fonts.gstatic.com", "preconnect", {
      crossorigin: "anonymous",
    });
  });

  // Monitor web vitals in development
  if (process.env.NODE_ENV === "development") {
    monitorWebVitals(
      (lcp) => console.debug("LCP:", lcp),
      (fid) => console.debug("FID:", fid),
      (cls) => console.debug("CLS:", cls),
    );
  }

  // Cleanup on page unload
  window.addEventListener("pagehide", cleanupObservers);
  window.addEventListener("beforeunload", () => {
    if (lazyLoadObserver) {
      lazyLoadObserver.disconnect();
      lazyLoadObserver = null;
    }
  });
}
