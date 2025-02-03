import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const NODE_ENV = process.env.NODE_ENV;
const secret = process.env.AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const token = await getToken({
    req,
    secret: secret,
    cookieName:
      NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
  });

  // If accessing "/api/session", require authentication
  if (currentPath.startsWith("/api/session") && !token) {
    return NextResponse.json(
      { message: "Unauthorized: Token not found or invalid" },
      { status: 401 }
    );
  }
  // Modify request headers to include user data if available
  const modifiedHeaders = new Headers(req.headers);
  if (token) {
    modifiedHeaders.set("x-user-data", JSON.stringify(token));
  }
  // Add security headers
  modifiedHeaders.set("X-Frame-Options", "DENY"); // Prevent clickjacking
  modifiedHeaders.set("X-Content-Type-Options", "nosniff"); // Prevent MIME sniffing
  modifiedHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  return NextResponse.next({
    request: {
      headers: modifiedHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/session/:path*", "/api/chat/:path*"], // Apply middleware to all API routes
};
