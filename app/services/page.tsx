import type React from "react";
import type { Metadata } from "next";
import {
  Palette,
  Code2,
  Server,
  TrendingUp,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services | mdesk.tech",
  description:
    "Explore our web design, development, hosting, and SEO services.",
  path: "/services",
});

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const servicesData: Service[] = [
  {
    title: "Web Design",
    description:
      "Transform your vision into stunning, user-centric designs that captivate and convert",
    icon: <Palette className="size-6" />,
    features: [
      "Custom UI/UX Design",
      "Responsive Layouts",
      "Brand Identity Development",
      "Interactive Prototypes",
      "Design System Creation",
    ],
    color: "cyan",
  },
  {
    title: "Web Development",
    description:
      "Build powerful, scalable applications with modern technologies and best practices",
    icon: <Code2 className="size-6" />,
    features: [
      "React & Next.js Development",
      "API Integration & Development",
      "Database Architecture",
      "Performance Optimization",
      "Progressive Web Apps",
    ],
    color: "teal",
  },
  {
    title: "Hosting Solutions",
    description:
      "Enterprise-grade hosting infrastructure with guaranteed uptime and security",
    icon: <Server className="size-6" />,
    features: [
      "99.9% Uptime Guarantee",
      "SSL Certificates Included",
      "Automated Daily Backups",
      "24/7 System Monitoring",
      "DDoS Protection",
    ],
    color: "cyan",
  },
  {
    title: "SEO Optimization",
    description:
      "Dominate search rankings with data-driven strategies and proven techniques",
    icon: <TrendingUp className="size-6" />,
    features: [
      "Comprehensive Keyword Research",
      "Technical SEO Audits",
      "On-Page Optimization",
      "Performance Tracking",
      "Content Strategy",
    ],
    color: "teal",
  },
];

/**
 * Renders the Services page containing a hero, services grid, process overview, deferred global reach map, and a call-to-action.
 *
 * The content is static and structured into:
 * - Hero section with headline and subtitle
 * - Responsive services grid generated from in-file data
 * - Three-step process overview
 * - Deferred heavy content mount for the global reach/map component
 * - CTA section linking to the contact page
 *
 * @returns The React element for the Services page.
 */
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-background to-teal-500/5" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block">
              <div className="rounded-full border border-cyan-500/20 bg-linear-to-r from-cyan-500/10 to-teal-500/10 px-4 py-2">
                <span className="bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text text-sm font-semibold text-transparent">
                  Our Services
                </span>
              </div>
            </div>

            {/* LCP element - marked for priority rendering */}
            <h1
              className="mb-6 text-5xl/tight font-black md:text-7xl"
              data-lcp-element="true"
            >
              Elevate Your
              <span className="block bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>

            <p className="text-xl/relaxed text-muted-foreground">
              Web solutions designed to help your business thrive in the modern
              digital landscape
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <h2 className="sr-only">Services</h2>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
            {servicesData.map((service, index) => (
              <div key={index} className="group relative">
                <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 to-teal-500/0 transition-all duration-500 group-hover:from-cyan-500/5 group-hover:to-teal-500/5" />

                  {/* Animated border effect */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute top-0 left-0 h-0.5 w-full animate-shimmer bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`inline-flex rounded-2xl bg-linear-to-br p-4 ${
                          service.color === "cyan"
                            ? "border border-cyan-500/20 from-cyan-500/10 to-cyan-600/10"
                            : "border border-teal-500/20 from-teal-500/10 to-teal-600/10"
                        } transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                          service.color === "cyan"
                            ? "group-hover:shadow-cyan-500/20"
                            : "group-hover:shadow-teal-500/20"
                        }`}
                      >
                        <div
                          className={`${service.color === "cyan" ? "text-cyan-500" : "text-teal-500"}`}
                        >
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-3xl font-bold transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="group/item flex items-start gap-3"
                        >
                          <div
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                              service.color === "cyan"
                                ? "border border-cyan-500/20 bg-cyan-500/10"
                                : "border border-teal-500/20 bg-teal-500/10"
                            } transition-all duration-300 group-hover/item:scale-110`}
                          >
                            <Check
                              className={`size-3 ${service.color === "cyan" ? "text-cyan-500" : "text-teal-500"}`}
                            />
                          </div>
                          <span className="text-sm text-foreground/80 transition-colors group-hover/item:text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-linear-to-b from-background via-cyan-500/5 to-background" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Our Process</h2>
            <p className="text-xl text-muted-foreground">
              A streamlined approach to delivering exceptional results
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We dive deep into your goals, audience, and vision",
              },
              {
                step: "02",
                title: "Design & Build",
                desc: "Crafting beautiful, functional solutions tailored to you",
              },
              {
                step: "03",
                title: "Launch & Grow",
                desc: "Deploy with confidence and scale with ongoing support",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="mb-4">
                  <span className="bg-linear-to-br from-cyan-500 to-teal-500 bg-clip-text text-6xl font-black text-transparent opacity-50">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl/relaxed text-muted-foreground">
              Let&apos;s collaborate to bring your vision to life
              <br />
              with cutting-edge design and development
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-teal-500 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              Get in Touch
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
