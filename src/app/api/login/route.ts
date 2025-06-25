import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const existingAdmin = await User.findOne({ email: "admin@example.com" });

  if (!existingAdmin) {
    await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: "admin123",
      department: "Management",
      role: "admin",
      created: new Date(),
    });
  }

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  // TEMP plain text password comparison
  if (user.password !== password)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({
    message: "Logged in successfully",
    role: user.role,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
