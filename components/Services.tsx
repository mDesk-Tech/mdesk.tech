import { GlareCard } from "@/components/ui/glare-card";
import { Palette, Code2, Server, TrendingUp } from "lucide-react";
import { Cover } from "@/components/ui/cover";

const services = [
  {
    title: "Web Design",
    description:
      "Custom, responsive designs tailored to your brand identity and user experience goals",
    icon: <Palette className="h-10 w-10" />,
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
    icon: <Code2 className="h-10 w-10" />,
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
    icon: <Server className="h-10 w-10" />,
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
    icon: <TrendingUp className="h-10 w-10" />,
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical Audits",
      "Performance Tracking",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-semibold text-primary">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              Our <Cover>Services</Cover>
            </span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-4">
            We provide comprehensive web solutions to help your business thrive
            in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="h-auto min-h-[350px] sm:h-[400px]"
            >
              <GlareCard className="flex flex-col items-start justify-between p-6 sm:p-8 h-full">
                <div>
                  <div className="inline-flex p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="space-y-2 w-full">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
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
};

export default Services;
