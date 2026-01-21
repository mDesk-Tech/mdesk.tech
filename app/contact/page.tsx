"use client";

import { useCallback, useState, Suspense } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Mail,
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
const TextHoverEffect = dynamic(
  () =>
    import("@/components/ui/text-hover-effect").then((m) => m.TextHoverEffect),
  { ssr: false },
);
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";

/**
 * Contact page component that renders contact information and a message form.
 *
 * The component manages form state, submits messages to the "/api/contact" endpoint,
 * and displays submission status and errors. On successful send it shows a confirmation
 * view and allows sending another message.
 *
 * @returns The rendered contact page React element.
 */
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

  // Shared form/confirmation content used for both mobile and desktop variants
  const formContent = (
    <div className="relative z-10 p-6 sm:p-8">
      {isSubmitted ? (
        <div className="animate-fade-up py-8 text-center delay-0 sm:py-12">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-accent/20 sm:mb-6 sm:size-20">
            <CheckCircle className="size-8 text-primary sm:size-10" />
          </div>
          <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
            Message Sent!
          </h3>
          <p className="mx-auto mb-6 max-w-md px-4 text-sm text-muted-foreground sm:mb-8 sm:text-base">
            Thank you for reaching out. We&apos;ll get back to you as soon as
            possible.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="inline-flex touch-manipulation items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 sm:px-6 sm:py-3 sm:text-base"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          <div
            className="mb-5 flex items-center gap-3 sm:mb-6"
            data-lcp-element="true"
          >
            <div className="rounded-lg bg-primary/10 p-2">
              <MessageSquare className="size-4 text-primary sm:size-5" />
            </div>
            <h3 className="text-lg font-bold sm:text-xl">Send us a message</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium sm:text-sm"
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
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:px-4 sm:py-3 sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium sm:text-sm"
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
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:px-4 sm:py-3 sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-xs font-medium sm:text-sm"
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
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:px-4 sm:py-3 sm:text-base"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium sm:text-sm"
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
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:px-4 sm:py-3 sm:text-base"
                placeholder="Tell us about your project..."
              />
            </div>

            {error && (
              <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive sm:text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full touch-manipulation items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 disabled:opacity-70 sm:px-6 sm:py-3 sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 size-4 animate-spin text-white"
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
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
        <div className="grid-pattern absolute inset-0 opacity-20" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start gap-8 sm:gap-12 lg:flex-row">
            <div className="animate-fade-up w-full delay-0 lg:w-1/2">
              <Badge className="mb-4 sm:mb-6">Get in touch</Badge>

              <div className="mb-6 sm:mb-8">
                <div className="block sm:hidden">
                  <h1
                    data-lcp-element="true"
                    className="bg-linear-to-r from-primary to-accent bg-clip-text text-4xl font-black text-transparent"
                  >
                    CONTACT
                  </h1>
                </div>
                <div className="hidden h-52 sm:block">
                  <Suspense fallback={<div className="h-52" />}>
                    {/* Keep semantic h1 for desktop while using decorative SVG text */}
                    <h1 className="sr-only">CONTACT</h1>
                    <TextHoverEffect text="CONTACT" />
                  </Suspense>
                </div>
              </div>

              <p className="mb-6 max-w-lg text-base text-muted-foreground sm:mb-8 sm:text-lg">
                Have a project in mind or just want to say hello?
                <br />
                We&apos;d love to hear from you
              </p>

              {/* Contact Info Cards */}
              <div className="mb-6 space-y-4 sm:mb-8">
                <div className="animate-fade-up flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-colors delay-300 sm:gap-4 sm:p-4">
                  <div className="rounded-full border bg-primary/10 p-2 text-primary sm:p-3">
                    <Mail className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground sm:text-sm">
                      Email us at
                    </div>
                    <div className="text-sm font-medium break-all sm:text-base">
                      hello@mdesk.tech
                    </div>
                  </div>
                </div>

                <div className="animate-fade-up rounded-xl border border-primary/20 bg-linear-to-br from-primary/10 to-accent/10 p-4 delay-400 sm:p-6">
                  <div className="mb-3 flex items-center gap-3 sm:mb-4">
                    <Globe className="size-4 text-primary sm:size-5" />
                    <h2 className="text-base font-semibold sm:text-lg">
                      We Work Remotely!
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    Our team is distributed across the globe, serving clients
                    worldwide without geographical limitations.
                  </p>
                </div>
              </div>
            </div>

            <div className="animate-fade-up w-full border-none delay-100 lg:w-1/2">
              <Card className="relative overflow-hidden rounded-2xl border-none bg-card p-0">
                <MagicCard
                  gradientColor={"gray"}
                  gradientSize={250}
                  gradientOpacity={0.3}
                  gradientFrom="#00b9d7"
                  gradientTo="#00bcab"
                  className="p-0"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-accent/5" />

                  {formContent}
                </MagicCard>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
