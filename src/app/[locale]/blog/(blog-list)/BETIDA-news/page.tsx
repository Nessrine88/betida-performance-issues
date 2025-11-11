import BlogPage from "../../components/blog-page";
import { fetchBlogsByCategory } from "@/lib/fetchers/blog";

export const revalidate = 60;

export default async function BetidaNewsBlogsPage() {
  const betidaNewsData = await fetchBlogsByCategory("stake-news");

  return (
    <div>
      <BlogPage locale={undefined as any} data={betidaNewsData} />
    </div>
  );
}
