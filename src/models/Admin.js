import mongoose from "mongoose";

// Admin.js
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
