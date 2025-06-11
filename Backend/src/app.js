import express from "express";
import cors from "cors";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/Auth.js";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Kết nối MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Khởi tạo Passport
app.use(passport.initialize());

// Routes
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
