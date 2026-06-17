"use client";

import { Mail, ArrowRight, Send, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

const Contact = memo(() => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0a0a] py-16 sm:py-20 md:py-32"
    >
      {/* Background */}
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="scanlines absolute inset-0 opacity-20" />
      <div className="noise absolute inset-0" />

      {/* Decorations */}
      <div className="absolute top-0 left-0 hidden size-32 border-r-2 border-b-2 border-coral/20 lg:block" />
      <div className="absolute right-0 bottom-0 hidden size-32 border-t-2 border-l-2 border-teal/20 lg:block" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16 md:mb-20">
          <div className="mb-4 inline-flex items-center gap-2">
            <div className="size-2 bg-coral" />
            <span className="font-mono text-xs tracking-wider text-coral uppercase">
              Let&apos;s Connect
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#a0a0a0]">
            Have a project in mind? Send us a message and we&apos;ll get back to
            you within 24 hours.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <div className="group relative overflow-hidden border-2 border-[#333] bg-[#141414] p-6 transition-all duration-300 hover:border-coral sm:p-8">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: "6px 6px 0 0 rgba(255, 107, 53, 0.2)" }}
            />
            <div className="relative">
              <div className="mb-4 inline-flex border-2 border-coral p-3 text-coral transition-transform group-hover:scale-110">
                <Mail className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Email</h3>
              <p className="mb-4 text-sm text-[#a0a0a0]">
                Send us an email anytime
              </p>
              <a
                href="mailto:hello@mdesk.tech"
                className="inline-flex items-center gap-2 font-mono text-sm text-coral transition-all group-hover:gap-3"
              >
                hello@mdesk.tech
                <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="absolute -right-1 -bottom-1 size-4 bg-coral opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Chat */}
          <div className="group relative overflow-hidden border-2 border-[#333] bg-[#141414] p-6 transition-all duration-300 hover:border-teal sm:p-8">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: "6px 6px 0 0 rgba(0, 212, 170, 0.2)" }}
            />
            <div className="relative">
              <div className="mb-4 inline-flex border-2 border-teal p-3 text-teal transition-transform group-hover:scale-110">
                <MessageSquare className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Live Chat</h3>
              <p className="mb-4 text-sm text-[#a0a0a0]">
                Instant response during work hours
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-sm text-teal">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-teal"></span>
                </span>
                Online now
              </span>
            </div>
            <div className="absolute -right-1 -bottom-1 size-4 bg-teal opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Location */}
          <div className="group relative overflow-hidden border-2 border-[#333] bg-[#141414] p-6 transition-all duration-300 hover:border-amber sm:col-span-2 sm:p-8 lg:col-span-1">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: "6px 6px 0 0 rgba(255, 184, 0, 0.2)" }}
            />
            <div className="relative">
              <div className="mb-4 inline-flex border-2 border-amber p-3 text-amber transition-transform group-hover:scale-110">
                <MapPin className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">Location</h3>
              <p className="mb-4 text-sm text-[#a0a0a0]">
                Remote-first, worldwide
              </p>
              <span className="font-mono text-sm text-amber">
                Available globally
              </span>
            </div>
            <div className="absolute -right-1 -bottom-1 size-4 bg-amber opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-12 max-w-3xl text-center sm:mt-16">
          <div className="relative overflow-hidden border-2 border-coral bg-[#141414] p-6 sm:p-8 md:p-10">
            {/* Corners */}
            <div className="absolute top-0 left-0 size-4 bg-coral" />
            <div className="absolute top-0 right-0 size-4 bg-teal" />
            <div className="absolute bottom-0 left-0 size-4 bg-teal" />
            <div className="absolute right-0 bottom-0 size-4 bg-coral" />

            <Send className="mx-auto mb-4 size-10 text-coral sm:size-12" />
            <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
              Ready to get started?
            </h3>
            <p className="mb-6 px-4 text-sm text-[#a0a0a0] sm:text-base">
              Let&apos;s discuss your project and see how we can help you
              achieve your goals.
            </p>
            <Link
              href="/contact"
              className="btn-retro inline-flex items-center gap-2 px-8 py-4"
            >
              Start a Project
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
