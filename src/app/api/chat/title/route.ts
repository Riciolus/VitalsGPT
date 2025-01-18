import { sessionsTable } from "@/db/schema/session";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);
const titleGenURL = process.env.TITLE_GENERATOR_BASE_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { initialAssistantResponse, sessionId } = body;

  if (!initialAssistantResponse || typeof initialAssistantResponse !== "string" || !sessionId) {
    return NextResponse.json(
      { status: false, message: "Invalid request: missing argument" },
      { status: 400 }
    );
  }

  try {
    const titleGenResponse = await fetch(titleGenURL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.TITLE_GENERATOR_API_KEY,
        text: `generate a title max 10 words, if the text is about greeting just answer "Hello Assistance"  : ${initialAssistantResponse}`,
      }),
    });

    if (!titleGenResponse.ok) {
      throw new Error("Failed to fetch data from sapling.ai API");
    }

    const { result } = await titleGenResponse.json();

    const extractedResult = result.replace(/\*/g, "");

    await db
      .update(sessionsTable)
      .set({ title: extractedResult })
      .where(eq(sessionsTable.id, sessionId));

    return NextResponse.json({ status: true, title: extractedResult });
  } catch (error) {
    return NextResponse.json({ status: false, error });
  }
}

// titleGen using hugging face model with inference api
// const app = await client("https://sagarmanchekar-tusharjoshi89-title-generator.hf.space/");

// const result = await app.predict("/predict", [initialAssistantResponse]);

// if (Array.isArray(result.data)) {
//   await db
//     .update(sessionsTable)
//     .set({ title: result.data[0] as string })
//     .where(eq(sessionsTable.id, sessionId));
// } else {
//   return NextResponse.json({ status: false, message: "Failed to create title" });
// }
