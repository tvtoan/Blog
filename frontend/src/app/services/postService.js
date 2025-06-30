import api from "./api";

// Lấy tất cả bài viết
export const getPosts = async () => {
  try {
    const response = await api.get("/post");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

// Lấy 1 bài viết theo ID
export const getPost = async (id) => {
  try {
    const response = await api.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch post");
  }
};

// Tạo bài viết (dùng FormData vì có ảnh)
export const createPost = async (postData) => {
  try {
    const formData = new FormData();

    // Các trường đơn
    formData.append("title", postData.title);
    formData.append("excerpt", postData.excerpt || "");
    formData.append("readingTime", postData.readingTime || 1);
    if (postData.image && postData.image instanceof File) {
      formData.append("image", postData.image);
    }
    // Categories: gửi dưới dạng JSON string
    formData.append("categories", JSON.stringify(postData.categories || []));

    // Sections: cũng gửi JSON string
    formData.append("sections", JSON.stringify(postData.sections || []));

    const response = await api.post("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

// Xóa bài viết
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete post");
  }
};

// Cập nhật bài viết (nếu sau này bạn cần sửa)
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/post/${id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update post");
  }
};
// Lấy bài viết theo title
export const getPostByTitle = async (title) => {
  try {
    const response = await api.get(
      `/post/search/title/${encodeURIComponent(title)}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch posts by title"
    );
  }
};
