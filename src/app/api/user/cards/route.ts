import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Card from "@/src/models/Card";
import { getTokenPayload } from "@/src/lib/get-token-payload";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();

  const payload = await getTokenPayload();
  const userId = payload?.id;

  // Ensure user is authenticated and ID is valid
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ cards: [] });
  }

  // Only fetch cards where the user is in the assignee array
  const cards = await Card.find({ assignee: userId })
    .sort({ created: -1 })
    .lean();

  return NextResponse.json({ cards });
}
