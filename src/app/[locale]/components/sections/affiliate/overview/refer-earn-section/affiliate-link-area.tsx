"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/app/[locale]/components/ui/button";
import CopyArea from "@/app/[locale]/components/global-components/copy-area";

type AffiliateLinkAreaProps = {
  user?: any;
  affiliateCode?: string;
};

const AffiliateLinkArea = ({ affiliateCode, user }: AffiliateLinkAreaProps) => {
  const router = useRouter();
  const { toggleAuthModalOpen } = useSidebarStore();

  const handleRegisterClick = () => {
    router.push("?auth-tab=register");
    toggleAuthModalOpen();
  };

  const handleLoginClick = () => {
    router.push("?auth-tab=login");
    toggleAuthModalOpen();
  };

  return (
    <div className="w-full">
      {user ? (
        <div className="max-w-xl w-full">
          <CopyArea
            code={affiliateCode || ""}
            label="Affiliate Link"
            successMessage="Affiliate code copied!"
            errorMessage="Failed to copy affiliate code"
            emptyMessage="No affiliate code available to copy"
          />
        </div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-8 justify-between">
          <div className="text-base text-center lg:text-left">
            {`To register your interest in becoming a BETIDA Affiliate, please login to your BETIDA account. Don't have a BETIDA account yet? Tap the 'Register' button below to get started.`}
          </div>
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
      )}
    </div>
  );
};

export default AffiliateLinkArea;
