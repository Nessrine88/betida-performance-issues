"use client";

import { Button } from "@/app/[locale]/components/ui/button";
import { Link as LinkIcon, Copy } from "lucide-react";
import GlobalTooltip from "@/app/[locale]/components/global-components/global-tooltip";
import CImage from "@/lib/CIdImage";
import dayjs from "dayjs";
import { usePathname } from "@/i18n/navigation";

interface BetDetailsModalContentProps {
  selectedRow: any | null;
  onClose: () => void;
}

export default function BetsPlayModalContent({
  selectedRow,
  onClose,
}: BetDetailsModalContentProps) {

  const pathname = usePathname();
  const handleCopy = async (text: string, message: string) => {
    await navigator.clipboard.writeText(text);
    // Replace with toast notification if available
    console.log(message); // Placeholder for success message
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
                <Copy className="h-4 w-4 cursor-pointer" />
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
          <span className="text-foreground">Placed on:</span>{" "}
          {dayjs(selectedRow.date).format("MM/DD/YYYY at hh:mm A")}
        </p>
        <p className="text-sm text-foreground/55 flex flex-row items-center gap-3 justify-between bg-background-2 px-3 py-2 rounded-lg">
          <span className="text-foreground">Multiplier:</span>{" "}
          {selectedRow.multiplier}
        </p>
      </div>

      {/* Game Image */}
      <div className="h-fit w-full rounded-lg shadow-xl py-2">
        <CImage
          publicId="bet_details_card" // Use a default or row.thumbnail if available
          alt={selectedRow?.gameTitle || "Bet Details"}
          fetchPriority="high"
          priority
          className="h-full w-full object-cover rounded-lg"
          width={300}
          height={200}
        />
      </div>

      {/* Bet Amount and Profit/Loss */}
      <div className="grid grid-cols-2 gap-4 text-center py-4 border-y border-foreground/20">
        <div>
          <p className="text-sm text-foreground/55">Bet Amount</p>
          <p className="font-semibold">{selectedRow.betAmount}</p>
        </div>
        <div>
          <p className="text-sm text-foreground/55">Profit/Loss</p>
          <p className="font-semibold">{selectedRow.profitLoss}</p>
        </div>
      </div>

      {/* Play Game Button */}
      <Button
        aria-label="Play game"
        variant="orangeGradient"
        className="w-full"
        onClick={onClose}
      >
        Play {selectedRow.gameTitle}
      </Button>
    </div>
  );
}
