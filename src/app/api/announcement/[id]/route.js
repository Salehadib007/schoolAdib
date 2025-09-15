import { connectDB } from "@/lib/connectDB.js";
import Announcement from "@/models/Announcement";
import { withRole } from "@/lib/authorize";

export const GET = withRole(
  ["ADMIN", "TEACHER", "PARENT", "STUDENT"],
  async (req, context) => {
    await connectDB();
    const announcement = await Announcement.findById(
      context.params.id
    ).populate("classId");
    if (!announcement)
      return new Response("Announcement not found", { status: 404 });
    return Response.json(announcement);
  }
);

export const PUT = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const data = await req.json();
  const updated = await Announcement.findByIdAndUpdate(
    context.params.id,
    data,
    { new: true }
  );
  if (!updated) return new Response("Announcement not found", { status: 404 });
  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const deleted = await Announcement.findByIdAndDelete(context.params.id);
  if (!deleted) return new Response("Announcement not found", { status: 404 });
  return Response.json({ message: "Deleted successfully" });
});
