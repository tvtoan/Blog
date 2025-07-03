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
