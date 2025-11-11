"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import CookieBanner from "./cookie-banner";

const DOMAIN_GROUP_ID = "3b99f0b1-1d9e-4e8e-9dad-3f5d889003c3";

declare global {
  interface Window {
    __COOKIEBOT_LOADED__?: boolean;
    Cookiebot?: {
      consent: {
        marketing: boolean;
        statistics: boolean;
        preferences: boolean;
      };
      submitCustomConsent: (
        necessary: boolean,
        preferences: boolean,
        statistics: boolean,
        marketing: boolean
      ) => void;
      renew: () => void;
      callback?: () => void;
    };
  }
}

export default function CookieBot() {
  const [CookieBotComponent, setCookieBotComponent] =
    useState<ComponentType<{ domainGroupId: string }> | null>(null);
  const [isBannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.__COOKIEBOT_LOADED__) {
      return;
    }

    window.__COOKIEBOT_LOADED__ = true;

    const loadCookieBot = () => {
      import("react-cookiebot")
        .then((mod) => {
          setCookieBotComponent(() => mod.default);

          // Wait until Cookiebot is ready
          const checkReady = setInterval(() => {
            if (window.Cookiebot && window.Cookiebot.consent) {
              clearInterval(checkReady);

              // ✅ Show banner only if consent not given yet
              const hasConsent =
                window.Cookiebot.consent.marketing ||
                window.Cookiebot.consent.statistics ||
                window.Cookiebot.consent.preferences;

              if (!hasConsent) {
                setBannerVisible(true);
              }

              // ✅ When Cookiebot renews or consent withdrawn, show banner again
              window.Cookiebot.callback = () => {
                const again =
                  !window.Cookiebot?.consent.marketing &&
                  !window.Cookiebot?.consent.statistics &&
                  !window.Cookiebot?.consent.preferences;
                setBannerVisible(again);
              };
            }
          }, 300);
        })
        .catch((err) => console.warn("Failed to load react-cookiebot:", err));
    };

    if (document.readyState === "complete") {
      setTimeout(loadCookieBot, 1000);
    } else {
      window.addEventListener("load", () => setTimeout(loadCookieBot, 1000));
    }
  }, []);

  const handleAccept = () => {
    window.Cookiebot?.submitCustomConsent(true, true, true, true);
    setBannerVisible(false);
  };

  const handleDecline = () => {
    window.Cookiebot?.submitCustomConsent(true, false, false, false);
    setBannerVisible(false);
  };

  return (
    <>
      {CookieBotComponent && <CookieBotComponent domainGroupId={DOMAIN_GROUP_ID} />}
      {isBannerVisible && (
        <CookieBanner
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </>
  );
}
