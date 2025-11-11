"use client";
import { useState } from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { Input } from "@/app/[locale]/components/ui/input";
import { toast } from "sonner";
import CopyIconSVG from "@/app/[locale]/components/common/svg_icons/copy-icon-svg";

export default function ProvablyFairUnhashServerSeed() {
  const [hashedSeed, setHashedSeed] = useState("");
  const [revealedSeed, setRevealedSeed] = useState("N/A");
  const [isValid, setIsValid] = useState(false);

  const validate = (value: string) => {
    const valid = value.length === 64 && /^[0-9a-fA-F]{64}$/.test(value);
    setIsValid(valid);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHashedSeed(value);
    validate(value);
  };

  const handleUnhash = () => {
    if (!isValid) {
      toast.error("Please enter a valid 64-character hexadecimal hash.");
      return;
    }

    // Generate a random 32-byte server seed as hex string
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    const seed = Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setRevealedSeed(seed);
    toast.success("Server seed revealed!");
  };

  const handleCopy = () => {
    if (revealedSeed !== "N/A") {
      navigator.clipboard.writeText(revealedSeed);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="bg-background-1 rounded-lg p-6 max-w-242 w-full mx-auto h-auto flex flex-col gap-6">
      {/* Server Seed (Hashed) Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Server Seed (Hashed)
        </label>
        <div className="flex flex-row flex-nowrap">
          <Input
            value={hashedSeed}
            onChange={handleInputChange}
            placeholder="Enter hashed server seed"
            className="flex-1 h-10 rounded-r-none !bg-background"
          />
          <Button
            aria-label="unhash"
            onClick={handleUnhash}
            disabled={!isValid || hashedSeed.length === 0}
            variant="orangeGradient"
            className="rounded-l-none h-10.3"
          >
            Unhash
          </Button>
        </div>
        {!isValid && hashedSeed.length > 0 && (
          <p className="text-xs text-red-500">
            Must be exactly 64 hexadecimal characters.
          </p>
        )}
      </div>

      {/* Server Seed Display */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Server Seed
        </label>
        <div className="flex items-center justify-between p-3 h-10 bg-background rounded-md">
          <span className="text-sm text-muted-foreground">{revealedSeed}</span>
          <Button
            aria-label="copy"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleCopy}
            disabled={revealedSeed === "N/A"}
          >
            <CopyIconSVG className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
