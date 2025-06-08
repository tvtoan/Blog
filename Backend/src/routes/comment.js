import express from "express";
import {
  getComments,
  createComment,
  likeComment,
} from "../controllers/CommentController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/", authMiddleware, createComment);
router.put("/:id/like", authMiddleware, likeComment);

export default router;
