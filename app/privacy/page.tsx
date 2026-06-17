import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | mdesk.tech",
  description: "Read our privacy policy.",
  path: "/privacy",
});

const sections = [
  {
    num: "01",
    title: "Introduction",
    content:
      "At mdesk.tech, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
  },
  {
    num: "02",
    title: "Information We Collect",
    content:
      "We may collect personal information that you voluntarily provide:",
    list: [
      "Contact us through our website",
      "Subscribe to our newsletter",
      "Request a quote or consultation",
    ],
    subsections: [
      {
        title: "Automatically Collected",
        content:
          "When you visit, we automatically collect device information including browser type, operating system, IP address, and page access times.",
      },
    ],
  },
  {
    num: "03",
    title: "How We Use Your Information",
    content: "We use collected information to:",
    list: [
      "Provide and maintain our services",
      "Respond to inquiries and requests",
      "Improve our website and services",
      "Send marketing communications (with consent)",
      "Monitor and analyze usage patterns",
    ],
  },
  {
    num: "04",
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational security measures. However, no method of transmission over the internet is 100% secure.",
  },
  {
    num: "05",
    title: "Your Rights",
    content: "You have the right to:",
    list: [
      "Access your personal information",
      "Correct inaccurate information",
      "Request deletion of your information",
      "Withdraw consent at any time",
      "Object to processing",
    ],
  },
  {
    num: "06",
    title: "Contact Us",
    content:
      "If you have questions about this Privacy Policy, please contact us.",
  },
];

/**
 * Render the site's Privacy Policy page with header, sectioned policy content, and a contact CTA.
 *
 * @returns The JSX element containing the privacy policy layout and content
 */
export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="scanlines absolute inset-0 opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-sm text-[#a0a0a0] transition-colors hover:text-teal"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16 border-b-2 border-teal pb-8">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="flex size-10 items-center justify-center border-2 border-teal">
              <Shield className="size-5 text-teal" />
            </div>
            <span className="font-mono text-sm tracking-wider text-teal uppercase">
              Your Data
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Privacy <span className="text-teal">Policy</span>
          </h1>
          <p className="mt-4 font-mono text-sm text-[#666]">
            Last updated: March 8, 2024
          </p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {sections.map((section) => (
              <div
                key={section.num}
                className="group relative border-l-2 border-[#333] pl-8 transition-colors hover:border-teal"
              >
                {/* Number */}
                <div className="absolute top-0 -left-3 flex size-6 items-center justify-center bg-[#0a0a0a]">
                  <span className="font-mono text-xs text-teal">
                    {section.num}
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                  {section.title}
                </h2>
                <p className="mb-4 text-[#a0a0a0]">{section.content}</p>

                {section.list && (
                  <ul className="mb-4 space-y-2">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-[#a0a0a0]"
                      >
                        <div className="mt-1.5 size-1.5 shrink-0 bg-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections?.map((sub, i) => (
                  <div key={i} className="mt-4">
                    <h3 className="mb-2 font-bold text-white">{sub.title}</h3>
                    <p className="text-sm text-[#a0a0a0]">{sub.content}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 border-2 border-teal bg-[#141414] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">
                  Questions about privacy?
                </h3>
                <p className="text-sm text-[#a0a0a0]">
                  We&apos;re committed to protecting your data.
                </p>
              </div>
              <a
                href="mailto:hello@mdesk.tech"
                className="inline-flex items-center justify-center gap-2 border-2 border-teal bg-teal px-6 py-3 font-bold text-[#0a0a0a] transition-all hover:bg-transparent hover:text-teal"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
