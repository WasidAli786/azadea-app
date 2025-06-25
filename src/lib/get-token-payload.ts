import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getTokenPayload() {
  try {
    const cookieStore = await cookies(); // ✅ Await required for dynamic API routes

    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    return payload;
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}
