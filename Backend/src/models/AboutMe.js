// models/AboutMe.js
import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    image: String,
    sections: [
      {
        subtitle: String,
        content: String,
        image: String,
      },
    ],
    type: { type: String, default: "page" },
  },
  { timestamps: true }
);

export default mongoose.model("AboutMe", aboutMeSchema);
