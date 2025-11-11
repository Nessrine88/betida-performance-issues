"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import Loading from "./loading";
import { useEffect } from "react";

export default function RouteLoader() {
  const { routeLoading } = useSidebarStore();

  useEffect(() => {
    if (routeLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount or state change
    return () => {
      document.body.style.overflow = "";
    };
  }, [routeLoading]);

  return (
    <>
      {routeLoading && (
        <Loading/>
      )}
    </>
  );
}
