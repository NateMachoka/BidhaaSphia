import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../../lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={cn("cursor-pointer", className)}
    {...props}
  />
));
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = React.forwardRef(({ className, side = "bottom", align = "center", ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    side={side}
    align={align}
    className={cn(
      "z-50 min-w-[200px] rounded-lg border border-purple-200 bg-white p-4 shadow-md outline-none",
      className
    )}
    {...props}
  />
));
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
