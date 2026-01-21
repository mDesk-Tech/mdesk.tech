import { cn } from "@/lib/utils";
import type React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge = ({ children, className, icon }: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm",
        className,
      )}
    >
      {icon}
      <span className="text-xs font-semibold text-primary sm:text-sm">
        {children}
      </span>
    </div>
  );
};
