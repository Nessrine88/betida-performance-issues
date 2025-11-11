import BlogPage from "../../components/blog-page";
import { fetchBlogsByCategory } from "@/lib/fetchers/blog";

export const revalidate = 60;

export default async function OtherBlogsPage() {
  const otherData = await fetchBlogsByCategory("other");

  return (
    <div>
      <BlogPage locale={undefined as any} data={otherData} />
    </div>
  );
}
