import express from "express";
import passport from "passport";
import {
  getUser,
  googleCallback,
  githubCallback,
  facebookCallback,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/user", getUser);

// Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

// GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  githubCallback
);

// Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  facebookCallback
);

export default router;
