import { Mail, ArrowRight, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { memo } from "react";

const Contact = memo(() => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-muted/20 py-16 sm:py-20 md:py-32"
    >
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background via-primary/5 to-background" />
      <div className="grid-pattern absolute inset-0 z-0 opacity-20" />
      <div className="noise absolute inset-0 z-0" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Let's Connect"
          title={
            <span className="animate-fade-up inline-block delay-100">
              Get in Touch
            </span>
          }
          description={
            <>
              Ready to start your next project?
              <br />
              We&apos;d love to hear from you and discuss how we can help bring
              your vision to life.
            </>
          }
          className="mb-12 sm:mb-16 md:mb-20"
        />

        <div className="mx-auto max-w-5xl gap-6 text-center">
          <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 sm:p-8">
            <div className="mb-4 inline-flex w-fit rounded-2xl bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110 sm:p-4">
              <Mail className="size-5 sm:size-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary sm:text-xl">
              Email
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Send us an email anytime
            </p>
            <a
              href="mailto:hello@mdesk.tech"
              className="inline-flex touch-manipulation items-center text-sm font-semibold break-all text-primary transition-all group-hover:gap-2 sm:text-base"
            >
              hello@mdesk.tech
              <ArrowRight className="ml-1 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center sm:mt-16">
          <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-transparent p-6 backdrop-blur-sm sm:p-8 md:p-10">
            <Send className="mx-auto mb-4 size-10 text-primary sm:size-12" />
            <h3 className="mb-3 text-xl font-bold sm:text-2xl">
              Ready to get started?
            </h3>
            <p className="mb-6 px-4 text-sm text-muted-foreground sm:text-base">
              Let&apos;s discuss your project and see how we can help you
              achieve your goals.
            </p>
            <a
              href="mailto:hello@mdesk.tech"
              className="inline-flex touch-manipulation items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90 sm:px-8 sm:py-4 sm:text-base"
            >
              Send us a message
              <ArrowRight className="size-4 sm:size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
