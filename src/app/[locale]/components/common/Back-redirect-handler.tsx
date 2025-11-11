"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

interface BackRedirectHandlerProps {
  /** Optional route to redirect when back button is pressed */
  redirectTo?: string;
  /** Whether to use replace instead of push (optional) */
  replace?: boolean;
}

/**
 * Detects browser "Back" button and redirects to a specific route if provided,
 * otherwise goes back to the previous page.
 */
export default function BackRedirectHandler({
  redirectTo,
  replace = false,
}: BackRedirectHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();

      if (redirectTo) {
        /* eslint-disable @typescript-eslint/no-unused-expressions */
        replace ? router.replace(redirectTo) : router.push(redirectTo);
      } else {
        router.back();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [redirectTo, replace, router]);

  return null;
}
