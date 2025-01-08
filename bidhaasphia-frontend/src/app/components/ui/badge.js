import * as React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
      {
        default: "bg-purple-100 text-purple-900",
        secondary: "bg-purple-200 text-purple-700",
        success: "bg-green-100 text-green-900",
        warning: "bg-yellow-100 text-yellow-900",
        error: "bg-red-100 text-red-900",
      }[variant],
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };
