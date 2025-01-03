import { NextRequest } from "next/server";
import { HfInference } from "@huggingface/inference";

export const dynamic = "force-dynamic"; // Prevents caching on Vercel

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get("message");

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
      try {
        // Function to send data to the stream
        const sendEvent = (data: string) => {
          const payload = `data: ${data}\n\n`;
          controller.enqueue(new TextEncoder().encode(payload));
        };

        // Initialize chat completion stream
        const generator = client.chatCompletionStream({
          model: "HuggingFaceH4/zephyr-7b-beta",
          messages: [
            {
              role: "system",
              content: "You are a knowledgeable and polite medical assistant.",
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
            if (newContent) sendEvent(newContent);
          }
        }

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
