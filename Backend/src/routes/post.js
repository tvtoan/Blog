import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
} from "../controllers/PostController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts); // Không cần đăng nhập để xem danh sách
router.get("/:id", getPost); // Không cần đăng nhập để xem chi tiết
router.post("/", authMiddleware, createPost); // Chỉ admin tạo bài
router.delete("/:id", authMiddleware, deletePost); // Chỉ owner xóa

export default router;
