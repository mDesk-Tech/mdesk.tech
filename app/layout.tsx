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

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-geist",
  weight: ["400", "500", "700", "900"], // Only load weights we use
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
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: "/apple-touch-icon.jpg",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Preload critical font for LCP */}
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Instant font rendering */
              :root { 
                --font-geist: ${geist.style.fontFamily}, system-ui, sans-serif;
              }
              
              /* LCP element optimization */
              h1, [data-lcp-element="true"] {
                opacity: 1 !important;
                visibility: visible !important;
                font-display: swap;
              }
              
              /* Prevent FOIT (Flash of Invisible Text) */
              body {
                font-family: var(--font-geist);
              }
              
              /* Optimize paint performance */
              .composite-layer {
                will-change: transform;
                transform: translateZ(0);
              }
              
              /* Prevent layout shifts */
              img, video {
                height: auto;
                max-width: 100%;
                display: block;
              }
              
              /* Content visibility for below-fold sections */
              section:not(:first-of-type) {
                content-visibility: auto;
                contain-intrinsic-size: 0 500px;
              }
              
              /* Reduced motion support */
              @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                }
              }
              
              /* Instant gradient animation */
              @keyframes gradient-x {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              
              .animate-gradient-x {
                animation: gradient-x 15s ease infinite;
              }
              
              /* Float animation for scroll indicator */
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(16px); }
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
              <div className="critical-content">{children}</div>
            </main>
            <Footer />
          </div>

          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
            data-priority="low"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            data-priority="low"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                send_page_view: false,
                transport_type: 'beacon',
                anonymize_ip: true,
              });
            `}
          </Script>

          {/* Load analytics only in production, after interaction */}
          {process.env.NODE_ENV === "production" && (
            <>
              <Analytics />
              <SpeedInsights />
              {process.env.NEXT_PUBLIC_GA_ID && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
              )}
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
