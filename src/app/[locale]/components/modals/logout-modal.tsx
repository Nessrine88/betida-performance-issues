import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import GlobalModal from "../global-components/global-modal/global-modal";
import { useAuthStore } from "@/store/auth-store";
import { usePathname, useRouter } from "@/i18n/navigation";
interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export default function LogoutModal({
  open,
  onOpenChange,
  onConfirm,
}: LogoutModalProps) {
  const clearUser = useAuthStore((state) => state.clearUser);
  const pathName = usePathname();
  const router = useRouter();

  const handleConfirm = () => {
    clearUser();
    if (onConfirm) {
      onConfirm();
    }
    onOpenChange(false);
    router.replace(pathName);
    window.location.reload();
  };

  return (
    <GlobalModal open={open} onOpenChange={() => {
      onOpenChange(false);
      router.replace(pathName);
    }} title="Log Out">
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <LogOut className="size-12 text-destructive/50" />
        <p className="text-foreground/80">
          Are you sure you want to log out? You will need to log in again to
          access your account.
        </p>
        <div className="w-full pt-4">
          <Button
            variant="orangeGradient"
            className="w-full"
            onClick={handleConfirm}
          >
            Log Out
          </Button>
        </div>
      </div>
    </GlobalModal>
  );
}
