import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Card from "@/src/models/Card";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const query = search
    ? {
        title: { $regex: search, $options: "i" },
      }
    : {};

  const [cards, total] = await Promise.all([
    Card.find(query).sort({ created: -1 }).skip(skip).limit(limit),
    Card.countDocuments(query),
  ]);

  const pages = Math.ceil(total / limit);

  return NextResponse.json({ cards, pagination: { total, pages } });
}

export async function POST(req: Request) {
  await connectDB();
  const { title, description, link, assignee, image } = await req.json();

  const card = await Card.create({
    title,
    description,
    link,
    assignee,
    image,
    created: new Date(),
  });

  return NextResponse.json({ message: "Card created", card });
}
