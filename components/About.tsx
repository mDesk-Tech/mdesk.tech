"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Globe, Code, Users } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered", color: "#ff6b35" },
  { value: "30+", label: "Happy Clients", color: "#00d4aa" },
  { value: "99%", label: "Satisfaction Rate", color: "#ffb800" },
  { value: "24/7", label: "Support", color: "#ff6b35" },
];

const capabilities = [
  {
    icon: Code,
    title: "Development",
    desc: "Full-stack solutions",
    color: "#ff6b35",
  },
  {
    icon: Sparkles,
    title: "Design",
    desc: "Pixel-perfect UI/UX",
    color: "#00d4aa",
  },
  {
    icon: Globe,
    title: "Global",
    desc: "Worldwide delivery",
    color: "#ffb800",
  },
  { icon: Zap, title: "Fast", desc: "Rapid turnaround", color: "#ff6b35" },
];

/**
 * Renders the "About" page section with themed content and animated visuals.
 *
 * The section includes a large hero, scroll-driven decorative motion, a stats grid,
 * capability cards, philosophy and team blocks, and a call-to-action. Visuals and
 * layout adapt responsively and use scroll progress to drive subtle parallax and rotation.
 *
 * @returns The About section's JSX markup containing animated layout and content blocks.
 */
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden bg-[#0a0a0a] py-16 sm:py-24 md:py-32"
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="size-full animate-[grid-scroll_20s_linear_infinite]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #ff6b35 1px, transparent 1px),
              linear-gradient(180deg, #00d4aa 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating shapes */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-40 -left-20 size-64 border-4 border-coral/20"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute right-10 bottom-40 size-40 bg-teal/10"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/4 size-20 border-2 border-amber/30"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="relative mb-16 py-12 sm:mb-32 sm:py-20 md:min-h-[80vh]">
          {/* Large text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <span className="text-[20vw] font-black whitespace-nowrap text-white">
              ABOUT
            </span>
          </motion.div>

          {/* Content */}
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center gap-2"
              >
                <span className="size-2 bg-coral" />
                <span className="font-mono text-xs tracking-widest text-coral uppercase">
                  About Us
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl leading-[0.95] font-black tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="block">SMALL TEAM</span>
                <span className="block text-coral">BIG IMPACT</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 max-w-lg text-lg text-[#a0a0a0]"
              >
                We are a tight-knit collective of designers and developers who
                believe in the power of thoughtful digital craftsmanship.
              </motion.p>
            </div>

            {/* Right */}
            <div className="relative lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {[
                  { label: "Founded", value: "2023", color: "#ff6b35" },
                  { label: "Projects", value: "50+", color: "#00d4aa" },
                  { label: "Team", value: "12", color: "#ffb800" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="group flex items-center justify-between border-l-4 bg-[#141414] p-5 transition-all hover:translate-x-2"
                    style={{ borderLeftColor: item.color }}
                  >
                    <span className="text-sm text-[#666]">{item.label}</span>
                    <span
                      className="font-mono text-2xl font-black"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Decorations */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -right-8 -z-99 size-16 border-2 border-dashed border-coral/30"
              />
            </div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 hidden sm:block md:absolute md:bottom-0 md:left-0"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-linear-to-r from-coral to-transparent" />
              <span className="font-mono text-xs tracking-widest text-[#666]">
                SCROLL TO EXPLORE
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:mb-32 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden border-2 border-[#333] bg-[#141414] p-6 transition-all"
              style={{ borderColor: stat.color }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="absolute bottom-0 left-0 h-1"
                style={{ backgroundColor: stat.color }}
              />
              <div
                className="mb-2 font-mono text-3xl font-black sm:text-4xl md:text-5xl"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#666]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="mb-16 sm:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="font-mono text-sm text-teal">WHAT WE DO</span>
            <h3 className="mt-2 text-4xl font-black text-white">
              CAPABILITIES
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden border-2 border-[#333] bg-[#141414] p-6 transition-all duration-300 hover:-translate-y-2"
                style={{ borderColor: `${cap.color}40` }}
              >
                <div
                  className="absolute -top-4 -right-4 size-20 opacity-20 transition-transform group-hover:scale-150"
                  style={{ backgroundColor: cap.color }}
                />
                <cap.icon
                  className="relative mb-4 size-8 transition-transform group-hover:scale-110"
                  style={{ color: cap.color }}
                />
                <h4 className="relative mb-1 text-xl font-bold text-white">
                  {cap.title}
                </h4>
                <p className="relative text-sm text-[#666]">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-16 grid grid-cols-1 items-center gap-8 sm:mb-32 sm:gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-sm text-amber">OUR PHILOSOPHY</span>
            <h3 className="mt-2 text-4xl font-black text-white">
              CRAFT OVER
              <br />
              <span className="text-amber">QUANTITY</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-[#a0a0a0]">
              We take on limited projects to ensure every client gets our full
              attention. No shortcuts, no compromises—just exceptional work
              delivered with precision.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Quality First", "Transparency", "Partnership"].map((tag) => (
                <span
                  key={tag}
                  className="border border-amber/30 px-4 py-2 font-mono text-xs text-amber"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team */}
        <div className="mb-16 sm:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 flex items-end justify-between"
          >
            <div>
              <span className="font-mono text-sm text-coral">THE TEAM</span>
              <h3 className="mt-2 text-4xl font-black text-white">MEET US</h3>
            </div>
            <Users className="size-12 text-coral opacity-50" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: "Developers", role: "Code Architects", color: "#ff6b35" },
              { name: "Designers", role: "Visual Artists", color: "#00d4aa" },
              {
                name: "Strategists",
                role: "Growth Partners",
                color: "#ffb800",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative border-2 border-[#333] bg-[#141414] p-8 transition-all"
                style={{ borderColor: `${member.color}40` }}
              >
                <div
                  className="mb-4 h-1 w-12 transition-all group-hover:w-full"
                  style={{ backgroundColor: member.color }}
                />
                <h4 className="mb-1 text-2xl font-bold text-white">
                  {member.name}
                </h4>
                <p
                  className="font-mono text-sm"
                  style={{ color: member.color }}
                >
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border-4 border-coral bg-[#141414] p-6 sm:p-12"
        >
          {/* Stripes */}
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #ff6b35 0, #ff6b35 10px, transparent 10px, transparent 20px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h3 className="text-3xl font-black text-white sm:text-4xl">
                READY TO START?
              </h3>
              <p className="mt-2 text-[#a0a0a0]">
                Let&apos;s build something amazing together.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border-2 border-coral bg-coral px-8 py-4 font-bold text-[#0a0a0a] transition-all hover:bg-transparent hover:text-coral"
            >
              Get in Touch
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
