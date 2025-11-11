"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../global-components/global-modal/global-modal";
import { Button } from "../../ui/button";
import TimerCountdown from "../../global-components/timer-countdown";
import { useAuthStore } from "@/store/auth-store";
import { useTranslations } from "next-intl";
import CImage from "@/lib/CIdImage";

interface TicketModalClientProps {
  data: any;
}

export default function TicketModalClient({
  data,
}: TicketModalClientProps) {
  const { ticketModalOpen, toggleTicketModalOpen } = useSidebarStore();
  const router = useRouter();
  const pathName = usePathname();
  const isAuthenticated = useAuthStore((state) => state.user);
  const t = useTranslations("ticketModal");

  if (!isAuthenticated) {
    return null;
  }

  const { tickets, ticketSummary } = data || {};
  const hasTickets = tickets?.length > 0 || false;

  const handleClose = () => {
    toggleTicketModalOpen();
    router.push(pathName, { scroll: false });
  };

  return (
    <GlobalModal
      title={t("title")}
      open={ticketModalOpen}
      onOpenChange={(open) => !open && handleClose()}
      className="lg:min-w-[480px]"
    >
      <div className="space-y-6 py-4">
        {hasTickets ? (
          <>
            <div className="bg-background-3 rounded-lg p-5 text-center space-y-3">
              <p className="text-foreground/55 text-sm">{t("totalEntries")}</p>
              <p className="text-3xl font-semibold text-foreground">
                {ticketSummary?.totalEntries || 0}
              </p>
              <div className="flex flex-col items-center">
                <p className="text-foreground/55 text-sm mb-1">{t("nextDrawIn")}</p>
                <TimerCountdown
                  days={ticketSummary?.nextDraw?.days || 0}
                  hours={ticketSummary?.nextDraw?.hours || 0}
                  minutes={ticketSummary?.nextDraw?.minutes || 0}
                  seconds={ticketSummary?.nextDraw?.seconds || 0}
                  storageKey={
                    ticketSummary?.nextDraw?.storageKey || "ticket_timer"
                  }
                />
              </div>
            </div>

            <div className="bg-background-3 rounded-lg p-5 space-y-3">
              <h3 className="text-foreground text-sm font-semibold mb-2">
                {t("ticketList")}
              </h3>

              <div className="max-h-[200px] overflow-y-auto custom-scrollbar space-y-2">
                {tickets?.map((ticket: any) => (
                  <div
                    key={ticket?.id}
                    className="flex justify-between items-center bg-background-1 p-3 rounded-md hover:bg-background-2 transition"
                  >
                    <div>
                      <p className="text-foreground text-sm">Ticket #{ticket?.id}</p>
                      <p className="text-xs text-foreground/60">{ticket?.date}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-md ${
                        ticket?.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {ticket?.status}
                    </span>
                  </div>
                )) || (
                  <p className="text-foreground/55 text-sm text-center">
                    {t("noTickets")}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <CImage
              publicId="no-tickets_dcnxun"
              alt="no-tickets"
              width={100}
              height={100}
              className="opacity-80"
              priority
              fetchPriority="high"
            />
            <p className="text-foreground/55 text-sm text-center">
              {t("emptyMessage")}
            </p>
            <Button
              variant="orangeGradient"
              className="mt-4"
              onClick={handleClose}
              aria-label="close"
            >
              {t("emptyButtonText")}
            </Button>
          </div>
        )}
      </div>
    </GlobalModal>
  );
}
