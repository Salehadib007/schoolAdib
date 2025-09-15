import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    name: String,
    surname: String,
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true },
    address: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Parent || mongoose.model("Parent", parentSchema);
