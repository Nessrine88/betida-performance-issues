import { getLocale, getTranslations } from "next-intl/server";
import { type LanguageCode } from "@/lib/helpers/localized-content";
import BackRedirectHandler from "../../components/common/Back-redirect-handler";
import PromotionsSVG from "../../components/common/svg_icons/promotions-svg";
import { PromotionTabs } from "../components/promotion-tabs";
import TabLoader from "../../tab-loader";

export const revalidate = 60;

const tabs = [
  { value: "", label: "All Promotions" },
  { value: "casino", label: "Casino" },
  { value: "sports", label: "Sports" },
  { value: "community", label: "Community" },
  { value: "poker", label: "Poker" },
];

export default async function PromotionListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Promotions");
  const locale = (await getLocale()) as LanguageCode;

  return (
    <>
      <BackRedirectHandler />
      <div className="w-full h-full pb-10">
        <div className="bg-background-1 h-fit">
          <div className="app-container font-medium py-4">
            <div className="flex flex-row items-center gap-3 text-foreground">
              <PromotionsSVG />
              {t("title")}
            </div>
          </div>
        </div>

        <div className="app-container py-6 flex flex-col gap-4">
          <PromotionTabs data={tabs} locale={locale} />
          <div className="w-full overflow-hidden rounded-lg relative">
            <TabLoader />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
