import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  getPostByTitle,
  updatePost,
  getDraft,
  saveDraft,
} from "../controllers/PostController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search/title/:title", getPostByTitle);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);
router.get("/draft/me", authMiddleware, getDraft);
router.post("/draft", authMiddleware, saveDraft);
router.get("/:id", getPost);

export default router;
