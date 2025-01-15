import { sessionsTable } from "@/db/schema/session";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || !uuidRegex.test(id)) {
    return NextResponse.json(
      { message: "Invalid request: 'sessionId' is missing or not a valid UUID" },
      { status: 400 }
    );
  }

  const data = await db
    .select({ messages: sessionsTable.messages })
    .from(sessionsTable)
    .where(eq(sessionsTable.id, id));

  if (!data) {
    return NextResponse.json({ message: "Invalid Request: session not found" }, { status: 404 });
  }
  return NextResponse.json({ messages: data[0].messages });
}
