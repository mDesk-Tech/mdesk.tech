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
              <div className="h-20 w-full rounded-lg bg-linear-to-br from-cyan-500/20 to-teal-500/20 border border-primary/20 flex items-center justify-center md:h-44 lg:h-60">
                <Calendar className="h-12 w-12 text-primary" />
              </div>
              <div className="h-20 w-full rounded-lg bg-linear-to-br from-teal-500/20 to-cyan-500/20 border border-primary/20 flex items-center justify-center md:h-44 lg:h-60">
                <Target className="h-12 w-12 text-primary" />
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
              <div className="h-20 w-full rounded-lg bg-linear-to-br from-cyan-500/20 to-teal-500/20 border border-primary/20 flex items-center justify-center md:h-44 lg:h-60">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <div className="h-20 w-full rounded-lg bg-linear-to-br from-teal-500/20 to-cyan-500/20 border border-primary/20 flex items-center justify-center md:h-44 lg:h-60">
                <Award className="h-12 w-12 text-primary" />
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
                <div className="h-2 w-2 rounded-full bg-primary" />
                Started working with clients across Europe, Asia, and North
                America
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Expanded service offerings with cutting-edge technologies
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Grew team to 15+ talented professionals
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Delivered 100+ successful projects
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 w-full rounded-lg bg-linear-to-br from-cyan-500/20 to-teal-500/20 border border-primary/20 flex items-center justify-center md:h-44 lg:h-60">
                <Rocket className="h-12 w-12 text-primary" />
              </div>
              <div className="h-20 w-full rounded-lg bg-linear-to-br from-teal-500/20 to-cyan-500/20 border border-primary/20 flex items-center justify-center md:h-44 lg:h-60">
                <Heart className="h-12 w-12 text-primary" />
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
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background z-0" />
      <div className="absolute inset-0 opacity-20 grid-pattern" />

      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 sm:mb-6">Our Story</Badge>

            <div className="mb-6 sm:mb-8">
              <HyperText className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-foreground">
                ABOUT US
              </HyperText>
            </div>

            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              We&apos;re passionate about creating exceptional digital
              experiences that transform businesses
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 relative overflow-hidden hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Explore Our Story
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
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
                  className={`h-80 w-full rounded-lg bg-linear-to-br ${card.gradient} border border-primary/20 flex flex-col items-center justify-center p-6`}
                >
                  <card.icon className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-neutral-200 text-center text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>
      </section>

      <section className="py-4 sm:py-8 border-y border-border/30 sticky top-14 sm:top-20 bg-background/80 backdrop-blur-md z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "mission", label: "Our Mission" },
              { id: "journey", label: "Our Journey" },
              { id: "values", label: "Our Values" },
              { id: "approach", label: "Our Approach" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap rounded-full text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                  activeSection === tab.id
                    ? "bg-primary/10 text-primary border border-primary/30"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-border/30">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At mdesk.tech, we&apos;re on a mission to transform how
                businesses connect with their audiences in the digital world. We
                believe that exceptional digital experiences are built at the
                intersection of cutting-edge technology, beautiful design, and
                strategic thinking.
              </p>
              <p className="text-muted-foreground mb-8">
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
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Target className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 overflow-hidden">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

                <h3 className="text-xl font-bold mb-4">Why We Exist</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Excellence</h4>
                      <p className="text-sm text-muted-foreground">
                        We&apos;re committed to delivering work that exceeds
                        expectations in every detail.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Partnership</h4>
                      <p className="text-sm text-muted-foreground">
                        We build lasting relationships with our clients based on
                        trust and mutual success.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Innovation</h4>
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
          <div className="max-w-3xl mx-auto text-center mb-12 bg-background/80 backdrop-blur-md py-6 px-8 rounded-lg border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              These core principles guide everything we do, from how we work
              with clients to how we build our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from the code we write to the designs we create.",
                icon: <Heart className="h-6 w-6" />,
                color: "bg-primary/10 text-primary",
              },
              {
                title: "Innovation",
                description:
                  "We embrace new technologies and approaches to solve complex problems and create better solutions.",
                icon: <Target className="h-6 w-6 text-white" />,
                color: "bg-accent/10 text-accent",
              },
              {
                title: "Collaboration",
                description:
                  "We believe the best work happens when diverse perspectives come together toward a common goal.",
                icon: <Users className="h-6 w-6" />,
                color: "bg-primary/10 text-primary",
              },
              {
                title: "Integrity",
                description:
                  "We're honest, transparent, and committed to doing what's right for our clients and our team.",
                icon: <Award className="h-6 w-6 text-white" />,
                color: "bg-accent/10 text-accent",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-background/90 backdrop-blur-md border border-primary/30 rounded-lg p-6 shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${value.color} flex items-center justify-center mb-4`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <h4 className="text-sm font-medium mb-3">
                    How we live this value:
                  </h4>
                  <ul className="space-y-2">
                    {[1, 2, 3].map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary/50 shrink-0" />
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
          <div className="max-w-4xl mx-auto text-center mb-12 bg-background/80 backdrop-blur-md py-6 px-8 rounded-lg border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-muted-foreground">
              We follow a collaborative, client-centered approach to ensure your
              project meets your specific needs and goals.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute left-8 top-8 bottom-8 w-px z-0"
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
                className="relative flex items-start gap-8 mb-12 last:mb-0"
              >
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-linear-to-br from-primary to-accent rounded-full opacity-20 blur-sm" />
                  <div className="relative shrink-0 w-16 h-16 rounded-full bg-background border border-primary/30 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/10 to-accent/10" />
                    <span className="relative z-10 text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="flex-1 pt-3 bg-background/90 backdrop-blur-md rounded-lg p-6 border border-primary/30 shadow-lg">
                  <h3 className="text-xl font-bold mb-2 text-white">
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

      <section className="py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-accent/10" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  Ready to work with us?
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Let&apos;s create something amazing together.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-linear-to-r from-cyan-500 to-teal-500 text-white font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50 whitespace-nowrap touch-manipulation w-full md:w-auto text-sm sm:text-base"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
