import { fetchLawEnforcement } from "@/lib/fetchers/law-enforcement/law-enforcement";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { PortableText } from "@portabletext/react";
import React from "react";

export default async function OverviewPage() {
  const data = await fetchLawEnforcement();

  return (
    <div className="bg-background-1 rounded-lg p-6 max-w-242 w-full mx-auto h-auto flex flex-col gap-6">
      {data?.sections?.length > 0 ? (
        data.sections.map((section: any, index: number) => (
          <div key={index} className="space-y-2">
            <PortableText
              value={section?.description}
              components={portableTextComponents}
            />
          </div>
        ))
      ) : (
        <p>No law enforcement data found.</p>
      )}
    </div>
  );
}
