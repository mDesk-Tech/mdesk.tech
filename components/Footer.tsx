"use client";
import Link from "next/link";
import { Github, Mail, ArrowUpRight } from "lucide-react";
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

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Open Source", href: "/open-source" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t-2 border-[#333] bg-[#0a0a0a] pt-12 pb-6 sm:pt-16 sm:pb-8">
      {/* Background */}
      <div className="noise absolute inset-0" />
      <div className="absolute top-0 left-1/4 -z-10 size-96 rounded-full bg-coral/5 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 -z-10 size-96 rounded-full bg-teal/5 blur-3xl" />

      {/* Scanlines */}
      <div className="scanlines absolute inset-0 opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            {/* Logo */}
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex size-10 items-center justify-center bg-coral transition-transform group-hover:scale-105">
                <span className="font-mono text-xl font-bold text-[#0a0a0a]">
                  M
                </span>
                <div className="absolute -right-1 -bottom-1 size-2 bg-teal" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                mdesk<span className="text-coral">.</span>tech
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm/relaxed text-[#a0a0a0] sm:text-base">
              Websites that work—built to last, hosted reliably, supported
              honestly.
            </p>

            {/* Social */}
            <div className="mt-6 flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group touch-manipulation border-2 border-[#333] bg-[#141414] p-2.5 text-[#a0a0a0] transition-all hover:border-coral hover:text-coral sm:p-3"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-coral uppercase">
              <div className="size-1.5 bg-coral" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="group inline-flex touch-manipulation items-center gap-2 text-sm text-[#a0a0a0] transition-colors hover:text-white sm:text-base"
                  >
                    <span className="font-mono text-xs text-teal">{"//"}</span>
                    {link.name}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-teal uppercase">
              <div className="size-1.5 bg-teal" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-[#a0a0a0] sm:text-base">
                <a
                  href="mailto:hello@mdesk.tech"
                  className="group inline-flex touch-manipulation items-center gap-2 break-all transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-coral" />
                  hello@mdesk.tech
                </a>
              </li>
            </ul>

            {/* Pixels */}
            <div className="mt-6 flex gap-2">
              <div className="size-3 bg-coral" />
              <div className="size-3 bg-teal" />
              <div className="size-3 border border-coral" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-[#333] pt-6 sm:mt-12 sm:flex-row sm:pt-8">
          <p className="text-center font-mono text-xs text-[#666] sm:text-left sm:text-sm">
            © {year} mdesk.tech. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <Link
              href="/privacy"
              prefetch={false}
              className="touch-manipulation text-xs text-[#666] transition-colors hover:text-coral sm:text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              prefetch={false}
              className="touch-manipulation text-xs text-[#666] transition-colors hover:text-coral sm:text-sm"
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
