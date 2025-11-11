"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieBanner({
  onAccept,
  onDecline,
}: CookieBannerProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-39 max-w-md w-full px-4 sm:px-0">
      <div className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background-3 px-4 py-3 shadow-lg backdrop-blur-md">
        {/* Checkbox + Label */}
        <label className="flex items-center gap-2 text-sm text-white cursor-pointer select-none">
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => setChecked(!!v)}
            className="border-white/60 data-[state=checked]:bg-foreground/20"
          />
          <span>We use cookies for analytics purposes.</span>
        </label>

        {/* Confirm Button */}
        <Button
          aria-label="confirm"
          variant={checked ? "orangeGradient" : "ghost"}
          disabled={!checked}
          onClick={onAccept}
          className="px-4 py-2 text-sm font-semibold"
        >
          Confirm
        </Button>

        {/* Close Button */}
        <button
          aria-label="times"
          onClick={onDecline}
          className="size-5 border-white border-2 shrink-0 rounded-full flex items-center justify-center cursor-pointer"
        >
          <span className="text-center inline-block mb-1">&times;</span>
        </button>
      </div>
    </div>
  );
}
