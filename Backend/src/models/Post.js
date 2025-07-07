import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    vi: { type: String, required: true },
    jp: { type: String },
  },
  excerpt: {
    vi: { type: String },
    jp: { type: String },
  },
  categories: [{ type: String }],
  image: { type: String },
  sections: [
    {
      subtitle: {
        vi: { type: String, required: true },
        jp: { type: String },
      },
      content: {
        vi: { type: String, required: true },
        jp: { type: String },
      },
      image: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  readingTime: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Post", postSchema);
