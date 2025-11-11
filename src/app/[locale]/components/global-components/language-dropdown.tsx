"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Turkish", value: "tr" },
  { label: "Deutsch", value: "de" },
  { label: "Spanish", value: "es" },
];

export default function LanguageDropdown() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentOption = languageOptions.find((o) => o.value === locale);

  const handleSelect = (newLocale: string) => {
    if (newLocale === locale) {return};

    // This is the ONLY correct way with next-intl + as-needed
    router.replace(pathname, { locale: newLocale });
    router.refresh(); // Optional: forces re-render if needed
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="gray" className="bg-background-2 justify-between">
          {currentOption?.label || "English"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-auto">
        {languageOptions.map((option) => (
          <div
            key={option.value}
            className={`px-3 py-2 cursor-pointer hover:bg-background-2 text-sm ${
              option.value === locale ? "bg-background-2/80 font-medium" : ""
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
