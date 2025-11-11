import React from "react";
import { getSystemLanguage } from "@/lib/helpers/localized-content";
import ApiPageClient from "./api-page-client";
import { fetchApiPage, fetchApiTableData } from "@/lib/fetchers/settings/api";

export default async function ApiPage() {
  const langCode = await getSystemLanguage();
  const apiPageData = await fetchApiPage();
  const tableData = await fetchApiTableData();

  return (
    <div className="w-full text-white space-y-8">
      <ApiPageClient
        apiPageData={apiPageData}
        langCode={langCode}
        tableData={tableData}
      />
    </div>
  );
}
