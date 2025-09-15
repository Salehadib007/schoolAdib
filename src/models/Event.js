import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
