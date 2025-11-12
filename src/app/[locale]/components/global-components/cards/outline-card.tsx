"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import React, { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockIconSVG from "../../../components/common/svg_icons/lock-icon-svg";

interface OutlineCardProps {
  title: string | ReactNode;
  className?: string;
  children: ReactNode;
  collapsable?: boolean;
  defaultOpen?: boolean;
  lock?: boolean;
}

export default function OutlineCard({
  title,
  children,
  className,
  collapsable = false,
  defaultOpen = true,
  lock = false,
}: OutlineCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const toggleOpen = (e?: React.MouseEvent) => {
    if (collapsable && !lock) {
      e?.stopPropagation?.();
      setOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={cn(
        "border border-border rounded-md overflow-hidden text-foreground h-full w-full flex flex-col",
        className
      )}
    >
      <div
        onClick={toggleOpen}
        className={cn(
          "px-6 py-4 font-semibold text-base bg-background-1 flex flex-row items-center gap-6 justify-between transition-all duration-300",
          collapsable && !lock && "cursor-pointer"
        )}
      >
        {title}

        {collapsable && (
          <button
            aria-label="Toggle section"
            type="button"
            disabled={lock}
            onClick={toggleOpen}
            className={cn(
              "h-5 w-5 rounded-full flex items-center justify-center transition-colors duration-300",
              lock
                ? "bg-transparent cursor-not-allowed opacity-60"
                : open
                ? "bg-foreground text-background cursor-pointer"
                : "bg-foreground/55 text-foreground cursor-pointer"
            )}
          >
            {lock ? (
              <LockIconSVG />
            ) : (
              <motion.div
                animate={{ rotate: open ? 0 : 180 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ChevronUp size={14} />
              </motion.div>
            )}
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && !lock && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 lg:p-6 bg-background">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
