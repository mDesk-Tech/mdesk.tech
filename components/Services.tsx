"use client";

import { Palette, Code2, Server, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { memo, useRef, useState } from "react";
import { motion } from "motion/react";

const services = [
  {
    title: "Web Design",
    description:
      "Custom, responsive designs tailored to your brand identity and user experience goals",
    icon: Palette,
    features: [
      "Custom UI/UX Design",
      "Responsive Layouts",
      "Brand Identity",
      "Interactive Prototypes",
    ],
    color: "#ff6b35",
  },
  {
    title: "Web Development",
    description:
      "Robust, scalable web applications built with cutting-edge technologies and best practices",
    icon: Code2,
    features: [
      "React & Next.js",
      "API Integration",
      "Database Design",
      "Performance Optimization",
    ],
    color: "#00d4aa",
  },
  {
    title: "Hosting Solutions",
    description:
      "Reliable, secure hosting infrastructure with 99.9% uptime guarantee and 24/7 monitoring",
    icon: Server,
    features: [
      "99.9% Uptime",
      "SSL Certificates",
      "Daily Backups",
      "24/7 Monitoring",
    ],
    color: "#ffb800",
  },
  {
    title: "SEO Optimization",
    description:
      "Improve your online visibility and search engine rankings with proven strategies",
    icon: TrendingUp,
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical Audits",
      "Performance Tracking",
    ],
    color: "#ff6b35",
  },
];

// 3D tilt card
const TiltCard = memo(
  ({ service, index }: { service: (typeof services)[0]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [glitchText, setGlitchText] = useState(false);

    const Icon = service.icon;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      setTransform({ rotateX, rotateY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 300);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform({ rotateX: 0, rotateY: 0 });
    };

    return (
      <div className="group perspective-1000 relative">
        {/* Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: transform.rotateX,
            rotateY: transform.rotateY,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative h-full overflow-hidden border-2 border-[#333] bg-[#141414] p-6 transition-colors duration-300 hover:border-coral sm:p-8"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: isHovered
              ? `0 20px 40px -12px ${service.color}25, 6px 6px 0 0 ${service.color}20`
              : "none",
          }}
        >
          {/* Shimmer */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${service.color}15 45%, ${service.color}25 50%, ${service.color}15 55%, transparent 60%)`,
              backgroundSize: "200% 200%",
            }}
            animate={
              isHovered ? { backgroundPosition: ["100% 0%", "-100% 0%"] } : {}
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative" style={{ transform: "translateZ(30px)" }}>
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <motion.div
                className="inline-flex border-2 p-3 transition-colors"
                style={{ borderColor: service.color }}
                animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  className="size-6 transition-transform"
                  style={{
                    color: service.color,
                    transform: glitchText ? "translate(2px, -2px)" : "none",
                  }}
                />
              </motion.div>
              <motion.span
                className="font-mono text-sm text-[#333]"
                animate={isHovered ? { color: service.color } : {}}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </div>

            {/* Content */}
            <motion.h3
              className="mb-3 text-xl font-bold text-white sm:text-2xl"
              animate={
                glitchText
                  ? {
                      x: [0, -2, 2, -2, 0],
                      opacity: [1, 0.8, 1, 0.9, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.15 }}
            >
              {service.title}
            </motion.h3>
            <p className="mb-6 text-sm/relaxed text-[#a0a0a0] sm:text-base">
              {service.description}
            </p>

            {/* Features */}
            <div className="mb-6 grid grid-cols-2 gap-2">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-[#666] sm:text-sm"
                  initial={{ opacity: 0.7, x: 0 }}
                  animate={
                    isHovered
                      ? {
                          opacity: 1,
                          x: 4,
                          transition: { delay: idx * 0.05 },
                        }
                      : { opacity: 0.7, x: 0 }
                  }
                >
                  <motion.div
                    className="size-1.5 shrink-0"
                    style={{ backgroundColor: service.color }}
                    animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  />
                  <span className={isHovered ? "text-white" : ""}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-coral uppercase transition-all hover:gap-3"
            >
              <span className="relative">
                Learn More
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-coral"
                  initial={{ width: 0 }}
                  animate={isHovered ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.span
                animate={isHovered ? { x: [0, 4, 0], rotate: [0, 45, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <ArrowUpRight className="size-4" />
              </motion.span>
            </Link>
          </div>

          <motion.div
            className="absolute -right-1 -bottom-1 size-4"
            style={{ backgroundColor: service.color }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          />

          {/* Bottom progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-coral to-transparent"
            initial={{ width: 0 }}
            animate={isHovered ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    );
  },
);

TiltCard.displayName = "TiltCard";

const Services = memo(() => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#0a0a0a] py-20 sm:py-32"
    >
      {/* Background elements */}
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="scanlines absolute inset-0 opacity-20" />

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 hidden size-32 border-b-2 border-l-2 border-coral/20 lg:block" />
      <div className="absolute bottom-0 left-0 hidden size-32 border-t-2 border-r-2 border-teal/20 lg:block" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start gap-4 sm:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2">
              <motion.div
                className="size-2 bg-coral"
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-xs tracking-wider text-coral uppercase">
                What We Offer
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Our <span className="text-gradient">Services</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-[#a0a0a0] lg:text-right">
            Comprehensive web solutions to help your business thrive in the
            digital landscape
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-center gap-6 border-t-2 border-[#333] pt-12 sm:mt-16 sm:flex-row"
        >
          <p className="text-center text-sm text-[#666] sm:text-left">
            Need a custom solution? Let&apos;s discuss your project.
          </p>
          <Link href="/contact" className="btn-retro px-6 py-3 text-sm">
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;
