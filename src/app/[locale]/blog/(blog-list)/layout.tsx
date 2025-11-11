import { getLocale } from "next-intl/server";
import { type LanguageCode } from "@/lib/helpers/localized-content";
import BackRedirectHandler from "../../components/common/Back-redirect-handler";
import BlogIconSVG from "../../components/common/svg_icons/sidebar-icons/blog-icon-svg";
import { BlogTabs } from "../components/blogs-tabs";

export const revalidate = 60; 

const tabs = [
  { value: "all", label: "All Blogs" },
  { value: "crypto", label: "Crypto" },
  { value: "how-to-guides", label: "How to Guides" },
  { value: "BETIDA-news", label: "BETIDA News" },
  { value: "sport", label: "Sport" },
  { value: "poker", label: "Poker" },
  { value: "casino", label: "Casino" },
  { value: "other", label: "Other" },
];

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as LanguageCode;

  return (
    <>
      <BackRedirectHandler />
      <div className="w-full h-full pb-10">
        <div className="bg-background-1 h-fit">
          <div className="app-container font-medium py-4">
            <div className="flex flex-row items-center gap-3 text-foreground">
              <BlogIconSVG />
              Blog
            </div>
          </div>
        </div>

        <div className="app-container py-6 flex flex-col gap-4">
          <BlogTabs data={tabs} locale={locale} />
          <div className="w-full overflow-hidden rounded-lg relative">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
