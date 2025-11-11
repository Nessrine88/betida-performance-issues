"use client"
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { Switch } from "@/app/[locale]/components/ui/switch";
import { useSearchParams } from "next/navigation";
import GlobalTooltip from "@/app/[locale]/components/global-components/global-tooltip";
import ResizeIcon from "@/app/[locale]/components/common/svg_icons/player-controls/resize-icon";
import ProgressIcon from "@/app/[locale]/components/common/svg_icons/player-controls/progress-icon";
import FavoriteIcon from "@/app/[locale]/components/common/svg_icons/player-controls/favorite-icon";
import RedirectIcon from "@/app/[locale]/components/common/svg_icons/player-controls/redirect-icon";
import EditIcon from "@/app/[locale]/components/common/svg_icons/player-controls/edit-icon";
import { Button } from "@/app/[locale]/components/ui/button";


function PlayerControls() {
  const searchParams = useSearchParams();
  const currency = searchParams.get("currency") || "USD";
  const isFunPlay = searchParams.get("mode") === "fun";
  const isFullScreen = searchParams.get("screen") === "full";

  return (
    <div className="rounded-lg bg-background-1 p-3 lg:p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-6">
      <div className="left flex flex-row items-center justify-between lg:justify-center gap-3 lg:gap-12">

        {/* desktop icon for control */}
        <div className="control_icons hidden lg:flex flex-row items-center gap-4">
          <GlobalTooltip tooltip="Enable full screen mode">
            <ResizeIcon />
          </GlobalTooltip>
          <GlobalTooltip tooltip="Enable theatre mode">
            <EditIcon />
          </GlobalTooltip>
          <GlobalTooltip tooltip="Open live stats">
            <ProgressIcon />
          </GlobalTooltip>
          <GlobalTooltip tooltip="Favorite">
            <FavoriteIcon />
          </GlobalTooltip>
          <GlobalTooltip tooltip="Open mini player">
            <RedirectIcon />
          </GlobalTooltip>
        </div>

        <div className="flex gap-2 items-center">
          <span className="inline-block text-sm font-normal lg:hidden">
            Balance displayed in
          </span>
          <Select value={currency} disabled>
            <SelectTrigger className="min-w-20 h-8! flex items-center gap-1 text-sm text-foreground border-none bg-transparent">
              <div className="flex gap-1 items-center">
                <div className="h-5 w-5 rounded-full bg-foreground/15 flex items-center justify-center">
                  $
                </div>
                <SelectValue placeholder="Select" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background-2 border-none">
              <SelectItem value="USD" className="text-sm text-foreground/55">
                USD
              </SelectItem>
              <SelectItem value="EUR" className="text-sm text-foreground/55">
                EUR
              </SelectItem>
              <SelectItem value="GBP" className="text-sm text-foreground/55">
                GBP
              </SelectItem>
              <SelectItem value="BTC" className="text-sm text-foreground/55">
                BTC
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* desktop switch for fun plan and real play */}
      <div className="right hidden lg:flex flex-row items-center gap-2 text-sm text-foreground">
        <span className="inline-block pb-1">
          Fun Play
        </span>
        <Switch
          checked={isFunPlay}
          disabled
          className={
            isFunPlay ? "bg-chart-2 data-[state=checked]:bg-foreground" : ""
          }
        />
        <span className="inline-block pb-1">
          Real Play
        </span>
      </div>

      {/* mobile Play in Fullscreen and fun plan and real play */}
      <div className="space-y-4 mt-2 block lg:hidden">
        <div className="flex items-center gap-3">
          <Switch
            checked={isFullScreen}
            disabled
            className={
              isFullScreen ? "bg-chart-2 data-[state=checked]:bg-foreground" : ""
            }
          />
          <span className="inline-block pb-1 text-sm">
            Play in Fullscreen
          </span>
        </div>

        {/* buttons for mobile */}
        <div className="w-full grid grid-cols-2 gap-4">
          <Button variant="purpleGradient" fullWidth>
            Play
          </Button>
          <Button variant="outline" fullWidth>
            Fun Play
          </Button>
        </div>

      </div>
    </div>
  );
}

export default PlayerControls;
