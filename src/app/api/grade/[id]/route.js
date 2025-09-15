import { connectDB } from "@/lib/connectDB.js";
import Grade from "@/models/Grade";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req, context) => {
  await connectDB();
  const grade = await Grade.findById(context.params.id);
  if (!grade) return new Response("Grade not found", { status: 404 });
  return Response.json(grade);
});

export const PUT = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const data = await req.json();
  const updated = await Grade.findByIdAndUpdate(context.params.id, data, {
    new: true,
  });
  if (!updated) return new Response("Grade not found", { status: 404 });
  return Response.json(updated);
});

export const DELETE = withRole(["ADMIN"], async (req, context) => {
  await connectDB();
  const deleted = await Grade.findByIdAndDelete(context.params.id);
  if (!deleted) return new Response("Grade not found", { status: 404 });
  return Response.json({ message: "Deleted successfully" });
});
