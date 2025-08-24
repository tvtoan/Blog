import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";
import connectDB from "./config/db.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";
import aboutMeRoutes from "./routes/aboutMe.js";
import multer from "multer";

dotenv.config();
const app = express();

// Kết nối MongoDB
connectDB();

// Tạo thư mục uploads nếu chưa có
const uploadPath = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // Giới hạn 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Chỉ hỗ trợ ảnh PNG/JPEG"));
  },
});

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware parse JSON với giới hạn 5MB
app.use(express.json({ limit: "5mb" }));

// Middleware session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Đặt secure: true nếu dùng HTTPS
  })
);

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve ảnh tĩnh từ thư mục uploads
app.use("/uploads", express.static(uploadPath));

// API Routes
app.use("/api/post", upload.single("imageFile"), postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", upload.single("avatarFile"), authRoutes);
app.use("/api/about", upload.single("imageFile"), aboutMeRoutes);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res
      .status(413)
      .json({ message: "Kích thước payload yêu cầu quá lớn" });
  }
  if (err.message === "Chỉ hỗ trợ ảnh PNG/JPEG") {
    return res.status(400).json({ message: err.message });
  }
  console.error("Lỗi server:", err);
  res.status(500).json({ message: "Lỗi server nội bộ: " + err.message });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
