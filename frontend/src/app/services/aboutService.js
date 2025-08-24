import api from "./api";

// Lấy thông tin About Me
export const getAboutData = async () => {
  const res = await api.get("/about");
  return res.data;
};

// Cập nhật thông tin About Me
export const updateAboutData = async (data) => {
  const res = await api.put("/about", data);
  return res.data;
};

// Thêm lượt thích cho About Me
export const likeAbout = async () => {
  const res = await api.put("/about/like");
  return res.data;
};

// Xóa lượt thích khỏi About Me
export const unlikeAbout = async () => {
  const res = await api.put("/about/unlike");
  return res.data;
};
