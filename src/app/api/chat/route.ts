import { NextRequest } from "next/server";
import { HfInference } from "@huggingface/inference";
import { drizzle } from "drizzle-orm/neon-http";
import { sessionsTable } from "@/db/schema/session";
import { and, eq, sql } from "drizzle-orm";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export const dynamic = "force-dynamic"; // Prevents caching on Vercel

const db = drizzle(process.env.DATABASE_URL!);

async function getSessionHistory(sessionId: string | null): Promise<string | undefined> {
  if (!sessionId || sessionId === "guest") return;

  // Query the database
  const result = await db
    .select({ messages: sessionsTable.messages })
    .from(sessionsTable)
    .where(eq(sessionsTable.id, sessionId));

  // Extract the messages from the first row
  const messages: Message[] = result[0].messages as Message[];

  // Construct session history as a formatted string
  return messages
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`)
    .join("\n");
}

async function saveToDatabase(
  message: string,
  assistantMessage: string,
  sessionId: string,
  userId: string
) {
  try {
    const session = await db
      .select()
      .from(sessionsTable)
      .where(and(eq(sessionsTable.id, sessionId), eq(sessionsTable.userId, userId)))
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

  const rawUserData = req.headers.get("x-user-data");
  const userData = JSON.parse(rawUserData as string);

  // Validate input message
  if (!message) {
    return new Response(JSON.stringify({ error: "Message parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = process.env.NEXT_PUBLIC_INFERENCE_API_TOKEN;

  const chatHistory = await getSessionHistory(sessionId);

  const inputPrompt = `${chatHistory}\nUser: ${message}\n`;

  const client = new HfInference(token);

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      let assistantMessage = "";
      let buffer = "";

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
                "You are a knowledgeable and reliable medical assistant. Your goal is to provide clear, detailed, and confident explanations about topics while ensuring accuracy and safety. You should avoid direct diagnosis but offer helpful insights, potential causes, and general guidance. Always prioritize user well-being and encourage professional medical consultation when necessary.",
              //     "You are a humble and knowledgeable doctor.",
              //   // "You are a concise and knowledgeable medical assistant. Provide short, accurate answers with clear and actionable steps for treatment or care.",
            },
            {
              role: "user",
              content: inputPrompt,
            },
          ],
          max_tokens: 200,
        });

        // Iterate through the async generator
        for await (const chunk of generator) {
          if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta?.content;
            if (newContent) {
              buffer += newContent; // Add chunk to buffer

              // Check if buffer contains a full word or line
              const split = buffer.split(/\b/); // Split by word boundaries
              const completeWords = split.slice(0, -1).join(""); // Extract complete words
              buffer = split.slice(-1).join(""); // Keep the remaining incomplete part

              if (completeWords) {
                // Check for and remove the "Assistant:" prefix only in the first chunk
                if (assistantMessage === "" && completeWords.startsWith("Assistant:")) {
                  const sanitizedWords = completeWords.replace(/^Assistant:\s*/, ""); // Remove prefix
                  assistantMessage += sanitizedWords;
                  sendEvent(sanitizedWords);
                } else {
                  // Check and skip isolated ":" or "Assistant"
                  const sanitizedWords = completeWords.replace(/^:\s*/, ""); // Remove leading ":"
                  if (sanitizedWords !== "Assistant" && sanitizedWords !== ":") {
                    assistantMessage += sanitizedWords;
                    sendEvent(sanitizedWords);
                  }
                }
              }
            }
          }
        }

        // Send any remaining buffered data
        if (buffer.trim()) {
          assistantMessage += buffer;
          sendEvent(buffer);
        }

        // Save to database after streaming completes
        if (sessionId !== "guest" && userData?.id) {
          void saveToDatabase(message, assistantMessage, sessionId as string, userData.id);
        }

        // Close the stream
        controller.close();
      } catch (error) {
        // Send error message to the stream and close it
        controller.enqueue(new TextEncoder().encode(`data: ${error}\n\n`));
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
