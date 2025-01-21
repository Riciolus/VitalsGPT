import { sessionsTable } from "@/db/schema/session";
import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validateSessionId(id: string) {
  if (!id || !uuidRegex.test(id)) {
    throw new Error("Invalid request: 'sessionId' is missing or not a valid UUID");
  }
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json(
      { message: error.message || "An unexpected error occurred" },
      { status: 400 }
    );
  }

  // Fallback for non-Error objects
  return NextResponse.json({ message: "An unknown error occurred" }, { status: 400 });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    validateSessionId(id);

    const data = await db
      .select({ messages: sessionsTable.messages })
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id));

    if (!data) {
      return NextResponse.json({ message: "Invalid Request: session not found" }, { status: 404 });
    }

    return NextResponse.json({ messages: data[0].messages });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    validateSessionId(id);

    const sessionExists = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id))
      .execute();

    if (!sessionExists || sessionExists[0]?.count == 0) {
      return NextResponse.json({ message: "Session not found", status: false }, { status: 404 });
    }

    await db.delete(sessionsTable).where(eq(sessionsTable.id, id));

    return NextResponse.json({
      status: true,
      message: "Session deleted successfully",
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}
