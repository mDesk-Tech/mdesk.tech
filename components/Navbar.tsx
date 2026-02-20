"use client";

import type React from "react";

import {
  useState,
  useEffect,
  useCallback,
  memo,
  useMemo,
  startTransition,
  useRef,
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={link.path}
      aria-current={isActive ? "page" : undefined}
      onClick={(e) => onLinkClick(e, link.path)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative touch-manipulation text-sm font-medium tracking-wider uppercase transition-colors hover:text-coral ${
        isActive ? "text-coral" : "text-muted-foreground"
      }`}
    >
      <span className="mr-1 font-mono text-xs text-coral/50">{`//`}</span>
      {/* Glitch effect */}
      <span className="relative">
        {link.name.split("").map((char, i) => (
          <span
            key={i}
            className="relative inline-block"
            style={
              isHovered
                ? {
                    animation: `glitch 0.4s ease forwards`,
                    animationDelay: `${i * 0.03}s`,
                  }
                : {}
            }
          >
            {char}
          </span>
        ))}
      </span>
      <span
        className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-coral transition-[width] duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
      {/* Glow */}
      <span
        className={`pointer-events-none absolute inset-0 -z-10 blur-sm transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 107, 53, 0.4) 0%, transparent 70%)",
        }}
      />
    </Link>
  );
});

const GlitchLogo = memo(() => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setGlitching(true);
      timeoutId = setTimeout(() => setGlitching(false), 200);
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Link href="/" className="group flex items-center gap-3 transition-all">
      {/* Logo */}
      <div
        className={`relative flex size-10 items-center justify-center bg-coral transition-transform group-hover:scale-105 ${
          glitching ? "animate-glitch-scale" : ""
        }`}
      >
        <span className="font-mono text-xl font-bold text-[#0a0a0a]">M</span>
        {/* Pixel */}
        <div className="absolute -right-1 -bottom-1 size-2 bg-teal" />
        {/* Overlays */}
        {glitching && (
          <>
            <div className="absolute inset-0 translate-x-1 bg-coral/50" />
            <div className="absolute inset-0 -translate-x-1 bg-teal/50" />
          </>
        )}
      </div>

      {/* Brand */}
      <span
        className={`text-xl font-bold tracking-tight text-white sm:text-2xl ${
          glitching ? "animate-glitch-text" : ""
        }`}
      >
        mdesk
        <span className="text-coral">.</span>
        tech
      </span>
    </Link>
  );
});

GlitchLogo.displayName = "GlitchLogo";

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
            normalizedPath.startsWith(`${link.path}/`)));
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
      className="navbar fixed inset-x-0 top-0 z-50 bg-[#0a0a0a]"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <GlitchLogo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              link={link}
              isActive={activeLinks.has(link.path)}
              onLinkClick={handleLinkClick}
            />
          ))}

          {/* CTA */}
          <MagneticButton href="/contact">Get Started</MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="relative -mr-2 flex touch-manipulation items-center justify-center p-2 text-white transition-colors hover:text-coral md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          style={{ minWidth: "44px", minHeight: "44px" }}
        >
          <div className="relative flex items-center justify-center">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            {/* Status dot */}
            <div
              className={`absolute -top-1 -right-1 size-2 rounded-full bg-teal transition-opacity ${
                isMobileMenuOpen ? "animate-pulse opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            className="navbar-mobile-overlay fixed inset-0 border-t-2 border-coral bg-[#0a0a0a] md:hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mx-auto flex h-full flex-col px-4 py-8 sm:px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    aria-current={
                      activeLinks.has(link.path) ? "page" : undefined
                    }
                    className={`group flex items-center gap-4 border-b border-[#333] py-4 text-2xl font-bold transition-colors hover:text-coral ${
                      activeLinks.has(link.path)
                        ? "text-coral"
                        : "text-foreground"
                    }`}
                    onClick={(e) => {
                      startTransition(() => {
                        setIsMobileMenuOpen(false);
                      });
                      handleLinkClick(e, link.path);
                    }}
                  >
                    <span className="font-mono text-sm text-teal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.name}
                    <span className="ml-auto text-coral opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="btn-retro block w-full py-4 text-center text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started →
                </Link>
              </motion.div>

              {/* Decorations */}
              <div className="absolute bottom-8 left-4 flex gap-2">
                <div className="size-3 animate-pulse bg-coral" />
                <div
                  className="size-3 animate-pulse bg-teal"
                  style={{ animationDelay: "0.3s" }}
                />
                <div
                  className="size-3 animate-pulse bg-coral"
                  style={{ animationDelay: "0.6s" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

// Magnetic button
function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="btn-retro group relative overflow-hidden px-4 py-2 text-xs text-[#0a0a0a]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <span className="relative z-10">{children}</span>
      {/* Glow */}
      <span className="absolute inset-0 -z-10 bg-linear-to-r from-coral to-coral/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}

Navbar.displayName = "Navbar";

export default Navbar;
