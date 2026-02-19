"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import {
  Code2,
  ArrowRight,
  Terminal,
  GitBranch,
  Cpu,
  Database,
  Server,
  Zap,
  Layers,
  Box,
  Workflow,
  Globe,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Modern Stack",
    desc: "React, Next.js, TypeScript",
    color: "#00d4aa",
  },
  {
    icon: Database,
    title: "Databases",
    desc: "PostgreSQL, Mongo, Redis",
    color: "#ffb800",
  },
  {
    icon: Server,
    title: "API Design",
    desc: "REST, GraphQL, tRPC",
    color: "#ff6b35",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Optimized & scalable",
    color: "#00d4aa",
  },
  {
    icon: Cpu,
    title: "Architecture",
    desc: "Microservices & serverless",
    color: "#ffb800",
  },
  {
    icon: GitBranch,
    title: "DevOps",
    desc: "CI/CD & automation",
    color: "#ff6b35",
  },
];

const stats = [
  { label: "Code Quality", value: 99, suffix: "%" },
  { label: "Test Coverage", value: 95, suffix: "%" },
  { label: "Uptime", value: 99.9, suffix: "%" },
  { label: "Satisfaction", value: 100, suffix: "%" },
];

const codeLines = [
  {
    text: "import { Future } from '@mdesk/tech';",
    color: "#ff6b35",
    indent: 0,
  },
  {
    text: "import { Excellence } from './standards';",
    color: "#00d4aa",
    indent: 0,
  },
  { text: "", color: "", indent: 0 },
  { text: "export const build = async () => {", color: "#ffb800", indent: 0 },
  {
    text: "const stack = ['Next.js', 'React', 'Node'];",
    color: "#a0a0a0",
    indent: 1,
  },
  { text: "const result = await Future.create({", color: "#00d4aa", indent: 1 },
  { text: "quality: 'exceptional',", color: "#ff6b35", indent: 2 },
  { text: "speed: 'lightning',", color: "#ffb800", indent: 2 },
  { text: "scale: 'infinite',", color: "#00d4aa", indent: 2 },
  { text: "});", color: "#a0a0a0", indent: 1 },
  { text: "return result;", color: "#ff6b35", indent: 1 },
  { text: "};", color: "#ffb800", indent: 0 },
];

export default function WebDevelopmentPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLine, setActiveLine] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % codeLines.length);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Grid background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00d4aa 1px, transparent 1px),
              linear-gradient(to bottom, #00d4aa 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Geometric shapes */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-teal/10"
            style={{
              width: 100 + i * 50,
              height: 100 + i * 50,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero section */}
      <motion.section
        style={{ y: heroY, opacity }}
        className="relative flex min-h-screen items-center py-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 inline-flex items-center gap-3 border border-teal/30 bg-teal/5 px-4 py-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="size-2 bg-teal"
                />
                <span className="font-mono text-sm text-teal">
                  BUILDING THE FUTURE
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  WEB
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  <span className="text-teal">DEV</span>
                </motion.h1>
              </div>

              {/* Underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 h-1 bg-linear-to-r from-teal to-transparent"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 max-w-md text-xl text-[#a0a0a0]"
              >
                Engineering excellence through clean code, modern architecture,
                and relentless attention to detail.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-teal px-8 py-4 font-bold text-[#0a0a0a]"
                  onMouseEnter={() => setIsBuilding(true)}
                  onMouseLeave={() => setIsBuilding(false)}
                >
                  <motion.span
                    animate={isBuilding ? { rotate: 360 } : {}}
                    transition={{ duration: 1 }}
                  >
                    <Box className="size-5" />
                  </motion.span>
                  Start Building
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border-2 border-[#333] px-8 py-4 font-bold text-white transition-all hover:border-teal hover:text-teal"
                >
                  <Layers className="size-5" />
                  View Stack
                </Link>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-12 flex flex-wrap gap-4 sm:gap-8"
              >
                {[
                  { icon: Globe, label: "Global Deploy" },
                  { icon: Shield, label: "Secure by Design" },
                  { icon: Workflow, label: "CI/CD Ready" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#666]">
                    <item.icon className="size-4 text-teal" />
                    <span className="font-mono text-xs">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative"
              >
                {/* Code window */}
                <div className="overflow-hidden border border-[#333] bg-[#0f0f0f]">
                  {/* Header */}
                  <div className="flex items-center gap-2 border-b border-[#333] bg-[#1a1a1a] px-4 py-3">
                    <div className="flex gap-2">
                      <div className="size-3 rounded-full bg-red-500/50" />
                      <div className="size-3 rounded-full bg-yellow-500/50" />
                      <div className="size-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="ml-4 font-mono text-xs text-[#666]">
                      project/index.ts
                    </span>
                    <span className="ml-auto font-mono text-xs text-teal">
                      ● Modified
                    </span>
                  </div>

                  {/* Code content */}
                  <div className="p-6 font-mono text-sm/relaxed">
                    {codeLines.map((line, i) => (
                      <motion.div
                        key={i}
                        className="flex"
                        initial={{ opacity: 0.3 }}
                        animate={{
                          opacity: activeLine === i ? 1 : 0.4,
                          x: activeLine === i ? 4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="w-8 text-[#444] select-none">
                          {i + 1}
                        </span>
                        <span
                          style={{
                            color: line.color,
                            paddingLeft: `${line.indent * 20}px`,
                          }}
                        >
                          {line.text || "\u00A0"}
                        </span>
                        {activeLine === i && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="ml-1 inline-block h-4 w-2 bg-teal"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Component preview */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-20 -right-8 border border-[#333] bg-[#141414] p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-sm bg-teal/20">
                      <Terminal className="size-4 text-teal" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Build</div>
                      <div className="text-[10px] text-[#666]">Success</div>
                    </div>
                  </div>
                </motion.div>

                {/* Connection lines */}
                <svg
                  className="pointer-events-none absolute inset-0 size-full"
                  style={{ zIndex: -1 }}
                >
                  <motion.path
                    d="M 0 100 Q 150 50 300 150"
                    stroke="#00d4aa"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    opacity={0.3}
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-[#666]">SCROLL</span>
            <div className="h-8 w-px bg-linear-to-b from-teal to-transparent" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features grid */}
      <section className="relative border-t border-[#222] py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <span className="font-mono text-sm text-teal">TECH ARSENAL</span>
              <h3 className="mt-2 text-4xl font-black text-white md:text-5xl">
                MODERN STACK
              </h3>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-3xl font-black text-teal">6+</div>
              <div className="font-mono text-xs text-[#666]">CORE SERVICES</div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-px bg-[#222] md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0a0a0a] p-8 transition-colors duration-300 hover:bg-[#111]"
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 size-16 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${feature.color}20 50%)`,
                  }}
                />

                <div className="mb-6 flex items-start justify-between">
                  <feature.icon
                    className="size-8 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: feature.color }}
                  />
                  <span className="font-mono text-xs text-[#444]">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="mb-2 text-xl font-bold text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#666] transition-colors group-hover:text-[#999]">
                  {feature.desc}
                </p>

                {/* Hover line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: feature.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-[#222] bg-[#0f0f0f] py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="font-mono text-4xl font-black text-teal md:text-5xl">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="mt-2 font-mono text-xs tracking-wider text-[#666]">
                  {stat.label.toUpperCase()}
                </div>
                <div className="mx-auto mt-3 h-px w-8 bg-[#333] transition-colors group-hover:bg-teal/50" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-6 inline-block border border-teal/30 px-4 py-1 font-mono text-sm text-teal">
              READY TO START?
            </span>
            <h3 className="mb-6 text-4xl font-black text-white md:text-6xl">
              LET&apos;S BUILD
              <span className="block text-teal">SOMETHING GREAT</span>
            </h3>
            <p className="mx-auto mb-10 max-w-lg text-[#666]">
              From concept to deployment, we handle every aspect of your web
              development needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-teal px-8 py-4 font-bold text-[#0a0a0a] transition-colors hover:bg-teal/90"
              >
                Start Your Project
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/open-source"
                className="inline-flex items-center gap-2 border border-[#333] px-8 py-4 font-bold text-white transition-colors hover:border-teal hover:text-teal"
              >
                <GitBranch className="size-5" />
                Open Source
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
