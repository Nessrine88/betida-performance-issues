import Image from "next/image";
import { fetchNotifications } from "@/lib/fetchers/notifications";
import  type {NotificationData } from "@/lib/fetchers/notifications";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import NotiSVG from "../common/svg_icons/noti-svg";
import EmptyNotiSVG from "../common/svg_icons/empty-noti-svg";

export default async function NotificationsDropdown() {
  const notifications: NotificationData[] = await fetchNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <NotiSVG />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-72 rounded-xl bg-background-1 shadow-lg border border-border p-1"
      >
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-foreground/60">
            <EmptyNotiSVG />
            <p className="font-medium">No Notifications Available</p>
            <p className="text-sm">Your interactions will be visible here</p>
          </div>
        ) : (
          <div className="flex flex-col max-h-60 no-scrollbar overflow-y-auto divide-y divide-border">
            {notifications.map((n) => (
              <div
                key={n._id}
                className="flex items-center gap-3 py-3 cursor-pointer hover:bg-background hover:rounded-lg hover:border-transparent px-3 duration-300"
              >
                {n.icon && (
                  <Image
                    src={n.icon}
                    alt={n.title}
                    height={24}
                    width={24}
                  />
                )}
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
  );
}
