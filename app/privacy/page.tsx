"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">Last updated: March 8, 2024</p>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                At mdesk.tech, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                2.1 Personal Information
              </h3>
              <p>
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Contact us through our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a quote or consultation</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                2.2 Automatically Collected Information
              </h3>
              <p>
                When you visit our website, we automatically collect certain
                information about your device, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Page access times and dates</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Improve our website and services</li>
                <li>
                  Send you marketing and promotional communications (with your
                  consent)
                </li>
                <li>Monitor and analyze usage patterns and trends</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security
                measures to protect your information. However, please note that
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw your consent at any time</li>
                <li>Object to processing of your information</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:hello@mdesk.tech"
                  className="text-cyan-400 hover:text-teal-400 underline transition-colors"
                >
                  hello@mdesk.tech
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
