import { slugifyCategory } from "./slugifyCategory";
import { getPosts } from "@/app/services/postService";

export async function getOriginalCategoryFromSlug(slug) {
  try {
    const decodedSlug = decodeURIComponent(slug); // ✅ giải mã
    const posts = await getPosts();
    for (const post of posts) {
      for (const category of post.categories || []) {
        if (slugifyCategory(category) === decodedSlug) {
          return category;
        }
      }
    }
    return decodedSlug;
  } catch (err) {
    console.error("Lỗi khi lấy category gốc:", err);
    return slug;
  }
}
