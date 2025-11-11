"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GlobalAccordion } from "@/app/[locale]/components/global-components/global-accordion";
import SideTab from "@/app/[locale]/components/layout/side-tab";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/[locale]/components/ui/popover";
import { Button } from "@/app/[locale]/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocale } from "next-intl";
import type { FaqItem, InternationalizedStringValue, TypeSectionProps } from "@/types/vipClub";
import SideTabLoader from "@/app/[locale]/sidetab-loader";
import { useSidebarStore } from "@/store/sidebar-store";
import { Link, useRouter } from "@/i18n/navigation";

const BASE_PATH = "/vip-club?type=";

export default function TypeSection({ data }: TypeSectionProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeType = searchParams.get("type");
  const locale = useLocale();
  const { setSideTabLoading } = useSidebarStore();

  const getLocalizedString = (strings: InternationalizedStringValue[] | undefined): string => {
    if (!strings || strings.length === 0) {return ""};
    const langKey = locale.split("-")[0]; 
    return (
      strings.find((s: any) => s._key === langKey)?.value ||
      strings.find((s: any) => s._key === "en")?.value ||
      strings[0]?.value ||
      ""
    );
  };

  const tabs: any[] = data.tabs.map((tab: any) => ({
    slug: tab.slug,
    title: getLocalizedString(tab.title),
    faqs: tab.faqs.map((faq:any) => ({
      title: getLocalizedString(faq.title),
      content: getLocalizedString(faq.content),
    })),
  }));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!activeType && tabs.length > 0) {
      router.replace(`${BASE_PATH}${tabs[0].slug.current}`);
    }
  }, [activeType, router, tabs]);

  const key = activeType || (tabs.length > 0 ? tabs[0].slug.current : "");
  const currentTab = tabs.find((t) => t.slug.current === key);
  const currentData: FaqItem[] = currentTab?.faqs || [];

  const links = tabs.map((tab) => ({
    name: tab.title,
    href: `${BASE_PATH}${tab.slug.current}`,
  }));

  const selectedLink =
    links.find((link) => link.href.endsWith(key)) || links[0];

  return (
    <div className="w-full relative space-y-4">
      {/* Mobile dropdown */}
      <div className="block md:hidden w-full sticky top-20 bg-background-1 p-3 text-center z-10">
        <div className="app-container">
          <div className="w-44 mx-auto">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  aria-label="expandable"
                  variant="outline"
                  role="combobox"
                  className="w-full flex justify-between items-center"
                >
                  {selectedLink?.name || "Select Tab"}
                  {open ? (
                    <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-44">
                <div className="flex flex-col w-full">
                  {links.map((link) => (
                    <Link
                      scroll={false}
                      key={link.name}
                      href={link.href}
                      onClick={() => {setOpen(false); setSideTabLoading(true); }}
                      className={`block w-full px-4 py-2 hover:bg-background-2/50 ${
                        link.href === selectedLink?.href
                          ? "bg-background-2 text-white"
                          : ""
                      }`}
                      aria-label={link?.name}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="app-container">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="hidden md:block max-w-52 w-full sticky top-25 z-10">
            <SideTab links={links} LinksScroll={false} activeParamKey="type" />
          </div>
          <div className="w-full overflow-hidden rounded-lg relative">
            <SideTabLoader/>
            <GlobalAccordion data={currentData} />
          </div>
        </div>
      </div>
    </div>
  );
}
