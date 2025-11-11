"use client";
import { useTranslations } from "next-intl";
interface PlayerStatusProps {
  players?: number;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({ players }) => {
  const t = useTranslations("playing");
  return (
    <p className="text-xs flex items-center gap-1">
      <span
        className={`inline-block size-2 rounded-full shrink-0 ${
          players ? "bg-sports" : "bg-red-500"
        }`}
      />
      <span className="inline-block space-x-1">
        <span className="font-semibold">{players ?? 0}</span>
        <span className="text-foreground/55">{t("title")}</span>
      </span>
    </p>
  );
};

export default PlayerStatus;
