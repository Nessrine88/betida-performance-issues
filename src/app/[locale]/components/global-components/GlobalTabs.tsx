"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useSidebarStore } from "@/store/sidebar-store";
import { Link, useRouter } from "@/i18n/navigation";

export interface TabProps {
  value: string;
  label: string;
  ariaLabel?: string;
}

export function GlobalTabs({
  data,
  tabName = "tab",
  extraContent,
  tabButtonFull = false,
  onTabChange,
  bgColor,
}: {
  data: TabProps[];
  tabName?: string;
  extraContent?: ReactNode;
  tabButtonFull?: boolean;
  onTabChange?: (value: string) => void;
  bgColor?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get(tabName) || data[0]?.value;
  const { setTabLoading } = useSidebarStore();

  useEffect(() => {
    if (!searchParams.get(tabName) && data.length > 0) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set(tabName, data[0].value);
      router.push(`?${current.toString()}`, { scroll: false });
    }
  }, [searchParams, router, data, tabName]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        const currentParams = new URLSearchParams(
          Array.from(searchParams.entries())
        );
        currentParams.set(tabName, value);
        router.push(`?${currentParams.toString()}`, { scroll: false });
        if (onTabChange) {
          onTabChange(value);
        }
      }}
      className="w-full flex flex-wrap mb-2.5 bg-sidebar rounded-lg overflow-x-auto"
    >
      <TabsList
        suppressHydrationWarning
        className={`flex gap-3 bg-sidebar p-2 overflow-x-auto tab-scrollbar ${
          tabButtonFull && "w-full"
        } bg-${bgColor ? bgColor : "sidebar"}`}
      >
        {data.map((tab) => {
          const currentParams = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          currentParams.set(tabName, tab.value);
          return (
            <TabsTrigger key={tab.value} value={tab?.value} asChild>
              <Link
                prefetch
                scroll={false}
                href={`?${currentParams.toString()}`}
                onClick={() => setTabLoading(true)}
                className={`${
                  tabButtonFull ? "w-full" : "w-fit"
                } py-2 px-3 flex items-center transition-all duration-300 hover:bg-background-2`}
                aria-label={`${tab.label}`}
              >
                {tab?.label}
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
