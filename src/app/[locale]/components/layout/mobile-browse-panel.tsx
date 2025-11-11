"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSidebarStore } from "@/store/sidebar-store";
import { useEffect } from "react";
import SearchBar from "../common/search-bar/search-bar";
import { Button } from "../ui/button";
import { usePathname } from "@/i18n/navigation";
import SidebarMenuSections from "./sidebar-menu-section";

export default function MobileBrowsePanel() {
  const pathname = usePathname();
  const { browseOpen, setBrowseOpen } = useSidebarStore();

  useEffect(() => {
    if (browseOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [browseOpen]);

  useEffect(() => {
    setBrowseOpen(false);
  }, [pathname, setBrowseOpen]);

  return (
    <AnimatePresence>
      {browseOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-19 bottom-19 inset-0 z-40 bg-sidebar overflow-y-auto md:hidden"
        >
          {/* search panel */}
          <div className="p-4">
            <SearchBar isMobileSidebar />
          </div>
          <div className="flex gap-4 items-center flex-row px-4">
            <Button
            prefetch
            aria-label="casino"
            href="/casino"
            variant={pathname === "/casino" ? "purpleGradient" : "gray"}
              asChild
              className="w-full"
              >
              Casino
            </Button>
            <Button
              prefetch
              href="/sports"
              variant={pathname === "/sports" ? "greenGradient" : "gray"}
              asChild
              className="w-full"
              aria-label="sports"
            >
              Sports
            </Button>
          </div>
          {/* menu sections */}
          <div className="p-4">
            <SidebarMenuSections />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
