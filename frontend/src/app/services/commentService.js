import api from "./api";

export const getComments = async (postId) => {
  try {
    const response = await api.get(`/comment/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments"
    );
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await api.post("/comment", commentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add comment");
  }
};

export const likeComment = async (id) => {
  try {
    const response = await api.put(`/comment/${id}/like`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to like comment");
  }
};

export const unLikeComment = async (id) => {
  try {
    const response = await api.put(`/comment/${id}/unlike`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to unlike comment"
    );
  }
};
