"use client";

import { useCallback, memo } from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/app/[locale]/components/ui/button";
import dynamic from "next/dynamic";

const CopyArea = dynamic(
  () => import("@/app/[locale]/components/global-components/copy-area"),
  { ssr: false }
);

type AffiliateLinkAreaProps = {
  user?: any;
  affiliateCode?: string;
};

const AffiliateLinkArea = memo(({ affiliateCode, user }: AffiliateLinkAreaProps) => {
  const router = useRouter();
  const { toggleAuthModalOpen } = useSidebarStore();

  const handleRegisterClick = useCallback(() => {
    router.push("?auth-tab=register");
    toggleAuthModalOpen();
  }, [router, toggleAuthModalOpen]);

  const handleLoginClick = useCallback(() => {
    router.push("?auth-tab=login");
    toggleAuthModalOpen();
  }, [router, toggleAuthModalOpen]);

  if (user) {
    return (
      <div className="w-full max-w-xl">
        <CopyArea
          code={affiliateCode || ""}
          label="Affiliate Link"
          successMessage="Affiliate code copied!"
          errorMessage="Failed to copy affiliate code"
          emptyMessage="No affiliate code available to copy"
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-8 justify-between">
      <div className="text-base text-center lg:text-left"> To register your interest in becoming a BETIDA Affiliate, please login to your BETIDA account. Don&apos;t have a BETIDA account yet? Tap the &apos;Register&apos; button below to get started. </div>
      <div className="flex items-center gap-3">
        <Button
          aria-label="login"
          variant="outline"
          onClick={handleLoginClick}
        >
          Login
        </Button>

        <Button
          aria-label="register"
          onClick={handleRegisterClick}
          variant="orangeGradient"
        >
          Register
        </Button>
      </div>
    </div>
  );
});

// Add display name here
AffiliateLinkArea.displayName = "AffiliateLinkArea";

export default AffiliateLinkArea;