import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getUser = (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not authenticated" });
};

export const getAdminInfo = async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" }).select(
      "name avatar bio job"
    );
    if (!admin) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const userId = req.user?.id;
  const { name, bio, job, avatar } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const admin = await User.findById(userId);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    if (name !== undefined) admin.name = name;

    // Validate bio
    if (bio !== undefined) {
      if (!bio.vi) {
        return res.status(400).json({ message: "Bio tiếng Việt là bắt buộc." });
      }
      admin.bio = {
        vi: bio.vi,
        jp: bio.jp || "",
      };
    }

    // Validate job
    if (job !== undefined) {
      if (!job.vi) {
        return res.status(400).json({ message: "Job tiếng Việt là bắt buộc." });
      }
      admin.job = {
        vi: job.vi,
        jp: job.jp || "",
      };
    }

    if (avatar !== undefined) admin.avatar = avatar;

    const updatedAdmin = await admin.save();

    res.json({
      message: "Admin profile updated successfully",
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const googleCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No user data" });
  }
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const githubCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No user data" });
  }
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const facebookCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No user data" });
  }
  const token = jwt.sign(
    { id: req.user._id, name: req.user.name, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
};

export const getUsers = async (req, res) => {
  const currentUser = req.user;

  if (!currentUser || currentUser.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const users = await User.find()
      .select("name email role avatar bio job createdAt")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import nodemailer from "nodemailer";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email không hợp lệ" });
  }

  try {
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
  } catch (err) {
    res.status(500).json({ message: "Lỗi gửi mail", error: err.message });
  }
};
