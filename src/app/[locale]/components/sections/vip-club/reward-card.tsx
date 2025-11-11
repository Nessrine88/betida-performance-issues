import type { Reward } from "./next-level-rewards-section";
import { Button } from "@/app/[locale]/components/ui/button";
import CImage from "@/lib/CIdImage";

export default function RewardCard({ reward }: { reward: Reward }) {
  return (
    <div className="bg-background-2 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
      {/* Icon */}
      <div className="shrink-0">
        <CImage
          publicId={reward.icon}
          alt={reward.title}
          width={48}
          height={48}
          className="object-contain"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Text */}
      <div className="flex-1 space-y-1">
        {reward.badge && (
          <p className="text-sm font-semibold text-primary">{reward.badge}</p>
        )}
        <h3 className="font-semibold text-xl text-foreground">{reward.title}</h3>
        <p className="text-sm text-foreground/55">{reward.description}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 w-full md:w-auto">
        <Button variant="outline" asChild>
          View Detail
        </Button>
        <Button variant="orangeGradient" asChild>
          Claim
        </Button>
      </div>
    </div>
  );
}
