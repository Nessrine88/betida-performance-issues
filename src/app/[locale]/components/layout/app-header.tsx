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

// Menu configuration
const USER_MENU_ITEMS = [
  { icon: BriefcaseBusiness, title: "Purse", action: "wallet" },
  { icon: BookKey, title: "Main Vault", action: "vault" },
  { icon: VipIconSVG, title: "VIP", action: "vip" },
  { icon: UserStar, title: "Business Partnership", href: "/affiliate" },
  { icon: ChartNoAxesCombined, title: "Statistics", action: "statistics" },
  { icon: Landmark, title: "Transactions", href: "/transactions" },
  { icon: BanknoteArrowDown, title: "My Bets", href: "/my-bets" },
  { icon: Settings, title: "Settings", href: "/settings" },
  { icon: ShieldQuestionMark, title: "Safe & Smart Betting", href: "/responsible-gambling" },
  { icon: Headset, title: "Live Support", action: "support" },
  { icon: LogOut, title: "Log Out", action: "logout" },
];

const PHONE_MENU_ITEMS = [
  { icon: MessageCircleMore, title: "Chat", action: "chat" },
  { icon: Ticket, title: "Coupon", action: "coupon" },
];

const MOCK_NOTIFICATIONS = Array(8).fill(null).map(() => ({
  title: "Money sent",
  time: "9:00 AM 9/5/2025",
}));

// Shared menu item component
const MenuItem = ({ icon: Icon, title, onClick, href, className = "" }: any) => {
  const { setRouteLoading } = useSidebarStore();
  const content = (
    <>
      {typeof Icon === "function" ? <Icon /> : Icon}
      <p className="font-medium">{title}</p>
    </>
  );
  
  const itemClass = `flex items-center gap-3 py-3 cursor-pointer hover:bg-background hover:rounded-lg px-3 duration-300 ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        onClick={() => {
          setRouteLoading(true);
          document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        }}
        className={itemClass}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      onClick={() => {
        onClick?.();
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      }}
      className={itemClass}
    >
      {content}
    </div>
  );
};

// Dropdown icon button
const IconButton = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <button
    type="button"
    className="p-0 bg-transparent border-none cursor-pointer rounded-full hover:bg-accent"
    aria-label={label}
  >
    {children}
  </button>
);

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loadingNoti, setLoadingNoti] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const authUser = useAuthStore((state) => state.user);
  const {
    toggleAuthModalOpen,
    toggleWalletSetupModalOpen,
    toggleWalletOpenModalOpen,
    toggleVipProgressModalOpen,
    toggleStatisticModalOpen,
  } = useSidebarStore();

  const updateUrlParams = (params: Record<string, string>) => {
    const urlParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => urlParams.set(key, value));
    router.push(`${pathname}?${urlParams.toString()}`, { scroll: false });
  };

  const handleAuthClick = (tab: "login" | "register") => {
    updateUrlParams({ modal: "auth", "auth-tab": tab });
    toggleAuthModalOpen();
  };

  const handleWalletClick = () => {
    updateUrlParams({ modal: "wallet", "wallet-step": "welcome" });
    toggleWalletSetupModalOpen();
  };

  const handleMenuAction = (action: string) => {
    const actions: Record<string, () => void> = {
      wallet: handleWalletClick,
      vault: () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("modal", "wallet");
        params.set("wallet-step", "3");
        params.set("currency", "BTC");
        params.set("step", "1");
        params.set("walletTabs", "overview");
        router.push(`?${params.toString()}`, { scroll: false });
        toggleWalletOpenModalOpen();
      },
      vip: () => {
        updateUrlParams({ modal: "vip", progress: "overview" });
        toggleVipProgressModalOpen();
      },
      statistics: () => {
        router.push("?modal=statistics");
        toggleStatisticModalOpen();
      },
      support: () => toast.info("Live support feature is coming soon!"),
      logout: () => {
        router.push("?modal=logout");
        setIsLogoutModalOpen(true);
      },
      chat: () => toast.info("Chat feature is coming soon!"),
      coupon: () => toast.info("Coupon feature is coming soon!"),
    };
    actions[action]?.();
  };

  const debouncedSearch = useMemo(
    () => debounce((text: string) => setSearchTerm(text), 500),
    []
  );

  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b border-border bg-background transition-all">
      <Suspense
        fallback={
          <div className="app-container flex items-center justify-between py-4 opacity-50 pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-32 h-8 bg-foreground/15 rounded animate-pulse" />
              <div className="hidden lg:block w-40 h-6 bg-foreground/15 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-8 bg-foreground/15 rounded animate-pulse" />
              <div className="w-32 h-8 bg-foreground/15 rounded animate-pulse" />
            </div>
          </div>
        }
      >
        <div className="app-container flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link prefetch href="/" className="inline-flex items-center gap-3" aria-label="Return to home">
              <Image src="/logos/logo.webp" alt="Betida logo" width={32} height={32} sizes="32px" loading="eager" priority />
              <span className="hidden text-lg font-semibold text-foreground lg:block">BETIDA</span>
            </Link>
          </div>

          {/* Wallet Section (Authenticated) */}
          {authUser && (
            <div className="flex flex-row items-center gap-0 md:gap-4">
              <GlobalWalletCurrencySelect />
              <Button variant="outline" className="hidden md:block" onClick={handleWalletClick}>
                Wallet
              </Button>
              <Button
                variant="orangeGradient"
                className="block md:hidden rounded-l-none border-none h-11 py-1.5 px-2"
                onClick={handleWalletClick}
              >
                <WalletSVG />
              </Button>
            </div>
          )}

          {/* Right Actions */}
          {authUser ? (
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex">
                <Input
                  className="h-7 text-foreground/55 placeholder:text-foreground/15 border-none w-25 bg-transparent"
                  prefix={<SearchSVG />}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    debouncedSearch(e.target.value);
                  }}
                  onFocus={() => window.innerWidth < 768 && setShowSearchModal(true)}
                  placeholder=" Search"
                />
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton label="User menu"><UserSVG /></IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-xl bg-background-1 shadow-lg border border-border p-1">
                  <div className="flex flex-col max-h-70 md:max-h-fit no-scrollbar overflow-y-auto divide-y divide-border">
                    {USER_MENU_ITEMS.map((item, i) => (
                      <MenuItem
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        href={item.href}
                        onClick={item.action ? () => handleMenuAction(item.action) : undefined}
                      />
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <DropdownMenu onOpenChange={(open) => open && setTimeout(() => setLoadingNoti(false), 1000)}>
                <DropdownMenuTrigger asChild>
                  <IconButton label="Notifications"><NotiSVG /></IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-xl bg-background-1 shadow-lg border border-border p-1">
                  {loadingNoti ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-foreground/60">
                      <EmptyNotiSVG />
                      <p className="font-medium">No Notifications Available</p>
                      <p className="text-sm">Your interactions will be visible here</p>
                    </div>
                  ) : (
                    <div className="flex flex-col max-h-60 no-scrollbar overflow-y-auto divide-y divide-border">
                      {MOCK_NOTIFICATIONS.map((n, i) => (
                        <div key={i} className="flex items-center gap-3 py-3 cursor-pointer hover:bg-background hover:rounded-lg px-3 duration-300">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          <Image src="/icons/usd-svg.svg" alt="usd" height={24} width={24} />
                          <div>
                            <p className="font-medium">{n.title}</p>
                            <p className="text-xs text-foreground/60">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Phone Menu */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton label="Phone menu"><PhoneSVG /></IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 rounded-xl bg-background-1 shadow-lg border border-border p-1">
                    <div className="flex flex-col divide-y divide-border">
                      {PHONE_MENU_ITEMS.map((item, i) => (
                        <MenuItem key={i} icon={item.icon} title={item.title} onClick={() => handleMenuAction(item.action)} />
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => handleAuthClick("login")}>Login</Button>
              <Button variant="orangeGradient" onClick={() => handleAuthClick("register")}>Register</Button>
            </div>
          )}

          {/* Modals */}
          <AuthModal />
          <ForgetPasswordModal />
          <WalletSetupModal />
          <WalletOpenModal />

          {/* Mobile Search Modal */}
          {showSearchModal && (
            <div className="fixed inset-0 z-9999 bg-black/60 flex items-start justify-center pt-20" onClick={() => setShowSearchModal(false)}>
              <div className="w-full max-w-md bg-background p-4 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <SearchBar tab={false} />
              </div>
            </div>
          )}
        </div>
      </Suspense>
      <LogoutModal open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen} onConfirm={() => toast.success("Logged out successfully!")} />
    </header>
  );
}