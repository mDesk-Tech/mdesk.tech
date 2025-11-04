"use client";

import type React from "react";

import { useState, useEffect, useCallback, memo, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { debounce } from "@/lib/debounce-util";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Open Source", path: "/open-source" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = memo(() => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const normalizedPath = useMemo(() => {
    if (!pathname) return "/";
    try {
      const [pathOnly] = pathname.split("#");
      return pathOnly.replace(/\/+$/, "") || "/";
    } catch {
      return "/";
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 10);
    }, 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      requestAnimationFrame(() => {
        document.body.style.overflow = "hidden";
      });
    } else {
      requestAnimationFrame(() => {
        document.body.style.overflow = "auto";
      });
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      if (path.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [],
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const navState = isScrolled
    ? "scrolled"
    : isMobileMenuOpen
      ? "mobile-open"
      : "default";

  return (
    <nav
      data-nav-state={navState}
      className="navbar fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-teal-300 transition-all"
        >
          mdesk.tech
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => {
            const isActive =
              (link.path === "/" && normalizedPath === "/") ||
              (link.path !== "/" &&
                (normalizedPath === link.path ||
                  normalizedPath.startsWith(`${link.path}`)));
            return (
              <Link
                key={link.path}
                href={link.path}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`relative text-sm font-medium transition-colors hover:text-primary touch-manipulation ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
                <span
                  className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-primary transition-[width] duration-300 ease-out ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden text-foreground p-2 -mr-2 touch-manipulation"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] sm:top-[65px] bg-neutral-950 shadow-lg z-40 border-t border-border/40 transition-transform duration-300 ease-in-out translate-x-0">
          <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  href={link.path}
                  aria-current={
                    normalizedPath === link.path ? "page" : undefined
                  }
                  className={`block text-2xl font-bold transition-colors hover:text-primary py-3 touch-manipulation ${
                    normalizedPath === link.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleLinkClick(e, link.path);
                  }}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
