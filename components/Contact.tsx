"use client";

import { motion } from "motion/react";
import { Mail, ArrowRight, Send } from "lucide-react";
import { Cover } from "@/components/ui/cover";

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
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Let&apos;s Connect
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6">
            Get in <Cover>Touch</Cover>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-4">
            Ready to start your next project? We&apos;d love to hear from you
            and discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
          >
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12 sm:mt-16 text-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
