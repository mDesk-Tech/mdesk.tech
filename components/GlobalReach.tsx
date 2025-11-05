"use client";

import WorldMap from "@/components/ui/world-map";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import InView from "@/components/InView";

/**
 * Render the "Global Reach" section with a headline, descriptive copy, and a world map visualizing global routes.
 *
 * @returns A JSX element containing a badge, responsive headline with hover effect, descriptive text, and a WorldMap configured with predefined route coordinates.
 */
export default function GlobalReach() {
  return (
    <div className="pt-16 sm:pt-20 md:pt-32 bg-background w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 relative z-10">
        <InView className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-semibold text-primary">
            Global Reach
          </span>
        </InView>

        <InView className="h-32 sm:h-40 md:h-48 flex items-center justify-center">
          <div className="block sm:hidden">
            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
              GLOBAL
            </h2>
          </div>
          <div className="hidden h-52 sm:block">
            <TextHoverEffect text="GLOBAL" />
          </div>
        </InView>

        <InView className="text-base sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
          Serving clients across continents with lightning-fast hosting and
          world-class web solutions
          <br />
          Our global infrastructure ensures your digital presence is always
          accessible, anywhere
        </InView>
      </div>

      <div className="">
        <WorldMap
          dots={[
            {
              start: { lat: 40.7128, lng: -74.006 },
              end: { lat: 51.5074, lng: -0.1278 },
            },
            {
              start: { lat: 51.5074, lng: -0.1278 },
              end: { lat: 35.6762, lng: 139.6503 },
            },
            {
              start: { lat: 35.6762, lng: 139.6503 },
              end: { lat: 1.3521, lng: 103.8198 },
            },
            {
              start: { lat: 1.3521, lng: 103.8198 },
              end: { lat: -33.8688, lng: 151.2093 },
            },
            {
              start: { lat: 40.7128, lng: -74.006 },
              end: { lat: 37.7749, lng: -122.4194 },
            },
            {
              start: { lat: 51.5074, lng: -0.1278 },
              end: { lat: 52.52, lng: 13.405 },
            },
            {
              start: { lat: 19.076, lng: 72.8777 },
              end: { lat: 1.3521, lng: 103.8198 },
            },
          ]}
        />
      </div>
    </div>
  );
}
