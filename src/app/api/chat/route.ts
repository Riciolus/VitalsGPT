import { NextRequest } from "next/server";
import { HfInference } from "@huggingface/inference";
import { drizzle } from "drizzle-orm/neon-http";
import { sessionsTable } from "@/db/schema/session";
import { and, eq, sql } from "drizzle-orm";
import OpenAI from "openai";
import { Model } from "@/store/useModelsStore";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export const dynamic = "force-dynamic"; // Prevents caching on Vercel

const db = drizzle(process.env.DATABASE_URL!);
const HuggingFaceToken = process.env.NEXT_PUBLIC_INFERENCE_API_TOKEN;
const OpenRouterToken = process.env.OPENROUTER_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get("message");
  const sessionId = searchParams.get("sessionId");
  const model: Model = (searchParams.get("model") as Model) || "mistral-small";

  const rawUserData = req.headers.get("x-user-data");
  const userData = JSON.parse(rawUserData as string);

  if (!message) {
    return new Response(JSON.stringify({ error: "Message parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const chatHistory = await getSessionHistory(sessionId);
  const inputPrompt = `${chatHistory}\nUser: ${message}\nYour answer:`;

  // Create a TransformStream to intercept and collect the assistant's response
  const { readable, writable } = new TransformStream();
  const decoder = new TextDecoder();

  let assistantMessage = "";

  const transformStream = new TransformStream({
    transform(chunk, controller) {
      // Decode the chunk and extract the actual content
      const text = decoder.decode(chunk);
      const match = text.match(/data: (.*)\n\n/);
      if (match) {
        const content = match[1];
        assistantMessage += content;
      }
      controller.enqueue(chunk);
    },
    flush(controller) {
      // Save to database after the stream is complete
      if (sessionId !== "guest" && userData?.id) {
        void saveToDatabase(message, assistantMessage, sessionId as string, userData.id);
      }
      controller.terminate();
    },
  });

  // Choose the appropriate model and pipe through our transform stream
  let modelStream: ReadableStream;
  if (model === "zephyr-7b-alpha") {
    modelStream = await streamZephyrResponse(inputPrompt);
  } else if (model === "mistral-small") {
    modelStream = await streamMitralsResponse(inputPrompt);
  } else {
    return new Response(JSON.stringify({ error: "Invalid model" }), { status: 400 });
  }

  // Pipe the model stream through our transform stream
  modelStream.pipeThrough(transformStream).pipeTo(writable);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

const streamZephyrResponse = async (inputPrompt: string) => {
  const client = new HfInference(HuggingFaceToken);
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const generator = client.chatCompletionStream({
          model: "HuggingFaceH4/zephyr-7b-alpha",
          messages: [
            {
              role: "system",
              content: "You are a knowledgeable and reliable medical assistant...",
            },
            { role: "user", content: inputPrompt },
          ],
          max_tokens: 200,
        });

        for await (const chunk of generator) {
          if (chunk.choices?.[0]?.delta?.content) {
            const newContent = chunk.choices[0].delta.content;

            controller.enqueue(encoder.encode(`data: ${newContent}\n\n`));
          }
        }

        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(`data: ${error}\n\n`));
        controller.close();
      }
    },
  });
};

const streamMitralsResponse = async (inputPrompt: string) => {
  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OpenRouterToken,
  });
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const response = await client.chat.completions.create({
          model: "mistralai/mistral-small",
          messages: [{ role: "user", content: inputPrompt }],
          stream: true,
        });

        for await (const chunk of response) {
          if (chunk.choices?.[0]?.delta?.content) {
            controller.enqueue(encoder.encode(`data: ${chunk.choices[0].delta.content}\n\n`));
          }
        }

        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(`data: ${error}\n\n`));
        controller.close();
      }
    },
  });
};

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
  userMessage: string,
  assistantMessage: string,
  sessionId: string,
  userId: string
) {
  try {
    // Step 1: Fetch the existing session
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
        { role: "user", text: userMessage },
        { role: "assistant", text: assistantMessage },
      ];

      // Step 3: Update the database with new messages
      await db
        .update(sessionsTable)
        .set({ messages: updatedMessages, updatedAt: sql`NOW()` })
        .where(eq(sessionsTable.id, sessionId));
    } else {
      console.error("Session not found. Cannot save messages.");
    }
  } catch (error) {
    console.error("Database save error:", error);
  }
}
