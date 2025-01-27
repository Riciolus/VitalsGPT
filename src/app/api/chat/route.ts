import { NextRequest } from "next/server";
import { HfInference } from "@huggingface/inference";
import { drizzle } from "drizzle-orm/neon-http";
import { sessionsTable } from "@/db/schema/session";
import { eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic"; // Prevents caching on Vercel

const db = drizzle(process.env.DATABASE_URL!);

async function saveToDatabase(message: string, assistantMessage: string, sessionId: string) {
  if (!sessionId || sessionId === "guest") {
    return;
  }

  try {
    const session = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, sessionId))
      .limit(1);

    if (session.length > 0) {
      const existingMessages = Array.isArray(session[0].messages) ? session[0].messages : [];

      // Step 2: Append new messages
      const updatedMessages = [
        ...existingMessages,
        { role: "user", text: message },
        { role: "assistant", text: assistantMessage },
      ];

      // Step 3: Update the database with new messages
      await db
        .update(sessionsTable)
        .set({ messages: updatedMessages, updatedAt: sql`NOW()` })
        .where(eq(sessionsTable.id, sessionId));
    } else {
      throw Error;
    }
  } catch (error) {
    console.error("Database save error:", error);
    throw new Error("Failed to save messages to the database");
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get("message");
  const sessionId = searchParams.get("sessionId");

  // Validate input message
  if (!message) {
    return new Response(JSON.stringify({ error: "Message parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = process.env.NEXT_PUBLIC_INFERENCE_API_TOKEN;
  const client = new HfInference(token);

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      let assistantMessage = "";
      try {
        // Function to send data to the stream
        const sendEvent = (data: string) => {
          const payload = `data: ${data}\n\n`;
          controller.enqueue(new TextEncoder().encode(payload));
        };

        // Initialize chat completion stream
        const generator = client.chatCompletionStream({
          model: "HuggingFaceH4/zephyr-7b-alpha",
          messages: [
            {
              role: "system",
              content:
                // "You are a humble and knowledgeable medical assistant. Answer the question short and compact",
                // content: "You are a humble and knowledgeable doctor.",
                "You are a concise and knowledgeable medical assistant. Provide short, accurate answers with clear and actionable steps for treatment or care.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 200,
        });

        // Iterate through the async generator
        for await (const chunk of generator) {
          if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta?.content;
            if (newContent) {
              assistantMessage += newContent;
              sendEvent(newContent);
            }
          }
        }

        // Save to database after streaming completes
        void saveToDatabase(message, assistantMessage, sessionId as string);

        // Close the stream
        controller.close();
      } catch (error) {
        // Send error message to the stream and close it
        const errorMessage = JSON.stringify({ error: error });
        controller.enqueue(new TextEncoder().encode(`data: ${errorMessage}\n\n`));
        controller.close();
      }
    },
  });

  // Return the stream as a response
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
