import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import { getTokenPayload } from "@/src/lib/get-token-payload";
import mongoose from "mongoose";

export async function POST(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  await connectDB();

  const payload = await getTokenPayload();
  const userId = payload?.id;
  const { cardId } = params;

  if (!userId || !mongoose.Types.ObjectId.isValid(cardId)) {
    return NextResponse.json(
      { message: "Unauthorized or invalid card ID" },
      { status: 400 }
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Ensure bookmarks is initialized
  if (!Array.isArray(user.bookmarks)) {
    user.bookmarks = [];
  }

  const alreadyBookmarked = user.bookmarks
    .map((id: string) => id.toString())
    .includes(cardId);

  if (alreadyBookmarked) {
    user.bookmarks = user.bookmarks.filter(
      (id: string) => id.toString() !== cardId
    );
  } else {
    user.bookmarks.push(new mongoose.Types.ObjectId(cardId));
  }

  await user.save();

  return NextResponse.json({
    message: alreadyBookmarked ? "Unbookmarked" : "Bookmarked",
    isBookmarked: !alreadyBookmarked,
  });
}
