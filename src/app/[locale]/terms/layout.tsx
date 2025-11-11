import { type ReactNode } from "react";
import SecondLayout from "../components/layout/second-layout";

const TermsLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Deposit Bonus Requirements", href: "/terms/deposit-bonus-requirements" },
    { name: "Anti-Money Laundering", href: "/terms/anti-money-laundering" },
    { name: "Privacy", href: "/terms/privacy" },
    { name: "Coin Mixing", href: "/terms/coin-mixing" },
    { name: "Providers", href: "/terms/provider-availability-policy" },
    { name: "Sportsbook", href: "/terms/sports-book" },
    { name: "Cookies Policy", href: "/terms/cookies-policy" },
    { name: "Self-Exclusion", href: "/terms/self-exclusion-policy" },
    { name: "Racing Rules", href: "/terms/racing-rules" },
    { name: "Poker Card Room Rules", href: "/terms/poker-card-room-rules" },
    { name: "Poker Refund Policy", href: "/terms/poker-refund-policy" },
    { name: "Poker Security & Ecology Policy", href: "/terms/poker-security-ecology-policy" },
    { name: "Affiliate Terms", href: "/terms/affiliate-terms" },
];

export default function TermsLayout({ children }: { children: ReactNode }) {
    return (
        <SecondLayout
            layoutName="Privacy Policy"
            // layoutIcon={<SettingsIconSvg />}
            links={TermsLinks}
        >
            {children}
        </SecondLayout>
    );
}
