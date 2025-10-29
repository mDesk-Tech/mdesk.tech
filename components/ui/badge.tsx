import type React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm ${className}`}
    >
      <span className="text-xs sm:text-sm font-semibold text-primary">
        {children}
      </span>
    </div>
  );
}
