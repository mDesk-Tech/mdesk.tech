import { Calendar, Users, Award, Target, Rocket, Heart } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SectionHeading } from "@/components/ui/section-heading";
import { memo } from "react";

const About = memo(() => {
  const features = [
    {
      Icon: Target,
      name: "Our Mission",
      description:
        "Empowering businesses with cutting-edge web solutions that drive growth and success.",
      details: [
        "Customer-first approach",
        "Innovation-driven solutions",
        "Long-term partnerships",
        "Measurable results",
      ],
    },
    {
      Icon: Calendar,
      name: "Founded 2023",
      description:
        "Started with a vision to bridge the gap between complex technology and beautiful design.",
      details: [
        "Rapid growth trajectory",
        "Industry recognition",
        "Expanding global presence",
        "Continuous innovation",
      ],
    },
    {
      Icon: Users,
      name: "15+ Team Members",
      description:
        "A diverse team of passionate developers, designers, and strategists.",
      details: [
        "Expert developers",
        "Creative designers",
        "Strategic thinkers",
        "Dedicated support",
      ],
    },
    {
      Icon: Award,
      name: "100+ Projects",
      description:
        "Successfully delivered projects for clients worldwide across various industries.",
      details: [
        "E-commerce platforms",
        "Corporate websites",
        "Web applications",
        "Custom solutions",
      ],
    },
    {
      Icon: Rocket,
      name: "Innovation First",
      description:
        "We stay ahead of the curve with the latest technologies and best practices.",
      details: [
        "Next.js & React",
        "AI integration",
        "Cloud infrastructure",
        "Modern frameworks",
      ],
    },
    {
      Icon: Heart,
      name: "Community Driven",
      description:
        "We contribute to and support open-source and tech communities.",
      details: [
        "Open-source contributions",
        "Knowledge sharing",
        "Mentorship culture",
        "Ethical practices",
      ],
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-muted/20 py-16 sm:py-20 md:py-32"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Our Story"
          title={
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              About Us
            </span>
          }
          description="We're passionate about creating exceptional digital experiences that transform businesses"
          className="mb-12 sm:mb-16 md:mb-20"
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name}>
              <CardSpotlight className="size-full p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary sm:p-3">
                    <feature.Icon className="size-5 sm:size-6" />
                  </div>
                  <h3 className="relative z-20 text-lg font-bold text-white sm:text-xl">
                    {feature.name}
                  </h3>
                </div>
                <p className="relative z-20 mb-4 text-sm/relaxed text-neutral-200">
                  {feature.description}
                </p>
                <ul className="relative z-20 list-none space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mt-1 size-4 shrink-0 text-primary"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                          fill="currentColor"
                          strokeWidth="0"
                        />
                      </svg>
                      <span className="text-sm text-white">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardSpotlight>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 to-accent/5 p-6 backdrop-blur-sm sm:mt-16 sm:p-8 md:mt-20 md:p-10">
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
            <a
              href="#contact"
              className="inline-flex w-full touch-manipulation items-center justify-center rounded-full bg-primary px-6 py-3 font-bold whitespace-nowrap text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50 sm:px-8 sm:py-4 md:w-auto"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
