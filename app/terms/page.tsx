import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | mdesk.tech",
  description: "Read our terms of service.",
  path: "/terms",
});

const sections = [
  {
    num: "01",
    title: "Agreement to Terms",
    content:
      "By accessing or using mdesk.tech, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
  },
  {
    num: "02",
    title: "Use License",
    content:
      "Permission is granted to temporarily access the materials on mdesk.tech for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
    list: [
      "Modify or copy the materials",
      "Use the materials for any commercial purpose",
      "Attempt to decompile or reverse engineer any software",
      "Remove any copyright or proprietary notations",
      "Transfer materials to another person",
    ],
  },
  {
    num: "03",
    title: "Services",
    content:
      "We provide web design, development, and hosting services. The specific details, deliverables, and terms of each service will be outlined in separate service agreements or statements of work.",
  },
  {
    num: "04",
    title: "Payment Terms",
    content:
      "Payment terms will be specified in individual service agreements. Unless otherwise stated, invoices are due within 30 days of receipt.",
  },
  {
    num: "05",
    title: "Intellectual Property",
    content:
      "All content, features, and functionality on mdesk.tech are owned by mdesk.tech and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    num: "06",
    title: "Disclaimer",
    content:
      "The materials on mdesk.tech are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.",
  },
  {
    num: "07",
    title: "Limitations",
    content:
      "In no event shall mdesk.tech or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.",
  },
  {
    num: "08",
    title: "Governing Law",
    content:
      "These terms are governed by applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
  },
  {
    num: "09",
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. Your continued use of the site after changes constitutes acceptance.",
  },
];

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="scanlines absolute inset-0 opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-sm text-[#a0a0a0] transition-colors hover:text-coral"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16 border-b-2 border-coral pb-8">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="flex size-10 items-center justify-center border-2 border-coral">
              <FileText className="size-5 text-coral" />
            </div>
            <span className="font-mono text-sm tracking-wider text-coral uppercase">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Terms of <span className="text-coral">Service</span>
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
                className="group relative border-l-2 border-[#333] pl-8 transition-colors hover:border-coral"
              >
                {/* Number */}
                <div className="absolute top-0 -left-3 flex size-6 items-center justify-center bg-[#0a0a0a]">
                  <span className="font-mono text-xs text-coral">
                    {section.num}
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                  {section.title}
                </h2>
                <p className="mb-4 text-[#a0a0a0]">{section.content}</p>

                {section.list && (
                  <ul className="space-y-2">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-[#a0a0a0]"
                      >
                        <div className="mt-1.5 size-1.5 shrink-0 bg-coral" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 border-2 border-coral bg-[#141414] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">
                  Questions about these terms?
                </h3>
                <p className="text-sm text-[#a0a0a0]">
                  We&apos;re here to help clarify anything.
                </p>
              </div>
              <a
                href="mailto:hello@mdesk.tech"
                className="inline-flex items-center justify-center gap-2 border-2 border-coral bg-coral px-6 py-3 font-bold text-[#0a0a0a] transition-all hover:bg-transparent hover:text-coral"
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
