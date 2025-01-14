import { sessionsTable } from "@/db/schema/session";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);
const secret = process.env.AUTH_SECRET;

export async function POST(req: NextRequest) {
  const token = await getToken({
    req,
    secret,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  console.log("token", token);
  console.log("mode", process.env.NODE_ENV);

  if (!token) {
    return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = token;
  const sessionId = randomUUID();

  const session: typeof sessionsTable.$inferInsert = {
    id: sessionId,
    userId: id as string,
    messages: [],
  };

  await db.insert(sessionsTable).values(session);

  return NextResponse.json({ status: true, chatSessionId: session.id });
}
