import React from "react";
import { useSidebarStore } from "@/store/sidebar-store";
import { BrowsIcon } from "../common/svg_icons/brows-icon-svg";
import { CasinoIcon } from "../common/svg_icons/casino-icon-svg";
import { BetsIcon } from "../common/svg_icons/bets-icon";
import { SportsIcon } from "../common/svg_icons/sports-icon-svg";
import { ChatIcon } from "../common/svg_icons/chat-icons.svg";
import { toast } from "sonner";
import { Link, usePathname } from "@/i18n/navigation";

function MobileFooter() {
  const pathname = usePathname();
  const { toggleBrowseOpen, browseOpen } = useSidebarStore();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex pt-2 mt-0.5 ">
      <button
        aria-label="browse"
        onClick={toggleBrowseOpen}
        className={`flex flex-col items-center text-primary w-1/5 relative groups hover:bg-linear-to-t hover:from-yellow-1/15 hover:to-background duration-300 pb-4 ${
          browseOpen && "bg-linear-to-t from-foreground/15 to-background"
        }`}
      >
        <BrowsIcon active={browseOpen} />
        <span>Browse</span>
      </button>
      <Link
        prefetch
        aria-label="go to casino"
        href="/casino"
        scroll={false}
        className={`flex flex-col items-center text-primary w-1/5 relative groups hover:bg-linear-to-t hover:from-yellow-1/15 hover:to-background duration-300 pb-4 ${
          pathname === "/casino" &&
          "bg-linear-to-t from-foreground/15 to-background"
        }`}
      >
        <CasinoIcon active={pathname === "/casino"} />
        <span>Casino</span>
      </Link>
      <Link
        prefetch
        aria-label="go to my bets"
        href="/my-bets"
        scroll={false}
        className={`flex flex-col items-center text-primary w-1/5 relative groups hover:bg-linear-to-t hover:from-yellow-1/15 hover:to-background duration-300 pb-4 ${
          pathname === "/my-bets" &&
          "bg-linear-to-t from-foreground/15 to-background"
        }`}
      >
        <BetsIcon active={pathname === "/my-bets"} />
        <span>Bets</span>
      </Link>
      <Link
        prefetch
        aria-label="go to sports"
        href="/sports"
        scroll={false}
        className={`flex flex-col items-center text-primary w-1/5 relative groups hover:bg-linear-to-t hover:from-yellow-1/15 hover:to-background duration-300 pb-4 ${
          pathname === "/sports" &&
          "bg-linear-to-t from-foreground/15 to-background"
        }`}
      >
        <SportsIcon active={pathname === "/sports"} />
        <span>Sports</span>
      </Link>
      <Link
        prefetch
        aria-label="got to chat"
        href="#"
        scroll={false}
        className={`flex flex-col items-center text-primary w-1/5 relative groups hover:bg-linear-to-t hover:from-yellow-1/15 hover:to-background duration-300 pb-4 ${
          pathname === "/chat" &&
          "bg-linear-to-t from-foreground/15 to-background"
        }`}
        onClick={() => toast.info("Chat feature is coming soon!")}
      >
        <ChatIcon active={pathname === "/chat"} />
        <span>Chat</span>
      </Link>
    </nav>
  );
}

export default MobileFooter;
