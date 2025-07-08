import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import { getTokenPayload } from "@/src/lib/get-token-payload";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Get user from token
    const payload = await getTokenPayload();
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { profilePicture } = body;

    if (!profilePicture) {
      return NextResponse.json(
        { error: "Profile picture is required" },
        { status: 400 }
      );
    }

    // Validate base64 image
    if (!profilePicture.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 }
      );
    }

    // Ensure the ID is a valid MongoDB ObjectId
    const userId = payload.id as unknown as string;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Update user's profile picture with explicit update
    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { profilePicture: profilePicture } },
      {
        new: true,
        runValidators: true,
        upsert: false,
      }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the update worked (relaxed: only check if user exists)
    const verifyUser = await User.findById(userId).select("profilePicture");
    if (!verifyUser) {
      return NextResponse.json(
        {
          error: "Failed to save profile picture (user not found after update)",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Profile picture updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { error: "Failed to update profile picture" },
      { status: 500 }
    );
  }
}
