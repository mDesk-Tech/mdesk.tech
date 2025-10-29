import type React from "react";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-4xl mx-auto text-center ${className}`}>
      {badge && <Badge className="mb-4 sm:mb-6">{badge}</Badge>}
      <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-4">
          {description}
        </p>
      )}
    </div>
  );
}
