import AboutMe from "../models/AboutMe.js";

// Lấy thông tin About Me
// GET /api/about
export const getAboutMe = async (req, res) => {
  try {
    const about = await AboutMe.findOne({ slug: "about" });
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

    // Kiểm tra các trường bắt buộc
    if (!title?.vi || !excerpt?.vi || !content?.vi) {
      return res
        .status(400)
        .json({ message: "Tiêu đề, mô tả và nội dung tiếng Việt là bắt buộc" });
    }

    // Cập nhật hoặc tạo mới nếu chưa tồn tại
    const updated = await AboutMe.findOneAndUpdate(
      { slug: "about" },
      {
        title,
        excerpt,
        image,
        content,
        slug: "about",
      },
      { new: true, upsert: true }
    );

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

    await about.populate("likes", "avatar username"); // Lấy avatar và username của user đã thích

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
