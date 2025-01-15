import { sessionsTable } from "@/db/schema/session";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const db = drizzle(process.env.DATABASE_URL!);
const secret = process.env.AUTH_SECRET;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("userId");

  if (!sessionId || !uuidRegex.test(sessionId)) {
    return NextResponse.json(
      { message: "Invalid request: 'sessionId' is missing or not a valid UUID" },
      { status: 400 }
    );
  }

  const data = await db.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId));

  if (!data) {
    return NextResponse.json({ message: "Invalid Request: session not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const token = await getToken({
    req,
    secret,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

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
