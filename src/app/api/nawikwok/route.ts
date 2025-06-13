import { nawikwokTable } from "@/db/schema/nawikwok";
import { drizzle } from "drizzle-orm/neon-http";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, text } = body;

  try {
    await db.insert(nawikwokTable).values({ name, text });

    return NextResponse.json({ status: "jos" });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

export async function GET() {
  const data = await db.select().from(nawikwokTable);

  return NextResponse.json(data);
}
