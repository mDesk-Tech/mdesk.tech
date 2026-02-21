"use client";

import { useCallback, useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Mail,
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Globe,
  Send,
  Clock,
  Zap,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Renders the contact page UI containing contact method cards, an animated contact form, availability panels, and a call-to-action section.
 *
 * The component manages form state, focus animations, submission state, and sends form data to `/api/contact`. It also drives scroll-based parallax and motion effects for decorative elements.
 *
 * @returns The React element for the contact page.
 */
export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send message");
        }

        setIsSubmitted(true);
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to send message. Please try again later.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState],
  );

  const contactCards = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@mdesk.tech",
      href: "mailto:hello@mdesk.tech",
      color: "coral" as const,
      desc: "Send us an email anytime",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Start a conversation",
      href: "#contact",
      color: "teal" as const,
      desc: "Average response: 24 hours",
    },
    {
      icon: Globe,
      title: "Location",
      content: "Remote-first",
      color: "amber" as const,
      desc: "Available globally",
    },
  ];

  const colorClasses = {
    coral: {
      border: "border-coral",
      bg: "bg-coral",
      text: "text-coral",
      bgLight: "bg-coral/10",
      shadow: "shadow-[8px_8px_0_0_rgba(255,107,53,0.3)]",
    },
    teal: {
      border: "border-teal",
      bg: "bg-teal",
      text: "text-teal",
      bgLight: "bg-teal/10",
      shadow: "shadow-[8px_8px_0_0_rgba(0,212,170,0.3)]",
    },
    amber: {
      border: "border-amber",
      bg: "bg-amber",
      text: "text-amber",
      bgLight: "bg-amber/10",
      shadow: "shadow-[8px_8px_0_0_rgba(255,184,0,0.3)]",
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="scanlines fixed inset-0 z-0 opacity-5" />

      {/* Parallax */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-40 -right-20 size-60 border-4 border-coral/10"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-96 -left-10 size-40 border-4 border-teal/10"
      />

      {/* Hero */}
      <section className="relative overflow-hidden lg:min-h-screen">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-8 py-8 lg:min-h-screen lg:grid-cols-2 lg:py-0">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative pt-24 sm:pt-32 lg:pt-0"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-sm tracking-widest text-coral uppercase"
              >
                Get in Touch
              </motion.span>

              <div className="relative mt-6">
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                >
                  LET&apos;S
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl font-black tracking-tighter text-coral sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                >
                  TALK
                </motion.h1>

                {/* Pixel accent */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute top-0 -right-4 size-12 bg-teal sm:-right-8"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 max-w-md text-xl text-[#a0a0a0]"
              >
                Have a project in mind or just want to say hello? We&apos;d love
                to hear from you.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex gap-8"
              >
                <div>
                  <div className="font-mono text-3xl font-black text-coral">
                    &lt;24h
                  </div>
                  <div className="text-sm text-[#a0a0a0]">Response time</div>
                </div>
                <div>
                  <div className="font-mono text-3xl font-black text-teal">
                    100%
                  </div>
                  <div className="text-sm text-[#a0a0a0]">Human support</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative space-y-4 lg:pl-12"
            >
              {contactCards.map((card, index) => {
                const colors = colorClasses[card.color];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: -12, transition: { duration: 0.2 } }}
                    className={`group relative border-4 ${colors.border} bg-[#141414]`}
                  >
                    {/* Corner */}
                    <div
                      className={`absolute top-0 right-0 size-6 ${colors.bg}`}
                    />

                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex size-14 shrink-0 items-center justify-center border-2 ${colors.border} ${colors.bgLight}`}
                        >
                          <card.icon className={`size-7 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">
                            {card.title}
                          </h3>
                          <p className="text-sm text-[#a0a0a0]">{card.desc}</p>
                          {card.href ? (
                            <a
                              href={card.href}
                              className={`mt-2 inline-flex items-center gap-2 font-mono ${colors.text} transition-all hover:gap-3`}
                            >
                              {card.content}
                              <ArrowRight className="size-4" />
                            </a>
                          ) : (
                            <span
                              className={`mt-2 block font-mono ${colors.text}`}
                            >
                              {card.content}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Shadow */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                      style={{
                        boxShadow:
                          card.color === "coral"
                            ? "12px 12px 0 0 rgba(255,107,53,0.2)"
                            : card.color === "teal"
                              ? "12px 12px 0 0 rgba(0,212,170,0.2)"
                              : "12px 12px 0 0 rgba(255,184,0,0.2)",
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative overflow-hidden border-4 border-coral bg-[#141414]">
                {/* Corners */}
                <div className="absolute top-0 left-0 size-8 bg-coral" />
                <div className="absolute top-0 right-0 size-8 bg-teal" />
                <div className="absolute bottom-0 left-0 size-8 bg-teal" />
                <div className="absolute right-0 bottom-0 size-8 bg-coral" />

                {/* Border */}
                <div className="absolute inset-4 border-2 border-coral/30" />

                <div className="relative z-10 p-6 sm:p-10">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="mx-auto mb-6 flex size-24 items-center justify-center border-4 border-teal bg-teal/10"
                      >
                        <CheckCircle className="size-12 text-teal" />
                      </motion.div>
                      <h3 className="mb-4 text-3xl font-bold text-white">
                        Message Sent!
                      </h3>
                      <p className="mx-auto mb-8 max-w-md text-[#a0a0a0]">
                        Thank you for reaching out. We&apos;ll get back to you
                        as soon as possible.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="btn-retro inline-flex items-center gap-2 px-6 py-3"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-8 flex items-center gap-4">
                        <div className="border-2 border-coral bg-coral/10 p-3 text-coral">
                          <MessageSquare className="size-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            Send us a message
                          </h3>
                          <p className="text-sm text-[#a0a0a0]">
                            Fill out the form and we&apos;ll respond promptly
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {/* Name Field */}
                          <motion.div
                            animate={{
                              scale: focusedField === "name" ? 1.02 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <label
                              htmlFor="name"
                              className="mb-2 block text-sm font-medium text-white"
                            >
                              Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full border-2 border-[#333] bg-[#0a0a0a] p-4 text-white transition-all outline-none focus:border-coral"
                                placeholder="Your name"
                              />
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{
                                  scaleX: focusedField === "name" ? 1 : 0,
                                }}
                                className="absolute inset-x-0 bottom-0 h-1 origin-left bg-coral"
                              />
                            </div>
                          </motion.div>

                          {/* Email Field */}
                          <motion.div
                            animate={{
                              scale: focusedField === "email" ? 1.02 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <label
                              htmlFor="email"
                              className="mb-2 block text-sm font-medium text-white"
                            >
                              Email
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full border-2 border-[#333] bg-[#0a0a0a] p-4 text-white transition-all outline-none focus:border-coral"
                                placeholder="your@email.com"
                              />
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{
                                  scaleX: focusedField === "email" ? 1 : 0,
                                }}
                                className="absolute inset-x-0 bottom-0 h-1 origin-left bg-coral"
                              />
                            </div>
                          </motion.div>
                        </div>

                        {/* Subject Field */}
                        <motion.div
                          animate={{
                            scale: focusedField === "subject" ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <label
                            htmlFor="subject"
                            className="mb-2 block text-sm font-medium text-white"
                          >
                            Subject
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formState.subject}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("subject")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="w-full border-2 border-[#333] bg-[#0a0a0a] p-4 text-white transition-all outline-none focus:border-coral"
                              placeholder="What's this about?"
                            />
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{
                                scaleX: focusedField === "subject" ? 1 : 0,
                              }}
                              className="absolute inset-x-0 bottom-0 h-1 origin-left bg-coral"
                            />
                          </div>
                        </motion.div>

                        {/* Message Field */}
                        <motion.div
                          animate={{
                            scale: focusedField === "message" ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <label
                            htmlFor="message"
                            className="mb-2 block text-sm font-medium text-white"
                          >
                            Message
                          </label>
                          <div className="relative">
                            <textarea
                              id="message"
                              name="message"
                              value={formState.message}
                              onChange={handleChange}
                              onFocus={() => setFocusedField("message")}
                              onBlur={() => setFocusedField(null)}
                              required
                              rows={6}
                              className="w-full resize-none border-2 border-[#333] bg-[#0a0a0a] p-4 text-white transition-all outline-none focus:border-coral"
                              placeholder="Tell us about your project..."
                            />
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{
                                scaleX: focusedField === "message" ? 1 : 0,
                              }}
                              className="absolute inset-x-0 bottom-0 h-1 origin-left bg-coral"
                            />
                          </div>
                        </motion.div>

                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-2 border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400"
                          >
                            {error}
                          </motion.div>
                        )}

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn-retro inline-flex w-full items-center justify-center gap-2 px-8 py-4 disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="mr-2 size-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="size-5" />
                            </>
                          )}
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="sticky top-32 space-y-6">
                {/* Hours */}
                <div className="relative border-4 border-teal bg-[#141414] p-6">
                  <div className="absolute top-0 right-0 size-6 bg-teal" />
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center border-2 border-teal bg-teal/10">
                      <Clock className="size-6 text-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Working Hours</h4>
                      <p className="text-sm text-[#a0a0a0]">
                        Mon - Fri: 9AM - 6PM
                        <br />
                        Weekend: Limited support
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response */}
                <div className="relative border-4 border-amber bg-[#141414] p-6">
                  <div className="absolute top-0 right-0 size-6 bg-amber" />
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center border-2 border-amber bg-amber/10">
                      <Zap className="size-6 text-amber" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Fast Response</h4>
                      <p className="text-sm text-[#a0a0a0]">
                        We typically respond within
                        <br />
                        24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="relative border-4 border-coral bg-[#141414] p-6">
                  <div className="absolute top-0 right-0 size-6 bg-coral" />
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center border-2 border-coral bg-coral/10">
                      <Heart className="size-6 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Trusted by Many</h4>
                      <p className="text-sm text-[#a0a0a0]">
                        100+ happy clients
                        <br />
                        worldwide
                      </p>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden border-4 border-coral bg-[#141414]"
                >
                  {/* Corners */}
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 right-0 size-6 bg-coral"
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-0 left-0 size-6 bg-teal"
                  />

                  {/* Content */}
                  <div className="relative p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Sonar */}
                        <div className="relative flex size-12 items-center justify-center overflow-hidden border-2 border-coral bg-coral/10">
                          {/* Central dot */}
                          <div className="relative z-10 size-3 bg-coral shadow-[0_0_10px_rgba(255,107,53,0.8)]" />
                          {/* Sonar rings */}
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 rounded-full border border-coral/50"
                              initial={{ scale: 0, opacity: 1 }}
                              animate={{ scale: 2, opacity: 0 }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "easeOut",
                              }}
                            />
                          ))}
                        </div>
                        <div>
                          <motion.span
                            className="font-mono text-3xl font-black text-coral"
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            24/7
                          </motion.span>
                        </div>
                      </div>
                      {/* Online indicator */}
                      <div className="flex items-center gap-2 border-2 border-coral bg-coral/10 px-3 py-1">
                        <motion.div
                          className="size-2 bg-coral"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="font-mono text-xs font-bold text-coral">
                          ONLINE
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="border-l-4 border-coral pl-4">
                      <motion.p
                        className="text-lg font-bold text-white"
                        animate={{ x: [0, 2, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        Always here
                      </motion.p>
                      <p className="text-sm text-[#a0a0a0]">
                        Ready to help anytime
                      </p>
                    </div>

                    {/* Equalizer */}
                    <div className="mt-4 flex h-6 items-end gap-1">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-linear-to-t from-coral to-coral/50"
                          animate={{
                            height: [
                              "20%",
                              `${40 + Math.random() * 60}%`,
                              "20%",
                            ],
                          }}
                          transition={{
                            duration: 0.8 + Math.random() * 0.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Hover effect */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                    initial={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,107,53,0.1), transparent)",
                      x: "-100%",
                    }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </div>
            </motion.div>
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
                READY TO START?
                <br />
                <span className="text-coral">LET&apos;S CREATE TOGETHER</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
              >
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#333] bg-[#141414] px-8 py-4 font-bold text-white transition-all hover:border-coral hover:text-coral"
                >
                  Explore Services
                </Link>
                <Link
                  href="/open-source"
                  className="btn-retro inline-flex items-center justify-center gap-2 px-8 py-4"
                >
                  Open Source
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