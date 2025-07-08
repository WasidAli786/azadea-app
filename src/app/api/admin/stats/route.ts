import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import Card from "@/src/models/Card";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Get total users (excluding admins)
    const totalUsers = await User.countDocuments({ role: "user" });

    // Get total dashboards/cards
    const totalDashboards = await Card.countDocuments({});

    // Get active users (users created in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = await User.countDocuments({
      role: "user",
      created: { $gte: thirtyDaysAgo },
    });

    // Get system status (mock for now)
    const systemStatus = "Online";

    return NextResponse.json({
      totalUsers,
      totalDashboards,
      activeUsers,
      systemStatus,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
