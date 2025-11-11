"use client";

import { Button } from "@/app/[locale]/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import GlobalTooltip from "@/app/[locale]/components/global-components/global-tooltip";
import CImage from "@/lib/CIdImage";
import CopyIconSVG from "@/app/[locale]/components/common/svg_icons/copy-icon-svg";
import dayjs from "dayjs";
import { usePathname } from "@/i18n/navigation";

interface BetDetailsModalContentProps {
  selectedRow: any | null;
  onClose: () => void;
  onOpenSheet: () => void;
}

export default function BetDetailsModalContent({
  selectedRow,
  onOpenSheet,
}: BetDetailsModalContentProps) {

  const pathname = usePathname();
  const handleCopy = async (text: string, message: string) => {
    await navigator.clipboard.writeText(text);
    // Assume a toast here: toast.success(message);
    console.log(message); // Placeholder
  };

  const handleShareInChat = () =>
    handleCopy(selectedRow?.betId || "", "Copied, share in chat!");

  const handleShareOnline = () => {
    const shareUrl = `${window.location.origin}${pathname}?modal=true&betId=${selectedRow?.betId}`;
    handleCopy(shareUrl, "Copied, share online!");
  };

  if (!selectedRow) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Bet ID and details */}
      <div className="flex flex-col gap-2">
        <div className="text-sm text-foreground/55 flex flex-row items-center gap-3 justify-between bg-background-2 px-3 py-2 rounded-lg">
          <div>
            <span className="text-foreground">ID:</span>{" "}
            {selectedRow?.betId || "N/A"}{" "}
          </div>
          <div className="flex flex-row gap-3 items-center">
            <GlobalTooltip tooltip="Copied! Share in chat">
              <div onClick={handleShareInChat}>
                <CopyIconSVG />
              </div>
            </GlobalTooltip>{" "}
            <GlobalTooltip tooltip="Copied! Share online">
              <LinkIcon
                size={14}
                onClick={handleShareOnline}
                className="cursor-pointer"
              />
            </GlobalTooltip>
          </div>
        </div>
        <p className="text-sm text-foreground/55 flex flex-row items-center gap-3 justify-between bg-background-2 px-3 py-2 rounded-lg">
          <span className="text-foreground">Placed by:</span> {selectedRow.user}
        </p>
        <p className="text-sm text-foreground/55 flex flex-row items-center gap-3 justify-between bg-background-2 px-3 py-2 rounded-lg">
          <span className="text-foreground"> on:</span>{" "}
          {dayjs(selectedRow.time).format("MM/DD/YYYY at hh:mm A")}
        </p>
        <p className="text-sm text-foreground/55 flex flex-row items-center gap-3 justify-between bg-background-2 px-3 py-2 rounded-lg">
          <span className="text-foreground"> Odds:</span>{" "}
          {selectedRow?.odds || "N/A"}
        </p>
      </div>

      {/* Event and market */}
      <div className="h-fit w-full rounded-lg shadow-xl py-2">
        <CImage
          publicId="bet_details_card"
          alt={selectedRow?.game || "Bet Details"}
          fetchPriority="high"
          priority
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Stake and Payout */}
      <div className="grid grid-cols-2 gap-4 text-center py-4 border-y border-foreground/20">
        <div>
          <p className="text-sm text-foreground/55">BETIDA</p>
          <p className="font-semibold">{selectedRow.betAmount}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/55">Est Payout</p>
          <p className="font-semibold">{selectedRow.payout}</p>
        </div>
      </div>

      {/* Add to Betslip Button */}
      <Button
        aria-label="add bet"
        variant="orangeGradient"
        className="w-full"
        onClick={onOpenSheet}
      >
        Add 1 bet to my Betslip
      </Button>
    </div>
  );
}
