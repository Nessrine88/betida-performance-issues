"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../../global-components/global-modal/global-modal";
import { Button } from "../../../ui/button";
import { Switch } from "../../../ui/switch";

type CommissionProp = {
  value: string;
  name: string;
  desc: string;
};

interface CommissionFilterModalProps {
  commission: CommissionProp[];
}

export default function CommissionFilterModal({
  commission,
}: CommissionFilterModalProps) {
  const { commissionFilterModalOpen, toggleCommissionFilterModalOpen } =
    useSidebarStore();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCommission, setSelectedCommission] = useState<string | null>(
    null
  );

  // Initialize from URL
  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam && modalParam.startsWith("commissionFilter=")) {
      const value = modalParam.split("=")[1];
      setSelectedCommission(value || null);
    } else if (modalParam === "commissionFilter") {
      setSelectedCommission(null);
    }
  }, [searchParams]);

  // Handle commission selection
  const handleCommissionChange = (value: string) => {
    setSelectedCommission((prev) => {
      const updated = prev === value ? null : value;
      const modalValue = updated
        ? `commissionFilter=${updated}`
        : "commissionFilter";
      router.push(`${pathName}?modal=${modalValue}`, { scroll: false });
      return updated;
    });
  };

  // Apply button closes modal
  const handleApply = () => toggleCommissionFilterModalOpen();

  return (
    <GlobalModal
      title="Filter by Commission"
      open={commissionFilterModalOpen}
      onOpenChange={() => {
        toggleCommissionFilterModalOpen();
        router.push(pathName, { scroll: false });
      }}
      className="lg:min-w-96"
    >
      <div className="space-y-4">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {commission.map((comm) => (
            <div
              key={comm.value}
              className={`flex text-sm gap-4 items-center justify-between p-2 rounded cursor-pointer ${selectedCommission === comm.value ? "bg-background-2" : "hover:bg-background-2"}`}
              onClick={() => handleCommissionChange(comm.value)}
            >
              <div className="shrink-0">
                <Switch
                  checked={selectedCommission === comm.value}
                  onCheckedChange={() => handleCommissionChange(comm.value)}
                  className="data-[state=checked]:bg-green-600 pointer-events-none"
                />
              </div>
              <div className="w-full">
                <div className="text-white">{comm.name}</div>
                <div className="text-white/55">{comm.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <Button
          aria-label="apply"
          variant="orangeGradient"
          fullWidth
          className="w-full"
          onClick={handleApply}
          disabled={!selectedCommission}
        >
          Apply
        </Button>
      </div>
    </GlobalModal>
  );
}
