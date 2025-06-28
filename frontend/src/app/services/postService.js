import api from "./api";

export const getPosts = async () => {
  try {
    const response = await api.get("/post");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const getPost = async (id) => {
  try {
    const response = await api.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch post");
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post("/post", postData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete post");
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/post/${id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update post");
  }
};
