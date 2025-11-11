import BlogPage from "../../components/blog-page";
import { fetchBlogsByCategory } from "@/lib/fetchers/blog";

export const revalidate = 60;

export default async function HowToGuideBlogsPage() {
  const howToGuideData = await fetchBlogsByCategory("how-to-guides");

  return (
    <div>
      <BlogPage locale={undefined as any} data={howToGuideData} />
    </div>
  );
}
