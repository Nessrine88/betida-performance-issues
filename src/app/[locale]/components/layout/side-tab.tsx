"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import { useSearchParams } from "next/navigation";

interface SideTabProps {
  links: { name: string; href: string }[];
  LinksScroll?: boolean;
  onTabClick?: () => void;
  activeParamKey?: string;
}

export default function SideTab({
  links,
  onTabClick,
  LinksScroll,
  activeParamKey = "tab",
}: SideTabProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeParamValue = searchParams.get(activeParamKey);
  const { setSideTabLoading } = useSidebarStore();

  return (
    <aside className="w-full text-foreground rounded-md overflow-hidden bg-background md:bg-background-1">
      <ul className="w-full">
        {links.map((link) => {
          const [linkPath, linkQuery] = link.href.split("?");
          const params = new URLSearchParams(linkQuery || "");
          const linkParamValue = params.get(activeParamKey);

          let isActive = false;

          if (linkParamValue) {
            isActive =
              linkPath === pathname && linkParamValue === activeParamValue;
          } else {
            isActive = linkPath === pathname;
          }

          return (
            <li key={link.href}>
              <Link
                prefetch
                scroll={LinksScroll}
                href={link.href}
                className={`inline-block px-4 py-3 w-full text-sm transition-all duration-300 
                  ${isActive
                    ? "bg-background-2 text-white border-l-3 border-white"
                    : "hover:bg-background-2/65 border-l-3 border-transparent"
                  }`}
                onClick={() => { onTabClick?.(); setSideTabLoading(true); }}
                aria-label={`go to ${link?.name}`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
