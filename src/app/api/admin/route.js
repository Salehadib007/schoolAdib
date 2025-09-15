// app/api/admin/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect.js";
import Admin from "@/models/Admin.js";
import { withRole } from "@/lib/authorize.js";

export const GET = withRole(["ADMIN"], async (req) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") === "asc" ? 1 : -1;

  const query = search ? { username: { $regex: search, $options: "i" } } : {};

  const admins = await Admin.find(query)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Admin.countDocuments(query);

  return NextResponse.json({
    data: admins,
    pagination: { total, page, limit },
  });
});

export const POST = withRole(["ADMIN"], async (req) => {
  await dbConnect();
  const body = await req.json();
  const admin = await Admin.create(body);
  return NextResponse.json(admin, { status: 201 });
});
