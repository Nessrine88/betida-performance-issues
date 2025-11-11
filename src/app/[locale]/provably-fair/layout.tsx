import { type ReactNode } from "react";
import SecondLayout from "@/app/[locale]/components/layout/second-layout";
import ProvablyFairSvg from "../components/common/svg_icons/provably-fair-svg";

const ProvablyFairLink = [
  { name: "Overview", href: "/provably-fair" },
  { name: "Implementation", href: "/provably-fair/implementation" },
  { name: "Conversions", href: "/provably-fair/conversions" },
  { name: "Game Events", href: "/provably-fair/game-events" },
  { name: "Unhash Server Seed", href: "/provably-fair/unhash-server-seed" },
  { name: "Calculation", href: "/provably-fair/calculation" },
];

export default function ProvablyFairLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SecondLayout
      layoutName="Provably Fair"
      layoutIcon={<ProvablyFairSvg />}
      links={ProvablyFairLink}
    >
      {children}
    </SecondLayout>
  );
}
