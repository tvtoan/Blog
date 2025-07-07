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
        image: String,
      },
    ],
    type: { type: String, default: "page" },
  },
  { timestamps: true }
);

export default mongoose.model("AboutMe", aboutMeSchema);
