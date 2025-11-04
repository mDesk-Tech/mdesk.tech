"use client";

import type React from "react";
import { Code, Zap, Layers, Globe, Lock, Users } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useState, useEffect, useId, useRef, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { SectionHeading } from "@/components/ui/section-heading";
import InView from "@/components/InView";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const features: Feature[] = [
  {
    title: "Completely open source",
    description:
      "Powered by powerful open-source projects, standing on giants' shoulders",
    icon: <Code className="h-8 w-8" />,
    details: [
      "Built with Next.js, React, and TypeScript",
      "Leverages industry-standard open-source libraries",
      "Community-driven development and support",
      "Transparent codebase with regular updates",
    ],
  },
  {
    title: "Dynamic HTML Streaming",
    description:
      "Instantly stream UI from the server, integrated with the App Router and React Suspense.",
    icon: <Zap className="h-8 w-8" />,
    details: [
      "Progressive rendering for faster perceived performance",
      "Seamless integration with React Suspense boundaries",
      "Optimized for Core Web Vitals",
      "Reduced time to first byte (TTFB)",
    ],
  },
  {
    title: "React Server Components",
    description:
      "Add components without sending additional client-side JavaScript. Built on the latest React features.",
    icon: <Layers className="h-8 w-8" />,
    details: [
      "Zero-bundle-size server components",
      "Direct database access from components",
      "Automatic code splitting",
      "Improved SEO with server-side rendering",
    ],
  },
  {
    title: "AI-Powered Code Generation",
    description:
      "Leverage machine learning to automate repetitive coding tasks and suggest optimizations.",
    icon: <Globe className="h-8 w-8" />,
    details: [
      "Intelligent code completion and suggestions",
      "Automated refactoring recommendations",
      "Pattern recognition for best practices",
      "Context-aware documentation generation",
    ],
  },
  {
    title: "Advanced Security Features",
    description:
      "Built-in protection against common web vulnerabilities and automated security updates.",
    icon: <Lock className="h-8 w-8" />,
    details: [
      "CSRF and XSS protection out of the box",
      "Secure headers and content security policies",
      "Regular security audits and patches",
      "Environment variable encryption",
    ],
  },
  {
    title: "Real-time Collaboration",
    description:
      "Enable seamless team collaboration with live editing and version control integration.",
    icon: <Users className="h-8 w-8" />,
    details: [
      "Live cursor tracking and presence indicators",
      "Conflict-free collaborative editing",
      "Git integration for version control",
      "Team activity feeds and notifications",
    ],
  },
];

const FeatureCard = memo(
  ({
    feature,
    onClick,
  }: {
    feature: Feature;
    index: number;
    onClick: () => void;
  }) => {
    const handleClick = useCallback(() => {
      onClick();
    }, [onClick]);

    return (
      <CardContainer containerClassName="py-0">
        <CardBody className="relative group/card w-full h-auto min-h-[280px] sm:h-[320px] rounded-2xl p-6 sm:p-8 border border-border bg-card flex flex-col cursor-pointer hover:border-primary/50 transition-colors touch-manipulation">
          <CardItem translateZ="50" className="mb-4">
            <div className="inline-flex p-3 sm:p-4 rounded-xl bg-primary/10 text-primary">
              {feature.icon}
            </div>
          </CardItem>

          <CardItem
            translateZ="60"
            className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground"
          >
            {feature.title}
          </CardItem>

          <CardItem
            translateZ="40"
            className="text-muted-foreground leading-relaxed text-sm flex-1"
          >
            {feature.description}
          </CardItem>

          <CardItem
            translateZ="30"
            className="text-primary text-sm font-medium mt-4"
          >
            <button
              onClick={handleClick}
              className="hover:underline touch-manipulation py-2"
            >
              Click to learn more →
            </button>
          </CardItem>
        </CardBody>
      </CardContainer>
    );
  },
);

FeatureCard.displayName = "FeatureCard";

const Features = memo(() => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const portalTarget = typeof window !== "undefined" ? document.body : null;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && selectedFeature) {
        setSelectedFeature(null);
      }
    }

    if (selectedFeature) {
      requestAnimationFrame(() => {
        document.body.style.overflow = "hidden";
      });
    } else {
      requestAnimationFrame(() => {
        document.body.style.overflow = "auto";
      });
    }

    window.addEventListener("keydown", onKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedFeature]);

  const closeModal = useCallback(() => {
    setSelectedFeature(null);
  }, []);

  useOutsideClick(ref, closeModal);

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          badge="Why Choose Us"
          title={
            <span className="bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              Powerful Features
            </span>
          }
          description={
            <>
              Our platform combines cutting-edge technologies with
              <br />
              intuitive design to deliver exceptional digital experiences
            </>
          }
          className="mb-12 sm:mb-20"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <InView key={index} delay={index * 0.1}>
              <FeatureCard
                feature={feature}
                index={index}
                onClick={() => setSelectedFeature(feature)}
              />
            </InView>
          ))}
        </div>
      </div>

      {portalTarget &&
        createPortal(
          selectedFeature ? (
            <>
              <div
                key="overlay"
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 opacity-0 animate-[fadeIn_150ms_ease-out_forwards]"
                onClick={closeModal}
              />
              <div className="fixed inset-0 flex items-center justify-center z-110 p-4 pointer-events-none">
                <div
                  key={`modal-${selectedFeature.title}-${id}`}
                  ref={ref}
                  role="dialog"
                  aria-modal="true"
                  className="w-full max-w-2xl h-auto max-h-[85vh] flex flex-col bg-card rounded-3xl overflow-hidden border border-primary/20 shadow-2xl pointer-events-auto opacity-0 animate-[modalIn_220ms_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
                >
                  <div className="p-6 sm:p-8 overflow-y-auto">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 sm:p-4 rounded-xl bg-primary/10 text-primary shrink-0">
                        {selectedFeature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl sm:text-2xl text-foreground mb-2">
                          {selectedFeature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {selectedFeature.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-base sm:text-lg font-semibold mb-4">
                        Key Benefits:
                      </h4>
                      {selectedFeature.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 animate-fade-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                          <p className="text-sm">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null,
          portalTarget,
        )}
    </section>
  );
});

Features.displayName = "Features";

export default Features;
