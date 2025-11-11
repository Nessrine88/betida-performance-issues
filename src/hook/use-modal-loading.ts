"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Hook to show modal loader until route changes,
 * but skip showing loader when route already includes a modal param (e.g., on refresh)
 */
export function useModalRouteLoading(modalOpen: boolean) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [modalLoading, setModalLoading] = useState(false);
  const lastUrlRef = useRef("");

  const query = searchParams.toString();
  const fullUrl = query ? `${pathname}?${query}` : pathname;

  // ✅ Track modal open clicks (only if no existing modal in route)
  useEffect(() => {
    const hasModalParam = searchParams.has("modal");

    if (modalOpen && !hasModalParam) {

      setModalLoading(true);
    }
  }, [modalOpen, searchParams]);

  // 🔹 Stop loader when route changes
  useEffect(() => {
    if (lastUrlRef.current && lastUrlRef.current !== fullUrl) {
      setModalLoading(false);
    }
    lastUrlRef.current = fullUrl;
  }, [fullUrl]);

  return modalLoading;
}
