import { type ReactNode } from "react";
import SecondLayout from "../components/layout/second-layout";
import SettingsIconSvg from "../components/common/svg_icons/settings-icon-svg";

const settingsLinks = [
    { name: "Account", href: "/settings" },
    { name: "Security", href: "/settings/security" },
    { name: "Preferences", href: "/settings/preferences" },
    { name: "API", href: "/settings/api" },
    { name: "Verification", href: "/settings/verification" },
    { name: "Offers", href: "/settings/offers" },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <SecondLayout
            layoutName="Settings"
            layoutIcon={<SettingsIconSvg />}
            links={settingsLinks}
        >
            {children}
        </SecondLayout>
    );
}
