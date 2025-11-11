"use client";
import FilterIconSVG from "@/app/[locale]/components/common/svg_icons/filter-icon-svg";
import GlobalSortDropdown from "@/app/[locale]/components/global-components/global-sort-dropdown";
import type { SortOption } from "@/app/[locale]/components/global-components/global-sort-dropdown";
import CommissionFilterModal from "@/app/[locale]/components/modals/affiliate/commission/commission-filter-modal";
import TransferBalanceModal from "@/app/[locale]/components/modals/affiliate/commission/transfer-balance-modal";
import { Button } from "@/app/[locale]/components/ui/button";
import { useSidebarStore } from "@/store/sidebar-store";
import { useRouter } from "@/i18n/navigation";

export default function CommissionManage() {
  const { toggleCommissionFilterModalOpen, toggleTransferBalanceModalOpen } =
    useSidebarStore();

  const router = useRouter();

  const handleCommissionFilterClick = () => {
    router.push("?modal=commissionFilter");
    toggleCommissionFilterModalOpen();
  };
  const handleTransferBalanceModalClick = () => {
    router.push("?modal=transferBalance");
    toggleTransferBalanceModalOpen();
  };

  const sortOptions: SortOption[] = [
    {
      label: "Available Commission: High to Low",
      value: "availableCommissionDesc",
    },
    {
      label: "Available Commission: Low to High",
      value: "availableCommissionAsc",
    },
    {
      label: "Withdrawn Commission: High to Low",
      value: "withdrawnCommissionDesc",
    },
    {
      label: "Withdrawn Commission: Low to High",
      value: "withdrawnCommissionAsc",
    },
    {
      label: "Lifetime Commission: High to Low",
      value: "lifetimeCommissionDesc",
    },
    {
      label: "Lifetime Commission: Low to High",
      value: "lifetimeCommissionAsc",
    },
  ];

  const commissionFilterOption = [
    {
      value: "crypto",
      name: "Only Show Crypto Currencies",
      desc: "Display all crypto currency commissions.",
    },
    {
      value: "local",
      name: "Only Show Local Currencies",
      desc: "Display all local currency commissions.",
    },
    {
      value: "lifetime_commission",
      name: "Hide Zero Lifetime Commission",
      desc: "Lifetime Commission for zero balances won't appear.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-wrap gap-2 justify-between">
        <GlobalSortDropdown sortOptions={sortOptions} />

        <div className="flex gap-2">
          {/* filter icon */}
          <Button
            aria-label="filter"
            variant="gray"
            className="!px-4"
            onClick={handleCommissionFilterClick}
          >
            <FilterIconSVG />
          </Button>

          <Button
            aria-label="transfer balance"
            variant="orangeGradient"
            className="!px-4"
            onClick={handleTransferBalanceModalClick}
          >
            Transfer to Balance
          </Button>
        </div>
      </div>
      {/* Modal area */}
      <CommissionFilterModal commission={commissionFilterOption} />
      <TransferBalanceModal balance={0} />
    </div>
  );
}
