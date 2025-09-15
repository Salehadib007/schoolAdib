import { connectDB } from "@/lib/connectDB.js";
import Exam from "@/models/Exam";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "startTime";

  const query = {
    title: { $regex: search, $options: "i" },
  };

  const total = await Exam.countDocuments(query);
  const exams = await Exam.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("lessonId");

  return Response.json({ exams, total });
});

export const POST = withRole(["ADMIN"], async (req) => {
  await connectDB();
  const data = await req.json();
  const exam = await Exam.create(data);
  return Response.json(exam, { status: 201 });
});
