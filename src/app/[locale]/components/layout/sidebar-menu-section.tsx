"use client";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { menuSections } from "./app-sidebar";
import { useAuthStore } from "@/store/auth-store";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function SidebarMenuSections() {
  const locale = useLocale();
  const { mobileOpen, toggleMobileOpen, setRouteLoading } = useSidebarStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isAuthenticated = useAuthStore((state) => state.user);

  const pathname = usePathname();
  const router = useRouter();

  const casinoActive = pathname.startsWith("/casino");
  const sportsActive = pathname.startsWith("/sports");

  const visibleSections = [
    ...(casinoActive ? menuSections.filter((s) => s.casinoActive) : []),
    ...(sportsActive ? menuSections.filter((s) => s.sportsActive) : []),
    ...menuSections.filter((s) => !s.casinoActive && !s.sportsActive),
  ];

  useEffect(() => {
    if (mobileOpen) {
      setExpandedItems([]);
    }
  }, [mobileOpen]);

  const handleItemClick = (itemText: string) => {
    const isExpanded = expandedItems.includes(itemText);
    if (mobileOpen) {
      toggleMobileOpen();
      setTimeout(() => {
        if (!isExpanded) {
          setExpandedItems((prev) => [...prev, itemText]);
        }
      }, 300);
      return;
    }

    if (isExpanded) {
      setExpandedItems(expandedItems.filter((i) => i !== itemText));
    } else {
      setExpandedItems([...expandedItems, itemText]);
    }
  };

  return (
    <div className="text-sidebar-foreground flex flex-col gap-2 text-sm">
      {visibleSections.map((section, index) => (
        <div key={index}>
          {section.title && (
            <div
              className={`p-3 text-white/55 whitespace-nowrap overflow-hidden
              ${mobileOpen ? "max-w-auto md:max-w-0 md:hidden" : "max-w-auto md:max-w-50"}`}
            >
              {section.title}
            </div>
          )}
          <div
            className={`${
              section.type === "group"
                ? "bg-background rounded-lg overflow-hidden"
                : "bg-transparent"
            }`}
          >
            {section.items.map((item) => {
              const isExpanded = expandedItems.includes(item.text);
              const isRestricted = item.requiresAuth && !isAuthenticated;

              return (
                <div key={item.text}>
                  {item.children ? (
                    <button
                      aria-label={item.text}
                      onClick={(e) => {
                        if (isRestricted) {
                          e.preventDefault();
                          return;
                        }
                        if (item.text === "Language") {
                          handleItemClick(item.text);
                          return;
                        }
                        handleItemClick(item.text);
                      }}
                      className={`flex gap-0.5 items-center justify-between cursor-pointer relative
                        w-full p-3 overflow-hidden transition-all duration-300
                        ${
                          isRestricted
                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                            : "hover:bg-background-2/65"
                        }
                        ${
                          isExpanded
                            ? "bg-background-2 rounded-t-lg"
                            : "bg-transparent"
                        }`}
                    >
                      <span className="flex items-center relative z-10">
                        <item.icon className="fill-white size-5!" />
                        <span
                          className={`whitespace-nowrap overflow-hidden transition-all duration-300 
                            ${
                              mobileOpen
                                ? "max-w-auto md:max-w-0 pl-2 md:pl-0"
                                : "max-w-auto md:max-w-50 pl-2"
                            }`}
                        >
                          {item.text}
                        </span>
                      </span>
                      <span
                        className={
                          mobileOpen
                            ? "static md:absolute md:-right-0.5 md:top-1/2 md:-translate-y-1/2"
                            : "relative"
                        }
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown
                            className={`w-4 h-4 transform transition-transform duration-300 ${
                              mobileOpen ? "md:-rotate-90" : "rotate-0"
                            }`}
                          />
                        )}
                      </span>
                    </button>
                  ) : item.onClick ? (
                    <button
                      onClick={(e) => {
                        if (isRestricted) {
                          e.preventDefault();
                          return;
                        }
                        if (item.onClick) {
                          item.onClick();
                        }
                        if (item.href) {
                          setRouteLoading(true);
                          router.push(item.href);
                        }
                        if (mobileOpen) {
                          toggleMobileOpen();
                        }
                      }}
                      className={`flex gap-0.5 items-center justify-between relative
      w-full p-3 overflow-hidden transition-all duration-300
      ${isRestricted ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-background-2/65"}
      ${pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-background-2 text-foreground border-l-3 border-white" : "border-l-3 border-transparent"}`}
                    >
                      <span className="flex items-center relative z-10">
                        <item.icon className="fill-white size-5!" />
                        <span
                          className={`whitespace-nowrap overflow-hidden transition-all duration-300 
                            ${
                              mobileOpen
                                ? "max-w-auto md:max-w-0 pl-2 md:pl-0"
                                : "max-w-auto md:max-w-50 pl-2"
                            }`}
                        >
                          {item.text}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <Link
                      prefetch
                      href={isRestricted ? "#" : item.href || "#"}
                      className={`flex gap-0.5 items-center justify-between relative
                        w-full p-3 overflow-hidden transition-all duration-300 cursor-pointer
                        ${
                          isRestricted
                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                            : "hover:bg-background-2/65"
                        }
                        ${
                          item.href &&
                          (pathname === item.href ||
                            pathname.startsWith(item.href + "/"))
                            ? "bg-background-2 text-foreground border-l-3 border-white"
                            : "hover:bg-background-2/65 border-l-3 border-transparent"
                        }`}
                      aria-label={`go to ${item?.text}`}
                      onClick={() => setRouteLoading(true)}
                    >
                      <span className="flex items-center relative z-10">
                        <item.icon className="fill-white size-5!" />
                        <span
                          className={`whitespace-nowrap overflow-hidden transition-all duration-300 
                            ${
                              mobileOpen
                                ? "max-w-auto md:max-w-0 pl-2 md:pl-0"
                                : "max-w-auto md:max-w-50 pl-2"
                            }`}
                        >
                          {item.text}
                        </span>
                      </span>
                    </Link>
                  )}

                  {/* Children */}
                  {item.children && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={`px-3 flex flex-col rounded-b-lg ${
                            isExpanded ? "bg-background" : "bg-transparent"
                          }`}
                        >
                          {item.children.map((child) => {
                            const isChildRestricted =
                              child.requiresAuth && !isAuthenticated;

                            return (
                              <div
                                key={child.text}
                                className={`flex rounded hover:bg-sidebar-hover gap-2 relative ${
                                  isChildRestricted
                                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                                    : ""
                                }`}
                              >
                                {child.onClick ? (
                                  <button
                                    onClick={(e) => {
                                      if (isChildRestricted) {
                                        e.preventDefault();
                                        return;
                                      }

                                      if (child.locale) {
                                        if (child.locale === locale) {
                                          if (mobileOpen) {
                                            toggleMobileOpen();
                                          }
                                          return;
                                        }

                                        router.replace(pathname, {
                                          locale: child.locale,
                                        });

                                        if (mobileOpen) {
                                          toggleMobileOpen();
                                        }
                                        return;
                                      }

                                      child.onClick?.();
                                      if (child.navigateTo) {
                                        router.push(child.navigateTo);
                                      }
                                      if (mobileOpen) {
                                        toggleMobileOpen();
                                      }
                                    }}
                                    className="flex w-full items-start relative py-1 pl-1"
                                    aria-label={child.text}
                                  >
                                    <div className="relative size-6">
                                      <svg
                                        className="absolute left-1/2 -translate-x-1/2 -translate-y-[65%] stroke-2 stroke-background-2 h-9"
                                        viewBox="0 0 13 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path d="M1 24V30C0.99995 32 1.4 35 5 35C8.6 35 10.5 35 13 35" />
                                        <path d="M1 0V24" />
                                      </svg>
                                    </div>
                                    <span
                                      className={`whitespace-nowrap inline-flex items-center gap-2 overflow-hidden transition-all duration-300 
                                        text-foreground/55 cursor-pointer hover:text-foreground
                                        ${
                                          mobileOpen
                                            ? "max-w-auto md:max-w-0"
                                            : "max-w-auto md:max-w-50"
                                        }`}
                                    >
                                      {child.icon && (
                                        <child.icon className="fill-white size-5!" />
                                      )}
                                      {child.text}
                                    </span>
                                  </button>
                                ) : (
                                  <Link
                                    prefetch
                                    href={
                                      isChildRestricted
                                        ? "#"
                                        : child.href || "#"
                                    }
                                    className="flex w-full items-start relative py-1 pl-1 cursor-pointer"
                                    aria-label={`go to ${child?.text}`}
                                    onClick={() => setRouteLoading(true)}
                                  >
                                    <div className="relative size-6">
                                      <svg
                                        className="absolute left-1/2 -translate-x-1/2 -translate-y-[65%] stroke-2 stroke-background-2 h-9"
                                        viewBox="0 0 13 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                      >
                                        <path d="M1 24V30C0.99995 32 1.4 35 5 35C8.6 35 10.5 35 13 35" />
                                        <path d="M1 0V24" />
                                      </svg>
                                    </div>
                                    <span
                                      className={`whitespace-nowrap inline-flex items-center gap-2 overflow-hidden transition-all duration-300 
                                        text-foreground/55 cursor-pointer hover:text-foreground
                                        ${
                                          mobileOpen
                                            ? "max-w-auto md:max-w-0"
                                            : "max-w-auto md:max-w-50"
                                        }`}
                                    >
                                      {child.icon && (
                                        <child.icon className="fill-white size-5!" />
                                      )}
                                      {child.text}
                                    </span>
                                  </Link>
                                )}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
