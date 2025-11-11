"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/store/sidebar-store";
import SideTab from "../../components/layout/side-tab";
import BackButton from "../../components/global-components/back-button";
import { usePathname } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import SideTabLoader from "../../sidetab-loader";

interface LayoutLink {
  name: string;
  href: string;
}

interface SecondLayoutProps {
  layoutName: string;
  layoutIcon?: React.ReactNode;
  links: LayoutLink[];
  children: ReactNode;
}

export default function SecondLayout({
  layoutName,
  layoutIcon,
  links,
  children,
}: SecondLayoutProps) {
  const pathname = usePathname();
  const { pageTabOpen, togglePageTabOpen } = useSidebarStore();

  const activeLink = links.find((link) => link.href === pathname);
  const activeName = activeLink ? activeLink.name : layoutName;

  useEffect(() => {
    if (pageTabOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [pageTabOpen]);

  return (
    <div className="w-full">
      <div className="w-full text-foreground">
        <div className="relative bg-background-1">
          <div className="app-container font-medium py-4">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-1 items-center">
              <div className="w-full">
                {pageTabOpen ? (
                  <BackButton />
                ) : (
                  <div className="flex gap-3 items-center text-xs sm:text-base">
                    {layoutIcon}
                    <span>{layoutName}</span>
                  </div>
                )}
              </div>

              {/* Mobile dropdown button */}
              <div className="w-full block md:hidden">
                <Button
                  aria-label="toggle page tab"
                  onClick={togglePageTabOpen}
                  fullWidth
                  variant="outline"
                  prefetch
                  icon={
                    pageTabOpen ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )
                  }
                  className="px-2 py-2 sm:px-4 sm:py-2 flex items-center justify-between overflow-hidden text-[11px] sm:text-base text-overflow-ellipsis"
                >
                  <span className="truncate">{activeName}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {pageTabOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "calc(100vh - 13rem)" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden top-full left-0 z-50 absolute block lg:hidden w-full app-container bg-background-1"
              >
                <SideTab links={links} onTabClick={togglePageTabOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop sidebar + main content */}
      <div className="app-container py-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="hidden md:block max-w-52 w-full sticky top-25 shrink-0">
            <SideTab links={links} />
          </div>

          <main className="flex-1 w-full overflow-hidden rounded-lg relative">
            <SideTabLoader />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
