"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "../../components/ui/command";
import { Button } from "../../components/ui/button";
import { ChevronDown } from "lucide-react";

export interface SortOption {
  label: string;
  value: string;
}

interface DropdownWithSearchProps {
  sortOptions: SortOption[];
  onSortChange?: (value: string) => void;
  placeholder?: string;
}

export default function DropdownWithSearch({
  sortOptions,
  onSortChange,
  placeholder = "Search options...",
}: DropdownWithSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Initialize from URL or fallback to first option
  const urlCode = searchParams.get("code") || sortOptions?.[0]?.value;
  const [selectedCode, setSelectedCode] = useState<string>(urlCode);

  // ✅ Update router without page reload
  const updateQueryParams = useCallback(
    (newCode: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("code", newCode);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleSelect = (value: string) => {
    setSelectedCode(value);
    updateQueryParams(value);
    onSortChange?.(value);
    setOpen(false);
  };

  // ✅ Keep sync if URL changes externally
  useEffect(() => {
    const urlValue = searchParams.get("code") || sortOptions?.[0]?.value;
    setSelectedCode(urlValue);
  }, [searchParams, sortOptions]);

  // ✅ Filter options by search
  const filteredOptions = useMemo(
    () =>
      sortOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, sortOptions]
  );

  const currentOption = sortOptions.find((o) => o.value === selectedCode);

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-white/70">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-label="currency"
            variant="gray"
            role="combobox"
            onClick={() => setOpen(true)}
            className="bg-background-2 transition-all duration-300 hover:!bg-gray-500 cursor-pointer text-overflow-ellipsis max-w-36 sm:max-w-52 md:max-w-36 lg:max-w-60"
          >
            <span className="truncate">
              {currentOption ? currentOption.label : sortOptions[0]?.label}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-60 p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="text-foreground placeholder:text-foreground/55"
            />
            <CommandList>
              {filteredOptions.length === 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={`text-white py-2 px-3 cursor-pointer hover:bg-background-2 rounded-md ${
                    option.value === selectedCode ? "bg-background-2/80" : ""
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
