"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  Search,
  BarChart3,
  Target,
  Globe,
  LineChart,
  Activity,
  Zap,
  MousePointer,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

interface BinaryStream {
  id: number;
  x: number;
  delay: number;
  duration: number;
  content: string;
}

const features = [
  {
    icon: Search,
    title: "Keyword Research",
    desc: "Discover high-value search terms",
    stat: "10K+",
  },
  {
    icon: BarChart3,
    title: "Technical SEO",
    desc: "Site structure optimization",
    stat: "99/100",
  },
  {
    icon: Target,
    title: "On-Page SEO",
    desc: "Content optimization",
    stat: "+340%",
  },
  {
    icon: Globe,
    title: "Local SEO",
    desc: "Dominate local search",
    stat: "Top 3",
  },
  {
    icon: LineChart,
    title: "Analytics",
    desc: "Data-driven insights",
    stat: "Real-time",
  },
  { icon: Zap, title: "Performance", desc: "Speed optimization", stat: "<1s" },
];

const stats = [
  { label: "Organic Traffic", value: 340, suffix: "%", icon: TrendingUp },
  { label: "Keyword Rankings", value: 85, suffix: "%", icon: Target },
  { label: "Conversion Rate", value: 5.2, suffix: "x", icon: Activity },
  { label: "Page Speed", value: 98, suffix: "/100", icon: Zap },
];

const searchKeywords = [
  "best web design agency",
  "seo experts near me",
  "digital marketing services",
  "website optimization",
  "rank #1 on google",
];

/**
 * Renders a feature-rich SEO marketing hero and content page with animated visuals.
 *
 * This React component displays a parallax hero with decorative orbs and floating shapes, a client-generated binary rain overlay, a typing keyword effect in a search-like bar, a responsive metrics grid, a stats section, a features grid, a four-step process, and a CTA section. The binary rain is generated on the client at mount to avoid SSR hydration mismatches.
 *
 * @returns The JSX element tree for the SEO marketing hero and content page
 */
export default function SEOContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Generate binary streams on client-side only to avoid SSR mismatch
  const [binaryStreams, setBinaryStreams] = useState<BinaryStream[]>([]);
  const isClient = useRef(false);

  useEffect(() => {
    if (isClient.current) return;
    isClient.current = true;
    // Generate random values only on client to prevent hydration mismatch
    const streams = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      content: Array.from({ length: 30 }, () =>
        Math.random() > 0.5 ? "1" : "0",
      ).join(""),
    }));
    // Intentionally using setState in effect to avoid SSR hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBinaryStreams(streams);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Typing effect
  useEffect(() => {
    const currentKeyword = searchKeywords[currentKeywordIndex];
    const typeSpeed = isDeleting ? 30 : 80;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentKeyword) {
        pauseTimer = setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentKeywordIndex((prev) => (prev + 1) % searchKeywords.length);
      } else {
        setTypedText(
          isDeleting
            ? currentKeyword.slice(0, typedText.length - 1)
            : currentKeyword.slice(0, typedText.length + 1),
        );
      }
    }, typeSpeed);

    return () => {
      clearTimeout(timer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [typedText, isDeleting, currentKeywordIndex]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Binary rain */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.03]">
        {binaryStreams.map((stream) => (
          <motion.div
            key={stream.id}
            className="absolute top-0 font-mono text-xs text-coral"
            style={{ left: `${stream.x}%` }}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: stream.duration,
              delay: stream.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {stream.content}
          </motion.div>
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ff6b35 1px, transparent 1px),
            linear-gradient(to bottom, #ff6b35 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Hero */}
      <motion.section
        style={{ y: heroY, opacity }}
        className="relative flex min-h-screen items-center overflow-hidden py-20"
      >
        {/* Gradient orbs */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 size-125 rounded-full bg-coral/10 blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-1/4 bottom-1/4 size-100 rounded-full bg-teal/10 blur-[100px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute z-0 rounded-full border border-coral/20 bg-coral/5"
            style={{
              width: 40 + i * 30,
              height: 40 + i * 30,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-2"
              >
                <motion.div
                  className="size-2 rounded-full bg-coral"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-sm text-coral">
                  Organic Growth Experts
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl leading-[1.1] font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              >
                Be Found by
                <br />
                <span className="text-coral">People Who</span>
                <br />
                <span className="relative">
                  Matter
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <motion.path
                      d="M0,4 Q50,0 100,4 T200,4"
                      fill="none"
                      stroke="#ff6b35"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 max-w-md text-lg text-[#a0a0a0]"
              >
                Connect with high-intent customers actively searching for what
                you offer. No ads, just sustainable organic visibility.
              </motion.p>

              {/* Stats mini row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-4 sm:gap-8"
              >
                {[
                  { value: "340%", label: "Avg. Traffic Growth" },
                  { value: "2.4M+", label: "Monthly Impressions" },
                  { value: "89K", label: "Qualified Clicks" },
                ].map((stat, i) => (
                  <div key={i} className="min-w-25">
                    <div className="text-2xl font-black text-coral">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#666]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-coral px-8 py-4 font-bold text-[#0a0a0a] transition-all hover:bg-coral/90 hover:shadow-lg hover:shadow-coral/30"
                >
                  Start Growing
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#features"
                  className="group inline-flex items-center gap-2 border-2 border-[#333] px-8 py-4 font-bold text-white transition-all hover:border-coral hover:text-coral"
                >
                  <BarChart3 className="size-5" />
                  See How It Works
                </Link>
              </motion.div>
            </div>

            {/* Right: Metrics grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-3 gap-3">
                {/* Search bar */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="col-span-3 rounded-xl border border-[#333] bg-[#141414] p-4"
                >
                  <div className="flex items-center gap-3">
                    <Search className="size-5 text-coral" />
                    <div className="flex-1 font-mono text-sm text-[#666]">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {typedText}
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-0.5 inline-block h-4 w-0.5 bg-coral align-middle"
                      />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="flex size-8 items-center justify-center rounded-lg bg-coral/10"
                    >
                      <ArrowUp className="size-4 text-coral" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Traffic card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="col-span-2 row-span-2 rounded-xl border border-coral/30 bg-linear-to-br from-coral/20 to-coral/5 p-5"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-coral/20">
                        <Activity className="size-6 text-coral" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-1 rounded-full bg-coral/20 px-2 py-1"
                      >
                        <TrendingUp className="size-3 text-coral" />
                        <span className="font-mono text-xs text-coral">
                          +89K
                        </span>
                      </motion.div>
                    </div>
                    <div>
                      <div className="font-mono text-4xl font-black text-white">
                        89,247
                      </div>
                      <div className="text-sm text-[#a0a0a0]">
                        Monthly Organic Visitors
                      </div>
                      {/* Mini bar chart */}
                      <div className="mt-3 flex items-end gap-1">
                        {[40, 55, 45, 70, 85, 100].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h * 0.24}px` }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="flex-1 rounded-t bg-coral/40"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Leads */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl border border-teal/30 bg-teal/10 p-4"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-teal/20">
                    <Target className="size-5 text-teal" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-black text-white">
                    2.4K
                  </div>
                  <div className="text-xs text-[#666]">Qualified Leads</div>
                </motion.div>

                {/* Sales */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-xl border border-amber/30 bg-amber/10 p-4"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-amber/20">
                    <TrendingUp className="size-5 text-amber" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-black text-white">
                    +340%
                  </div>
                  <div className="text-xs text-[#666]">Revenue Growth</div>
                </motion.div>

                {/* Rank */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="col-span-2 rounded-xl border border-[#333] bg-[#141414] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-xl border-2 border-coral bg-coral/10">
                      <span className="font-mono text-2xl font-black text-coral">
                        1
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white">Top Position</div>
                      <div className="text-sm text-[#666]">
                        12 high-value keywords
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: [8, 16, 8] }}
                          transition={{
                            delay: i * 0.2,
                            repeat: Infinity,
                            duration: 1.5,
                          }}
                          className="w-1 rounded-full bg-coral"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Authority */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="rounded-xl border border-[#333] bg-[#141414] p-4"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-teal"
                    >
                      <span className="font-mono text-lg font-black text-teal">
                        95
                      </span>
                    </motion.div>
                    <div className="mt-2 text-xs text-[#666]">
                      Domain Authority
                    </div>
                  </div>
                </motion.div>

                {/* Keywords */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="col-span-3 flex flex-wrap gap-2 rounded-xl border border-[#333] bg-[#141414] p-3"
                >
                  {[
                    "web design",
                    "seo services",
                    "marketing",
                    "branding",
                    "development",
                  ].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.05 }}
                      className="rounded-lg bg-[#1a1a1a] px-3 py-1.5 font-mono text-xs text-[#888]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

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
                <div className="mb-3 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full border border-coral/30 transition-colors group-hover:bg-coral/10">
                    <stat.icon className="size-5 text-coral" />
                  </div>
                </div>
                <div className="font-mono text-4xl font-black text-white">
                  {stat.value}
                  <span className="text-2xl text-coral">{stat.suffix}</span>
                </div>
                <div className="mt-1 font-mono text-xs tracking-wider text-[#666] uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <span className="font-mono text-sm text-coral uppercase">
                Services
              </span>
              <h3 className="mt-2 text-4xl font-black text-white md:text-5xl">
                SEO STRATEGY
              </h3>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-3xl font-black text-coral">6+</div>
              <div className="font-mono text-xs text-[#666]">CORE AREAS</div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative border border-[#333] bg-[#141414] p-8 transition-colors duration-300 hover:border-coral/50"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 size-0 border-t-40 border-r-40 border-t-transparent border-r-coral/10 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-6 flex items-start justify-between">
                  <feature.icon className="size-8 text-coral" />
                  <span className="bg-coral/10 px-2 py-1 font-mono text-xs text-coral">
                    {feature.stat}
                  </span>
                </div>

                <h4 className="mb-2 text-xl font-bold text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#666] transition-colors group-hover:text-[#999]">
                  {feature.desc}
                </p>

                <div className="mt-4 flex items-center gap-2 text-coral opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium">Learn more</span>
                  <ChevronRight className="size-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative border-t border-[#222] py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="font-mono text-sm text-coral uppercase">
              Our Process
            </span>
            <h3 className="mt-2 text-4xl font-black text-white md:text-5xl">
              HOW WE RANK
            </h3>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">
            {/* Connecting line */}
            <div className="absolute inset-y-8 left-8 hidden w-px bg-[#333] md:block" />

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Audit & Analyze",
                  desc: "Deep dive into your current SEO performance and identify opportunities",
                },
                {
                  step: "02",
                  title: "Strategy & Plan",
                  desc: "Create a customized roadmap based on data and competitive analysis",
                },
                {
                  step: "03",
                  title: "Optimize & Execute",
                  desc: "Implement technical fixes, content optimization, and link building",
                },
                {
                  step: "04",
                  title: "Monitor & Report",
                  desc: "Track rankings, traffic, and conversions with detailed analytics",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex gap-6 md:gap-12"
                >
                  {/* Step number */}
                  <div className="relative z-10 shrink-0">
                    <div className="flex size-16 items-center justify-center rounded-full border-2 border-coral bg-[#0a0a0a]">
                      <span className="font-mono text-xl font-black text-coral">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h4 className="mb-2 text-xl font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-[#666]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <div className="mb-6 inline-flex items-center gap-2 border border-coral/30 bg-coral/5 px-4 py-2">
              <MousePointer className="size-4 text-coral" />
              <span className="font-mono text-sm text-coral">
                FREE SEO AUDIT
              </span>
            </div>

            <h3 className="mb-6 text-4xl font-black text-white md:text-6xl">
              READY TO
              <span className="block text-coral">CLIMB THE RANKS?</span>
            </h3>

            <p className="mx-auto mb-10 max-w-lg text-[#666]">
              Get a comprehensive SEO analysis and discover how we can improve
              your search visibility.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-coral px-8 py-4 font-bold text-[#0a0a0a] transition-colors hover:bg-coral/90"
              >
                Get Free Audit
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-[#333] px-8 py-4 font-bold text-white transition-all hover:border-coral hover:text-coral"
              >
                <Globe className="size-5" />
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
