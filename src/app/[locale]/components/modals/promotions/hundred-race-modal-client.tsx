"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../global-components/global-modal/global-modal";
import TimerCountdown from "../../global-components/timer-countdown";
import { useAuthStore } from "@/store/auth-store";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { useTranslations } from "next-intl";
import CImage from "@/lib/CIdImage";

interface HundredRaceModalClientProps {
  data: any;
  langCode: LanguageCode;
}

export default function HundredRaceModalClient({
  data,
  langCode,
}: HundredRaceModalClientProps) {
  const { hundredRaceModalOpen, toggleHundredRaceModalOpen } =
    useSidebarStore();
  const pathName = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.user);
  const t = useTranslations("hundredRace");

  if (!isAuthenticated) {
    return null;
  }

  const { title, timer, user, modalDescription } = data || {};
  const localizedTitle = getLocalizedString(title, langCode);
  const localizedDescription =
    modalDescription?.find((d: any) => d.language === langCode)?.blocks || [];

  const handleClose = () => {
    toggleHundredRaceModalOpen();
    router.push(pathName, { scroll: false });
  };

  return (
    <GlobalModal
      title={localizedTitle}
      open={hundredRaceModalOpen}
      onOpenChange={(open) => !open && handleClose()}
      className="lg:min-w-[450px]"
    >
      <div className="space-y-5">
        <div className="w-full bg-background-3 rounded-lg p-5 text-center">
          <div className="max-w-40 mx-auto rounded-lg overflow-hidden mb-4">
            <CImage
              publicId="modal-hero_dyql8y"
              alt="race-hero"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              priority
              fetchPriority="high"
            />
          </div>

          <div className="flex justify-center">
            <TimerCountdown
              days={timer?.days}
              hours={timer?.hours}
              minutes={timer?.minutes}
              seconds={timer?.seconds}
              storageKey={timer?.storageKey}
            />
          </div>
        </div>

        {/* Race stats */}
        <div className="w-full bg-background-3 rounded-lg p-4 flex items-stretch justify-center divide-x divide-x-border">
          <div className="text-sm text-foreground/55 text-center space-y-1 py-2 px-4">
            <div>{t("yourPosition")}</div>
            <div className="font-semibold text-foreground">
              {user?.position ? user?.position : "-"}
            </div>
          </div>

          <div className="text-sm text-foreground/55 text-center space-y-1 py-2 px-4">
            <div>{t("yourCurrentPrize")}</div>
            <div className="font-semibold text-foreground">
              ${user?.currentPrize}
            </div>
          </div>

          <div className="text-sm text-foreground/55 text-center space-y-1 py-2 px-4">
            <div>{t("yourWagered")}</div>
            <div className="font-semibold text-foreground">
              ${user?.wagered}
            </div>
          </div>
        </div>
        <div className="text-foreground/55 text-sm leading-relaxed bg-background-3 rounded-lg p-4">
          {/* 📄 Description */}
          <PortableText
            value={localizedDescription}
            components={portableTextComponents}
          />
        </div>
      </div>
    </GlobalModal>
  );
}
