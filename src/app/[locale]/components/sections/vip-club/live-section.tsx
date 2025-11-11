import LanguageDropdown from "@/app/[locale]/components/global-components/language-dropdown";
import { Button } from "@/app/[locale]/components/ui/button";
import { useTranslations } from "next-intl";

export function LiveSection() {
  const t = useTranslations("vipClub.liveSection");

  return (
    <div className="bg-background-1 rounded-lg p-6 flex flex-col xl:flex-row xl:items-start gap-5 justify-between">
      <div className="space-y-1">
        <div className="text-2xl font-semibold text-white">
          {t("title")}
        </div>
        <div className="text-base text-white/55">
          {t("description")}
        </div>
      </div>
      <div className="flex max-w-64 flex-col xl:flex-row xl:max-w-auto gap-2 shrink-0">
        <LanguageDropdown />
        <Button
          aria-label="contact"
          variant="orangeGradient"
          className="shrink-0 whitespace-nowrap"
        >
          {t("button")}
        </Button>
      </div>
    </div>
  );
}

export default LiveSection;