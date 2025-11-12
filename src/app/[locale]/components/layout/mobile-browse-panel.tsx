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
    document.body.style.overflow = browseOpen ? "hidden" : "";
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
          key="mobile-browse"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed top-19 bottom-19 inset-0 z-40 bg-sidebar overflow-y-auto md:hidden"
        >
          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <SearchBar isMobileSidebar />
          </motion.div>

          {/* Casino & Sports buttons */}
          <motion.div
            className="flex gap-4 items-center flex-row px-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1, duration: 0.35 },
              },
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
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
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
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
            </motion.div>
          </motion.div>

          {/* Sidebar menu sections */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
            className="p-4"
          >
            <SidebarMenuSections />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
