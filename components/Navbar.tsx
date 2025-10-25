"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Open Source", path: "/open-source" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-background/50 backdrop-blur-xs"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold bg-linear-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-teal-300 transition-all"
        >
          mdesk.tech
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-foreground p-2 -mr-2 touch-manipulation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-[57px] sm:top-[65px] bg-background z-40"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className={`block text-2xl font-bold transition-colors hover:text-primary py-3 touch-manipulation ${
                      pathname === link.path
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
