import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import { getTokenPayload } from "@/src/lib/get-token-payload";
import mongoose from "mongoose";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const payload = await getTokenPayload();
  const userId = payload?.id as string;
  const { id } = await params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid card ID" }, { status: 400 });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const cardId = new mongoose.Types.ObjectId(id);
    const isBookmarked = user.bookmarks.includes(cardId);

    if (isBookmarked) {
      // Remove from bookmarks
      await User.findByIdAndUpdate(userId, {
        $pull: { bookmarks: cardId },
      });
    } else {
      // Add to bookmarks
      await User.findByIdAndUpdate(userId, {
        $addToSet: { bookmarks: cardId },
      });
    }

    return NextResponse.json({
      message: isBookmarked
        ? "Card removed from favorites"
        : "Card added to favorites",
      isBookmarked: !isBookmarked,
    });
  } catch (error) {
    console.error("Bookmark error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
