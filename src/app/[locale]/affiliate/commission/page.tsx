import { fetchCommissions } from "@/lib/fetchers/affiliate/affiliate-commission";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import CommissionTable from "@/app/[locale]/components/sections/affiliate/commission/commission-table";
import { getTranslations } from "next-intl/server";

export default async function CommissionPage() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("affiliateCommission");
  const commissions = await fetchCommissions();

  return (
    <div className="w-full bg-background-1 rounded-lg p-6 overflow-hidden space-y-6">
      <div className="space-y-4 lg:space-y-2">
        <h3 className="text-white font-semibold text-xl lg:text-2xl 2xl:text-3xl">
          {t("title")}
        </h3>
        <p className="text-white/55 text-base">{t("description")}</p>
      </div>

      <div className="w-full">
        <CommissionTable commissions={commissions} langCode={langCode} />
      </div>
    </div>
  );
}
