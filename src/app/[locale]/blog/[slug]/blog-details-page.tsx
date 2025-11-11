import React from "react";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import type { Blog } from "@/lib/fetchers/blog";
import dayjs from "dayjs";
import RelatedBlogs from "../components/related-blogs";
import CImage from "@/lib/CIdImage";
import {
  getLocalizedString,
  type LanguageCode,
} from "@/lib/helpers/localized-content";
import { getTranslations } from "next-intl/server";
import RelatedTab from "../components/related-tabs";
import FacebookIconSVG from "../../components/common/svg_icons/facebook-icon-svg";
import XIconSVG from "../../components/common/svg_icons/x-Icon-svg";
import InstaIconSVG from "../../components/common/svg_icons/Insta-Icon-svg";
import LinkedinIconSVG from "../../components/common/svg_icons/linkedin-Icon-svg";
import { Link } from "@/i18n/navigation";
import BlogBackButton from "../components/blog-back-button";

async function BlogDetailsPage({
  blog,
  locale,
}: {
  blog?: Blog | null;
  locale: LanguageCode;
}) {
  const t = await getTranslations("BlogDetails");

  if (!blog) {
    return (
      <div className="app-container py-10 text-center text-foreground">
        {t("notFound")}
      </div>
    );
  }
  const title = getLocalizedString(blog.title, locale);
  const shortDesc = getLocalizedString(blog.shortDescription, locale);
  const description =
    blog.description?.find((d) => d.language === locale)?.blocks || [];
  const categories = blog.categories || [];

  const getIcon = (platform: string) => {
    if (platform === "facebook") {
      return <FacebookIconSVG />;
    } else if (platform === "x") {
      return <XIconSVG />;
    } else if (platform === "instagram") {
      return <InstaIconSVG />;
    } else if (platform === "linkedin") {
      return <LinkedinIconSVG />;
    } else {
      return null;
    }
  };

  return (
    <div className="w-full h-full pb-10">
      <div className="bg-background-1 h-fit">
        <BlogBackButton />
      </div>

      <div className="app-container py-6 flex flex-col gap-4">
        <h1 className="max-w-3xl w-full mx-auto text-2xl font-bold text-foreground">
          {title}
        </h1>
        <div className="max-w-3xl w-full mx-auto flex flex-row items-center gap-6 justify-between">
          <p className="text-sm text-foreground/55">
            <span className="text-foreground">{t("publishedOn")}</span> -{" "}
            {dayjs(blog.publishDate).format("MMM DD, YYYY")} {t("at")}{" "}
            {dayjs(blog.publishDate).format("hh:mm A")}
          </p>
          {blog.socialLinks?.length ? (
            <div className="flex flex-row items-center gap-2">
              {blog.socialLinks.map((link) => (
                <Link
                  key={link.platform}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("goTo", { platform: link.platform })}
                  className="text-foreground/55 text-2xl! hover:text-foreground duration-300 hover:scale-110"
                >
                  {getIcon(link.platform)}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="bg-background-1 rounded-lg p-6 max-w-3xl w-full mx-auto flex flex-col gap-6">
          <div className="w-full h-auto relative aspect-video flex items-center justify-center bg-muted-foreground rounded-lg">
            <CImage
              publicId={blog.thumbnail}
              alt={title}
              className="rounded-lg object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              fetchPriority="high"
            />
          </div>

          {shortDesc ? (
            <div className="flex flex-col gap-1.5">
              <p className="text-base text-foreground/55">{shortDesc}</p>
            </div>
          ) : null}

          <div className="text-foreground">
            <PortableText
              value={description}
              components={portableTextComponents}
            />
          </div>

          {categories.length > 0 ? (
            <RelatedTab categories={categories}/>
          ) : null}
        </div>

        {categories.length > 0 ? (
          <div className="app-container">
            <RelatedBlogs categories={categories} currentBlogId={blog._id} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BlogDetailsPage;
