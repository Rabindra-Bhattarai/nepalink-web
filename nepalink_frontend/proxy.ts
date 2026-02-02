import { NextRequest, NextResponse } from "next/server";
import { getUserData, getAuthToken } from "./lib/cookie";

const publicPaths = ["/login", "/register", "/forgot-password"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getAuthToken();
  const user = token ? await getUserData() : null;

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isAdminPath = pathname.startsWith("/admin");
  const isUserPath = pathname.startsWith("/user");

  // Redirect to login if not authenticated and not accessing a public path
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based redirects
  if (token && user) {
    // Admin routes must be accessed only by admins
    if (isAdminPath && user.role !== "admin") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    // User routes must be accessed only by logged-in users (admins can also access)
    if (isUserPath && user.role !== "user" && user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect after login based on role
    if (pathname === "/login" && token && user) {
      if (user.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
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
