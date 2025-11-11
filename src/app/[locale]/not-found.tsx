import NotFoundSVG from "@/app/[locale]/components/common/svg_icons/404-svg";
import { Button } from "@/app/[locale]/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="app-container py-9">
      <div className="rounded-lg h-95 lg:h-134 w-full border flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 max-w-105">
          <NotFoundSVG />
          <div className="flex flex-col items-center gap-3">
            <div className="font-md font-semibold text-foreground">
              Error 404
            </div>
            <div className="font-xs font-regular text-foreground/55">
              Nulla porttitor magna bibendum leo porttitor.
            </div>
          </div>
          <Link href="/" className="w-full" aria-label="return to home page">
            <Button
              aria-label="return to home"
              className="mt-9 w-full"
              variant="gray"
            >
              Return to Home Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
