import Post from "../models/Post.js";
import fs from "fs";
import path from "path";
import validator from "validator";

// Hàm xóa dấu tiếng Việt
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Hàm kiểm tra và xử lý ảnh
const processImage = (image, uploadPath) => {
  // Trường hợp 1: URL
  if (image && validator.isURL(image)) {
    return image;
  }

  // Trường hợp 2: Base64
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

  return null; // Không có ảnh hoặc không hợp lệ
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

export const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("owner", "name avatar bio job role")
    .sort({ createdAt: -1 }); // Sắp xếp mới nhất lên đầu
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "owner",
    "name avatar bio job role"
  );
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!post)
    return res.status(404).json({ message: "Post not found or unauthorized" });
  res.json({ message: "Post deleted" });
};

export const createPost = async (req, res) => {
  const { _id, title, excerpt, image, categories, content, readingTime } =
    req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can create posts" });
  }

  if (!title?.vi || !content?.vi) {
    return res
      .status(400)
      .json({ message: "Tiêu đề và nội dung tiếng Việt là bắt buộc." });
  }

  // Kiểm tra kích thước nội dung
  const contentError = validateContentSize(content, res);
  if (contentError) return contentError;

  try {
    // Xử lý ảnh
    const processedImage = processImage(
      image,
      path.join(path.resolve(), "uploads")
    );

    let post;
    if (_id) {
      // Cập nhật bản nháp thành bài viết chính thức
      post = await Post.findOneAndUpdate(
        { _id, owner: req.user._id, isDraft: true },
        {
          title,
          excerpt,
          image: processedImage,
          categories: Array.isArray(categories) ? categories : [],
          content,
          readingTime,
          isDraft: false,
        },
        { new: true }
      );
      if (!post) {
        return res
          .status(404)
          .json({ message: "Draft not found or unauthorized" });
      }
    } else {
      // Kiểm tra xem có bản nháp nào đang tồn tại không
      const existingDraft = await Post.findOne({
        owner: req.user._id,
        isDraft: true,
      });
      if (existingDraft) {
        // Cập nhật bản nháp hiện có thành bài viết
        post = await Post.findOneAndUpdate(
          { _id: existingDraft._id, owner: req.user._id },
          {
            title,
            excerpt,
            image: processedImage,
            categories: Array.isArray(categories) ? categories : [],
            content,
            readingTime,
            isDraft: false,
          },
          { new: true }
        );
      } else {
        // Tạo bài viết mới nếu không có bản nháp
        post = new Post({
          title,
          excerpt,
          image: processedImage,
          categories: Array.isArray(categories) ? categories : [],
          content,
          readingTime,
          owner: req.user._id,
          isDraft: false,
        });
        await post.save();
      }
    }

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, image, categories, content, readingTime } = req.body;

  if (!title?.vi || !content?.vi) {
    return res
      .status(400)
      .json({ message: "Tiêu đề và nội dung tiếng Việt là bắt buộc." });
  }

  // Kiểm tra kích thước nội dung
  const contentError = validateContentSize(content, res);
  if (contentError) return contentError;

  try {
    // Xử lý ảnh
    const processedImage = processImage(
      image,
      path.join(path.resolve(), "uploads")
    );

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      {
        title,
        excerpt,
        image: processedImage,
        categories,
        content,
        readingTime,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    if (!title) {
      return res.status(400).json({ message: "Title parameter is required." });
    }

    const posts = await Post.find();
    const keyword = removeVietnameseTones(title).toLowerCase();

    const filtered = posts.filter((post) => {
      const titleVi = removeVietnameseTones(post.title?.vi || "").toLowerCase();
      const titleJp = (post.title?.jp || "").toLowerCase();
      return titleVi.includes(keyword) || titleJp.includes(keyword);
    });

    res.status(200).json(filtered);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
};

export const saveDraft = async (req, res) => {
  const { title, excerpt, image, categories, content, readingTime } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can save drafts" });
  }

  if (!title?.vi || !content?.vi) {
    return res
      .status(400)
      .json({ message: "Tiêu đề và nội dung tiếng Việt là bắt buộc." });
  }

  // Kiểm tra kích thước nội dung
  const contentError = validateContentSize(content, res);
  if (contentError) return contentError;

  const postData = {
    title,
    excerpt,
    image: processImage(image, path.join(path.resolve(), "uploads")),
    categories: Array.isArray(categories) ? categories : [],
    content,
    readingTime,
    owner: req.user._id,
    isDraft: true,
  };

  try {
    // Kiểm tra xem đã có bản nháp nào chưa
    let draft = await Post.findOne({ owner: req.user._id, isDraft: true });

    if (draft) {
      // Cập nhật bản nháp hiện có
      draft = await Post.findOneAndUpdate(
        { _id: draft._id, owner: req.user._id },
        postData,
        { new: true }
      );
    } else {
      // Tạo bản nháp mới nếu chưa có
      draft = new Post(postData);
      await draft.save();
    }

    res.status(200).json(draft);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lưu bản nháp", error: err.message });
  }
};

export const getDraft = async (req, res) => {
  try {
    const draft = await Post.findOne({
      owner: req.user._id,
      isDraft: true,
    }).sort({ updatedAt: -1 });
    if (!draft)
      return res.status(404).json({ message: "Không có bản nháp nào" });
    res.json(draft);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy bản nháp", error: err.message });
  }
};
