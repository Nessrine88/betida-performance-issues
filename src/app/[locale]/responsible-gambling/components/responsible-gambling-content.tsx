import React from "react";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import Image from "next/image";

type DataContentType = {
  data: {
    branchName?: string;
    content1?: any[];
    content2?: any[];
    tipsForEffects?: string[];
  };
};

export function ResponsibleGamblingContent({ data }: DataContentType) {
  return (
    <div className="flex flex-col gap-2 space-y-4">
      {data?.content1 && data?.content1?.length > 0 && (
        <PortableText
          value={data.content1}
          components={portableTextComponents}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:space-y-6">
        {data?.tipsForEffects &&
          data?.tipsForEffects?.length > 0 &&
          data?.tipsForEffects.map((tips, j) => (
            <div
              key={j}
              className="bg-background space-y-4 p-4 rounded-lg overflow-hidden h-full w-full"
            >
              <Image
                src="/icons/pointer-svg.svg"
                alt="pointer"
                height={32}
                width={32}
              />
              <p className="text-sm text-white/55">{tips}</p>
            </div>
          ))}
      </div>
      {data?.content2 && data?.content2?.length > 0 && (
        <PortableText
          value={data.content2}
          components={portableTextComponents}
        />
      )}
    </div>
  );
}
