import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const user = await User.findById(id);
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const { name, email, department } = await req.json();

  const updated = await User.findByIdAndUpdate(
    id,
    { name, email, department },
    { new: true }
  );

  if (!updated)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json({ message: "User updated", user: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  const deleted = await User.findByIdAndDelete(id);

  if (!deleted)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json({ message: "User deleted" });
}
