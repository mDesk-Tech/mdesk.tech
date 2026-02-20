"use client";

import type React from "react";
import { Code, Zap, Layers, Globe, Lock, Users } from "lucide-react";
import { useState, memo, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

const features: Feature[] = [
  {
    title: "Open Source Powered",
    description:
      "Built on industry-standard open-source technologies, standing on giants' shoulders",
    icon: <Code className="size-6" />,
    details: [
      "Built with Next.js, React, and TypeScript",
      "Leverages industry-standard open-source libraries",
      "Community-driven development and support",
      "Transparent codebase with regular updates",
    ],
    color: "#ff6b35",
  },
  {
    title: "Dynamic Streaming",
    description:
      "Instantly stream UI from the server with React Suspense for optimal performance",
    icon: <Zap className="size-6" />,
    details: [
      "Progressive rendering for faster perceived performance",
      "Seamless integration with React Suspense boundaries",
      "Optimized for Core Web Vitals",
      "Reduced time to first byte (TTFB)",
    ],
    color: "#00d4aa",
  },
  {
    title: "Server Components",
    description:
      "Add components without sending additional client-side JavaScript",
    icon: <Layers className="size-6" />,
    details: [
      "Zero-bundle-size server components",
      "Direct database access from components",
      "Automatic code splitting",
      "Improved SEO with server-side rendering",
    ],
    color: "#ffb800",
  },
  {
    title: "AI Integration",
    description:
      "Leverage machine learning to automate tasks and suggest optimizations",
    icon: <Globe className="size-6" />,
    details: [
      "Intelligent code completion and suggestions",
      "Automated refactoring recommendations",
      "Pattern recognition for best practices",
      "Context-aware documentation generation",
    ],
    color: "#ff6b35",
  },
  {
    title: "Advanced Security",
    description: "Built-in protection against common web vulnerabilities",
    icon: <Lock className="size-6" />,
    details: [
      "CSRF and XSS protection out of the box",
      "Secure headers and content security policies",
      "Regular security audits and patches",
      "Environment variable encryption",
    ],
    color: "#00d4aa",
  },
  {
    title: "Team Collaboration",
    description:
      "Enable seamless collaboration with live editing and version control",
    icon: <Users className="size-6" />,
    details: [
      "Live cursor tracking and presence indicators",
      "Conflict-free collaborative editing",
      "Git integration for version control",
      "Team activity feeds and notifications",
    ],
    color: "#ffb800",
  },
];

const SpotlightCard = memo(
  ({
    feature,
    index,
    onClick,
  }: {
    feature: Feature;
    index: number;
    onClick: () => void;
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !spotlightRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${feature.color}15, transparent 40%)`;
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        className="group relative h-full cursor-pointer overflow-hidden border-2 border-[#333] bg-[#141414] p-6 transition-all duration-500 hover:border-coral sm:p-8"
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
      >
        {/* Mouse spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Border glow */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 20px ${feature.color}20, 0 0 30px ${feature.color}10`,
          }}
        />

        {/* Corner lines */}
        <div className="absolute top-0 left-0 h-px w-0 bg-linear-to-r from-coral to-transparent transition-all duration-500 group-hover:w-full" />
        <div
          className="absolute top-0 right-0 h-0 w-px bg-linear-to-b from-coral to-transparent transition-all duration-500 group-hover:h-full"
          style={{ transitionDelay: "0.1s" }}
        />
        <div
          className="absolute right-0 bottom-0 h-px w-0 bg-linear-to-l from-teal to-transparent transition-all duration-500 group-hover:w-full"
          style={{ transitionDelay: "0.2s" }}
        />
        <div
          className="absolute bottom-0 left-0 h-0 w-px bg-linear-to-t from-teal to-transparent transition-all duration-500 group-hover:h-full"
          style={{ transitionDelay: "0.3s" }}
        />

        <div className="relative">
          {/* Icon */}
          <motion.div
            className="mb-4 inline-flex border-2 p-3 transition-all duration-300 group-hover:scale-110 group-hover:border-coral"
            style={{ borderColor: feature.color, color: feature.color }}
            whileHover={{
              rotate: [0, -5, 5, -5, 5, 0],
              transition: { duration: 0.5 },
            }}
          >
            {feature.icon}
          </motion.div>

          {/* Number */}
          <div className="group-hover:text-shadow-neon absolute top-0 right-0 font-mono text-sm text-[#333] transition-all duration-300 group-hover:text-coral">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Content */}
          <h3 className="mb-3 text-lg font-bold text-white transition-colors duration-300 group-hover:text-coral sm:text-xl">
            {feature.title}
          </h3>

          <p className="mb-6 text-sm/relaxed text-[#a0a0a0]">
            {feature.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-coral uppercase">
            <span className="relative">
              Learn More
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-coral transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute -right-1 -bottom-1 size-4 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"
          style={{ backgroundColor: feature.color }}
        />

        {/* Pulse ring */}
        <div className="group-hover:animate-pulse-ring pointer-events-none absolute inset-0 opacity-0">
          <div
            className="absolute inset-0 border-2"
            style={{ borderColor: feature.color }}
          />
        </div>
      </motion.div>
    );
  },
);

SpotlightCard.displayName = "SpotlightCard";

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Features = memo(() => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleFeatureClick = useCallback((feature: Feature) => {
    setSelectedFeature(feature);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div
        className="scanlines absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      {/* Orbs */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 size-64 animate-pulse rounded-full bg-coral/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 size-64 animate-pulse rounded-full bg-teal/5 blur-3xl"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mb-12 text-center sm:mb-20"
        >
          <motion.div
            variants={headerVariants}
            className="mb-4 inline-flex items-center gap-2"
          >
            {/* Square */}
            <div className="size-2 animate-[spin_4s_linear_infinite] bg-teal shadow-[0_0_10px_rgba(0,212,170,0.8)]" />
            <span className="font-mono text-xs tracking-wider text-teal uppercase">
              Why Choose Us
            </span>
          </motion.div>
          <motion.h2
            variants={headerVariants}
            className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Powerful{" "}
            <span className="bg-linear-to-r from-teal to-coral bg-clip-text text-transparent">
              Features
            </span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="mx-auto max-w-2xl text-base text-[#a0a0a0]"
          >
            Our platform combines cutting-edge technologies with intuitive
            design to deliver exceptional digital experiences
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {features.map((feature, index) => (
            <SpotlightCard
              key={feature.title}
              feature={feature}
              index={index}
              onClick={() => handleFeatureClick(feature)}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={selectedFeature !== null}
        onOpenChange={() => setSelectedFeature(null)}
      >
        {selectedFeature && (
          <DialogContent className="max-w-2xl border-2 border-coral bg-[#141414] p-0 shadow-[0_0_30px_rgba(255,107,53,0.3)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <DialogHeader className="flex flex-row items-center justify-between border-b-2 border-[#333] p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="inline-flex border-2 p-3 shadow-[0_0_15px_rgba(255,107,53,0.3)]"
                    style={{
                      borderColor: selectedFeature.color,
                      color: selectedFeature.color,
                    }}
                  >
                    {selectedFeature.icon}
                  </motion.div>
                  <DialogTitle className="text-lg font-bold text-white sm:text-xl">
                    {selectedFeature.title}
                  </DialogTitle>
                </div>
              </DialogHeader>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <DialogDescription className="mb-6 text-sm/relaxed text-[#a0a0a0] sm:text-base">
                  {selectedFeature.description}
                </DialogDescription>

                <h4 className="mb-4 font-mono text-xs tracking-wider text-coral uppercase">
                  Key Benefits
                </h4>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                  className="space-y-3"
                >
                  {selectedFeature.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="group flex items-start gap-3 border border-[#333] bg-[#0a0a0a] p-3 transition-all duration-300 hover:border-coral/50 hover:shadow-[0_0_15px_rgba(255,107,53,0.1)]"
                    >
                      <div
                        className="mt-1.5 size-2 shrink-0 shadow-[0_0_5px_rgba(255,107,53,0.5)]"
                        style={{ backgroundColor: selectedFeature.color }}
                      />
                      <p className="text-sm text-white">{detail}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
});

Features.displayName = "Features";

export default Features;
