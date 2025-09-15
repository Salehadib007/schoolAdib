import { connectDB } from "@/lib/dbConnect";
import Announcement from "@/models/Announcement";
import { withRole } from "@/lib/authorize";

export const GET = withRole(
  ["ADMIN", "TEACHER", "PARENT", "STUDENT"],
  async (req) => {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const sort = searchParams.get("sort") || "date";

    const query = {
      title: { $regex: search, $options: "i" },
    };

    const total = await Announcement.countDocuments(query);
    const announcements = await Announcement.find(query)
      .sort({ [sort]: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("classId");

    return Response.json({ announcements, total });
  }
);

export const POST = withRole(["ADMIN", "TEACHER"], async (req) => {
  await connectDB();
  const data = await req.json();
  const announcement = await Announcement.create(data);
  return Response.json(announcement, { status: 201 });
});
