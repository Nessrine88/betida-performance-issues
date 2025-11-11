import BlogPage from "../../components/blog-page";
import { fetchBlogsByCategory } from "@/lib/fetchers/blog";

export const revalidate = 60;

export default async function CasinoBlogsPage() {
  const casinoData = await fetchBlogsByCategory("casino");

  return (
    <div>
      <BlogPage locale={undefined as any} data={casinoData} />
    </div>
  );
}
