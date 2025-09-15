import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  },
  { timestamps: true }
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);
