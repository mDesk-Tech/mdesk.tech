import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string;
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
    <div className={cn("max-w-4xl mx-auto text-center", className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-semibold text-primary">
            {badge}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed px-4">
          {description}
        </p>
      )}
    </div>
  );
};
