import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Card from "@/src/models/Card";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  await connectDB();

  const card = await Card.findById(id);
  if (!card)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(card);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  await connectDB();
  const updates = await req.json();

  const updated = await Card.findByIdAndUpdate(id, updates, {
    new: true,
  });
  if (!updated)
    return NextResponse.json({ message: "Update failed" }, { status: 400 });

  return NextResponse.json({ message: "Card updated", card: updated });
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { id } = await params;
  await connectDB();
  await Card.findByIdAndDelete(id);

  return NextResponse.json({ message: "Card deleted" });
}
