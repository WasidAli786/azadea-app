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

    if (userBookmarks.length === 0) {
      return NextResponse.json({ cards: [] });
    }

    // Get only the bookmarked cards that are assigned to the user
    const cards = await Card.find({
      _id: { $in: userBookmarks },
      assignee: userId,
    })
      .sort({ created: -1 })
      .lean();

    // Add bookmark information to each card (all should be true)
    const cardsWithBookmarks = cards.map((card) => ({
      ...card,
      isBookmarked: true,
    }));

    return NextResponse.json({ cards: cardsWithBookmarks });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ cards: [] });
  }
}
