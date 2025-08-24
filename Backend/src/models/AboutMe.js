import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema(
  {
    title: {
      vi: { type: String, required: true },
      jp: { type: String },
    },
    slug: { type: String, unique: true },
    excerpt: {
      vi: { type: String, required: true },
      jp: { type: String },
    },
    image: String,
    content: {
      vi: { type: Object, required: true }, // stored as Tiptap JSON format
      jp: { type: Object },
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type: { type: String, default: "page" },
  },
  { timestamps: true }
);
aboutMeSchema.index({ slug: 1 });

export default mongoose.model("AboutMe", aboutMeSchema);
