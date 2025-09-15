import { connectDB } from "@/lib/connectDB.js";
import Event from "@/models/Event";
import { withRole } from "@/lib/authorize";

export const GET = withRole(
  ["ADMIN", "TEACHER", "PARENT", "STUDENT"],
  async (req) => {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const sort = searchParams.get("sort") || "startTime";

    const query = {
      title: { $regex: search, $options: "i" },
    };

    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("classId");

    return Response.json({ events, total });
  }
);

export const POST = withRole(["ADMIN"], async (req) => {
  await connectDB();
  const data = await req.json();
  const event = await Event.create(data);
  return Response.json(event, { status: 201 });
});
