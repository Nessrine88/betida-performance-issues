import { fetchReferredUsers } from "@/lib/fetchers/affiliate/affiliate-reffered-users";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import ReferredUsersList from "@/app/[locale]/components/sections/affiliate/referred-users/referred-users-list";
import ReferredUsersTable from "@/app/[locale]/components/sections/affiliate/referred-users/referred-users-table";
import { getTranslations } from "next-intl/server";

export default async function ReferredUsersPage() {
  const langCode = await getSystemLanguage();
  const t = await getTranslations("affiliateReferredUsers");
  const referredUsers = await fetchReferredUsers();

  return (
    <div className="w-full bg-background-1 rounded-lg p-6 overflow-hidden space-y-6">
      <div className="space-y-4 lg:space-y-2">
        <h3 className="text-white font-semibold text-xl lg:text-2xl 2xl:text-3xl">
          {t("title")}
        </h3>
        <p className="text-white/55 text-base">{t("description")}</p>
      </div>
      <div className="w-full">
        <ReferredUsersTable referredUsers={referredUsers} />
      </div>
      <div className="w-full">
        <ReferredUsersList langCode={langCode} referredUsers={referredUsers} />
      </div>
    </div>
  );
}
