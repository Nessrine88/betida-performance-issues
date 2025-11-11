import { type ReactNode } from "react";
import SecondLayout from "../components/layout/second-layout";
import AffiliateIconSVG from "../components/common/svg_icons/sidebar-icons/affiliate-icon-svg";

const settingsLinks = [
    { name: "Overview", href: "/affiliate" },
    { name: "Campaigns", href: "/affiliate/campaigns" },
    { name: "Commission", href: "/affiliate/commission" },
    { name: "Referred Users", href: "/affiliate/referred-users" },
    { name: "FAQ", href: "/affiliate/faq" },
];

export default function AffiliateLayout({ children }: { children: ReactNode }) {
    return (
        <SecondLayout
            layoutName="Affiliate"
            layoutIcon={<AffiliateIconSVG />}
            links={settingsLinks}
        >
            {children}
        </SecondLayout>
    );
}
