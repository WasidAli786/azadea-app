import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Card from "@/src/models/Card";
import User from "@/src/models/User";
import { getTokenPayload } from "@/src/lib/get-token-payload";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();

  const payload = await getTokenPayload();
  const userId = payload?.id as string;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ cards: [] });
  }

  try {
    // Get user's bookmarks
    const user = (await User.findById(userId)
      .select("bookmarks")
      .lean()) as any;
    const userBookmarks = user?.bookmarks || [];

    // Get cards assigned to user
    const cards = await Card.find({ assignee: userId })
      .sort({ created: -1 })
      .lean();

    // Add bookmark information to each card
    const cardsWithBookmarks = cards.map((card: any) => ({
      ...card,
      isBookmarked: userBookmarks.some(
        (bookmarkId: any) =>
          bookmarkId.toString() === (card._id as any).toString()
      ),
    }));

    return NextResponse.json({ cards: cardsWithBookmarks });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json({ cards: [] });
  }
}
