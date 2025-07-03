// routes/aboutMeRoutes.js
import express from "express";
import { getAboutMe, updateAboutMe } from "../controllers/AboutmeController.js";

const router = express.Router();

// Route: /api/about
router.get("/", getAboutMe);
router.put("/", updateAboutMe);

export default router;
