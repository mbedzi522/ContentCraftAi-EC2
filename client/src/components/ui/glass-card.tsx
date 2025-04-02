import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
  withHover?: boolean;
  withGlow?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "light", withHover = false, withGlow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variant === "light" ? "glass" : "glass-dark",
          "rounded-xl",
          withHover && "transition-all duration-300 hover:translate-y-[-5px]",
          withGlow && "neon-glow",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
