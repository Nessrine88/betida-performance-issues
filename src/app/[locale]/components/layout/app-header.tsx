"use client";
import { Button } from "../ui/button";
import Image from "next/image";
import ForgetPasswordModal from "../modals/forget-password-modal";
import { useSearchParams } from "next/navigation";
import AuthModal from "../modals/login-register-flow/auth-modal";
import { useSidebarStore } from "@/store/sidebar-store";
import WalletSetupModal from "../modals/wallet/wallet-setup-modal/wallet-setup-modal";
import GlobalWalletCurrencySelect from "../global-components/global-wallet-currency-select";
import WalletOpenModal from "../modals/wallet/wallet-open-modal/wallet-open-modal";
import SearchSVG from "../common/svg_icons/search-svg";
import UserSVG from "../common/svg_icons/user-svg";
import NotiSVG from "../common/svg_icons/noti-svg";
import PhoneSVG from "../common/svg_icons/phone-svg";
import { Input } from "../ui/input";
import { Suspense, useMemo, useState } from "react";
import SearchBar, { debounce } from "../common/search-bar/search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EmptyNotiSVG from "../common/svg_icons/empty-noti-svg";
import WalletSVG from "../common/svg_icons/wallet-svg";

import {
  BanknoteArrowDown,
  BookKey,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Headset,
  Landmark,
  LogOut,
  MessageCircleMore,
  Settings,
  ShieldQuestionMark,
  Ticket,
  UserStar,
} from "lucide-react";
import VipIconSVG from "../common/svg_icons/sidebar-icons/vip-icon-svg";
import { toast } from "sonner";
import LogoutModal from "../modals/logout-modal";
import { useAuthStore } from "@/store/auth-store";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function AppHeader() {
  const pathname = usePathname();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingNoti, setLoadingNoti] = useState(true);
  const {
    toggleAuthModalOpen,
    toggleWalletSetupModalOpen,
    toggleWalletOpenModalOpen,
    toggleVipProgressModalOpen,
    toggleStatisticModalOpen,
    setRouteLoading,
  } = useSidebarStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const authUser = useAuthStore((state) => state.user);

  const handleLoginClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "auth");
    params.set("auth-tab", "login");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
    // router.push("?auth-tab=login");
    toggleAuthModalOpen();
  };

  const debouncedUpdateQueryParams = useMemo(() => {
    return debounce((text: string) => {
      setSearchTerm(text);
    }, 500);
  }, []);

  const handleNotiOpenChange = (open: boolean) => {
    if (open) {
      setLoadingNoti(true);
      setTimeout(() => setLoadingNoti(false), 1000);
    }
  };

  // const handleMenuChange = (open: boolean) => {
  //   toast.info("Menu options feature is coming soon!");
  // };

  const handleRegisterClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "auth");
    params.set("auth-tab", "register");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
    // router.push("?auth-tab=register");
    toggleAuthModalOpen();
  };

  const handleWalletClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "wallet");
    params.set("wallet-step", "welcome");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
    // router.push("?wallet-tab=welcome");
    toggleWalletSetupModalOpen();
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedUpdateQueryParams(value);
  };

  const handleLogoutClick = () => {
    router.push("?modal=logout");
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    toast.success("Logged out successfully!");
  };

  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b border-border bg-background transition-all">
      <Suspense
        fallback={
          <div className="app-container flex items-center justify-between py-4 opacity-50 pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-32 h-8 bg-foreground/15 rounded animate-pulse" />{" "}
              <div className="hidden lg:block w-40 h-6 bg-foreground/15 rounded animate-pulse" />{" "}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-8 bg-foreground/15 rounded animate-pulse" />{" "}
              <div className="w-32 h-8 bg-foreground/15 rounded animate-pulse" />{" "}
            </div>
          </div>
        }
      >
        <div className="app-container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            {/* Logo + Brand */}
            <Link
              prefetch
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Return to home"
            >
              <span>
                <Image
                  src="/logos/logo.webp"
                  alt="Betida logo"
                  width={32}
                  height={32}
                  sizes="32px"
                   loading="eager"
                   priority 
                />
              </span>
              <span className="hidden text-lg font-semibold text-foreground lg:block">
                BETIDA
              </span>
            </Link>
          </div>
          {authUser && (
            <div className="flex flex-row items-center gap-0 md:gap-4">
              <GlobalWalletCurrencySelect />
              <Button
                variant="outline"
                className="hidden md:block"
                asChild
                onClick={handleWalletClick}
                ariaLabel="Open Wallet"
              >
                Wallet
              </Button>
              <Button
                variant="orangeGradient"
                className="block md:hidden rounded-l-none border-none h-11 py-1.5 px-2"
                asChild
                onClick={handleWalletClick}
                ariaLabel="Open Wallet"
              >
                <WalletSVG />
              </Button>
            </div>
          )}
          {/* Right side actions */}
          {authUser ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-row items-center gap-2 5">
                <Input
                  className="h-7 text-foreground/55 placeholder:text-foreground/15 border-none w-25 bg-transparent!"
                  prefix={<SearchSVG />}
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  onFocus={() => {
                    if (window.innerWidth < 768) {
                      setShowSearchModal(true);
                    }
                  }}
                  placeholder=" Search"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="p-0 bg-transparent border-none cursor-pointer rounded-full hover:bg-accent"
                    aria-label="User menu"
                  >
                    <UserSVG aria-hidden="true" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-72 rounded-xl bg-background-1 shadow-lg border border-border p-1"
                >
                  <div className="flex flex-col max-h-70 md:max-h-fit no-scrollbar overflow-y-auto divide-y divide-border">
                    {[
                      {
                        icon: <BriefcaseBusiness />,
                        title: "Purse",
                        onClick: handleWalletClick,
                      },
                      {
                        icon: <BookKey />,
                        title: "Main Vault",
                        onClick: () => {
                          const params = new URLSearchParams(
                            searchParams.toString()
                          );
                          params.set("modal", "wallet");
                          params.set("wallet-step", "3");
                          params.set("currency", "BTC");
                          params.set("step", "1");
                          params.set("walletTabs", "overview");
                          router.push(`?${params.toString()}`, {
                            scroll: false,
                          });
                          toggleWalletOpenModalOpen();
                        },
                      },
                      {
                        icon: <VipIconSVG />,
                        title: "VIP",
                        onClick: () => {
                          const params = new URLSearchParams(
                            window.location.search
                          );
                          params.set("modal", "vip");
                          params.set("progress", "overview"); // add tab param first

                          router.push(`${pathname}?${params.toString()}`, {
                            scroll: false,
                          });
                          toggleVipProgressModalOpen();
                        },
                      },
                      {
                        icon: <UserStar />,
                        title: "Business Partnership",
                        href: "/affiliate",
                      },
                      {
                        icon: <ChartNoAxesCombined />,
                        title: "Statistics",
                        onClick: () => {
                          toggleStatisticModalOpen();
                          router.push("?modal=statistics");
                        },
                      },
                      {
                        icon: <Landmark />,
                        title: "Transactions",
                        href: "/transactions",
                      },
                      {
                        icon: <BanknoteArrowDown />,
                        title: "My Bets",
                        href: "/my-bets",
                      },
                      {
                        icon: <Settings />,
                        title: "Settings",
                        href: "/settings",
                      },
                      {
                        icon: <ShieldQuestionMark />,
                        title: "Safe & Smart Betting",
                        href: "/responsible-gambling",
                      },
                      {
                        icon: <Headset />,
                        title: "Live Support",
                        onClick: () => {
                          toast.info("Live support feature is coming soon!");
                        },
                      },
                      {
                        icon: <LogOut />,
                        title: "Log Out",
                        onClick: () => {
                          handleLogoutClick();
                        },
                      },
                    ].map((n, i) =>
                      n.href ? (
                        // Use Link for static navigation
                        <Link
                          key={i}
                          href={n.href}
                          onClick={() => {
                            setRouteLoading(true);
                            // Close dropdown by triggering open state change
                            document.dispatchEvent(
                              new KeyboardEvent("keydown", { key: "Escape" })
                            );
                          }}
                          aria-label={`${n.title} option`}
                          className="flex items-center gap-3 py-3 cursor-pointer hover:bg-background hover:rounded-lg hover:border-transparent px-3 duration-300"
                        >
                          {n.icon}
                          <div>
                            <p className="font-medium">{n.title}</p>
                          </div>
                        </Link>
                      ) : (
                        // Use div for click actions
                        <div
                          key={i}
                          onClick={() => {
                            n.onClick?.();
                            // Close dropdown
                            document.dispatchEvent(
                              new KeyboardEvent("keydown", { key: "Escape" })
                            );
                          }}
                          aria-label={`${n.title} option`}
                          className="flex items-center gap-3 py-3 cursor-pointer hover:bg-background hover:rounded-lg hover:border-transparent px-3 duration-300"
                        >
                          {n.icon}
                          <div>
                            <p className="font-medium">{n.title}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* ============================================================= */}
              <DropdownMenu onOpenChange={handleNotiOpenChange}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="p-0 bg-transparent border-none cursor-pointer rounded-full hover:bg-accent"
                    aria-label="Notifications"
                  >
                    <NotiSVG aria-hidden="true" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-72 rounded-xl bg-background-1 shadow-lg border border-border p-1"
                >
                  {loadingNoti ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-foreground/60">
                      <EmptyNotiSVG />
                      <p className="font-medium">No Notifications Available</p>
                      <p className="text-sm">
                        Your interactions will be visible here
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col max-h-60 no-scrollbar overflow-y-auto divide-y divide-border">
                      {[
                        { title: "Money sent", time: "9:00 AM 9/5/2025" },
                        { title: "Money transfer", time: "9:00 AM 9/5/2025" },
                        { title: "Money sent", time: "9:00 AM 9/5/2025" },
                        { title: "Money sent", time: "9:00 AM 9/5/2025" },
                        { title: "Money sent", time: "9:00 AM 9/5/2025" },
                        { title: "Money sent", time: "9:00 AM 9/5/2025" },
                        { title: "Money sent", time: "9:00 AM 9/5/2025" },
                        { title: "Money sent", time: "9:00 AM 9/5/2025" },
                      ].map((n, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 py-3 cursor-pointer hover:bg-background hover:rounded-lg hover:border-transparent px-3 duration-300"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          <Image
                            src="/icons/usd-svg.svg"
                            alt="usd"
                            height={24}
                            width={24}
                          />
                          <div>
                            <p className="font-medium">{n.title}</p>
                            <p className="text-xs text-foreground/60">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="p-0 bg-transparent border-none cursor-pointer rounded-full hover:bg-accent"
                      aria-label="Phone menu"
                    >
                      <PhoneSVG aria-hidden="true" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-72 rounded-xl bg-background-1 shadow-lg border border-border p-1"
                  >
                    <div className="flex flex-col max-h-70 md:max-h-fit no-scrollbar overflow-y-auto divide-y divide-border">
                      {[
                        {
                          icon: <MessageCircleMore />,
                          title: "Chat",
                          onClick: () =>
                            toast.info("Chat feature is coming soon!"),
                        },
                        {
                          icon: <Ticket />,
                          title: "Coupon",
                          onClick: () =>
                            toast.info("Coupon feature is coming soon!"),
                        },
                      ].map((n, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 py-3 cursor-pointer hover:bg-background hover:rounded-lg hover:border-transparent px-3 duration-300"
                          onClick={n.onClick}
                        >
                          {n?.icon}
                          <div>
                            <p className="font-medium">{n.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                asChild
                onClick={() => handleLoginClick()}
              >
                Login
              </Button>

              <Button
                onClick={() => handleRegisterClick()}
                variant="orangeGradient"
                asChild
              >
                Register
              </Button>
            </div>
          )}
          {/* Auth Modal */}
          <AuthModal />
          {/* Forget Password Modal open */}
          <ForgetPasswordModal />
          {/* Wallet Setup Modal */}
          <WalletSetupModal />
          {/* Wallet Opening  modal */}
          <WalletOpenModal />

          {showSearchModal && (
            <div
              className="fixed inset-0 z-9999 bg-black/60 flex items-start justify-center pt-20"
              onClick={() => setShowSearchModal(false)}
            >
              <div
                className="w-full max-w-md bg-background p-4 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <SearchBar tab={false} />
              </div>
            </div>
          )}
        </div>
      </Suspense>
      <LogoutModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
      />
    </header>
  );
}
