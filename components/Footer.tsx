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
      icon: <Github className="size-5" />,
      href: "https://github.com/YueMiyuki",
      label: "GitHub",
    },
    {
      icon: <Mail className="size-5" />,
      href: "mailto:hello@mdesk.tech",
      label: "Email",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-linear-to-b from-background to-muted/20 pt-12 pb-6 sm:pt-16 sm:pb-8">
      <div className="noise absolute inset-0 z-0 opacity-30" />
      <div className="absolute top-0 left-1/4 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div className="col-span-1 sm:col-span-2">
            <Link
              href="/"
              className="inline-block bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-2xl font-bold text-transparent transition-all hover:from-cyan-300 hover:to-teal-300 sm:text-3xl"
            >
              mdesk.tech
            </Link>
            <p className="mt-4 max-w-md text-sm/relaxed text-muted-foreground sm:text-base">
              Designing and hosting your digital future with cutting-edge web
              solutions that drive growth and success.
            </p>

            <div className="mt-6 flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="touch-manipulation rounded-xl border border-border/50 bg-muted/30 p-2.5 text-muted-foreground transition-all will-change-transform hover:-translate-y-0.5 hover:scale-[1.03] hover:border-primary/50 hover:bg-primary/10 hover:text-primary sm:p-3"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground sm:text-lg">
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
                    className="group inline-flex touch-manipulation items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary sm:text-base"
                  >
                    <span className="h-0.5 w-0 bg-primary transition-all group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground sm:text-lg">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground sm:text-base">
                <a
                  href="mailto:hello@mdesk.tech"
                  className="group inline-flex touch-manipulation items-center gap-2 break-all transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0 transition-colors group-hover:text-primary" />
                  hello@mdesk.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:mt-12 sm:flex-row sm:pt-8">
          <p className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
            © {year} mdesk.tech. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <Link
              href="/privacy"
              prefetch={false}
              className="touch-manipulation text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              prefetch={false}
              className="touch-manipulation text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
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
