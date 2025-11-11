"use client";

import { useState } from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/[locale]/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import GlobalModal from "@/app/[locale]/components/global-components/global-modal/global-modal";

interface BetSlipSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BetSlipSettingsModal({
  open,
  onOpenChange,
}: BetSlipSettingsModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState("noChanges");

  const updateUrl = (params: Record<string, string>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "false") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    router.push(`?${current.toString()}`);
  };

  const handleApply = () => {
    onOpenChange(false);
    updateUrl({ settings: "false" });
  };

  return (
    <GlobalModal
      open={open}
      onOpenChange={(ope: boolean) => {
        onOpenChange(ope);
        if (!ope) {
          updateUrl({ settings: "false" });
        }
      }}
      title="Betslip Settings"
      className="w-full"
    >
      <div className="space-y-3">
        <p className="text-foreground/55 text-sm">Odds Settings</p>
        <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any" />
            <label htmlFor="any" className="text-sm text-foreground">
              Accept Any Odds
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="higher" id="higher" />
            <label htmlFor="higher" className="text-sm text-foreground">
              Accept Only Higher Odds
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="noChanges" id="noChanges" />
            <label htmlFor="noChanges" className="text-sm text-foreground">
              No Odds Changes Accepted
            </label>
          </div>
        </RadioGroup>
        <Button
          aria-label="apply"
          onClick={handleApply}
          variant="orangeGradient"
          className="w-full mt-4"
        >
          Apply
        </Button>
      </div>
    </GlobalModal>
  );
}
