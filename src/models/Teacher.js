import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    name: String,
    surname: String,
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    address: String,
    img: String,
    bloodType: String,
    sex: { type: String, enum: ["MALE", "FEMALE"], required: true },
    birthday: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);
