"use cache";

import type React from "react";
import "./globals.css";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

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

export const metadata = {
  title: "mdesk.tech - Designing and hosting your digital future",
  description:
    "mdesk.tech specializes in cutting-edge web design and reliable hosting solutions.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mdesk.tech",
  ),
  icons: {
    icon: [{ url: "/icon", type: "image/x-icon" }],
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://mdesk.tech",
    title: "mdesk.tech - Designing and hosting your digital future",
    description:
      "Cutting-edge web design and reliable hosting solutions for businesses that want to stand out in the digital landscape.",
    images: [
      {
        url: "/opengraph-image.jpg",
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
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://mdesk.tech",
  },
  verification: {
    google: "google-site-verification-code",
  },
  manifest: "/manifest.json",
};

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
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Inline critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root { 
                --font-geist: '__Geist_Fallback_${geist.variable}'; 
                color-scheme: dark;
              }
              
              /* LCP optimization - ensure hero content renders immediately */
              h1, [data-lcp-element="true"] {
                opacity: 1 !important;
                visibility: visible !important;
              }
              
              /* Prevent layout shifts */
              img, video {
                height: auto;
                max-width: 100%;
                display: block;
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
              <div className="critical-content" data-priority="high">
                {children}
              </div>
            </main>
            <Footer year={currentYear} />
          </div>

          {/* Performance optimizers are loaded in page.tsx */}

          {/* Defer non-critical scripts */}
          {gaId ? (
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
          ) : null}

          {/* Load analytics only in production */}
          {process.env.NODE_ENV === "production" && (
            <>
              <Analytics />
              <SpeedInsights />
              {gaId && <GoogleAnalytics gaId={gaId} />}
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
