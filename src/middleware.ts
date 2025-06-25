import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // If token is missing and route is protected → redirect to login
  if (
    !token &&
    (url.pathname.startsWith("/admin") || url.pathname.startsWith("/dashboard"))
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Token is present: try to verify it
  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );

      const role = payload.role;

      // ✅ Redirect logged-in users AWAY from /login
      if (url.pathname === "/login") {
        if (role === "admin") {
          url.pathname = "/admin";
        } else if (role === "user") {
          url.pathname = "/dashboard";
        }
        return NextResponse.redirect(url);
      }

      // ✅ Restrict role-based access
      if (url.pathname.startsWith("/admin") && role !== "admin") {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }

      if (url.pathname.startsWith("/dashboard") && role !== "user") {
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch (err) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // allow access to /login or /unauthorized for guests
}
