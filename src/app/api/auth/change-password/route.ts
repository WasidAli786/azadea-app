import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { getTokenPayload } from "@/src/lib/get-token-payload";
import User from "@/src/models/User";

export async function POST(req: NextRequest) {
  await connectDB();

  const payload = await getTokenPayload();
  const userId = payload?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (user.password !== currentPassword) {
    return NextResponse.json(
      { message: "Current password is incorrect" },
      { status: 401 }
    );
  }

  user.password = newPassword;
  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}
