"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  Github,
  Heart,
  Rocket,
  Users,
  ArrowRight,
  GitBranch,
  Star,
  MessageSquare,
  Share2,
  Code2,
  Globe,
  Sparkles,
  Gift,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "50+", label: "Projects", sublabel: "Supported", color: "#ff6b35" },
  { value: "100K+", label: "Users", sublabel: "Reached", color: "#00d4aa" },
  { value: "∞", label: "Impact", sublabel: "Limitless", color: "#ffb800" },
];

const faqs = [
  {
    q: "Who qualifies?",
    a: "Active open source projects with 100+ stars, regular commits, and a clear community benefit.",
  },
  {
    q: "What's included?",
    a: "Complete website design, development, deployment, and 1 year of free hosting.",
  },
  {
    q: "How long does it take?",
    a: "Typical projects take 2-4 weeks from kickoff to launch.",
  },
  {
    q: "Any hidden costs?",
    a: "Absolutely none. This is our way of giving back to the community.",
  },
];

const networkNodes = [
  { x: 10, y: 20, delay: 0 },
  { x: 30, y: 10, delay: 0.2 },
  { x: 50, y: 30, delay: 0.4 },
  { x: 70, y: 15, delay: 0.6 },
  { x: 90, y: 25, delay: 0.8 },
  { x: 20, y: 50, delay: 0.3 },
  { x: 40, y: 60, delay: 0.5 },
  { x: 60, y: 45, delay: 0.7 },
  { x: 80, y: 55, delay: 0.9 },
];

export default function OpenSourcePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-coral"
        style={{ scaleX }}
      />

      {/* Network background */}
      <div className="fixed inset-0 z-0">
        <svg className="size-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff6b35" stopOpacity="1" />
              <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Lines */}
          {networkNodes.map((node, i) =>
            networkNodes.slice(i + 1).map((target, j) => {
              const distance = Math.sqrt(
                Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2),
              );
              if (distance > 40) return null;
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
                  transition={{
                    pathLength: { duration: 2, delay: node.delay },
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      delay: node.delay,
                    },
                  }}
                />
              );
            }),
          )}
          {/* Nodes */}
          {networkNodes.map((node, i) => (
            <motion.circle
              key={i}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="4"
              fill={i % 2 === 0 ? "#ff6b35" : "#00d4aa"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Code particles */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {["{ }", "< />", "[ ]", "( )", "/*", "//", "&&", "||", "==", "=>"].map(
          (char, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-sm text-coral/20"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {char}
            </motion.div>
          ),
        )}
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden py-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #ff6b35 2px, transparent 2px),
                              radial-gradient(circle at 80% 50%, #00d4aa 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              {/* Package */}
              <div className="relative mx-auto max-w-md">
                {/* Shadow */}
                <div className="absolute inset-0 translate-4 rounded-lg bg-coral/20" />

                {/* Box */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative overflow-hidden rounded-lg border-2 border-coral bg-[#141414]"
                >
                  {/* Ribbon */}
                  <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-coral/20" />

                  {/* Ribbon */}
                  <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 bg-coral/20" />

                  {/* Bow */}
                  <div className="absolute top-1/2 left-1/2 z-10 -translate-1/2">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="flex size-16 items-center justify-center rounded-full bg-coral shadow-lg"
                    >
                      <Heart
                        className="size-8 text-white"
                        fill="currentColor"
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8 py-12">
                    <div className="space-y-1 font-mono text-xs opacity-40">
                      <div className="text-coral">├── website/</div>
                      <div className="pl-4 text-[#666]">├── design-system/</div>
                      <div className="pl-4 text-[#666]">├── components/</div>
                      <div className="pl-4 text-[#666]">├── animations/</div>
                      <div className="pl-4 text-teal">└── deployment/</div>
                      <div className="mt-2 text-coral">├── hosting/</div>
                      <div className="text-coral">└── support/</div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="rounded-sm bg-coral px-3 py-1 font-mono text-xs font-bold text-[#0a0a0a]">
                      FREE
                    </span>
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-6 -left-6 rounded-sm border border-teal/50 bg-[#141414] px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Rocket className="size-4 text-teal" />
                    <span className="font-mono text-xs text-teal">
                      $5,000 value
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  className="absolute -right-4 -bottom-4 rounded-sm border border-coral/50 bg-[#141414] px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-coral" />
                    <span className="font-mono text-xs text-coral">
                      Zero cost
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right */}
            <div className="order-1 lg:order-2">
              {/* Delivery badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal/30 bg-teal/5 px-4 py-2"
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Rocket className="size-4 text-teal" />
                </motion.div>
                <span className="font-mono text-sm text-teal">
                  Delivering to open source projects
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 font-mono text-sm tracking-widest text-coral uppercase"
              >
                npm install free-website
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                FREE GIFT
                <br />
                <span className="text-coral">FOR DEV</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-xl text-[#a0a0a0]"
              >
                A complete website package for your open source project. Design,
                development, deployment — all on us.
              </motion.p>

              {/* Includes */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                {["Design", "Development", "Hosting", "Support"].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="rounded-sm border border-[#333] bg-[#1a1a1a] px-3 py-1 font-mono text-sm text-[#999]"
                    >
                      ✓ {item}
                    </span>
                  ),
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-coral px-8 py-4 font-bold text-[#0a0a0a] transition-all hover:bg-coral/80"
                >
                  <Gift className="size-5" />
                  Claim Your Gift
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://github.com/mdesk-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#333] bg-[#141414] px-8 py-4 font-bold text-white transition-all hover:border-coral hover:text-coral"
                >
                  <Github className="size-5" />
                  View on GitHub
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-[#333] py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-lg border border-[#333] bg-[#141414] p-6 text-center"
              >
                {/* Top accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: stat.color }}
                />

                <div
                  className="font-mono text-4xl font-black sm:text-5xl"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-bold text-white">
                  {stat.label}
                </div>
                <div className="text-sm tracking-wider text-[#666] uppercase">
                  {stat.sublabel}
                </div>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${stat.color}10, transparent 60%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-sm tracking-widest text-coral uppercase">
              git checkout --benefits
            </span>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              WHAT YOU <span className="text-coral">GET</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Rocket,
                title: "Boost Your Project",
                desc: "Professional web development completely free for your open source project",
                color: "#ff6b35",
              },
              {
                icon: Users,
                title: "Grow Community",
                desc: "A polished website helps attract more contributors and users",
                color: "#00d4aa",
              },
              {
                icon: Heart,
                title: "Give Back",
                desc: "Supporting the open source community that powers innovation",
                color: "#ffb800",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index === 0 ? -50 : index === 2 ? 50 : 0,
                  y: index === 1 ? 50 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-lg border border-[#333] bg-[#141414] p-8"
              >
                {/* Header */}
                <div className="mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                  <div
                    className="flex size-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${benefit.color}20` }}
                  >
                    <benefit.icon
                      className="size-5"
                      style={{ color: benefit.color }}
                    />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#666]">
                      PR #{index + 1}
                    </div>
                    <div className="font-bold text-white">{benefit.title}</div>
                  </div>
                </div>

                <p className="text-[#a0a0a0]">{benefit.desc}</p>

                {/* Status */}
                <div className="mt-6 flex items-center gap-2">
                  <motion.div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: benefit.color }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span
                    className="font-mono text-xs"
                    style={{ color: benefit.color }}
                  >
                    Ready to merge
                  </span>
                </div>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${benefit.color}10, transparent 60%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-sm tracking-widest text-teal uppercase">
              git diff --stats
            </span>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              COMMUNITY <span className="text-teal">IMPACT</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                icon: Code2,
                value: "1.2M+",
                label: "Lines Added",
                color: "#00d4aa",
              },
              {
                icon: Star,
                value: "500+",
                label: "Stars Earned",
                color: "#ffb800",
              },
              {
                icon: GitBranch,
                value: "50K+",
                label: "Branches",
                color: "#ff6b35",
              },
              {
                icon: Globe,
                value: "30+",
                label: "Countries",
                color: "#00d4aa",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative overflow-hidden rounded-lg border border-[#333] bg-[#141414] p-6"
              >
                {/* Line numbers */}
                <div className="absolute inset-y-0 left-0 flex w-8 flex-col items-center border-r border-[#333] bg-[#0f0f0f] py-6">
                  <span className="font-mono text-xs text-[#333]">
                    {index * 12 + 1}
                  </span>
                  <span className="font-mono text-xs text-[#333]">
                    {index * 12 + 2}
                  </span>
                  <span className="font-mono text-xs text-[#333]">
                    {index * 12 + 3}
                  </span>
                </div>

                <div className="pl-6">
                  <motion.div
                    className="mb-3 inline-flex"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    <stat.icon
                      className="size-8"
                      style={{ color: stat.color }}
                    />
                  </motion.div>
                  <div
                    className="font-mono text-3xl font-black"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#666]">{stat.label}</div>
                </div>

                {/* Plus */}
                <div className="absolute top-2 left-10 font-mono text-xs text-teal">
                  +
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-sm tracking-widest text-amber uppercase">
              issues --open
            </span>
            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              FREQUENTLY <span className="text-amber">ASKED</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => {
              const colors = ["#ff6b35", "#00d4aa", "#ffb800", "#ff6b35"];
              const color = colors[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-lg border border-[#333] bg-[#141414] p-6"
                >
                  {/* Label */}
                  <div className="mb-4 flex items-center gap-2">
                    <span
                      className="rounded-full px-2 py-1 font-mono text-xs"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      #{index + 1}
                    </span>
                    <MessageSquare className="size-4 text-[#666]" />
                    <span className="font-mono text-xs text-[#666]">Open</span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-amber">
                    Q: {faq.q}
                  </h3>
                  <p className="text-[#a0a0a0]">A: {faq.a}</p>

                  {/* Comments */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-[#666]">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="size-3" />
                      {2 + index} comments
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="size-3" />
                      Share
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-3xl overflow-hidden rounded-lg border border-[#333] bg-[#141414]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-[#333] bg-[#1a1a1a] px-4 py-3">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-red-500" />
                <div className="size-3 rounded-full bg-yellow-500" />
                <div className="size-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-4 font-mono text-sm text-[#666]">
                bash — 80x24
              </span>
            </div>

            <div className="p-8 sm:p-12">
              {/* Commands */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-8 font-mono text-sm"
              >
                <div className="flex items-center gap-2 text-[#666]">
                  <span className="text-coral">➜</span>
                  <span className="text-teal">~</span>
                  <span className="text-white">git</span>
                  <span className="text-[#a0a0a0]">clone</span>
                  <span className="text-amber">opportunity</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 text-[#a0a0a0]"
                >
                  Cloning into &apos;opportunity&apos;...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-coral"
                >
                  Ready to build something amazing together?
                </motion.div>
              </motion.div>

              <div className="text-center">
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  READY TO <span className="text-coral">COLLABORATE</span>?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[#a0a0a0]">
                  Submit your open source project and let&apos;s create
                  something impactful together.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 inline-block"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 bg-coral px-8 py-4 font-bold text-[#0a0a0a] transition-all hover:bg-coral/80"
                  >
                    <Sparkles className="size-5" />
                    Initialize Project
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Gear */}
            <motion.div
              style={{ rotate }}
              className="absolute -right-8 -bottom-8 text-coral/10"
            >
              <GitBranch className="size-32" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
