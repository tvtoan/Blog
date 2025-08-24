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

// Xóa bài viết
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete post");
  }
};

// Tạo bài viết
export const createPost = async (postData) => {
  try {
    const response = await api.post("/post", postData); // Gửi JSON trực tiếp
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

// Cập nhật bài viết
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/post/${id}`, postData); // Gửi JSON trực tiếp
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

// Lưu bản nháp
export const saveDraft = async (draftData) => {
  try {
    const response = await api.post("/post/draft", draftData); // Gửi JSON trực tiếp
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to save draft");
  }
};

// Lấy bản nháp gần nhất của người dùng
export const getMyDraft = async () => {
  try {
    const response = await api.get("/post/draft/me");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch draft");
  }
};
