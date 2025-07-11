// routes/aboutMeRoutes.js
import express from "express";
import {
  getAboutMe,
  updateAboutMe,
  likeAboutMe,
  unlikeAboutMe,
} from "../controllers/AboutMeController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Route: /api/about
router.get("/", getAboutMe);
router.put("/", updateAboutMe);
router.put("/like", authMiddleware, likeAboutMe); // Đúng
router.put("/unlike", authMiddleware, unlikeAboutMe);

export default router;
