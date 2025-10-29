import { Calendar, Users, Award, Target, Rocket, Heart } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SectionHeader } from "@/components/ui/section-header";

const About = () => {
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
      className="py-16 sm:py-20 md:py-32 relative overflow-hidden bg-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Our Story"
          title="About Us"
          description="We're passionate about creating exceptional digital experiences that transform businesses"
          className="mb-12 sm:mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div key={feature.name}>
              <CardSpotlight className="h-full w-full p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary">
                    <feature.Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold relative z-20 text-white">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-neutral-200 mb-4 relative z-20 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <ul className="list-none space-y-2 relative z-20">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-primary mt-1 shrink-0"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                          fill="currentColor"
                          strokeWidth="0"
                        />
                      </svg>
                      <span className="text-white text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardSpotlight>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto p-6 sm:p-8 md:p-10 rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
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
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50 whitespace-nowrap touch-manipulation w-full md:w-auto"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
