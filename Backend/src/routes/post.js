import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
} from "../controllers/PostController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
