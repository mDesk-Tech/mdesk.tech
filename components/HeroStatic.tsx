import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroStatic() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      style={{
        contain: "layout style paint",
      }}
    >
      {/* Static grid background - no JS required */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge - static, no animation on initial load */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Next-Generation Web Solutions
            </span>
          </div>

          {/* Main heading - LCP element, rendered immediately */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 tracking-tight leading-tight"
            data-lcp-element="true"
          >
            <span className="block">Designing Your</span>
            <span className="block bg-clip-text text-transparent bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] animate-gradient-x">
              Digital Future
            </span>
          </h1>

          {/* Description - static */}
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4">
            Cutting-edge web design and reliable hosting solutions for
            businesses that want to stand out in the digital landscape.
          </p>

          {/* CTA buttons - static, functional without JS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 overflow-hidden touch-manipulation"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-full border-2 border-primary/20 bg-transparent text-foreground font-bold text-base sm:text-lg transition-all hover:bg-primary/10 hover:border-primary touch-manipulation"
            >
              Explore Services
            </a>
          </div>

          {/* Scroll indicator - hidden on mobile, static on desktop */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block">
            <div className="w-6 h-10 sm:w-8 sm:h-12 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-[float_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
