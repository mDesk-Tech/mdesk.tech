"use client";
import { Github, Heart, Rocket, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HyperText } from "@/components/ui/hyper-text";
import { Cover } from "@/components/ui/cover";
import { Badge } from "@/components/ui/badge";
import InView from "@/components/InView";

const benefits = [
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Boost Your Project",
    description:
      "Get professional web development services completely free for your open source project",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Grow Your Community",
    description:
      "A polished website helps attract more contributors and users to your project",
  },
  {
    icon: <Heart className="h-8 w-8" />,
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
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-background to-teal-500/10" />

        {/* Animated background elements (CSS only) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-blob-a" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-blob-b" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <InView className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8" icon={<Github className="h-4 w-4" />}>
              Supporting Open Source
            </Badge>

            <h1 className="text-6xl md:text-8xl font-black mb-8">
              <HyperText
                text="OPEN SOURCE"
                className="text-6xl md:text-8xl font-black"
              />
            </h1>

            <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              We offer <Cover>free website development</Cover> for selected open
              source projects. Help us give back to the community that powers
              innovation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 to-teal-500 text-white font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                Apply for Free Development
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://github.com/mdesk-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary/20 bg-background/50 backdrop-blur-sm font-bold transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <Github className="mr-2 h-5 w-5" />
                View Our Projects
              </a>
            </div>
          </InView>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />

        <div className="container mx-auto px-6 relative z-10">
          <InView className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Apply?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Here&apos;s what you get when we partner with your open source
              project
            </p>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <InView key={index} delay={index * 0.1} className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-linear-to-br from-cyan-500/10 to-teal-500/10 border border-primary/20 mb-6">
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-teal-500/10" />

        <div className="container mx-auto px-6 relative z-10">
          <InView className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Apply?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tell us about your open source project and how a professional
              website could help your community grow
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 to-teal-500 text-white font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </InView>
        </div>
      </section>
    </div>
  );
}