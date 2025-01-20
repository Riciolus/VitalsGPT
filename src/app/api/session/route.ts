import { sessionsTable } from "@/db/schema/session";
import { randomUUID } from "crypto";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);
const secret = process.env.AUTH_SECRET;

// GET all user chat session by user id
export async function GET(req: NextRequest) {
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

  // userId
  const { id } = token;

  if (!id) {
    return NextResponse.json(
      { message: "Invalid request: 'userId' is missing or not a valid UUID" },
      { status: 400 }
    );
  }

  const data = await db
    .select({
      sessionId: sessionsTable.id,
      title: sessionsTable.title,
      updatedAt: sessionsTable.updatedAt,
    })
    .from(sessionsTable)
    .where(eq(sessionsTable.userId, id as string))
    .orderBy(desc(sessionsTable.updatedAt));

  return NextResponse.json(data);
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
