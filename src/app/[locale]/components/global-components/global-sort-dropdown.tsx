"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";
import {
  Command,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "../../components/ui/command";
import { Button } from "../../components/ui/button";
import { ChevronDown } from "lucide-react";
import SortIconSVG from "../../components/common/svg_icons/sort-icon-svg";

export interface SortOption {
  label: string;
  value: string;
}

interface GlobalSortDropdownProps {
  sortOptions: SortOption[];
  onSortChange?: (value: string) => void;
  sortIcon?: boolean;
  sortText?: boolean;
  queryKey?: string;
  className?: string;
  fillWidth?: boolean;
}

export default function GlobalSortDropdown({
  sortOptions,
  onSortChange,
  sortText = true,
  sortIcon = true,
  queryKey = "sort",
  className,
  fillWidth,
}: GlobalSortDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  // ✅ Initialize from URL or fallback to first option
  const urlValue = searchParams.get(queryKey) || sortOptions?.[0]?.value;
  const [selectedValue, setSelectedValue] = useState<string>(urlValue);

  // ✅ Update router without reload
  const updateQueryParams = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(queryKey, newValue);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, queryKey]
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    updateQueryParams(value);
    onSortChange?.(value);
    setOpen(false);
  };

  // ✅ Sync if URL changes externally
  useEffect(() => {
    const urlParam = searchParams.get(queryKey) || sortOptions?.[0]?.value;
    setSelectedValue(urlParam);
  }, [searchParams, sortOptions, queryKey]);

  const currentOption = sortOptions.find((o) => o.value === selectedValue);

  return (
    <div
      className={`flex items-center gap-2 text-sm font-medium text-white/70 ${fillWidth ? "w-full" : "w-full md:w-fit"} ${className}`}
    >
      {sortIcon && (
        <span className="p-3 bg-background-2 inline-flex items-center justify-center rounded-lg">
          <SortIconSVG />
        </span>
      )}

      {sortText && (
        <span className="text-sm font-semibold inline-flex items-center justify-center">
          Sort
        </span>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-label="dropdown"
            variant="gray"
            role="combobox"
            onClick={() => setOpen(true)}
            className={`bg-background-2 transition-all duration-300 hover:!bg-gray-500 cursor-pointer text-overflow-ellipsis justify-between ${fillWidth ? "w-full" : "max-w-36 sm:max-w-52 md:max-w-36 lg:max-w-60"}`}
          >
            <span className="truncate">
              {currentOption ? currentOption.label : sortOptions[0]?.label}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Command>
            <CommandList>
              {sortOptions.length === 0 && (
                <CommandEmpty>No options available.</CommandEmpty>
              )}
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={`text-white py-2 px-3 cursor-pointer hover:bg-background-2 rounded-md ${
                    option.value === selectedValue ? "bg-background-2/80" : ""
                  }`}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
