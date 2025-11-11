"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";

export interface TabProps {
  value: string;
  label: string | ReactNode;
  icon?: string | ReactNode;
}

export function GlobalIconTabs({
  data,
  tabName = "tab",
  extraContent,
  tabButtonFull = false,
  onTabChange,
  bgColor,
  basePath,
  active,
  className,
}: {
  data: TabProps[];
  tabName?: string;
  extraContent?: ReactNode;
  tabButtonFull?: boolean;
  onTabChange?: (value: string) => void;
  bgColor?: string;
  basePath?: string;
  active?: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasBasePath = !!basePath;
  const activeTab = hasBasePath
    ? active || data[0]?.value
    : searchParams.get(tabName) || data[0]?.value;

  useEffect(() => {
    if (!hasBasePath && !searchParams.get(tabName) && data.length > 0) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set(tabName, data[0].value);
      router.push(`?${current.toString()}`, { scroll: false });
    }
  }, [searchParams, router, data, tabName, hasBasePath]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        if (hasBasePath) {
          router.push(`${basePath}/${value}`, { scroll: false });
        } else {
          const currentParams = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          currentParams.set(tabName, value);
          router.push(`?${currentParams.toString()}`, { scroll: false });
        }
        if (onTabChange) {
          onTabChange(value);
        }
      }}
      className={`w-full mb-2.5 bg-sidebar rounded-lg overflow-hidden ${className || ""}`}
    >
      <TabsList
        className={`flex gap-3 p-2 overflow-x-auto no-scrollbar w-full bg-${bgColor ? bgColor : "sidebar"}`}
      >
        {data.map((tab) => {
          let href: string;
          if (hasBasePath) {
            href = `${basePath}/${tab.value}`;
          } else {
            const currentParams = new URLSearchParams(
              Array.from(searchParams.entries())
            );
            currentParams.set(tabName, tab.value);
            href = `?${currentParams.toString()}`;
          }
          return (
            <TabsTrigger key={tab.value} value={tab.value} asChild>
              <Link
                prefetch
                scroll={false}
                href={href}
                className={`${
                  tabButtonFull ? "w-full" : "w-fit"
                } py-2 px-3 flex flex-col items-center gap-1 transition-all duration-300 hover:bg-background-2 data-[state=active]:bg-background data-[state=active]:text-foreground`}
                aria-label={`move to ${tab?.label}`}
              >
                {tab?.icon}
                <span className="text-xs font-medium text-foreground/55 whitespace-nowrap">
                  {tab?.label}
                </span>
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {extraContent && (
        <div className="w-full md:w-auto md:ml-auto text-left md:text-right mr-2 flex items-center justify-center">
          {extraContent}
        </div>
      )}
    </Tabs>
  );
}
