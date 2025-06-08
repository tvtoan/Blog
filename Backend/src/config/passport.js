import passport from "passport";
import { Strategy as WordPressStrategy } from "passport-wordpress";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new WordPressStrategy(
    {
      clientID: process.env.WORDPRESS_CLIENT_ID,
      clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/wordpress/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        providerId: profile.id,
        provider: "wordpress",
      });
      if (!user) {
        user = await new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "wordpress",
          providerId: profile.id,
        }).save();
      }
      return done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        providerId: profile.id,
        provider: "google",
      });
      if (!user) {
        user = await new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          provider: "google",
          providerId: profile.id,
        }).save();
      }
      return done(null, user);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        providerId: profile.id,
        provider: "github",
      });
      if (!user) {
        user = await new User({
          name: profile.displayName || profile.username,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          provider: "github",
          providerId: profile.id,
        }).save();
      }
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        providerId: profile.id,
        provider: "facebook",
      });
      if (!user) {
        user = await new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          provider: "facebook",
          providerId: profile.id,
        }).save();
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
