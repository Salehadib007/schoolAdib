import { connectDB } from "@/lib/connectDB";
import Lesson from "@/models/Lesson";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "startTime";

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const total = await Lesson.countDocuments(query);
  const lessons = await Lesson.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("subjectId classId teacherId");

  return Response.json({ lessons, total });
});

export const POST = withRole(["ADMIN"], async (req) => {
  await connectDB();
  const data = await req.json();
  const lesson = await Lesson.create(data);
  return Response.json(lesson, { status: 201 });
});
