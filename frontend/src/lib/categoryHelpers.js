import { slugifyCategory } from "./slugifyCategory";
import { postsData } from "../data";

export function getOriginalCategoryFromSlug(slug) {
  for (const post of postsData) {
    for (const category of post.categories) {
      if (slugifyCategory(category) === slug) {
        return category;
      }
    }
  }
  return slug; // fallback nếu không tìm thấy
}
