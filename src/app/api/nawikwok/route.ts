import { nawikwokTable } from "@/db/schema/nawikwok";
import { drizzle } from "drizzle-orm/neon-http";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { name, text } = body;

  try {
    await db.insert(nawikwokTable).values({ name, text });

    return NextResponse.json({
      status: "jos",
      headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
      },
    });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

export async function GET() {
  const data = await db.select().from(nawikwokTable);

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    },
  });
}
