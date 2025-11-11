"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "@/app/[locale]/components/global-components/global-modal/global-modal";
import OverviewTab from "./tabs/overview-tab";
import WithdrawTab from "./tabs/withdraw-tab";
import DepositTab from "./tabs/deposit-tab";
import BuyCryptoTab from "./tabs/buy-crypto-tab";
import SettingsTab from "./tabs/settings-tab";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import { ArrowLeft } from "lucide-react";
import ProviderTab from "./tabs/provider-tab";
import TabLoader from "@/app/[locale]/tab-loader";

export default function WalletOpenModal() {
  const { walletOpenModalOpen, toggleWalletOpenModalOpen, setTabLoading } = useSidebarStore();
  const [amount, setAmount] = useState(0);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  useEffect(() => {
    const tab = searchParams.get("walletTabs") || "overview";
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set("walletTabs", tab);
    router.push(`?${currentParams.toString()}`, { scroll: false });
    setTabLoading(true);
  };


  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab onTabChange={handleTabChange} />;
      case "withdraw":
        return <WithdrawTab />;
      case "deposit":
        return <DepositTab />;
      case "buyCrypto":
        return <BuyCryptoTab onAmountChange={(a) => setAmount(a)} />;
      case "provider":
        return <ProviderTab onTabChange={handleTabChange} amount={amount} />;
      case "settings":
        return <SettingsTab />;
      default:
        return <OverviewTab onTabChange={handleTabChange} />;
    }
  };

  return (
    <GlobalModal
      title={
        <div className="flex items-center gap-2">
          {activeTab === "overview" ? (
            ""
          ) : activeTab === "withdraw" ? (
            <ArrowLeft
              className="cursor-pointer size-5"
              onClick={() =>
                router.push(`?walletTabs=overview`, { scroll: false })
              }
            />
          ) : activeTab === "deposit" ? (
            <ArrowLeft
              className="cursor-pointer size-5"
              onClick={() =>
                router.push(`?walletTabs=overview`, { scroll: false })
              }
            />
          ) : activeTab === "provider" ? (
            <ArrowLeft
              className="cursor-pointer size-5"
              onClick={() =>
                router.push(`?walletTabs=buyCrypto`, { scroll: false })
              }
            />
          ) : (
            ""
          )}
          {activeTab === "overview"
            ? "Wallet"
            : activeTab === "withdraw"
              ? "Withdraw"
              : activeTab === "deposit"
                ? "Deposit"
                : activeTab === "buyCrypto"
                  ? "Buy Crypto"
                  : activeTab === "settings"
                    ? "Settings"
                    : activeTab === "provider"
                      ? "Provider"
                      : "Wallet"}
        </div>
      }
      open={walletOpenModalOpen}
      onOpenChange={() => {
        toggleWalletOpenModalOpen();
        router.push(pathName);
      }}
      className="lg:min-w-160"
    >
      {activeTab === "overview" || activeTab === "buyCrypto" || (activeTab === "settings" && (
        <GlobalTabs
          data={[
            { value: "overview", label: "Overview" },
            { value: "buyCrypto", label: "Buy Crypto" },
            { value: "settings", label: "Settings" },
          ]}
          tabName="walletTabs"
          tabButtonFull
        />
      ))}
      <div className="w-full relative rounded-lg overflow-hidden">
        <TabLoader />
        {
          renderTab()
        }
      </div>
    </GlobalModal>
  );
}
