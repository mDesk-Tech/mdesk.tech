import { Mail, ArrowRight, Send } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { SectionHeader } from "@/components/ui/section-header";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 md:py-32 relative overflow-hidden bg-muted/20"
    >
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background z-0" />
      <div className="absolute inset-0 grid-pattern opacity-20 z-0" />
      <div className="absolute inset-0 noise z-0" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Let's Connect"
          title={
            <TextAnimate animation="blurInUp" by="character" once>
              Get in Touch
            </TextAnimate>
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

        <div className="max-w-5xl mx-auto text-center gap-6">
          <div className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              Email
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Send us an email anytime
            </p>
            <a
              href="mailto:hello@mdesk.tech"
              className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all text-sm sm:text-base break-all touch-manipulation"
            >
              hello@mdesk.tech
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 text-center">
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-transparent backdrop-blur-sm">
            <Send className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base px-4">
              Let&apos;s discuss your project and see how we can help you
              achieve your goals.
            </p>
            <a
              href="mailto:hello@mdesk.tech"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 touch-manipulation text-sm sm:text-base"
            >
              Send us a message
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
