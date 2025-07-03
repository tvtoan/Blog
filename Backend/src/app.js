import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import session from "express-session"; // Thêm express-session
import passport from "./config/passport.js";
import connectDB from "./config/db.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";
import aboutMeRoutes from "./routes/aboutme.js";

dotenv.config();
const app = express();

// Kết nối MongoDB
connectDB();

// Tạo thư mục uploads nếu chưa có
const uploadPath = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware parse JSON
app.use(express.json());

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
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutMeRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
