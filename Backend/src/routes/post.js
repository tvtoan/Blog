import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  getPostByTitle,
  updatePost,
} from "../controllers/PostController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/search/title/:title", getPostByTitle);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);

export default router;
