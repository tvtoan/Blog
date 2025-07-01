import express from "express";
import {
  getComments,
  createComment,
  likeComment,
  unLikeComment,
} from "../controllers/CommentController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/", authMiddleware, createComment);
router.put("/:id/like", authMiddleware, likeComment);
router.put("/:id/unlike", authMiddleware, unLikeComment);

export default router;
