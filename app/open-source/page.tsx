"use client";
import { Github, Heart, Rocket, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HyperText } from "@/components/ui/hyper-text";
import { Cover } from "@/components/ui/cover";
import { Badge } from "@/components/ui/badge";
import InView from "@/components/InView";

const benefits = [
  {
    icon: <Rocket className="size-8" />,
    title: "Boost Your Project",
    description:
      "Get professional web development services completely free for your open source project",
  },
  {
    icon: <Users className="size-8" />,
    title: "Grow Your Community",
    description:
      "A polished website helps attract more contributors and users to your project",
  },
  {
    icon: <Heart className="size-8" />,
    title: "Give Back",
    description:
      "We believe in supporting the open source community that has given us so much",
  },
];

/**
 * Open Source landing page component promoting free website development for selected projects.
 *
 * @returns A React element rendering the page's hero, benefits, and call-to-action sections.
 */
export default function OpenSourcePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-background to-teal-500/10" />

        {/* Animated background elements (CSS only) */}
        <div
          className="absolute inset-0 hidden overflow-hidden md:block"
          aria-hidden="true"
        >
          <div className="animate-blob-a absolute top-20 left-10 size-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="animate-blob-b absolute right-10 bottom-20 size-96 rounded-full bg-teal-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div
            className="mx-auto max-w-5xl text-center"
            data-lcp-element="true"
            data-priority="high"
          >
            <Badge className="mb-8" icon={<Github className="size-4" />}>
              Supporting Open Source
            </Badge>

            <h1 className="mb-8 text-6xl font-black md:text-8xl">
              <HyperText
                text="OPEN SOURCE"
                className="text-6xl font-black md:text-8xl"
              />
            </h1>

            <p className="mx-auto mb-12 max-w-3xl text-2xl/relaxed text-muted-foreground">
              We offer <Cover>free website development</Cover> for selected open
              source projects. Help us give back to the community that powers
              innovation
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-teal-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                Apply for Free Development
                <ArrowRight className="ml-2 size-5" />
              </Link>
              <a
                href="https://github.com/mdesk-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 bg-background/50 px-8 py-4 font-bold backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <Github className="mr-2 size-5" />
                View Our Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />

        <div className="relative z-10 container mx-auto px-6">
          <InView className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Why Apply?</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Here&apos;s what you get when we partner with your open source
              project
            </p>
          </InView>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <InView key={index} delay={index * 0.1} className="text-center">
                <div className="mb-6 inline-flex rounded-2xl border border-primary/20 bg-linear-to-br from-cyan-500/10 to-teal-500/10 p-4">
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <h3 className="mb-3 text-2xl font-bold">{benefit.title}</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-teal-500/10" />

        <div className="relative z-10 container mx-auto px-6">
          <InView className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              Ready to Apply?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Tell us about your open source project and how a professional
              website could help your community grow
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-teal-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              Get Started Today
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </InView>
        </div>
      </section>
    </div>
  );
}
