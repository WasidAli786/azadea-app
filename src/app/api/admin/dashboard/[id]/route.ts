import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Card from "@/src/models/Card";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const card = await Card.findById(params.id);
  if (!card)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(card);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const updates = await req.json();
  const updated = await Card.findByIdAndUpdate(params.id, updates, {
    new: true,
  });

  if (!updated)
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  return NextResponse.json({ message: "Card updated", card: updated });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Card.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Card deleted" });
}
