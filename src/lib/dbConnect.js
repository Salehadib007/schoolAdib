import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Already connected
      return;
    }

    await mongoose.connect(
      "mongodb+srv://salehadib007:salehadib007@ghostcluster.j7mm8.mongodb.net/school-management?retryWrites=true&w=majority&appName=GhostCluster",
      {
        dbName: "school-management",
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
