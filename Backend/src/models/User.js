import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  avatar: { type: String },
  provider: { type: String, required: true },
  providerId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  job: {
    vi: { type: String },
    jp: { type: String },
  },
  bio: {
    vi: { type: String },
    jp: { type: String },
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.index({ role: 1 });
userSchema.index({ providerId: 1 });
userSchema.index({ createdAt: -1 });

export default mongoose.model("User", userSchema);
