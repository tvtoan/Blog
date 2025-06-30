export const getImageUrl = (path) => {
  if (!path) return "/no-image.jpg"; // fallback nếu không có ảnh
  const baseURL = "http://localhost:5000";
  return `${baseURL}${path}`;
};
