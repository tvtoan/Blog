const DEFAULT_IMAGE = "/default-image.jpg";
const BASE_URL = "http://localhost:5000"; // hoặc process.env.NEXT_PUBLIC_API_URL

const getValidImage = (image) => {
  if (
    !image ||
    typeof image !== "string" ||
    image.trim() === "" ||
    image === "undefined" ||
    image === "null"
  ) {
    return DEFAULT_IMAGE;
  }

  // Nếu ảnh nằm trong /uploads thì prepend BASE_URL
  if (image.startsWith("/uploads/")) {
    return `${BASE_URL}${image}`;
  }

  // Nếu ảnh không bắt đầu bằng http hoặc / thì thêm /
  if (!image.startsWith("http") && !image.startsWith("/")) {
    return "/" + image;
  }

  return image;
};

export default getValidImage;
