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
  slug: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  accent: "coral" | "teal" | "amber";
}

const servicesData: Service[] = [
  {
    title: "Web Design",
    slug: "web-design",
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
    accent: "coral",
  },
  {
    title: "Web Development",
    slug: "web-development",
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
    accent: "teal",
  },
  {
    title: "Hosting Solutions",
    slug: "hosting",
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
    accent: "amber",
  },
  {
    title: "SEO Optimization",
    slug: "seo",
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
    accent: "coral",
  },
];

const accentColors = {
  coral: {
    border: "border-coral",
    bg: "bg-coral",
    text: "text-coral",
    shadow: "shadow-[4px_4px_0_0_rgba(255,107,53,0.3)]",
    hoverShadow: "hover:shadow-[6px_6px_0_0_rgba(255,107,53,0.4)]",
    bg10: "bg-coral/10",
    bg20: "bg-coral/20",
    hoverBg: "hover:bg-coral",
  },
  teal: {
    border: "border-teal",
    bg: "bg-teal",
    text: "text-teal",
    shadow: "shadow-[4px_4px_0_0_rgba(0,212,170,0.3)]",
    hoverShadow: "hover:shadow-[6px_6px_0_0_rgba(0,212,170,0.4)]",
    bg10: "bg-teal/10",
    bg20: "bg-teal/20",
    hoverBg: "hover:bg-teal",
  },
  amber: {
    border: "border-amber",
    bg: "bg-amber",
    text: "text-amber",
    shadow: "shadow-[4px_4px_0_0_rgba(255,184,0,0.3)]",
    hoverShadow: "hover:shadow-[6px_6px_0_0_rgba(255,184,0,0.4)]",
    bg10: "bg-amber/10",
    bg20: "bg-amber/20",
    hoverBg: "hover:bg-amber",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="scanlines absolute inset-0 opacity-10" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Label */}
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="size-2 bg-coral" />
              <span className="font-mono text-xs tracking-wider text-coral uppercase">
                Our Services
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              data-lcp-element="true"
            >
              Elevate Your <span className="text-coral">Digital Presence</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-[#a0a0a0]">
              Web solutions designed to help your business thrive in the modern
              digital landscape
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="sr-only">Services</h2>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
            {servicesData.map((service, index) => {
              const colors = accentColors[service.accent];
              return (
                <div
                  key={index}
                  className={`group relative border-2 ${colors.border} bg-[#141414] p-6 transition-all duration-300 hover:-translate-y-1 ${colors.hoverShadow} sm:p-8`}
                >
                  {/* Corners */}
                  <div
                    className={`absolute top-0 left-0 size-3 ${colors.bg}`}
                  />
                  <div
                    className={`absolute top-0 right-0 size-3 ${colors.bg}`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 size-3 ${colors.bg}`}
                  />
                  <div
                    className={`absolute right-0 bottom-0 size-3 ${colors.bg}`}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`inline-flex border-2 ${colors.border} ${colors.bg10} p-4 ${colors.text} transition-all duration-300 group-hover:scale-110`}
                      >
                        {service.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-[#a0a0a0]">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="group/item flex items-start gap-3"
                        >
                          <div
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center border ${colors.border} ${colors.bg20}`}
                          >
                            <Check className={`size-3 ${colors.text}`} />
                          </div>
                          <span className="text-sm text-[#a0a0a0] transition-colors group-hover/item:text-white">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/services/${service.slug}`}
                      className={`group/btn mt-6 inline-flex items-center gap-2 border-2 px-4 py-2 text-sm font-bold transition-all ${colors.border} ${colors.text} ${colors.hoverBg} hover:text-[#0a0a0a] ${colors.hoverShadow}`}
                    >
                      Learn More
                      <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-20">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            {/* Section label */}
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="size-2 bg-teal" />
              <span className="font-mono text-xs tracking-wider text-teal uppercase">
                How We Work
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl md:text-5xl">
              Our Process
            </h2>
            <p className="text-lg text-[#a0a0a0]">
              A streamlined approach to delivering exceptional results
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We dive deep into your goals, audience, and vision",
                accent: "coral" as const,
              },
              {
                step: "02",
                title: "Design & Build",
                desc: "Crafting beautiful, functional solutions tailored to you",
                accent: "teal" as const,
              },
              {
                step: "03",
                title: "Launch & Grow",
                desc: "Deploy with confidence and scale with ongoing support",
                accent: "amber" as const,
              },
            ].map((item, idx) => {
              const colors = accentColors[item.accent];
              return (
                <div
                  key={idx}
                  className={`relative border-2 ${colors.border} bg-[#141414] p-6 text-center`}
                >
                  {/* Accent */}
                  <div
                    className={`absolute top-0 right-0 size-4 ${colors.bg}`}
                  />

                  <div className="mb-4">
                    <span
                      className={`font-mono text-5xl font-black ${colors.text} opacity-50`}
                    >
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative mx-auto max-w-4xl overflow-hidden border-4 border-coral bg-[#141414] p-8 sm:p-12">
            {/* Corners */}
            <div className="absolute top-0 left-0 size-6 bg-coral" />
            <div className="absolute top-0 right-0 size-6 bg-teal" />
            <div className="absolute bottom-0 left-0 size-6 bg-teal" />
            <div className="absolute right-0 bottom-0 size-6 bg-coral" />

            {/* Border */}
            <div className="absolute inset-4 border-2 border-coral/30" />

            <div className="relative z-10 text-center">
              <h2 className="mb-6 text-3xl font-black text-white sm:text-4xl md:text-5xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-[#a0a0a0]">
                Let&apos;s collaborate to bring your vision to life with
                cutting-edge design and development
              </p>

              <Link
                href="/contact"
                className="btn-retro inline-flex items-center gap-2 px-8 py-4"
              >
                Get in Touch
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
