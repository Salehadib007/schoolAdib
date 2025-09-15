// app/api/admin/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import { withRole } from "@/lib/authorize";

export const GET = withRole(["ADMIN"], async (_, { params }) => {
  await dbConnect();
  const admin = await Admin.findById(params.id);
  if (!admin) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(admin);
});

export const PUT = withRole(["ADMIN"], async (req, { params }) => {
  await dbConnect();
  const body = await req.json();
  const admin = await Admin.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(admin);
});

export const DELETE = withRole(["ADMIN"], async (_, { params }) => {
  await dbConnect();
  await Admin.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
});
