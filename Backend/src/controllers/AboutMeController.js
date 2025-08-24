import AboutMe from "../models/AboutMe.js";
import fs from "fs";
import path from "path";
import validator from "validator";

// Hàm kiểm tra và xử lý ảnh
const processImage = (image, imageFile, uploadPath) => {
  // Trường hợp 1: Upload file qua Multer
  if (imageFile) {
    return `/uploads/${imageFile.filename}`;
  }

  // Trường hợp 2: URL
  if (image && validator.isURL(image)) {
    return image;
  }

  // Trường hợp 3: Base64
  if (image && image.startsWith("data:image")) {
    const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches)
      throw new Error("Định dạng ảnh không hợp lệ (chỉ hỗ trợ PNG/JPEG)");

    const ext = matches[1].toLowerCase();
    if (!["png", "jpeg", "jpg"].includes(ext)) {
      throw new Error("Định dạng ảnh không hợp lệ (chỉ hỗ trợ PNG/JPEG)");
    }

    const base64String = matches[2];
    const byteLength = (base64String.length * 3) / 4;
    if (byteLength > 1 * 1024 * 1024) {
      throw new Error("Ảnh bìa quá lớn (tối đa 1MB)");
    }

    const buffer = Buffer.from(base64String, "base64");
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    const filePath = path.join(uploadPath, filename);

    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  }

  return null;
};

// Hàm kiểm tra kích thước nội dung
const validateContentSize = (content, res) => {
  if (content) {
    const contentSize = Buffer.byteLength(JSON.stringify(content), "utf8");
    if (contentSize > 2 * 1024 * 1024) {
      return res.status(400).json({ message: "Nội dung quá lớn (tối đa 2MB)" });
    }
  }
  return null;
};

// Lấy thông tin About Me
// GET /api/about
export const getAboutMe = async (req, res) => {
  try {
    const about = await AboutMe.findOne({ slug: "about" }).populate(
      "likes",
      "avatar username"
    );
    if (!about) {
      return res.status(404).json({ message: "Không tìm thấy trang About Me" });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Cập nhật thông tin About Me
// PUT /api/about
export const updateAboutMe = async (req, res) => {
  try {
    const { title, excerpt, image, content } = req.body;
    const imageFile = req.file;

    // Kiểm tra các trường bắt buộc
    if (!title?.vi || !excerpt?.vi || !content?.vi) {
      return res
        .status(400)
        .json({ message: "Tiêu đề, mô tả và nội dung tiếng Việt là bắt buộc" });
    }

    // Kiểm tra kích thước nội dung
    const contentError = validateContentSize(content, res);
    if (contentError) return contentError;

    // Xử lý ảnh
    const processedImage = processImage(
      image,
      imageFile,
      path.join(path.resolve(), "uploads")
    );

    // Xóa ảnh cũ nếu là file upload
    const existingAbout = await AboutMe.findOne({ slug: "about" });
    if (
      existingAbout &&
      existingAbout.image &&
      existingAbout.image.startsWith("/uploads") &&
      processedImage &&
      processedImage !== existingAbout.image
    ) {
      const oldImagePath = path.join(path.resolve(), existingAbout.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Cập nhật hoặc tạo mới nếu chưa tồn tại
    const updated = await AboutMe.findOneAndUpdate(
      { slug: "about" },
      {
        title,
        excerpt,
        image: processedImage,
        content,
        slug: "about",
      },
      { new: true, upsert: true }
    );

    await updated.populate("likes", "avatar username");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Thêm lượt thích cho About Me
// PUT /api/about/like
export const likeAboutMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Chưa xác thực người dùng" });
    }

    const about = await AboutMe.findOne({ slug: "about" });
    if (!about) {
      return res.status(404).json({ message: "Không tìm thấy trang About Me" });
    }

    if (!about.likes.includes(userId)) {
      about.likes.push(userId);
      await about.save();
    }

    await about.populate("likes", "avatar username");
    res.json({ likes: about.likes.length, users: about.likes });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa lượt thích khỏi About Me
// PUT /api/about/unlike
export const unlikeAboutMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Chưa xác thực người dùng" });
    }

    const about = await AboutMe.findOne({ slug: "about" });
    if (!about) {
      return res.status(404).json({ message: "Không tìm thấy trang About Me" });
    }

    about.likes = about.likes.filter((id) => id.toString() !== userId);
    await about.save();

    await about.populate("likes", "avatar username");
    res.json({ likes: about.likes.length, users: about.likes });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
