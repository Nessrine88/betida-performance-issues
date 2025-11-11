"use client";

import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";
import { useSidebarStore } from "@/store/sidebar-store";
import FacebookIconSVG from "../svg_icons/facebook-icon-svg";
import XIconSVG from "../svg_icons/x-Icon-svg";
import YoutubeIconSVG from "../svg_icons/youtube-Icon-svg";
import TiktokIconSVG from "../svg_icons/tiktok-Icon-svg";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export function UnauthenticatedArea() {
  const t = useTranslations("unauthorized");
  const router = useRouter();
  const pathname = usePathname();
  const { toggleAuthModalOpen } = useSidebarStore();

  const handleRegisterClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "auth");
    params.set("auth-tab", "register");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    toggleAuthModalOpen();
  };

  const socialIcons = [
    {
      id: 1,
      icon: (
        <FacebookIconSVG className="fill-white/55 group-hover:fill-white transition-all duration-300" />
      ),
      url: "#",
      label: "Follow us on Facebook",
    },
    {
      id: 2,
      icon: (
        <XIconSVG className="fill-white/55 group-hover:fill-white transition-all duration-300" />
      ),
      url: "#",
      label: "Follow us on X (Twitter)",
    },
    {
      id: 3,
      icon: (
        <YoutubeIconSVG className="fill-white/55 group-hover:fill-white transition-all duration-300" />
      ),
      url: "#",
      label: "Subscribe to our Youtube channel",
    },
    {
      id: 4,
      icon: (
        <TiktokIconSVG className="fill-white/55 group-hover:fill-white transition-all duration-300" />
      ),
      url: "#",
      label: "Follow us on Tiktok",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full space-y-4">
        {/* Title */}
        <h1 className="text-3xl text-center lg:text-left font-semibold text-white">
          {t("title")}
        </h1>

        {/* Register Button */}
        <div className="text-center lg:text-left">
          <Button
            onClick={handleRegisterClick}
            variant="orangeGradient"
            aria-label="register"
          >
            {t("register")}
          </Button>
        </div>

        {/* Signup Text and Social Icons */}
        <div className="text-sm font-semibold">
          <div className="w-full text-center lg:text-left">{t("signuptext")}</div>
          <div className="flex items-center justify-center lg:justify-normal mt-2 gap-2">
            {socialIcons.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                aria-label={item.label}
                className="size-8 rounded-lg bg-background-2 inline-flex items-center justify-center hover:bg-foreground/10 transition-all duration-300 group"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnauthenticatedArea;
