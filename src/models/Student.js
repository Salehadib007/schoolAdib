import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    gradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Grade" },
    birthday: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
