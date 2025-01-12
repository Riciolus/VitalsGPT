import { sessionsTable } from "@/db/schema/session";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log(body);
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
  }

  const sessionId = randomUUID();

  const session: typeof sessionsTable.$inferInsert = {
    id: sessionId,
    userId: userId,
    messages: [],
  };

  await db.insert(sessionsTable).values(session);

  return NextResponse.json({ status: true, sessionId: session.id });
}
