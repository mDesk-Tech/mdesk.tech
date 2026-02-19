"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Layout,
  Figma,
  Layers,
  Eye,
  PenTool,
  MousePointer2,
  Type,
  Palette,
} from "lucide-react";

const colorPalette = ["#ff6b35", "#00d4aa", "#ffb800", "#ff4081", "#7c4dff"];

const features = [
  {
    icon: Layout,
    title: "UI/UX Design",
    desc: "User-centered interfaces",
    color: "#ff6b35",
  },
  {
    icon: Figma,
    title: "Prototyping",
    desc: "Interactive mockups",
    color: "#00d4aa",
  },
  {
    icon: Sparkles,
    title: "Branding",
    desc: "Visual identity systems",
    color: "#ffb800",
  },
  {
    icon: Layers,
    title: "Design Systems",
    desc: "Scalable components",
    color: "#ff4081",
  },
  {
    icon: Eye,
    title: "Visual Design",
    desc: "Stunning graphics",
    color: "#7c4dff",
  },
  {
    icon: PenTool,
    title: "Illustration",
    desc: "Custom artwork",
    color: "#ff6b35",
  },
];

const processSteps = [
  { num: "01", title: "Discover", desc: "Research & understand" },
  { num: "02", title: "Define", desc: "Strategy & scope" },
  { num: "03", title: "Design", desc: "Create & iterate" },
  { num: "04", title: "Deliver", desc: "Handoff & support" },
];

const rulerMarks = Array.from({ length: 20 }, (_, i) => i);

export default function WebDesignPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 50 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden mix-blend-difference lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="flex size-8 -translate-1/2 items-center justify-center rounded-full border border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="size-1 rounded-full bg-white" />
        </motion.div>
      </motion.div>

      {/* Top ruler */}
      <div className="fixed inset-x-0 top-0 z-40 hidden h-6 items-end border-b border-[#333] bg-[#141414] px-4 lg:flex">
        {rulerMarks.map((i) => (
          <div
            key={i}
            className="flex-1 border-l border-[#333]"
            style={{ height: i % 5 === 0 ? "100%" : "40%" }}
          >
            {i % 5 === 0 && (
              <span className="ml-1 text-[8px] text-[#666]">{i * 10}</span>
            )}
          </div>
        ))}
      </div>

      {/* Left ruler */}
      <div className="fixed top-6 bottom-0 left-0 z-40 hidden w-6 flex-col border-r border-[#333] bg-[#141414] py-4 lg:flex">
        {rulerMarks.map((i) => (
          <div
            key={i}
            className="flex-1 border-t border-[#333]"
            style={{ width: i % 5 === 0 ? "100%" : "40%" }}
          >
            {i % 5 === 0 && (
              <span className="ml-1 text-[8px] text-[#666]">{i * 10}</span>
            )}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="fixed top-24 right-4 z-30 hidden w-48 rounded-lg border border-[#333] bg-[#141414] p-4 lg:block"
      >
        <div className="mb-4 flex items-center gap-2 border-b border-[#333] pb-2">
          <Palette className="size-4 text-coral" />
          <span className="text-xs font-bold text-white">Properties</span>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <span className="mb-2 block text-[10px] tracking-wider text-[#666] uppercase">
            Fill
          </span>
          <div className="grid grid-cols-5 gap-1">
            {colorPalette.map((color, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveColor(i)}
                className="aspect-square rounded-sm border-2"
                style={{
                  backgroundColor: color,
                  borderColor: activeColor === i ? "#fff" : "transparent",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Opacity slider */}
        <div className="mb-4">
          <span className="mb-2 block text-[10px] tracking-wider text-[#666] uppercase">
            Opacity
          </span>
          <div className="h-1 rounded-full bg-[#333]">
            <motion.div
              className="h-full rounded-full bg-coral"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>

        {/* Layer panel */}
        <div className="border-t border-[#333] pt-4">
          <span className="mb-2 block text-[10px] tracking-wider text-[#666] uppercase">
            Layer
          </span>
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-sm bg-[#1a1a1a] px-2 py-1">
              <Eye className="size-3 text-[#666]" />
              <span className="text-xs text-white">Hero Text</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1">
              <Eye className="size-3 text-[#666]" />
              <span className="text-xs text-[#666]">Background</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background blobs */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0">
        {colorPalette.map((color, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full opacity-20 blur-[100px]"
            style={{
              backgroundColor: color,
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Hero - canvas style */}
      <section className="relative flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Canvas frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-[#333]">
              {/* Corners */}
              <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-coral" />
              <div className="absolute -top-1 -right-1 size-3 border-t-2 border-r-2 border-coral" />
              <div className="absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-coral" />
              <div className="absolute -right-1 -bottom-1 size-3 border-r-2 border-b-2 border-coral" />
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left: Typography */}
              <div className="space-y-8">
                {/* Selection marker */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-0 -left-4 hidden lg:block"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-20 w-px bg-coral" />
                    <span className="font-mono text-[10px] text-coral">
                      342px
                    </span>
                  </div>
                </motion.div>

                {/* Layer badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hidden items-center gap-2 rounded-full border border-[#333] bg-[#141414] px-3 py-1 lg:inline-flex"
                >
                  <Layers className="size-3 text-coral" />
                  <span className="font-mono text-xs text-[#666]">
                    Layer 1 of 7
                  </span>
                  <span className="text-[#666]">•</span>
                  <span className="font-mono text-xs text-coral">Draft</span>
                </motion.div>

                {/* Headline */}
                <div className="relative">
                  {/* Selection highlight */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute top-1/2 -left-2 h-24 -translate-y-1/2 bg-coral/20"
                    style={{ width: "20%" }}
                  />

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative text-3xl leading-[0.9] font-black tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  >
                    <span className="block">DESIGN</span>
                    <span
                      className="block transition-colors duration-500"
                      style={{ color: colorPalette[activeColor] }}
                    >
                      WITHOUT
                    </span>
                    <span className="block">LIMITS</span>
                  </motion.h1>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="hidden items-center gap-4 border-y border-[#333] py-3 lg:flex"
                >
                  <div className="flex items-center gap-2">
                    <Type className="size-4 text-[#666]" />
                    <span className="font-mono text-xs text-[#666]">
                      Inter Bold
                    </span>
                  </div>
                  <div className="h-4 w-px bg-[#333]" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#666]">96px</span>
                  </div>
                  <div className="h-4 w-px bg-[#333]" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#666]">0.9</span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-md text-lg text-[#a0a0a0]"
                >
                  Pixel-perfect designs crafted with precision. Transform your
                  vision into stunning digital experiences.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm px-8 py-4 font-bold transition-all"
                    style={{
                      backgroundColor: colorPalette[activeColor],
                      color: "#0a0a0a",
                    }}
                  >
                    <PenTool className="size-4" />
                    Start Designing
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    {/* Hover ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ borderRadius: "50%" }}
                    />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative hidden lg:block"
              >
                {/* Artboard */}
                <div className="relative aspect-square rounded-lg border border-[#333] bg-[#141414] p-8">
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, ${colorPalette[activeColor]} 1px, transparent 1px),
                        linear-gradient(to bottom, ${colorPalette[activeColor]} 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-8 left-8 hidden rounded-lg border border-[#333] bg-[#1a1a1a] p-4 md:block"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: colorPalette[activeColor] }}
                      />
                      <span className="font-mono text-xs text-[#666]">
                        Frame 1
                      </span>
                    </div>
                    <div className="h-16 w-32 rounded-sm bg-[#222]" />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -3, 3, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute right-8 bottom-16 hidden rounded-lg border border-[#333] bg-[#1a1a1a] p-4 md:block"
                  >
                    <div className="space-y-2">
                      <div
                        className="h-2 w-24 rounded-full"
                        style={{ backgroundColor: colorPalette[activeColor] }}
                      />
                      <div className="h-2 w-16 rounded-full bg-[#333]" />
                      <div className="h-2 w-20 rounded-full bg-[#333]" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 hidden size-24 -translate-1/2 items-center justify-center rounded-full border-2 md:flex"
                    style={{ borderColor: colorPalette[activeColor] }}
                  >
                    <Sparkles
                      className="size-8"
                      style={{ color: colorPalette[activeColor] }}
                    />
                  </motion.div>

                  {/* Guide lines */}
                  <div className="absolute inset-x-0 top-1/2 h-px bg-coral/30" />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-coral/30" />

                  {/* Dimensions */}
                  <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-[10px] text-coral">
                    480px
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-coral">
                    480px
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute right-4 bottom-4 flex gap-1.5 rounded-lg border border-[#333] bg-[#141414] p-2 md:-right-6 md:-bottom-6 md:gap-2 md:p-3"
                >
                  {colorPalette.map((color, i) => (
                    <div
                      key={i}
                      className="size-4 rounded-full md:size-6"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#333] pt-8 sm:gap-8"
            >
              <div className="flex flex-wrap gap-4 sm:gap-8">
                {[
                  { num: "100+", label: "Designs Delivered" },
                  { num: "50+", label: "Happy Clients" },
                  { num: "99%", label: "Satisfaction Rate" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="group min-w-[100px] cursor-default"
                  >
                    <div
                      className="font-mono text-2xl font-black transition-colors sm:text-3xl md:text-4xl"
                      style={{ color: colorPalette[activeColor] }}
                    >
                      {stat.num}
                    </div>
                    <div className="mt-1 text-xs tracking-wider text-[#666] uppercase transition-colors group-hover:text-white">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="ml-auto hidden items-center gap-2 sm:flex">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex size-8 items-center justify-center rounded-sm border border-[#333] text-[#666] hover:text-white"
                >
                  -
                </motion.button>
                <span className="font-mono text-sm text-[#666]">100%</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex size-8 items-center justify-center rounded-sm border border-[#333] text-[#666] hover:text-white"
                >
                  +
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:py-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-sm text-coral uppercase">
              Capabilities
            </span>
            <h3 className="mt-2 text-4xl font-black text-white">
              WHAT WE CREATE
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden p-8 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: `${feature.color}10`,
                  borderLeft: `4px solid ${feature.color}`,
                }}
              >
                <feature.icon
                  className="mb-4 size-8 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: feature.color }}
                />
                <h4 className="mb-2 text-xl font-bold text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#a0a0a0]">{feature.desc}</p>

                <div className="absolute right-4 bottom-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <MousePointer2
                    className="size-5"
                    style={{ color: feature.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-sm text-teal uppercase">
                Our Process
              </span>
              <h3 className="mt-2 text-4xl font-black text-white">
                HOW WE WORK
              </h3>
              <p className="mt-4 text-lg text-[#a0a0a0]">
                A refined approach that transforms ideas into pixel-perfect
                designs.
              </p>
            </motion.div>

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group flex items-center gap-6"
                >
                  {/* Animated circle */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex size-16 items-center justify-center rounded-full border-2 border-coral"
                  >
                    <span className="font-mono text-xl font-black text-coral">
                      {step.num}
                    </span>
                  </motion.div>

                  <div className="flex-1 border-b border-[#333] pb-4">
                    <h4 className="mb-2 text-xl font-bold text-white">
                      {step.title}
                    </h4>
                    <p className="min-h-[1.5em] text-[#a0a0a0]">{step.desc}</p>
                  </div>

                  {/* Progress indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-coral"
                    style={{ width: `${(index + 1) * 25}%` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 sm:px-6 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div
            className="relative overflow-hidden p-6 sm:p-12 md:p-20"
            style={{ backgroundColor: colorPalette[activeColor] }}
          >
            {/* Animated stripes */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)",
              }}
            />

            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-black text-[#0a0a0a] sm:text-6xl">
                READY TO DESIGN?
              </h3>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-4 border-4 border-[#0a0a0a] bg-[#0a0a0a] px-8 py-4 font-bold transition-all hover:bg-transparent"
                style={{ color: colorPalette[activeColor] }}
              >
                Let&apos;s Talk
                <ArrowRight className="size-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
