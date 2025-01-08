import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
