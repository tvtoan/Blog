import api, { setAuthToken } from "./api";

export const loginWithGoogle = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};

export const loginWithGitHub = () => {
  window.location.href = "http://localhost:5000/api/auth/github";
};

export const loginWithFacebook = () => {
  window.location.href = "http://localhost:5000/api/auth/facebook";
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/user");
    console.log("Get user response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get user error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

export const getAdminInfo = async () => {
  try {
    const response = await api.get("/auth/admin");
    console.log("Get admin info response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Get admin info error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch admin info"
    );
  }
};

export const handleCallback = (token) => {
  console.log("Handling callback with token:", token);
  setAuthToken(token);
  localStorage.setItem("token", token);
  window.location.href = "/";
};
