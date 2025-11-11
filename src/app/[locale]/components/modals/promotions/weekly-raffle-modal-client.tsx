"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../global-components/global-modal/global-modal";
import { Button } from "../../ui/button";
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

interface WeeklyRaffleModalClientProps {
  data: any;
  langCode: LanguageCode;
}

export default function WeeklyRaffleModalClient({
  data,
  langCode,
}: WeeklyRaffleModalClientProps) {
  const {
    weeklyRaffleModalOpen,
    toggleWeeklyRaffleModalOpen,
    toggleTicketModalOpen,
  } = useSidebarStore();
  const pathName = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.user);
  const t = useTranslations("weeklyRaffle");

  if (!isAuthenticated) {
    return null;
  }

  const {
    title,
    modalDescription,
    goalAmount,
    ticketProgress,
    entries,
    timer,
    buttonText,
  } = data || {};
  const localizedTitle = getLocalizedString(title, langCode);
  const localizedButtonText = getLocalizedString(buttonText, langCode);
  const localizedDescription =
    modalDescription?.find((d: any) => d.language === langCode)?.blocks || [];

  const handleClose = () => {
    toggleWeeklyRaffleModalOpen();
    router.push(pathName, { scroll: false });
  };

  const openTicketModal = () => {
    router.push("?modal=ticket", { scroll: false });
    toggleWeeklyRaffleModalOpen();
    toggleTicketModalOpen();
  };

  return (
    <GlobalModal
      title={localizedTitle}
      open={weeklyRaffleModalOpen}
      onOpenChange={(open) => !open && handleClose()}
      className="lg:min-w-[450px]"
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="w-full bg-background-3 rounded-lg p-5 text-center">
          <div className="max-w-40 mx-auto rounded-lg overflow-hidden mb-4">
            <CImage
              publicId="modal-hero_dyql8y"
              alt="raffle-hero"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              priority
              fetchPriority="high"
            />
          </div>

          <div className="flex justify-center">
            <TimerCountdown {...timer} />
          </div>
        </div>

        {/* Progress */}
        <div className="w-full bg-background-3 rounded-lg p-5 space-y-3">
          <div className="flex justify-between text-sm text-white/55">
            <span>{t("nextTicket")}</span>
            <span className="font-semibold text-white">
              ${Math.floor(goalAmount * (ticketProgress / 100))?.toFixed(2)} / $
              {goalAmount?.toFixed(0)}
            </span>
          </div>
          <div className="w-full bg-background-1 rounded-full overflow-hidden h-3">
            <div
              className="bg-gradient-to-t from-orange-1 to-yellow-1 h-3 rounded-full transition-all duration-500"
              style={{ width: `${ticketProgress}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-white/55">
            <span>{t("yourEntries")}</span>
            <span className="text-white font-semibold">{entries}</span>
          </div>
        </div>
        {/* Info */}
        <div className="w-full bg-background-3 rounded-lg p-5 space-y-3">
          <PortableText
            value={localizedDescription}
            components={portableTextComponents}
          />
        </div>

        {/* Button */}
        <Button
          aria-label="view ticket"
          variant="orangeGradient"
          fullWidth
          onClick={openTicketModal}
          className=""
        >
          {localizedButtonText}
        </Button>
      </div>
    </GlobalModal>
  );
}
