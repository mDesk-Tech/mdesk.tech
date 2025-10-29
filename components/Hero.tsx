"use client";

import { useCallback } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{
        contain: "layout style paint",
        containIntrinsicSize: "0 100vh",
        minHeight: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      {/* Simplified background effects - CSS only */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none opacity-30 hidden md:block" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none opacity-30 hidden md:block" />

      <div className="container relative z-10 px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6 sm:mb-8 animate-fade-in">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Next-Generation Web Solutions
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 tracking-tight leading-tight animate-fade-in-up"
            data-lcp-element="true"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="block">Designing Your</span>
            <span className="block bg-clip-text text-transparent bg-linear-to-b from-primary to-accent">
              Digital Future
            </span>
          </h1>

          <p
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Cutting-edge web design and reliable hosting solutions
            <br />
            for businesses that want to stand out in the digital landscape
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 overflow-hidden cursor-pointer touch-manipulation"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full border-2 border-primary/20 bg-transparent text-foreground font-bold text-base sm:text-lg transition-all hover:bg-primary/10 hover:border-primary cursor-pointer touch-manipulation"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
