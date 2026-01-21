"use client";

import type React from "react";

import {
  useState,
  useEffect,
  useCallback,
  memo,
  useMemo,
  startTransition,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { debounce } from "@/lib/debounce-util";
import { AnimatePresence, motion } from "motion/react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Open Source", path: "/open-source" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

interface NavLinkProps {
  link: { name: string; path: string };
  isActive: boolean;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const NavLink = memo(function NavLink({
  link,
  isActive,
  onLinkClick,
}: NavLinkProps) {
  return (
    <Link
      href={link.path}
      aria-current={isActive ? "page" : undefined}
      onClick={(e) => onLinkClick(e, link.path)}
      className={`relative touch-manipulation text-sm font-medium transition-colors hover:text-primary ${
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
});

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
        requestAnimationFrame(() => {
          const element = document.querySelector(path);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    },
    [],
  );

  const toggleMobileMenu = useCallback(() => {
    startTransition(() => {
      setIsMobileMenuOpen((prev) => !prev);
    });
  }, []);

  const activeLinks = useMemo(() => {
    const activeSet = new Set<string>();
    for (const link of navLinks) {
      const isActive =
        (link.path === "/" && normalizedPath === "/") ||
        (link.path !== "/" &&
          (normalizedPath === link.path ||
            normalizedPath.startsWith(`${link.path}`)));
      if (isActive) activeSet.add(link.path);
    }
    return activeSet;
  }, [normalizedPath]);

  const navState = isScrolled
    ? "scrolled"
    : isMobileMenuOpen
      ? "mobile-open"
      : "default";

  return (
    <nav
      data-nav-state={navState}
      className="navbar fixed top-0 right-0 left-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-xl font-bold text-transparent transition-all hover:from-cyan-300 hover:to-teal-300 sm:text-2xl"
        >
          mdesk.tech
        </Link>

        <div className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              link={link}
              isActive={activeLinks.has(link.path)}
              onLinkClick={handleLinkClick}
            />
          ))}
        </div>

        <button
          className="-mr-2 touch-manipulation p-2 text-foreground md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 top-14.25 z-40 border-t border-border/40 bg-neutral-950 shadow-lg sm:top-16.25 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mx-auto flex flex-col space-y-6 px-4 py-8 sm:px-6">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    href={link.path}
                    aria-current={
                      activeLinks.has(link.path) ? "page" : undefined
                    }
                    className={`block touch-manipulation py-3 text-2xl font-bold transition-colors hover:text-primary ${
                      activeLinks.has(link.path)
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    onClick={(e) => {
                      startTransition(() => {
                        setIsMobileMenuOpen(false);
                      });
                      handleLinkClick(e, link.path);
                    }}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
