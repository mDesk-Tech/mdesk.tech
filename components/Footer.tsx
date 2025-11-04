"use client";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { memo } from "react";

type FooterProps = {
  year: number;
};

const Footer = memo(({ year }: FooterProps) => {
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/YueMiyuki",
      label: "GitHub",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:hello@mdesk.tech",
      label: "Email",
    },
  ];

  return (
    <footer className="border-t border-border/40 pt-12 sm:pt-16 pb-6 sm:pb-8 relative overflow-hidden bg-linear-to-b from-background to-muted/20">
      <div className="absolute inset-0 noise z-0 opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-1 sm:col-span-2">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-teal-300 transition-all inline-block"
            >
              mdesk.tech
            </Link>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
              Designing and hosting your digital future with cutting-edge web
              solutions that drive growth and success.
            </p>

            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 sm:p-3 rounded-xl bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-border/50 hover:border-primary/50 touch-manipulation will-change-transform hover:-translate-y-0.5 hover:scale-[1.03]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Open Source", href: "/open-source" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group touch-manipulation"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="text-sm sm:text-base text-muted-foreground">
                <a
                  href="mailto:hello@mdesk.tech"
                  className="hover:text-primary transition-colors inline-flex items-center gap-2 group break-all touch-manipulation"
                >
                  <Mail className="h-4 w-4 group-hover:text-primary transition-colors shrink-0" />
                  hello@mdesk.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {year} mdesk.tech. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <Link
              href="/privacy"
              prefetch={false}
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors touch-manipulation"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              prefetch={false}
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors touch-manipulation"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
