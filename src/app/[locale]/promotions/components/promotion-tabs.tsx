"use client";

import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { type LanguageCode } from "@/lib/helpers/localized-content";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";

export interface TabProps {
  value: string;
  label: string;
}

export function PromotionTabs({
  data,
  locale,
}: {
  data: TabProps[];
  locale: LanguageCode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setTabLoading } = useSidebarStore();
  const segments = pathname.split("/").filter(Boolean);
  const selectedTab = segments.pop() ?? "";
  const currentTab = selectedTab === "promotions" ? "" : selectedTab;

  useEffect(() => {
    if (!currentTab && data.length) {
      router.replace(
        `/promotions/${data[0].value === "" ? "" : data[0].value}`,
        { scroll: false }
      );
    }
  }, [router, locale, currentTab, data]);

  return (
    <Tabs
      value={currentTab}
      className="w-full flex flex-wrap mb-2.5 bg-sidebar rounded-lg overflow-x-auto"
    >
      <TabsList
        suppressHydrationWarning
        className="flex gap-3 bg-sidebar p-2 overflow-x-auto tab-scrollbar"
      >
        {data.map((tab) => {
          const href = `/promotions/${tab.value === "" ? "" : tab.value}`;
          const isActive = currentTab === tab.value;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              asChild
              aria-label={`${tab.label} tab`}
            >
              <Link
                prefetch
                onMouseEnter={() => router.prefetch(href)}
                onTouchStart={() => router.prefetch(href)}
                scroll={false}
                href={href}
                className={`w-fit py-2 px-3 flex items-center transition-all duration-300 hover:bg-background-2 ${
                  isActive ? "bg-background-2" : ""
                }`}
                onClick={() => setTabLoading(true)}
              >
                {tab.label}
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
