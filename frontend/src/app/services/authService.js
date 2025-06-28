import api, { setAuthToken } from "./api";

export const loginWithGoogle = () => {
  window.location.href = "/api/auth/google";
};

export const loginWithGitHub = () => {
  window.location.href = "/api/auth/github";
};

export const loginWithFacebook = () => {
  window.location.href = "/api/auth/facebook";
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

export const handleCallback = (token) => {
  setAuthToken(token);
  localStorage.setItem("token", token);
  window.location.href = "/"; // Quay về trang chủ
};
