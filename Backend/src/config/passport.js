import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Hàm xử lý dùng chung cho các strategy
async function handleOAuthCallback(profile, strategyName, done) {
  try {
    const email =
      profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    let user = null;

    // Tìm user theo email trước
    if (email) {
      user = await User.findOne({ email });
    }

    // Nếu không tìm thấy theo email, tìm theo providerId
    if (!user) {
      user = await User.findOne({
        provider: strategyName,
        providerId: profile.id,
      });
    }

    if (user) {
      let updated = false;

      // Luôn cập nhật nếu provider khác
      if (user.provider !== strategyName) {
        user.provider = strategyName;
        updated = true;
      }

      if (user.providerId !== profile.id) {
        user.providerId = profile.id;
        updated = true;
      }

      if (!user.avatar && profile.photos && profile.photos[0]) {
        user.avatar = profile.photos[0].value;
        updated = true;
      }

      if (!user.bio) {
        user.bio = "";
        updated = true;
      }

      if (updated) await user.save();
    } else {
      // Tạo mới nếu chưa có user
      user = await new User({
        name: profile.displayName || profile.username || "Unknown",
        email,
        avatar:
          profile.photos && profile.photos[0] ? profile.photos[0].value : null,
        provider: strategyName,
        providerId: profile.id,
        job: "Blogger & Developer",
        role: "user",
        bio: "",
      }).save();
    }

    return done(null, user);
  } catch (error) {
    console.error(`${strategyName} auth error:`, error);
    return done(error, null);
  }
}

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google profile:", profile);
      return handleOAuthCallback(profile, "google", done);
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
      scope: ["user:email"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("GitHub profile:", profile);
      return handleOAuthCallback(profile, "github", done);
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Facebook profile:", profile);
      return handleOAuthCallback(profile, "facebook", done);
    }
  )
);

// Serialize và Deserialize user
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserialized user:", user);
    done(null, user);
  } catch (error) {
    console.error("Deserialize error:", error);
    done(error, null);
  }
});

export default passport;
