import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import validator from "validator";
import fs from "fs";
import path from "path";

// Hàm kiểm tra và xử lý ảnh
const processImage = (avatar, avatarFile, uploadPath) => {
  // Trường hợp 1: Upload file qua Multer
  if (avatarFile) {
    return `/uploads/${avatarFile.filename}`;
  }

  // Trường hợp 2: URL
  if (avatar && validator.isURL(avatar)) {
    return avatar;
  }

  // Trường hợp 3: Base64
  if (avatar && avatar.startsWith("data:image")) {
    const matches = avatar.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches)
      throw new Error("Định dạng ảnh không hợp lệ (chỉ hỗ trợ PNG/JPEG)");

    const ext = matches[1].toLowerCase();
    if (!["png", "jpeg", "jpg"].includes(ext)) {
      throw new Error("Định dạng ảnh không hợp lệ (chỉ hỗ trợ PNG/JPEG)");
    }

    const base64String = matches[2];
    const byteLength = (base64String.length * 3) / 4;
    if (byteLength > 1 * 1024 * 1024) {
      throw new Error("Ảnh avatar quá lớn (tối đa 1MB)");
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
const validateContentSize = (content, fieldName, res) => {
  if (content) {
    const contentSize = Buffer.byteLength(JSON.stringify(content), "utf8");
    if (contentSize > 1 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: `${fieldName} quá lớn (tối đa 1MB)` });
    }
  }
  return null;
};

export const getUser = (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Chưa xác thực" });
};

export const getAdminInfo = async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" }).select(
      "name avatar bio job"
    );
    if (!admin) {
      return res.status(404).json({ message: "Không tìm thấy admin" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const userId = req.user?.id;
    let { name, bio, job, avatar } = req.body;
    const avatarFile = req.file;

    if (!userId) {
      return res.status(401).json({ message: "Chưa xác thực" });
    }

    const admin = await User.findById(userId);
    if (!admin || admin.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Truy cập bị từ chối. Không phải admin." });
    }

    // Parse bio and job if they are JSON strings
    if (typeof bio === "string") {
      try {
        bio = JSON.parse(bio);
      } catch (error) {
        return res.status(400).json({ message: "Bio không hợp lệ" });
      }
    }
    if (typeof job === "string") {
      try {
        job = JSON.parse(job);
      } catch (error) {
        return res.status(400).json({ message: "Job không hợp lệ" });
      }
    }

    // Debug logging
    console.log("Received body:", req.body);
    console.log("Parsed bio:", bio);
    console.log("Parsed job:", job);
    console.log("Avatar file:", avatarFile);

    // Kiểm tra các trường bắt buộc
    if (bio !== undefined && (!bio?.vi || !bio.vi.trim())) {
      return res.status(400).json({ message: "Bio tiếng Việt là bắt buộc." });
    }
    if (job !== undefined && (!job?.vi || !job.vi.trim())) {
      return res.status(400).json({ message: "Job tiếng Việt là bắt buộc." });
    }

    // Kiểm tra kích thước bio
    if (bio !== undefined) {
      const bioError = validateContentSize(bio, "Bio", res);
      if (bioError) return bioError;
    }

    // Kiểm tra kích thước job
    if (job !== undefined) {
      const jobError = validateContentSize(job, "Job", res);
      if (jobError) return jobError;
    }

    // Xử lý ảnh avatar
    const processedAvatar =
      avatar !== undefined
        ? processImage(avatar, avatarFile, path.join(path.resolve(), "uploads"))
        : admin.avatar;

    // Xóa ảnh avatar cũ nếu là file upload
    if (
      admin.avatar &&
      admin.avatar.startsWith("/uploads") &&
      processedAvatar &&
      processedAvatar !== admin.avatar
    ) {
      const oldAvatarPath = path.join(path.resolve(), admin.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Cập nhật thông tin
    if (name !== undefined) admin.name = name;
    if (bio !== undefined) {
      admin.bio = {
        vi: bio.vi,
        jp: bio.jp || "",
      };
    }
    if (job !== undefined) {
      admin.job = {
        vi: job.vi,
        jp: job.jp || "",
      };
    }
    if (processedAvatar !== undefined) admin.avatar = processedAvatar;

    const updatedAdmin = await admin.save();

    res.json({
      message: "Hồ sơ admin đã được cập nhật thành công",
      admin: {
        id: updatedAdmin._id,
        name: updatedAdmin.name,
        bio: updatedAdmin.bio,
        job: updatedAdmin.job,
        avatar: updatedAdmin.avatar,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
      },
    });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const googleCallback = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Không có dữ liệu người dùng" });
    }
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const githubCallback = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Không có dữ liệu người dùng" });
    }
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const facebookCallback = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Không có dữ liệu người dùng" });
    }
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({ message: "Truy cập bị từ chối" });
    }

    const users = await User.find()
      .select("name email role avatar bio job createdAt")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Email không hợp lệ" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Lemonari Blog" <your_email@gmail.com>',
      to: email,
      subject: "Cảm ơn bạn đã đăng ký!",
      html: `
        <h2>Xin chào!</h2>
        <p>Cảm ơn bạn đã đăng ký nhận thông báo từ Lemonari Blog. Bạn sẽ là người đầu tiên nhận được bài viết mới!</p>
        <p>Thân ái 💛</p>
      `,
    });

    res.status(200).json({ message: "Email đã được gửi thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi gửi mail", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const currentUser = req.user;

    // Chỉ admin mới có quyền
    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({ message: "Truy cập bị từ chối" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Thiếu ID người dùng" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Không cho admin tự xoá chính mình
    if (user._id.toString() === currentUser.id) {
      return res
        .status(400)
        .json({ message: "Bạn không thể tự xoá tài khoản admin của mình" });
    }

    // Nếu user có avatar là file upload => xoá luôn file
    if (user.avatar && user.avatar.startsWith("/uploads")) {
      const oldAvatarPath = path.join(path.resolve(), user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "Người dùng đã được xoá thành công" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
