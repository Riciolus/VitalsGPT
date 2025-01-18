import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const secret = process.env.AUTH_SECRET;

export async function middleware() {
  // const token = await getToken({ req, secret });
  // // console.log(token);
  // if (!token) {
  //   return NextResponse.json(
  //     { message: "Unauthorized: Token not found or invalid" },
  //     { status: 401 }
  //   );
  // }

  // // Pass token data to downstream routes
  // const modifiedHeaders = new Headers(req.headers);
  // modifiedHeaders.set("x-user-data", JSON.stringify(token));

  // return NextResponse.next({
  //   request: {
  //     headers: modifiedHeaders,
  //   },
  // });

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/session/:path*", "/api/chat/:path*"], // Apply middleware to all API routes
};
