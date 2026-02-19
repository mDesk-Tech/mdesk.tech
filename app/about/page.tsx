"use client";

import {
  Users,
  Target,
  Rocket,
  Heart,
  ArrowRight,
  Zap,
  Globe,
  Shield,
  Sparkles,
  Code,
  Layers,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Stats data
const stats = [
  { value: "15+", label: "Team", color: "coral", offset: 0 },
  { value: "100+", label: "Projects", color: "teal", offset: 40 },
  { value: "99%", label: "Happy", color: "amber", offset: 20 },
  { value: "24/7", label: "Support", color: "coral", offset: 60 },
];

// Timeline
const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "mdesk.tech founded with a vision to transform digital experiences",
    color: "coral",
  },
  {
    year: "2023",
    title: "First Win",
    description: "Secured first major client and delivered beyond expectations",
    color: "teal",
  },
  {
    year: "2024",
    title: "Global Reach",
    description:
      "Started working with clients across Europe, Asia & North America",
    color: "amber",
  },
  {
    year: "2024",
    title: "100+ Projects",
    description: "Delivered over 100 successful projects with 99% satisfaction",
    color: "coral",
  },
];

// Values
const values = [
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do",
    icon: Heart,
    color: "coral",
  },
  {
    title: "Innovation",
    description: "Embracing new technologies and approaches",
    icon: Zap,
    color: "teal",
  },
  {
    title: "Collaboration",
    description: "Best work comes from diverse perspectives",
    icon: Users,
    color: "amber",
  },
  {
    title: "Integrity",
    description: "Honest, transparent, committed to doing right",
    icon: Shield,
    color: "coral",
  },
];

// Process
const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your business and goals",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Developing comprehensive approach",
  },
  {
    number: "03",
    title: "Design",
    description: "Creating intuitive, engaging interfaces",
  },
  {
    number: "04",
    title: "Develop",
    description: "Bringing designs to life with clean code",
  },
  {
    number: "05",
    title: "Launch",
    description: "Rigorous testing before deployment",
  },
  {
    number: "06",
    title: "Support",
    description: "Ongoing optimization and maintenance",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="scanlines fixed inset-0 z-0 opacity-5" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 md:min-h-screen">
        {/* Parallax elements */}
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-40 -left-20 size-40 border-4 border-coral/20"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute top-60 right-10 size-60 border-4 border-teal/20"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-40 left-1/4 size-20 bg-amber/10"
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          {/* Title */}
          <div className="relative mb-12 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <span className="font-mono text-sm tracking-widest text-coral uppercase">
                Who We Are
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mt-6"
            >
              <span className="block text-5xl font-black tracking-tighter text-white sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem]">
                ABOUT
              </span>
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative -mt-2 block text-5xl font-black tracking-tighter text-coral sm:-mt-4 sm:text-8xl md:-mt-6 md:text-9xl lg:-mt-8 lg:text-[10rem] xl:text-[12rem]"
              >
                US
              </motion.span>
            </motion.h1>

            {/* Accent */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
              className="absolute top-0 right-0 size-8 bg-coral sm:size-12"
            />
          </div>

          {/* Intro */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="lg:col-span-7"
            >
              <p className="text-xl/relaxed text-[#a0a0a0] sm:text-2xl">
                We&apos;re a team of passionate creators, developers, and
                strategists dedicated to crafting exceptional digital
                experiences that transform businesses and delight users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="lg:col-span-5 lg:pl-12"
            >
              <div className="border-l-4 border-coral pl-6">
                <p className="text-lg text-white">
                  Founded in 2023, we&apos;ve grown from a small team with big
                  dreams to a global agency delivering world-class digital
                  solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="mb-12">
              <span className="font-mono text-sm tracking-widest text-teal uppercase">
                By The Numbers
              </span>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`group relative border-4 ${
                    stat.color === "coral"
                      ? "border-coral"
                      : stat.color === "teal"
                        ? "border-teal"
                        : "border-amber"
                  } bg-[#141414] p-6 sm:p-8`}
                >
                  {/* Pixel corner */}
                  <div
                    className={`absolute top-0 right-0 size-4 ${
                      stat.color === "coral"
                        ? "bg-coral"
                        : stat.color === "teal"
                          ? "bg-teal"
                          : "bg-amber"
                    }`}
                  />

                  <div
                    className={`font-mono text-4xl font-black sm:text-5xl md:text-6xl ${
                      stat.color === "coral"
                        ? "text-coral"
                        : stat.color === "teal"
                          ? "text-teal"
                          : "text-amber"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm tracking-wider text-[#a0a0a0] uppercase">
                    {stat.label}
                  </div>

                  {/* Hover shadow */}
                  <div
                    className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100`}
                    style={{
                      boxShadow:
                        stat.color === "coral"
                          ? "8px 8px 0 0 rgba(255,107,53,0.3)"
                          : stat.color === "teal"
                            ? "8px 8px 0 0 rgba(0,212,170,0.3)"
                            : "8px 8px 0 0 rgba(255,184,0,0.3)",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10"
            >
              <span className="font-mono text-sm tracking-widest text-coral uppercase">
                Our Mission
              </span>

              <h2 className="mt-4 text-3xl/tight font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
                TRANSFORMING
                <br />
                <span className="text-coral">DIGITAL</span>
                <br />
                EXPERIENCES
              </h2>

              <div className="mt-8 space-y-4 text-lg text-[#a0a0a0]">
                <p>
                  We believe exceptional digital experiences are built at the
                  intersection of cutting-edge technology, beautiful design, and
                  strategic thinking.
                </p>
                <p>
                  Our mission is to empower businesses with digital solutions
                  that drive real results and create lasting impressions.
                </p>
              </div>

              {/* Mission points */}
              <div className="mt-8 space-y-4">
                {[
                  "Create exceptional experiences that drive growth",
                  "Empower businesses with technology that works",
                  "Build long-term partnerships based on trust",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex size-8 items-center justify-center border-2 border-coral">
                      <Target className="size-4 text-coral" />
                    </div>
                    <span className="text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Background */}
              <div className="absolute top-4 left-4 size-full border-4 border-teal/30 bg-[#141414] sm:top-8 sm:left-8" />

              {/* Main */}
              <div className="relative border-4 border-teal bg-[#141414] p-8 sm:p-12">
                <div className="absolute top-0 right-0 size-6 bg-teal" />

                <div className="space-y-8">
                  {[
                    {
                      icon: Heart,
                      title: "Excellence",
                      desc: "Committed to exceeding expectations",
                      color: "coral",
                    },
                    {
                      icon: Users,
                      title: "Partnership",
                      desc: "Building lasting relationships",
                      color: "teal",
                    },
                    {
                      icon: Rocket,
                      title: "Innovation",
                      desc: "Exploring new technologies",
                      color: "amber",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      whileHover={{ x: 8 }}
                      className="group flex items-start gap-4"
                    >
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center border-2 ${
                          item.color === "coral"
                            ? "border-coral bg-coral/10"
                            : item.color === "teal"
                              ? "border-teal bg-teal/10"
                              : "border-amber bg-amber/10"
                        }`}
                      >
                        <item.icon
                          className={`size-6 ${
                            item.color === "coral"
                              ? "text-coral"
                              : item.color === "teal"
                                ? "text-teal"
                                : "text-amber"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white transition-colors group-hover:text-coral">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#a0a0a0]">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-20"
          >
            <span className="font-mono text-sm tracking-widest text-amber uppercase">
              Our Journey
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
              THE PATH WE
              <br />
              <span className="text-amber">TRAVELED</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute inset-y-0 left-1/2 hidden w-px bg-linear-to-b from-coral via-teal to-amber md:block" />

            <div className="space-y-16 md:space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative grid grid-cols-1 gap-8 md:grid-cols-2 ${
                    index % 2 === 0 ? "" : "md:text-right"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={
                      index % 2 === 0 ? "md:pr-16" : "md:order-2 md:pl-16"
                    }
                  >
                    <div
                      className={`border-4 ${
                        milestone.color === "coral"
                          ? "border-coral"
                          : milestone.color === "teal"
                            ? "border-teal"
                            : "border-amber"
                      } bg-[#141414] p-6 sm:p-8`}
                    >
                      <div
                        className={`absolute top-0 ${
                          index % 2 === 0 ? "right-0" : "left-0"
                        } size-4 ${
                          milestone.color === "coral"
                            ? "bg-coral"
                            : milestone.color === "teal"
                              ? "bg-teal"
                              : "bg-amber"
                        }`}
                      />
                      <span
                        className={`font-mono text-5xl font-black ${
                          milestone.color === "coral"
                            ? "text-coral"
                            : milestone.color === "teal"
                              ? "text-teal"
                              : "text-amber"
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-white">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-[#a0a0a0]">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden items-center justify-center md:flex">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className={`size-6 border-4 border-[#0a0a0a] ${
                        milestone.color === "coral"
                          ? "bg-coral"
                          : milestone.color === "teal"
                            ? "bg-teal"
                            : "bg-amber"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <span className="font-mono text-sm tracking-widest text-coral uppercase">
              What Drives Us
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
              OUR <span className="text-coral">VALUES</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ marginTop: index % 2 === 1 ? "2rem" : 0 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`group relative border-4 ${
                  value.color === "coral"
                    ? "border-coral"
                    : value.color === "teal"
                      ? "border-teal"
                      : "border-amber"
                } bg-[#141414] p-8`}
              >
                {/* Pixel accent */}
                <div
                  className={`absolute top-0 right-0 size-6 ${
                    value.color === "coral"
                      ? "bg-coral"
                      : value.color === "teal"
                        ? "bg-teal"
                        : "bg-amber"
                  }`}
                />

                <div className="flex items-start gap-6">
                  <div
                    className={`flex size-16 shrink-0 items-center justify-center border-2 ${
                      value.color === "coral"
                        ? "border-coral bg-coral/10"
                        : value.color === "teal"
                          ? "border-teal bg-teal/10"
                          : "border-amber bg-amber/10"
                    }`}
                  >
                    <value.icon
                      className={`size-8 ${
                        value.color === "coral"
                          ? "text-coral"
                          : value.color === "teal"
                            ? "text-teal"
                            : "text-amber"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-coral">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-[#a0a0a0]">{value.description}</p>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      value.color === "coral"
                        ? "radial-gradient(circle at 50% 0%, rgba(255,107,53,0.1), transparent 60%)"
                        : value.color === "teal"
                          ? "radial-gradient(circle at 50% 0%, rgba(0,212,170,0.1), transparent 60%)"
                          : "radial-gradient(circle at 50% 0%, rgba(255,184,0,0.1), transparent 60%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-20"
          >
            <span className="font-mono text-sm tracking-widest text-teal uppercase">
              How We Work
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
              OUR <span className="text-teal">PROCESS</span>
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute inset-x-0 top-12 hidden h-1 bg-linear-to-r from-coral via-teal to-amber md:block" />

            <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Number circle */}
                  <div className="relative z-10 mx-auto mb-4 flex size-16 items-center justify-center border-4 border-coral bg-[#0a0a0a] sm:size-24 md:mx-0">
                    <span className="font-mono text-2xl font-black text-coral">
                      {step.number}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="border-2 border-[#333] bg-[#141414] p-3 transition-colors group-hover:border-coral sm:min-h-32.5 sm:p-4">
                    <h4 className="font-bold text-white">{step.title}</h4>
                    <p className="mt-1 text-sm text-[#a0a0a0]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-20"
          >
            <span className="font-mono text-sm tracking-widest text-coral uppercase">
              Why Us
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl">
              WHY <span className="text-coral">CHOOSE</span> US
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Code,
                title: "Expert Development",
                desc: "Clean, efficient code with modern technologies",
                color: "coral",
              },
              {
                icon: Sparkles,
                title: "Stunning Design",
                desc: "Beautiful interfaces that captivate users",
                color: "teal",
              },
              {
                icon: TrendingUp,
                title: "Results Driven",
                desc: "Focused on delivering measurable business outcomes",
                color: "amber",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Working with clients worldwide",
                color: "amber",
              },
              {
                icon: Layers,
                title: "Full Stack",
                desc: "End-to-end solutions from concept to deployment",
                color: "coral",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                desc: "Enterprise-grade security and 99.9% uptime guarantee",
                color: "teal",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative border-4 ${
                  feature.color === "coral"
                    ? "border-coral"
                    : feature.color === "teal"
                      ? "border-teal"
                      : "border-amber"
                } bg-[#141414] p-6`}
              >
                <div
                  className={`absolute top-0 right-0 size-4 ${
                    feature.color === "coral"
                      ? "bg-coral"
                      : feature.color === "teal"
                        ? "bg-teal"
                        : "bg-amber"
                  }`}
                />

                <div
                  className={`mb-4 inline-flex border-2 ${
                    feature.color === "coral"
                      ? "border-coral bg-coral/10"
                      : feature.color === "teal"
                        ? "border-teal bg-teal/10"
                        : "border-amber bg-amber/10"
                  } p-3`}
                >
                  <feature.icon
                    className={`size-6 ${
                      feature.color === "coral"
                        ? "text-coral"
                        : feature.color === "teal"
                          ? "text-teal"
                          : "text-amber"
                    }`}
                  />
                </div>

                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-coral">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[#a0a0a0]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl overflow-hidden border-4 border-coral bg-[#141414] p-8 sm:p-16"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 size-8 bg-coral" />
            <div className="absolute top-0 right-0 size-8 bg-teal" />
            <div className="absolute bottom-0 left-0 size-8 bg-teal" />
            <div className="absolute right-0 bottom-0 size-8 bg-coral" />

            {/* Inner border */}
            <div className="absolute inset-4 border-2 border-coral/30" />

            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-black text-white sm:text-4xl md:text-5xl"
              >
                READY TO CREATE
                <br />
                <span className="text-coral">SOMETHING AMAZING?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mx-auto mt-6 max-w-xl text-lg text-[#a0a0a0]"
              >
                Let&apos;s collaborate to bring your vision to life with
                cutting-edge design and development.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="btn-retro inline-flex items-center gap-2 px-8 py-4 text-lg"
                >
                  Get in Touch
                  <ArrowRight className="size-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
