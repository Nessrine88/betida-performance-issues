import BlogPage from "../../components/blog-page";
import { fetchBlogsByCategory } from "@/lib/fetchers/blog";

export const revalidate = 60;

export default async function sportsBlogsPage() {
  const sportsData = await fetchBlogsByCategory("sport");

  return (
    <div>
      <BlogPage locale={undefined as any} data={sportsData} />
    </div>
  );
}
