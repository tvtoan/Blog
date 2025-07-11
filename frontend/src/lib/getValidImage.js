// src/lib/getValidImage.js

const DEFAULT_IMAGE = "/default-image.jpg";

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

  if (!image.startsWith("http") && !image.startsWith("/")) {
    return "/" + image;
  }

  return image;
};

export default getValidImage; // optional default export
