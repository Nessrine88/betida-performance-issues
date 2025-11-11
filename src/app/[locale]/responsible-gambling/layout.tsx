import { type ReactNode } from "react";
import SecondLayout from "@/app/[locale]/components/layout/second-layout";
import ResponsibleIconSVG from "@/app/[locale]/components/common/svg_icons/sidebar-icons/responsible-icon-svg";

const ResponsibleGamblingLink = [
    { name: "BETIDA Smart", href: "/responsible-gambling" },
    { name: "Recognise the Signs", href: "/responsible-gambling/recognise-the-signs" },
    { name: "Responsible Gambling FAQ's", href: "/responsible-gambling/responsible-gambling-faq" },
    { name: "Self Exclusion", href: "/responsible-gambling/self-exclusion" },
    { name: "Gambling Limits", href: "/responsible-gambling/gambling-limits" },
    { name: "Deposit Limits", href: "/responsible-gambling/deposit-limits" },
    { name: "Self-Assessment", href: "/responsible-gambling/self-assessment" },
    { name: "Budget Calculator", href: "/responsible-gambling/budget-calculator" },
];

export default function ResponsibleGamblingLayout({ children }: { children: ReactNode }) {
    return (
        <SecondLayout
            layoutName="Responsible Gambling"
            layoutIcon={<ResponsibleIconSVG />}
            links={ResponsibleGamblingLink}
        >
            {children}
        </SecondLayout>
    );
}
