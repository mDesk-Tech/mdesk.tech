import { cn } from "@/lib/utils";
import type React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const SectionHeading = ({
  badge,
  title,
  description,
  className,
  titleClassName,
}: SectionHeadingProps) => {
  return (
    <div className={cn("mx-auto max-w-4xl text-center", className)}>
      {badge && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm sm:mb-6">
          <span className="text-xs font-semibold text-primary sm:text-sm">
            {badge}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "mb-4 text-3xl font-black sm:mb-6 sm:text-5xl md:text-7xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="px-4 text-base/relaxed text-muted-foreground sm:text-xl">
          {description}
        </p>
      )}
    </div>
  );
};
