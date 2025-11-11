import { getSystemLanguage } from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";
import CampaignsContent from "./campaigns-content";

export default async function CampaignsPage() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("affiliateCampaigns");

  return (
    <CampaignsContent langCode={langCode} t={t} />
  );
}