import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { GlobalTabs } from "../../global-components/GlobalTabs";
import type { TabProps } from "../../global-components/GlobalTabs";
import GlobalModal from "../../global-components/global-modal/global-modal";
import LoginContent from "./login-content";
import RegisterContent from "./register-content";
import OTPVerificationContent from "./otp-verification-content";
import Image from "next/image";
import { useSidebarStore } from "@/store/sidebar-store";
import { ArrowLeft } from "lucide-react";
import TabLoader from "@/app/[locale]/tab-loader";

export default function AuthModal({
  initialOpen = false,
}: {
  initialOpen?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const activeTab = searchParams.get("auth-tab") || "login";
  const { authModalOpen, toggleAuthModalOpen } = useSidebarStore();

  const tabs: TabProps[] = [
    { value: "login", label: "Login" },
    { value: "register", label: "Register" },
  ];

  let content;
  switch (activeTab) {
    case "login":
      content = <LoginContent />;
      break;
    case "register":
      content = <RegisterContent />;
      break;
    case "otp":
      content = <OTPVerificationContent />;
      break;
    default:
      content = <LoginContent />;
  }

  return (
    <GlobalModal
      open={initialOpen ? true : authModalOpen}
      onOpenChange={() => {
        router.push(pathName);
        toggleAuthModalOpen();
      }}
      className="min-h-60"
      title={
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-3">
            {activeTab === "otp" && (
              <ArrowLeft
                className="cursor-pointer size-5"
                onClick={() => router.push(`?auth-tab=login`)}
              />
            )}
            <span>
              <Image
                src="/logos/logo.webp"
                alt="Betida logo"
                width={32}
                height={32}
                sizes="32px"
                loading="lazy"
                priority={false}
              />
            </span>
            <span className="text-lg font-semibold text-foreground">
              BETIDA
            </span>
          </div>
        </div>
      }
    >
      {activeTab === "login" && (
        <GlobalTabs tabButtonFull data={tabs} tabName="auth-tab" />
      )}
      <div className="w-full relative rounded-lg overflow-hidden">
        <TabLoader />
        {content}
      </div>
    </GlobalModal>
  );
}
