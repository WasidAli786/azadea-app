import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = req.nextUrl;
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const fetchAll = searchParams.get("all") === "true";

  const query = {
    role: "user",
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  if (fetchAll) {
    const users = await User.find(query).sort({ created: -1 }).lean();
    return NextResponse.json({ users });
  }

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .sort({ created: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({
    users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: Request) {
  await connectDB();
  const { name, email, department, password } = await req.json();

  const exists = await User.findOne({ email });
  if (exists)
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );

  const user = await User.create({
    name,
    email,
    department,
    password,
    role: "user",
    created: new Date(),
  });

  return NextResponse.json({ message: "User created", user });
}
