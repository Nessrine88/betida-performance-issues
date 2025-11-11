"use client";

import { Funnel, Monitor } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";

interface SportsFiltersProps {
  display: string;
  market: string;
  onDisplayChange?: (val: string) => void;
  onMarketChange?: (val: string) => void;
}

export default function SportsFilters({
  display,
  market,
  onDisplayChange,
  onMarketChange,
}: SportsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParam = useCallback(
    (key: string, val: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(key, val);
      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  const handleDisplayChange = (val: string) => {
    updateQueryParam("display", val);
    onDisplayChange?.(val);
  };

  const handleMarketChange = (val: string) => {
    updateQueryParam("market", val);
    onMarketChange?.(val);
  };

  return (
    <div className="flex flex-row items-center gap-3 justify-end">
      <Monitor size={20} />
      <span>Display</span>
      <Select value={display} onValueChange={handleDisplayChange}>
        <SelectTrigger
          aria-label="Select display mode"
          className="w-18 !h-9 rounded-md bg-background"
        >
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="three-way">Three Way</SelectItem>
        </SelectContent>
      </Select>
      <Funnel size={20} />
      <span>Market</span>
      <Select value={market} onValueChange={handleMarketChange}>
        <SelectTrigger
          aria-label="Select market type"
          className="w-18 !h-9 rounded-md bg-background"
        >
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="winner">Winner</SelectItem>
          <SelectItem value="handicap">Handicap</SelectItem>
          <SelectItem value="total">Total</SelectItem>
          <SelectItem value="overtime">Overtime</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
