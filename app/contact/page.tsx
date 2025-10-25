"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Globe,
} from "lucide-react";
import { useState, useCallback } from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ShineBorder } from "@/components/ui/shine-border";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    isOpenSourceForm: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
          isOpenSourceForm: false,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to send message. Please try again later.",
        );
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12">
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-semibold text-primary">
                  Get in touch
                </span>
              </div>

              <div className="mb-6 sm:mb-8">
                <div className="block sm:hidden">
                  <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                    CONTACT
                  </h1>
                </div>
                <div className="hidden sm:block">
                  <TextHoverEffect text="CONTACT" />
                </div>
              </div>

              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg">
                Have a project in mind or just want to say hello? We&apos;d love
                to hear from you.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4 mb-6 sm:mb-8">
                <motion.div
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary border">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Email us at
                    </div>
                    <div className="font-medium text-sm sm:text-base break-all">
                      hello@mdesk.tech
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <h3 className="text-base sm:text-lg font-semibold">
                      We Work Remotely!
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Our team is distributed across the globe, serving clients
                    worldwide without geographical limitations.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 rounded-2xl" />

                <div className="relative z-10">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-8 sm:py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-linear-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
                        Thank you for reaching out. We&apos;ll get back to you
                        as soon as possible.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium transition-all hover:scale-105 touch-manipulation text-sm sm:text-base"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-5 sm:mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold">
                          Send us a message
                        </h2>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-xs sm:text-sm font-medium mb-2"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              required
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm sm:text-base"
                              placeholder="Your name"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-xs sm:text-sm font-medium mb-2"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              required
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm sm:text-base"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-xs sm:text-sm font-medium mb-2"
                          >
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm sm:text-base"
                            placeholder="What's this about?"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-xs sm:text-sm font-medium mb-2"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-sm sm:text-base"
                            placeholder="Tell us about your project..."
                          />
                        </div>

                        {error && (
                          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-linear-to-r from-cyan-500 to-teal-500 text-white font-medium transition-all hover:scale-105 disabled:opacity-70 touch-manipulation text-sm sm:text-base"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
