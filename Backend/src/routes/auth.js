import express from "express";
import passport from "passport";
import {
  getUser,
  googleCallback,
  githubCallback,
  facebookCallback,
  getAdminInfo,
} from "../controllers/AuthController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/user", authMiddleware, getUser); // Thêm authMiddleware
router.get("/admin", getAdminInfo);

// Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  googleCallback
);

// GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/login",
  }),
  githubCallback
);

// Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login",
  }),
  facebookCallback
);

export default router;
