"use client";
import {
  Calendar,
  Users,
  Award,
  Target,
  Rocket,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HyperText } from "@/components/ui/hyper-text";
import { Timeline } from "@/components/ui/timeline";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { Badge } from "@/components/ui/badge";

/**
 * Renders the About page including an interactive draggable-card story section, a sticky tab bar to switch
 * between "Our Mission", "Our Journey", "Our Values", and "Our Approach" sections, a memoized timeline,
 * a values grid, a step-by-step approach list, and a final call-to-action.
 *
 * @returns The About page JSX element
 */
export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("mission");

  const draggableCards = [
    {
      title: "Our Mission",
      icon: Target,
      description:
        "Empowering businesses with cutting-edge web solutions that drive growth and success",
      gradient: "from-cyan-500/20 to-teal-500/20",
    },
    {
      title: "Founded 2023",
      icon: Calendar,
      description:
        "Started with a vision to bridge the gap between complex technology and beautiful design",
      gradient: "from-teal-500/20 to-cyan-500/20",
    },
    {
      title: "15+ Team Members",
      icon: Users,
      description:
        "A diverse team of passionate developers, designers, and strategists",
      gradient: "from-cyan-500/20 to-teal-500/20",
    },
    {
      title: "100+ Projects",
      icon: Award,
      description:
        "Successfully delivered projects for clients worldwide across various industries",
      gradient: "from-teal-500/20 to-cyan-500/20",
    },
    {
      title: "Innovation First",
      icon: Rocket,
      description:
        "We stay ahead of the curve with the latest technologies and best practices",
      gradient: "from-cyan-500/20 to-teal-500/20",
    },
  ];

  const timelineData = useMemo(
    () => [
      {
        title: "2023",
        content: (
          <div>
            <p className="mb-8 text-xs font-normal text-muted-foreground md:text-sm">
              mdesk.tech was founded with a vision to create exceptional digital
              experiences that transform businesses.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-primary/20 bg-linear-to-br from-cyan-500/20 to-teal-500/20 md:h-44 lg:h-60">
                <Calendar className="size-12 text-primary" />
              </div>
              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-primary/20 bg-linear-to-br from-teal-500/20 to-cyan-500/20 md:h-44 lg:h-60">
                <Target className="size-12 text-primary" />
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Early 2023",
        content: (
          <div>
            <p className="mb-4 text-xs font-normal text-muted-foreground md:text-sm">
              Secured our first major client and delivered a project that
              exceeded expectations.
            </p>
            <p className="mb-8 text-xs font-normal text-muted-foreground md:text-sm">
              Established our remote-first culture, enabling us to work with
              talent worldwide.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-primary/20 bg-linear-to-br from-cyan-500/20 to-teal-500/20 md:h-44 lg:h-60">
                <Users className="size-12 text-primary" />
              </div>
              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-primary/20 bg-linear-to-br from-teal-500/20 to-cyan-500/20 md:h-44 lg:h-60">
                <Award className="size-12 text-primary" />
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "2024",
        content: (
          <div>
            <p className="mb-4 text-xs font-normal text-muted-foreground md:text-sm">
              Major milestones achieved this year
            </p>
            <div className="mb-8 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <div className="size-2 rounded-full bg-primary" />
                Started working with clients across Europe, Asia, and North
                America
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <div className="size-2 rounded-full bg-primary" />
                Expanded service offerings with cutting-edge technologies
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <div className="size-2 rounded-full bg-primary" />
                Grew team to 15+ talented professionals
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <div className="size-2 rounded-full bg-primary" />
                Delivered 100+ successful projects
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-primary/20 bg-linear-to-br from-cyan-500/20 to-teal-500/20 md:h-44 lg:h-60">
                <Rocket className="size-12 text-primary" />
              </div>
              <div className="flex h-20 w-full items-center justify-center rounded-lg border border-primary/20 bg-linear-to-br from-teal-500/20 to-cyan-500/20 md:h-44 lg:h-60">
                <Heart className="size-12 text-primary" />
              </div>
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We start by understanding your business, goals, and audience to ensure our solution addresses your specific needs.",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "Based on our findings, we develop a comprehensive strategy that outlines the approach, technologies, and timeline.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Our designers create intuitive, engaging interfaces that reflect your brand and resonate with your audience.",
    },
    {
      number: "04",
      title: "Development",
      description:
        "Our development team brings the designs to life with clean, efficient code and cutting-edge technologies.",
    },
    {
      number: "05",
      title: "Testing & Launch",
      description:
        "We rigorously test every aspect of your project before launch to ensure a flawless user experience.",
    },
    {
      number: "06",
      title: "Ongoing Support",
      description:
        "Our relationship doesn't end at launch. We provide ongoing support and optimization to ensure long-term success.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-primary/5 via-background to-background" />
      <div
        className="grid-pattern absolute inset-0 hidden opacity-20 sm:block"
        aria-hidden="true"
      />

      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div
            className="mx-auto max-w-4xl text-center"
            data-lcp-element="true"
            data-priority="high"
          >
            <Badge className="mb-4 sm:mb-6">Our Story</Badge>

            <div className="mb-6 sm:mb-8">
              <h1 className="sr-only text-3xl font-black text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
                ABOUT US
              </h1>
              <HyperText
                startOnView
                delay={800}
                className="text-3xl font-black text-foreground sm:text-4xl md:text-6xl lg:text-7xl"
                aria-hidden="true"
              >
                ABOUT US
              </HyperText>
            </div>

            <p className="mx-auto max-w-2xl px-4 text-base/relaxed text-muted-foreground sm:text-xl">
              We&apos;re passionate about creating exceptional digital
              experiences that transform businesses
            </p>
          </div>
        </div>
      </section>

      <section className="relative hidden overflow-hidden py-12 sm:py-20 md:block">
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Explore Our Story
            </h2>
            <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:text-base">
              Drag the cards around to explore different aspects of our company
              <br />
              They&apos;re interactive and fun to play with
            </p>
          </div>

          <DraggableCardContainer className="relative flex min-h-[600px] w-full items-center justify-center overflow-clip">
            {draggableCards.map((card, index) => (
              <DraggableCardBody
                key={card.title}
                className={`absolute ${
                  index === 0
                    ? "top-10 left-[10%] rotate-[-5deg]"
                    : index === 1
                      ? "top-40 left-[20%] rotate-[-7deg]"
                      : index === 2
                        ? "top-5 left-[40%] rotate-[8deg]"
                        : index === 3
                          ? "top-32 left-[55%] rotate-10"
                          : "top-20 right-[20%] rotate-2"
                }`}
              >
                <div
                  className={`h-80 w-full rounded-lg bg-linear-to-br ${card.gradient} flex flex-col items-center justify-center border border-primary/20 p-6`}
                >
                  <card.icon className="mb-4 size-16 text-primary" />
                  <h3 className="mb-3 text-center text-2xl font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="text-center text-sm/relaxed text-neutral-200">
                    {card.description}
                  </p>
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>
      </section>

      <section className="sticky top-14 z-20 border-y border-border/30 bg-background/80 py-4 backdrop-blur-md sm:top-20 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="scrollbar-hide flex space-x-1 overflow-x-auto pb-2">
            {[
              { id: "mission", label: "Our Mission" },
              { id: "journey", label: "Our Journey" },
              { id: "values", label: "Our Values" },
              { id: "approach", label: "Our Approach" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`touch-manipulation rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-all sm:px-5 sm:py-2.5 sm:text-sm ${
                  activeSection === tab.id
                    ? "border border-primary/30 bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        id="mission"
        className={`py-16 ${activeSection === "mission" ? "block" : "hidden"}`}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="rounded-lg border border-border/30 bg-background/80 p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
              <p className="mb-6 text-muted-foreground">
                At mdesk.tech, we&apos;re on a mission to transform how
                businesses connect with their audiences in the digital world. We
                believe that exceptional digital experiences are built at the
                intersection of cutting-edge technology, beautiful design, and
                strategic thinking.
              </p>
              <p className="mb-8 text-muted-foreground">
                We&apos;re committed to creating digital solutions that not only
                look stunning but also drive real business results. Our approach
                combines technical expertise with creative innovation to deliver
                websites and applications that stand out in today&apos;s crowded
                digital landscape.
              </p>

              <div className="space-y-4">
                {[
                  "Create exceptional digital experiences that drive growth",
                  "Empower businesses with technology that works for them",
                  "Build long-term partnerships based on trust and results",
                  "Push the boundaries of what's possible in web design and development",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Target className="size-3 text-primary" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/80 p-8 backdrop-blur-sm">
                <div className="absolute -top-20 -right-20 size-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-accent/10 blur-3xl" />

                <h3 className="mb-4 text-xl font-bold">Why We Exist</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Heart className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">Excellence</h4>
                      <p className="text-sm text-muted-foreground">
                        We&apos;re committed to delivering work that exceeds
                        expectations in every detail.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Users className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">Partnership</h4>
                      <p className="text-sm text-muted-foreground">
                        We build lasting relationships with our clients based on
                        trust and mutual success.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Rocket className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">Innovation</h4>
                      <p className="text-sm text-muted-foreground">
                        We constantly explore new technologies and approaches to
                        solve complex problems and create better solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="journey"
        className={`py-16 ${activeSection === "journey" ? "block" : "hidden"}`}
      >
        <Timeline data={timelineData} />
      </section>

      <section
        id="values"
        className={`py-16 ${activeSection === "values" ? "block" : "hidden"}`}
      >
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-3xl rounded-lg border border-primary/20 bg-background/80 px-8 py-6 text-center backdrop-blur-md">
            <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground">
              These core principles guide everything we do, from how we work
              with clients to how we build our team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from the code we write to the designs we create.",
                icon: <Heart className="size-6" />,
                color: "bg-primary/10 text-primary",
              },
              {
                title: "Innovation",
                description:
                  "We embrace new technologies and approaches to solve complex problems and create better solutions.",
                icon: <Target className="size-6 text-white" />,
                color: "bg-accent/10 text-accent",
              },
              {
                title: "Collaboration",
                description:
                  "We believe the best work happens when diverse perspectives come together toward a common goal.",
                icon: <Users className="size-6" />,
                color: "bg-primary/10 text-primary",
              },
              {
                title: "Integrity",
                description:
                  "We're honest, transparent, and committed to doing what's right for our clients and our team.",
                icon: <Award className="size-6 text-white" />,
                color: "bg-accent/10 text-accent",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-lg border border-primary/30 bg-background/90 p-6 shadow-lg backdrop-blur-md"
              >
                <div
                  className={`size-12 rounded-lg ${value.color} mb-4 flex items-center justify-center`}
                >
                  {value.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>

                <div className="mt-6 border-t border-border/50 pt-6">
                  <h4 className="mb-3 text-sm font-medium">
                    How we live this value:
                  </h4>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="mt-1 size-2 shrink-0 rounded-full bg-primary/50" />
                        <span className="text-sm text-gray-300">
                          {index === 0 &&
                            i === 0 &&
                            "Rigorous code reviews and quality assurance"}
                          {index === 0 &&
                            i === 1 &&
                            "Continuous learning and skill development"}
                          {index === 0 &&
                            i === 2 &&
                            "Attention to detail in every deliverable"}

                          {index === 1 &&
                            i === 0 &&
                            "Exploring emerging technologies"}
                          {index === 1 &&
                            i === 1 &&
                            "Regular innovation workshops"}
                          {index === 1 &&
                            i === 2 &&
                            "Encouraging creative problem-solving"}

                          {index === 2 &&
                            i === 0 &&
                            "Cross-functional team collaboration"}
                          {index === 2 &&
                            i === 1 &&
                            "Open and transparent communication"}
                          {index === 2 &&
                            i === 2 &&
                            "Valuing diverse perspectives"}

                          {index === 3 &&
                            i === 0 &&
                            "Honest client relationships"}
                          {index === 3 &&
                            i === 1 &&
                            "Ethical business practices"}
                          {index === 3 &&
                            i === 2 &&
                            "Taking responsibility for our work"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="approach"
        className={`py-16 ${activeSection === "approach" ? "block" : "hidden"}`}
      >
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-4xl rounded-lg border border-primary/20 bg-background/80 px-8 py-6 text-center backdrop-blur-md">
            <h2 className="mb-4 text-3xl font-bold">Our Approach</h2>
            <p className="text-muted-foreground">
              We follow a collaborative, client-centered approach to ensure your
              project meets your specific needs and goals.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl">
            <div
              className="absolute top-8 bottom-8 left-8 z-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--primary)) 50%, transparent 50%)",
                backgroundSize: "1px 8px",
                opacity: 0.6,
              }}
            />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative mb-12 flex items-start gap-8 last:mb-0"
              >
                <div className="relative z-10">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-accent opacity-20 blur-sm" />
                  <div className="relative flex size-16 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background">
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/10 to-accent/10" />
                    <span className="relative z-10 bg-linear-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="flex-1 rounded-lg border border-primary/30 bg-background/90 p-6 pt-3 shadow-lg backdrop-blur-md">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                  <div className="mt-4 h-1 w-24 rounded-full bg-linear-to-r from-primary/40 to-accent/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-20">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-accent/10" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 to-accent/5 p-6 backdrop-blur-sm sm:p-8 md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="mb-2 flex items-center gap-3 text-2xl font-bold sm:text-3xl">
                  <Heart className="size-6 text-primary sm:size-8" />
                  Ready to work with us?
                </h3>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Let&apos;s create something amazing together.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex w-full touch-manipulation items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-teal-500 px-6 py-3 text-sm font-bold whitespace-nowrap text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50 sm:px-8 sm:py-4 sm:text-base md:w-auto"
              >
                Get in Touch
                <ArrowRight className="ml-2 size-4 sm:size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
