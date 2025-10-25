"use client";

import type React from "react";
import { motion } from "framer-motion";
import GlobalReach from "@/components/GlobalReach";
import {
  Palette,
  Code2,
  Server,
  TrendingUp,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";

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
    icon: <Palette className="h-6 w-6" />,
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
    icon: <Code2 className="h-6 w-6" />,
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
    icon: <Server className="h-6 w-6" />,
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
    icon: <TrendingUp className="h-6 w-6" />,
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

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-background to-teal-500/5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20">
                <span className="text-sm font-semibold bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  Our Services
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Elevate Your
              <span className="block bg-linear-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive web solutions designed to help your business thrive
              in the modern digital landscape
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-3xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 to-teal-500/0 group-hover:from-cyan-500/5 group-hover:to-teal-500/5 transition-all duration-500" />

                  {/* Animated border effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-cyan-500 to-transparent animate-shimmer" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${
                          service.color === "cyan"
                            ? "from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20"
                            : "from-teal-500/10 to-teal-600/10 border border-teal-500/20"
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
                    <h3 className="text-3xl font-bold mb-3 group-hover:bg-linear-to-r group-hover:from-cyan-500 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + idx * 0.05,
                          }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 group/item"
                        >
                          <div
                            className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              service.color === "cyan"
                                ? "bg-cyan-500/10 border border-cyan-500/20"
                                : "bg-teal-500/10 border border-teal-500/20"
                            } transition-all duration-300 group-hover/item:scale-110`}
                          >
                            <Check
                              className={`h-3 w-3 ${service.color === "cyan" ? "text-cyan-500" : "text-teal-500"}`}
                            />
                          </div>
                          <span className="text-sm text-foreground/80 group-hover/item:text-foreground transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-background via-cyan-500/5 to-background" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground">
              A streamlined approach to delivering exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="mb-4">
                  <span className="text-6xl font-black bg-linear-to-br from-cyan-500 to-teal-500 bg-clip-text text-transparent opacity-50">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GlobalReach />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s collaborate to bring your vision to life with
              cutting-edge design and development
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 to-teal-500 text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
