import { Client } from "@gradio/client";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // Prevents caching on Vercel

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get("message");

  // Validate input message
  if (!message) {
    return new Response(JSON.stringify({ error: "Message parameter is required" }), {
      status: 400,
    });
  }

  // Create a promise for fetching data from LLM
  const result = await createLLMResponse(message);

  // Set up the response stream using the native Response object
  const stream = new ReadableStream({
    start(controller) {
      const headers = new Headers({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      // Function to send data as an event
      const sendEvent = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Process the 'data' array in chunks (words, sentences, etc.)
      const responseData = result.data[0]; // Assuming result.data is an array of strings
      const words = responseData.split(" "); // Split the string into words (or use other chunking logic)

      // Send each word one at a time with a small delay
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          sendEvent(words[i]); // Send the next word as an event
          i++;
        } else {
          clearInterval(interval); // Stop once all words are sent
          controller.close(); // Close the stream when finished
        }
      }, 70); // Adjust the interval (in ms) between each word
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

// Helper function to handle LLM fetching (no stream)
async function createLLMResponse(message: string) {
  const client = await Client.connect("riciolus/vitals");

  // Assuming this returns the result as in the example you provided
  const result = await client.predict("/chat", {
    message: message,
    system_message: "You are a helpful and polite medical assistant.",
    max_tokens: 128,
    temperature: 0.7,
    top_p: 0.95,
  });

  return result; // Assuming result.data is an array with a string at index 0
}

// export async function GET(req) {
//   // Set headers for SSE
//   const headers = new Headers({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });

//   const stream = new ReadableStream({
//     start(controller) {
//       // Function to send a message
//       const sendMessage = (data) => {
//         console.log(data);
//         controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
//       };

//       // Simulate sending multiple messages
//       let count = 0;
//       const intervalId = setInterval(() => {
//         if (count < 5) {
//           // Send 5 messages
//           sendMessage({ message: `Message ${count + 1}` });
//           count++;
//         } else {
//           clearInterval(intervalId); // Stop sending after 5 messages
//           controller.close(); // Close the stream
//         }
//       }, 1000); // Send a message every second
//     },
//   });

//   return new Response(stream, { headers });
// }
