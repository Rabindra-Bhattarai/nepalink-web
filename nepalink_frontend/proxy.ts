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

  //  Redirect to login if not authenticated and not accessing a public path
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //  Role-based access control
  if (token && user) {
    // Admin-only access
    if (isAdminPath && user.role !== "admin") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    // User-only access (admins allowed too)
    if (isUserPath && user.role !== 'nurse' && user.role !== "member" && user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    //  Prevent redirect loop from /login
    if (pathname === "/login") {
      const targetPath = user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

      // Only redirect if not already at the target
      if (!pathname.startsWith(targetPath)) {
        return NextResponse.redirect(new URL(targetPath, req.url));
      }
    }
  }

  //  Allow access to all other paths
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
