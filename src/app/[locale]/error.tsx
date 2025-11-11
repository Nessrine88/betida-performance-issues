"use client";
import { useState, useEffect } from "react";
import ErrorSVG from "@/app/[locale]/components/common/svg_icons/error-svg";
import { Button } from "@/app/[locale]/components/ui/button";
import { RefreshCcw, WifiOff } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    if (typeof window === "undefined") {return};

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  }, []);

  const isOffline = !isOnline;

  return (
    <div className="app-container py-9">
      <div className="rounded-lg h-95 lg:h-134 w-full border flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 max-w-105">
          {isOffline ? (
            <WifiOff className="size-16 text-foreground/55" />
          ) : (
            <ErrorSVG />
          )}
          <div className="flex flex-col items-center gap-3">
            <div className="font-md font-semibold text-foreground">
              {isOffline ? "No Internet Connection" : "Error 500"}
            </div>
            <div className="font-xs font-regular text-foreground/55 text-center">
              {isOffline
                ? "Please check your internet connection and try again."
                : error?.message ||
                  "Nulla porttitor magna bibendum leo porttitor."}
            </div>
            <div className="flex flex-row items-center gap-2">
              <Button aria-label="try again" variant="gray" onClick={() => reset()}>
                Try Again
              </Button>
              <Button aria-label="reload" variant="gray" onClick={() => window.location.reload()}>
                <RefreshCcw size={16} /> Reload
              </Button>
            </div>
          </div>
          <Link href="/" className="w-full" aria-label="return to home page">
            <Button aria-label="Return to home" className="mt-9 w-full" variant="gray">
              Return to Home Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
