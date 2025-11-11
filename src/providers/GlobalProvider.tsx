"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/app/[locale]/components/ui/tooltip";
import { Toaster } from "@/app/[locale]/components/ui/sonner";
import Loading from "@/app/[locale]/loading";
import Footer from "@/app/[locale]/components/common/footer/footer";
import AppSidebar from "@/app/[locale]/components/layout/app-sidebar";
import AppHeader from "@/app/[locale]/components/layout/app-header";
import MobileFooter from "@/app/[locale]/components/layout/mobile-footer";
import MobileBrowsePanel from "@/app/[locale]/components/layout/mobile-browse-panel";
import RouteLoader from "@/app/[locale]/route-loader";
import useRouteLoading from "@/hook/use-route-loading";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const { mobileOpen } = useSidebarStore();
  useRouteLoading();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-background text-foreground relative flex items-start min-h-screen pb-24 md:pb-0">
        <AppSidebar />
        <div
          className={`mx-auto min-h-[calc(100vh-4rem)] ${mobileOpen
            ? "w-full md:w-[calc(100%-5rem)]"
            : "w-full md:w-[calc(100%-15.3rem)]"
            }`}
        >
          <AppHeader />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </div>
        <MobileFooter />
        <MobileBrowsePanel />
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Suspense fallback={<Loading />}>
          <div className="bg-background text-foreground relative flex items-start min-h-screen pb-24 md:pb-0">
            <AppSidebar />
            <div
              className={`mx-auto min-h-[calc(100vh-4rem)] ${mobileOpen
                ? "w-full md:w-[calc(100%-5rem)]"
                : "w-full md:w-[calc(100%-15.3rem)]"
                }`}
            >
              <AppHeader />
              <main>
                <RouteLoader />
                {children}
              </main>
              <Toaster />
              <Footer />
            </div>
            <MobileFooter />
            <MobileBrowsePanel />
          </div>
        </Suspense>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
