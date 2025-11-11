import { type ReactNode } from "react";
import SecondLayout from "../components/layout/second-layout";
import MyBetsIconSvg from "../components/common/svg_icons/sidebar-icons/my-bets-icon-svg";

const settingsLinks = [
    { name: "Casino", href: "/my-bets" },
    { name: "Sports", href: "/my-bets/sports" },
    { name: "Archive", href: "/my-bets/archive" },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <SecondLayout
            layoutName="My Bets"
            layoutIcon={<MyBetsIconSvg/>}
            links={settingsLinks}
        >
            {children}
        </SecondLayout>
    );
}
