import { connectDB } from "@/lib/dbConnect";
import Event from "@/models/Event";
import { withRole } from "@/lib/authorize";

export const GET = withRole(
  ["ADMIN", "TEACHER", "PARENT", "STUDENT"],
  async (req, context) => {
    await connectDB();
    const event = await Event.findById(context.params.id).populate("classId");
    if (!event) return new Response("Event not found", { status: 404 });
    return Response.json(event);
  }
);

export const PUT = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const data = await req.json();
  const updated = await Event.findByIdAndUpdate(context.params.id, data, {
    new: true,
  });
  if (!updated) return new Response("Event not found", { status: 404 });
  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const deleted = await Event.findByIdAndDelete(context.params.id);
  if (!deleted) return new Response("Event not found", { status: 404 });
  return Response.json({ message: "Deleted successfully" });
});
