import express from "express";
import multer from "multer";
import path from "path";

import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  getPostByTitle,
} from "../controllers/PostController.js";
import authMiddleware from "../middlewares/auth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // lưu vào thư mục /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // đặt tên file duy nhất
  },
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/search/title/:title", getPostByTitle);
router.post("/", authMiddleware, upload.single("image"), createPost);
router.delete("/:id", authMiddleware, deletePost); // Chỉ owner xóa

export default router;
