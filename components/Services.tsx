import { GlareCard } from "@/components/ui/glare-card";
import { Palette, Code2, Server, TrendingUp } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { SectionHeading } from "@/components/ui/section-heading";
import { memo } from "react";

const services = [
  {
    title: "Web Design",
    description:
      "Custom, responsive designs tailored to your brand identity and user experience goals",
    icon: <Palette className="size-10" />,
    features: [
      "Custom UI/UX Design",
      "Responsive Layouts",
      "Brand Identity",
      "Interactive Prototypes",
    ],
  },
  {
    title: "Web Development",
    description:
      "Robust, scalable web applications built with cutting-edge technologies and best practices",
    icon: <Code2 className="size-10" />,
    features: [
      "React & Next.js",
      "API Integration",
      "Database Design",
      "Performance Optimization",
    ],
  },
  {
    title: "Hosting Solutions",
    description:
      "Reliable, secure hosting infrastructure with 99.9% uptime guarantee and 24/7 monitoring",
    icon: <Server className="size-10" />,
    features: [
      "99.9% Uptime",
      "SSL Certificates",
      "Daily Backups",
      "24/7 Monitoring",
    ],
  },
  {
    title: "SEO Optimization",
    description:
      "Improve your online visibility and search engine rankings with proven strategies",
    icon: <TrendingUp className="size-10" />,
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical Audits",
      "Performance Tracking",
    ],
  },
];

const Services = memo(() => {
  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-32">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="What We Offer"
          title={
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Our <Cover>Services</Cover>
            </span>
          }
          description="We provide comprehensive web solutions to help your business thrive in the digital landscape"
          className="mb-12 sm:mb-20"
        />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="h-auto min-h-[350px] sm:h-[400px]"
            >
              <GlareCard className="flex h-full flex-col items-start justify-between p-6 sm:p-8">
                <div>
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary sm:p-3">
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground sm:mb-3 sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm/relaxed text-muted-foreground sm:mb-6 sm:text-base">
                    {service.description}
                  </p>
                </div>
                <div className="w-full space-y-2">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
                    >
                      <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </GlareCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;
