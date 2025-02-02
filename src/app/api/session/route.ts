import { sessionsTable } from "@/db/schema/session";
import { randomUUID } from "crypto";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);

// GET all user chat session by user id
export async function GET(req: NextRequest) {
  const rawUserData = req.headers.get("x-user-data");
  const userData = JSON.parse(rawUserData as string);

  if (!userData) {
    return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
  }

  if (!userData.id) {
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
    .where(eq(sessionsTable.userId, userData.id))
    .orderBy(desc(sessionsTable.updatedAt));

  return NextResponse.json(data);
}

// Create new session
export async function POST(req: NextRequest) {
  const rawUserData = req.headers.get("x-user-data");
  const userData = JSON.parse(rawUserData as string);

  if (!userData) {
    return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
  }

  const sessionId = randomUUID();

  const session: typeof sessionsTable.$inferInsert = {
    id: sessionId,
    userId: userData.id,
    messages: [],
  };

  await db.insert(sessionsTable).values(session);

  return NextResponse.json({ status: true, chatSessionId: session.id });
}
