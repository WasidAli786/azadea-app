import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify JWT token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    // Connect to database
    await connectDB();

    // Fetch complete user data from database
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
