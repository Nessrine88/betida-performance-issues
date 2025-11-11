"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/store/sidebar-store";
import SideTab from "../../components/layout/side-tab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

interface LayoutLink {
  name: string;
  href: string;
}

interface TermsLayoutCompoProps {
  layoutName: string;
  layoutIcon: React.ReactNode;
  links: LayoutLink[];
  children: ReactNode;
}

export default function TermsLayoutCompo({
  layoutName,
  links,
  children,
}: TermsLayoutCompoProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { pageTabOpen, togglePageTabOpen, setPageTabOpen } = useSidebarStore();
  const activeLink = links.find((link) => link.href === pathname);
  const activeName = activeLink ? activeLink.name : layoutName;

  // close tab on route change
  useEffect(() => {
    if (pageTabOpen) {
      setPageTabOpen(false);
    }
  }, [pathname, pageTabOpen, setPageTabOpen]);

  // lock scroll when tab is open
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
    <div className="w-full ">
      <div className="w-full text-foreground">
        <div className="relative bg-background-1">
          <div className="app-container font-medium py-4 flex justify-center md:hidden">
            {/* Mobile dropdown button */}
            <div className="md:hidden flex justify-center">
              <Select
                value={pathname}
                onValueChange={(val) => {
                  router.push(val);
                }}
              >
                <SelectTrigger className="w-fit min-w-50 h-12 bg-background text-center border text-foreground focus:border-accent">
                  <SelectValue
                    placeholder={activeName}
                    className="text-center"
                  />
                </SelectTrigger>
                <SelectContent>
                  {links.map((link) => (
                    <SelectItem key={link.href} value={link.href}>
                      <Link prefetch href={`/terms/${link.href}`} aria-label={link?.name}>{link.name}</Link>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                className="overflow-hidden top-full left-0 z-10 absolute block md:hidden w-full app-container bg-background-1"
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
          <div className="hidden md:block max-w-52 w-full sticky top-25">
            <SideTab links={links} />
          </div>

          <main className="w-full md:flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
