import { fetchBlogsByCategory } from "@/lib/fetchers/blog";
import BlogPage from "../components/blog-page";

export const revalidate = 60;

export default async function AlBlogsPage() {
  const allBlogsData = await fetchBlogsByCategory("all");

  return <BlogPage locale={undefined as any} data={allBlogsData} />;
}
