"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/store/sidebar-store";
import { useEffect } from "react";

export default function SideTabLoader() {
  const { sideTabLoading } = useSidebarStore();
  useEffect(() => {
    if (sideTabLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sideTabLoading]);

  return (
    <AnimatePresence>
      {sideTabLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute w-full h-full z-30 bg-background-1/90 text-center rounded-lg overflow-hidden"
        >
          <div className="relative w-20 mx-auto mt-12 h-2.5 bg-background-2 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-7 bg-foreground rounded-full animate-slide" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
