"use client";
import AffiliateLinkArea from "./affiliate-link-area";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { type InternationalizedString } from "@/lib/fetchers/localized-blog";
import { useAuthStore } from "@/store/auth-store";
import CImage from "@/lib/CIdImage";

type Stat = {
  value: string;
  label: InternationalizedString[];
};

type ReferAndEarnProps = {
  data: {
    title: InternationalizedString[];
    description: InternationalizedString[];
    stats: Stat[];
    image: string;
  };
  langCode: LanguageCode;
};

const ReferAndEarn = ({ data, langCode }: ReferAndEarnProps) => {
  const affiliateCode = "HZNTG6Z6FJRGEYRFKFBEE3TCLYUHIY3MGU2HGM3SOB5GQJS6ORKA";
  const user = useAuthStore((s) => s.user);
  return (
    <div className="w-full bg-background-1 rounded-lg p-6 overflow-hidden space-y-4">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-4 lg:gap-10">
        {/* Left Section */}
        <div className="space-y-6 lg:space-y-8">
          <div className="space-y-4 lg:space-y-2">
            <h3 className="text-white font-semibold text-xl lg:text-2xl 2xl:text-3xl">
              {getLocalizedString(data.title, langCode, "en")}
            </h3>
            <p className="text-white/55 text-base">
              {getLocalizedString(data.description, langCode, "en")}
            </p>
          </div>

          {/* Stats Section */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            {data.stats.map((item, index) => (
              <div key={index} className="bg-background rounded-sm p-4">
                <div className="font-semibold text-xl 2xl:text-2xl">
                  {item.value}
                </div>
                <p className="text-sm text-white/55">
                  {getLocalizedString(item.label, langCode, "en")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="max-w-3xs w-full">
          <CImage
            publicId={data.image}
            alt={
              getLocalizedString(data.title, langCode, "en") ||
              "Affiliate Program"
            }
            width={400}
            height={400}
            className="w-full h-full object-cover"
            priority
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Registration, login and affiliate link area */}
      <div className="w-full">
        <AffiliateLinkArea affiliateCode={affiliateCode} user={user} />
      </div>
    </div>
  );
};

export default ReferAndEarn;
