"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import { usePathname } from "@/i18n/navigation";


export default function useRouteLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    setRouteLoading,
    setSideTabLoading,
    setTabLoading,
  } = useSidebarStore();

  const lastUrlRef = useRef<string>("");

  // Build normalized current URL
  const query = searchParams.toString();
  const fullUrl = query ? `${pathname}?${query}` : pathname;

  // 🔹 On every route change, stop all loaders
  useEffect(() => {
    // Stop any loaders that might be active
    setRouteLoading(false);
    setSideTabLoading(false);
    setTabLoading(false);

    // Save the current URL for duplicate-click detection
    lastUrlRef.current = fullUrl;
  }, [fullUrl, setRouteLoading, setSideTabLoading, setTabLoading]);

  // 🔹 Protect against same-link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (
        !link ||
        link.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0 ||
        link.origin !== window.location.origin
      ) {
        return;
      }

      const nextQuery = link.search;
      const nextUrl = nextQuery ? `${link.pathname}${nextQuery}` : link.pathname;

      // alert(nextUrl);
      // alert(lastUrlRef.current);

      // 🧠 Prevent infinite loading if clicking same link
      if (nextUrl === lastUrlRef.current) {
        setRouteLoading(false);
        setSideTabLoading(false);
        setTabLoading(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [setRouteLoading, setSideTabLoading, setTabLoading]);
}
