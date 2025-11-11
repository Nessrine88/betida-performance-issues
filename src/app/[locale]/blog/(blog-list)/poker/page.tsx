import BlogPage from "../../components/blog-page";
import { fetchBlogsByCategory } from "@/lib/fetchers/blog";

export const revalidate = 60;

export default async function PokerBlogsPage() {
  const PokerData = await fetchBlogsByCategory("poker");

  return (
    <div>
      <BlogPage locale={undefined as any} data={PokerData} />
    </div>
  );
}
