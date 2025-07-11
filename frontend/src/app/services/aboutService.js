// services/aboutService.js
import api from "./api";

export const getAboutData = async () => {
  const res = await api.get("/about");
  return res.data;
};

export const updateAboutData = async (data) => {
  const res = await api.put("/about", data);
  return res.data;
};

export const likeAbout = async () => {
  const res = await api.put("/about/like");
  return res.data;
};

export const unlikeAbout = async () => {
  const res = await api.put("/about/unlike");
  return res.data;
};
