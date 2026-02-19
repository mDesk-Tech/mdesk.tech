"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import {
  Server,
  ArrowRight,
  Shield,
  Clock,
  Globe,
  Lock,
  Activity,
  Cloud,
  HardDrive,
  Wifi,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "99.9% Uptime",
    desc: "Guaranteed availability",
    color: "#ffb800",
  },
  {
    icon: Lock,
    title: "SSL Included",
    desc: "Free certificates",
    color: "#00d4aa",
  },
  {
    icon: HardDrive,
    title: "Daily Backups",
    desc: "Automatic protection",
    color: "#ff6b35",
  },
  {
    icon: Activity,
    title: "Monitoring",
    desc: "24/7 surveillance",
    color: "#ffb800",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    desc: "Advanced security",
    color: "#00d4aa",
  },
  {
    icon: Cloud,
    title: "Auto Scaling",
    desc: "Elastic resources",
    color: "#ff6b35",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for small websites and blogs",
    features: [
      "5 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificate",
      "Daily Backups",
      "1 Website",
      "Email Accounts",
      "Basic Support",
    ],
    highlight: false,
    color: "#666666",
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    description: "Ideal for growing businesses",
    features: [
      "25 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificate",
      "Daily Backups",
      "10 Websites",
      "Email Accounts",
      "Priority Support",
      "CDN Included",
      "Staging Environment",
    ],
    highlight: true,
    color: "#ffb800",
  },
  {
    name: "Enterprise",
    price: "$79",
    period: "/month",
    description: "For high-traffic applications",
    features: [
      "100 GB SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificate",
      "Hourly Backups",
      "Unlimited Websites",
      "Email Accounts",
      "24/7 Phone Support",
      "Global CDN",
      "Dedicated IP",
      "Custom Security Rules",
    ],
    highlight: false,
    color: "#00d4aa",
  },
];

const serverLocations = [
  { city: "New York", latency: "15ms", status: "online" },
  { city: "London", latency: "22ms", status: "online" },
  { city: "Singapore", latency: "45ms", status: "online" },
  { city: "Tokyo", latency: "38ms", status: "online" },
  { city: "Sydney", latency: "62ms", status: "online" },
];

export default function HostingContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeServer, setActiveServer] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const serverY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      <div className="fixed inset-0 z-0 opacity-5">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="size-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #ffb800 1px, transparent 1px),
              linear-gradient(180deg, #ffb800 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4 rounded-sm border border-amber/30 bg-amber/10 px-4 py-2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="size-2 rounded-full bg-green-500"
            />
            <span className="font-mono text-sm text-amber">
              All Systems Operational
            </span>
            <span className="ml-auto font-mono text-xs text-[#666]">
              Uptime: 99.99%
            </span>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span className="text-amber">SERVER</span>
                <br />
                HOSTING
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-xl text-[#a0a0a0]"
              >
                Enterprise-grade infrastructure with guaranteed uptime,
                security, and 24/7 monitoring for your peace of mind.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-amber px-6 py-3 font-bold text-[#0a0a0a]"
                >
                  <Server className="size-5" />
                  Get Started
                </Link>
                <Link
                  href="#plans"
                  className="inline-flex items-center gap-2 border-2 border-amber px-6 py-3 font-bold text-amber"
                >
                  View Plans
                </Link>
              </motion.div>
            </div>

            <motion.div
              style={{ y: serverY }}
              className="relative hidden lg:block"
            >
              <div className="rounded-lg border border-amber/30 bg-[#141414] p-6">
                {/* Server rack */}
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex h-12 items-center gap-4 rounded-sm bg-[#1a1a1a] px-4"
                    >
                      <span className="font-mono text-xs text-[#666]">
                        SRV-0{i + 1}
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <motion.div
                            key={j}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: j * 0.2 + i * 0.1,
                            }}
                            className="size-2 bg-amber"
                          />
                        ))}
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <Wifi className="size-4 text-green-500" />
                        <span className="font-mono text-xs text-green-500">
                          ONLINE
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="font-mono text-sm text-amber uppercase">
              Global Network
            </span>
            <h3 className="mt-2 text-3xl font-black text-white">
              SERVER LOCATIONS
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serverLocations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveServer(index)}
                className={`cursor-pointer border-2 p-6 transition-colors ${
                  activeServer === index
                    ? "border-amber bg-amber/10"
                    : "border-[#333] bg-[#141414]"
                }`}
              >
                <Globe className="mb-3 size-6 text-amber" />
                <div className="font-bold text-white">{location.city}</div>
                <div className="mt-1 font-mono text-sm text-[#666]">
                  {location.latency} latency
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500" />
                  <span className="text-xs text-green-500">
                    {location.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="font-mono text-sm text-amber uppercase">
              Specifications
            </span>
            <h3 className="mt-2 text-3xl font-black text-white">FEATURES</h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-px bg-[#333] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[#141414] p-8 transition-colors duration-300 hover:bg-[#1a1a1a]"
              >
                <feature.icon
                  className="mb-4 size-8 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: feature.color }}
                />
                <h4 className="mb-2 text-lg font-bold text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#666]">{feature.desc}</p>

                <div
                  className="mt-4 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: feature.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="font-mono text-sm text-amber uppercase">
              Pricing
            </span>
            <h3 className="mt-2 text-4xl font-black text-white">
              HOSTING PLANS
            </h3>
            <p className="mt-4 text-[#a0a0a0]">
              Transparent pricing with no hidden fees. Contact us to get
              started.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative border-2 ${
                  plan.highlight
                    ? "border-amber bg-[#1a1a1a]"
                    : "border-[#333] bg-[#141414]"
                }`}
              >
                {/* Badge */}
                {plan.highlight && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="bg-amber px-4 py-1 font-mono text-xs font-bold text-[#0a0a0a]">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6 text-center">
                    <h4 className="text-2xl font-bold text-white">
                      {plan.name}
                    </h4>
                    <p className="mt-2 text-sm text-[#666]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 text-center">
                    <span
                      className="text-5xl font-black"
                      style={{ color: plan.color }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[#666]">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div
                          className="flex size-5 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${plan.color}20` }}
                        >
                          <svg
                            className="size-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={plan.color}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-[#a0a0a0]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`block w-full py-4 text-center font-bold transition-all ${
                      plan.highlight
                        ? "bg-amber text-[#0a0a0a] hover:bg-amber/90"
                        : "border-2 border-[#333] text-white hover:border-amber hover:text-amber"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-[#666]"
          >
            All plans include 24/7 support and a 30-day money-back guarantee.{" "}
            <Link href="/contact" className="text-amber hover:underline">
              Contact us for custom enterprise solutions.
            </Link>
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6"
        >
          <div className="relative overflow-hidden border-2 border-amber bg-[#141414] p-6 sm:p-12">
            <motion.div
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #ffb800 0, #ffb800 1px, transparent 1px, transparent 50px)",
              }}
            />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-black text-white sm:text-4xl">
                READY FOR <span className="text-amber">RELIABLE HOSTING?</span>
              </h3>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border-2 border-amber px-8 py-4 font-bold text-amber transition-all hover:bg-amber hover:text-[#0a0a0a]"
              >
                Deploy Now
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
