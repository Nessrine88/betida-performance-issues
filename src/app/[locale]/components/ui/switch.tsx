"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

type SwitchSize = "sm" | "md" | "lg" | "xl";

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
}

const sizeClasses: Record<SwitchSize, { root: string; thumb: string }> = {
  sm: {
    root: "w-7 py-px", // 16px height, 28px width
    thumb: "size-3", // 12px
  },
  md: {
    root: "w-9 py-px", // 20px height, 36px width
    thumb: "size-4 py-px", // 16px
  },
  lg: {
    root: "w-13 py-px", // 32px height, 52px width
    thumb: "size-6", // 24px
  },
  xl: {
    root: "w-20 py-px", // 56px height, 80px width
    thumb: "size-7", // 28px
  },
};

function Switch({ className, size = "md", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer shrink-0 rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-chart-2 data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        sizeClasses[size].root,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-full data-[state=checked]:bg-foreground data-[state=unchecked]:bg-background",
          sizeClasses[size].thumb
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
