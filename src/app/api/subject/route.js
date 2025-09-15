import { connectDB } from "@/lib/connectDB.js";
import Subject from "@/models/Subject";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "createdAt";

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const total = await Subject.countDocuments(query);
  const subjects = await Subject.find(query)
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return Response.json({ subjects, total });
});

export const POST = withRole(["ADMIN"], async (req) => {
  await connectDB();
  const data = await req.json();
  const subject = await Subject.create(data);
  return Response.json(subject, { status: 201 });
});
