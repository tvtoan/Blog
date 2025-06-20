import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  categories: [{ type: String }], // Array of category names (e.g., ["Lifestyle", "Productivity"])
  image: { type: String },
  sections: [
    {
      subtitle: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String }, // Optional image URL for each section
    },
  ],
  createdAt: { type: Date, default: Date.now },
  readingTime: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Post", postSchema);
