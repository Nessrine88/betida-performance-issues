import { type ReactNode } from "react";
import SettingsIconSvg from "@/app/[locale]/components/common/svg_icons/settings-icon-svg";
import SecondLayout from "@/app/[locale]/components/layout/second-layout";

const settingsLinks = [{ name: "Overview", href: "/law-enforcement" }];

export default function LayEnforcementLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SecondLayout
      layoutName="Law Enforcement"
      layoutIcon={<SettingsIconSvg />}
      links={settingsLinks}
    >
      {children}
    </SecondLayout>
  );
}
