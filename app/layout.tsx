import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import PageTransition from "@/components/PageTransition";
import { getSiteUrl } from "@/lib/seo";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const SITE_URL = getSiteUrl();

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-geist",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "mdesk.tech - Designing and hosting your digital future",
  description:
    "mdesk.tech specializes in cutting-edge web design and reliable hosting solutions.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/icon", type: "image/x-icon" }],
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "mdesk.tech - Designing and hosting your digital future",
    description:
      "Cutting-edge web design and reliable hosting solutions for businesses that want to stand out in the digital landscape.",
    images: [
      {
        // Use the dynamic OG image route with absolute URL to silence warnings
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "mdesk.tech - Designing and hosting your digital future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mdesk.tech - Designing and hosting your digital future",
    description:
      "Cutting-edge web design and reliable hosting solutions for businesses that want to stand out in the digital landscape.",
    // Use the dynamic Twitter image route with absolute URL to silence warnings
    images: [`${SITE_URL}/twitter-image`],
  },
  verification: {
    google: "google-site-verification-code",
  },
  manifest: "/manifest.json",
};

/**
 * Renders the application's root HTML layout with global styles, theming, navigation, footer, and performance/analytics hooks.
 *
 * Applies inline critical CSS and LCP priority hints, forces a dark theme, wraps page content with a page transition, and conditionally loads production analytics (including Google Analytics when a GA ID is configured).
 *
 * @param children - The page content to render inside the layout
 * @returns The root HTML element (JSX) that wraps head, body, and the provided page content
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <html
      lang="en"
      className={`${geist.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        {/* Resource hints for performance - preconnect for critical third-party domains */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Inline critical CSS for faster FCP and LCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { 
                --font-geist: '__Geist_Fallback_${geist.variable}'; 
                color-scheme: dark;
              }
              
              /* Critical path: ensure above-the-fold content renders immediately */
              h1, [data-lcp-element="true"] {
                opacity: 1 !important;
                visibility: visible !important;
                content-visibility: visible !important;
              }
              
              /* Prevent layout shifts (CLS optimization) */
              img, video {
                height: auto;
                max-width: 100%;
                display: block;
              }
              
              /* Optimize main content visibility for LCP */
              .critical-content {
                contain: layout style;
              }
              
              /* Reduced motion support for accessibility */
              @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                  scroll-behavior: auto !important;
                }
              }
            `,
          }}
        />
      </head>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
              {/* Add priority hint for LCP content */}
              <PageTransition>
                <div className="critical-content" data-priority="high">
                  {children}
                </div>
              </PageTransition>
            </main>
            <Footer year={currentYear} />
          </div>

          {/* Performance optimizers are loaded in page.tsx */}

          {/* Load analytics only in production */}
          {process.env.NODE_ENV === "production" && (
            <>
              <Analytics />
              <SpeedInsights />
              {gaId && (
                <>
                  <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                    strategy="lazyOnload"
                    data-priority="low"
                  />
                  <Script
                    id="google-analytics"
                    strategy="lazyOnload"
                    data-priority="low"
                  >
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${gaId}', {
                        send_page_view: false,
                        transport_type: 'beacon',
                        anonymize_ip: true,
                      });
                    `}
                  </Script>
                  <GoogleAnalytics gaId={gaId} />
                </>
              )}
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
