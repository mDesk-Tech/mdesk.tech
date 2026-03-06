import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import PageTransition from "@/components/PageTransition";
import { getSiteUrl } from "@/lib/seo";

import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
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
  title: "mdesk.tech - Web Design That Actually Works",
  description:
    "Small team building solid websites. No fluff, no surprises—just sites that load fast and do what you need.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/icon", type: "image/x-icon" }],
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "mdesk.tech - Web Design That Actually Works",
    description:
      "Small team building solid websites. No fluff, no surprises—just sites that load fast and do what you need.",
    images: [
      {
        // Use the dynamic OG image route with absolute URL to silence warnings
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "mdesk.tech - Web Design That Actually Works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mdesk.tech - Web Design That Actually Works",
    description:
      "Small team building solid websites. No fluff, no surprises—just sites that load fast and do what you need.",
    // Use the dynamic Twitter image route with absolute URL to silence warnings
    images: [`${SITE_URL}/twitter-image`],
  },
  ...(googleSiteVerification && {
    verification: {
      google: googleSiteVerification,
    },
  }),
  manifest: "/manifest.json",
};

/**
 * Root layout - handles theming, nav, footer, and analytics
 *
 * @param children - Page content
 */
export default function RootLayout({
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
        {/* Preconnect to speed up external resources */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Critical CSS - loaded inline for speed */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { 
                --font-geist: '__Geist_Fallback_${geist.variable}'; 
                color-scheme: dark;
              }
              
              /* Show critical content immediately */
              h1, [data-lcp-element="true"] {
                opacity: 1 !important;
                visibility: visible !important;
                content-visibility: visible !important;
              }
              
              /* Prevent layout shifts */
              img, video {
                height: auto;
                max-width: 100%;
                display: block;
              }
              
              /* LCP optimization */
              .critical-content {
                contain: layout style;
              }

              /* Reduced motion */
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
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="grow">
              {/* Priority hint for LCP */}
              <PageTransition>
                <div className="critical-content" data-priority="high">
                  {children}
                </div>
              </PageTransition>
            </main>
            <Footer year={currentYear} />
          </div>

          {/* Performance tools loaded in page.tsx */}

          {/* Analytics - production only */}
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
                </>
              )}
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
