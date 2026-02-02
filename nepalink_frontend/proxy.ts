import { NextRequest, NextResponse } from "next/server";
import { getUserData, getAuthToken } from "./lib/cookie";

const publicPaths = ["/login", "/register", "/forgot-password"];
const adminPaths = ["admin"];
const userPaths = ["user"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getAuthToken();
  const user = token ? await getUserData() : null;

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));
  const isUserPath = userPaths.some((path) => pathname.startsWith(path));

  // Redirect to login if not authenticated and not accessing a public path
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based redirects
  if (token && user) {
    if (isAdminPath && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isUserPath && user.role !== "user" && user.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  // Allow access to all other paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
