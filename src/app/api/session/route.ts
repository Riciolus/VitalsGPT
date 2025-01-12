import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: true });
}

export async function POST(req: NextRequest) {
  const sessionId = randomUUID();

  console.log(sessionId);

  return NextResponse.json({ status: true });
}
