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
    icon: <Code className="size-8" />,
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
    icon: <Zap className="size-8" />,
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
    icon: <Layers className="size-8" />,
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
    icon: <Globe className="size-8" />,
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
    icon: <Lock className="size-8" />,
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
    icon: <Users className="size-8" />,
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
        <CardBody className="group/card relative flex h-auto min-h-[280px] w-full cursor-pointer touch-manipulation flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:h-[320px] sm:p-8">
          <CardItem translateZ="50" className="mb-4">
            <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary sm:p-4">
              {feature.icon}
            </div>
          </CardItem>

          <CardItem
            translateZ="60"
            className="mb-2 text-lg font-bold text-foreground sm:mb-3 sm:text-xl"
          >
            {feature.title}
          </CardItem>

          <CardItem
            translateZ="40"
            className="flex-1 text-sm/relaxed text-muted-foreground"
          >
            {feature.description}
          </CardItem>

          <CardItem
            translateZ="30"
            className="mt-4 text-sm font-medium text-primary"
          >
            <button
              onClick={handleClick}
              className="touch-manipulation py-2 hover:underline"
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
    <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-32">
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Why Choose Us"
          title={
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
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
                className="fixed inset-0 z-100 animate-[fade-in_150ms_ease-out_forwards] bg-black/80 opacity-0 backdrop-blur-sm"
                onClick={closeModal}
              />
              <div className="pointer-events-none fixed inset-0 z-110 flex items-center justify-center p-4">
                <div
                  key={`modal-${selectedFeature.title}-${id}`}
                  ref={ref}
                  role="dialog"
                  aria-modal="true"
                  className="pointer-events-auto flex h-auto max-h-[85vh] w-full max-w-2xl animate-[modal-in_220ms_cubic-bezier(0.2,0.8,0.2,1)_forwards] flex-col overflow-hidden rounded-3xl border border-primary/20 bg-card opacity-0 shadow-2xl"
                >
                  <div className="overflow-y-auto p-6 sm:p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary sm:p-4">
                        {selectedFeature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">
                          {selectedFeature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground sm:text-base">
                          {selectedFeature.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="mb-4 text-base font-semibold sm:text-lg">
                        Key Benefits:
                      </h4>
                      {selectedFeature.details.map((detail, index) => (
                        <div
                          key={index}
                          className="animate-fade-up flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
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
