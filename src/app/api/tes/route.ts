import { Client } from "@gradio/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // const encoder = new TextEncoder();
  // Create a streaming response
  // const customReadable = new ReadableStream({
  //   start(controller) {
  //     const message = "A sample message.";
  //     controller.enqueue(encoder.encode(`data: ${message}\n\n`));
  //   },
  // });
  const body = await req.json();

  const { message } = body;

  if (!message) {
    return NextResponse.json({ response: "No message detected!" }, { status: 404 });
  }

  const client = await Client.connect("riciolus/vitals");
  const result = await client.predict("/chat", {
    message: message,
    system_message: "You are a helpful and polite medical assistant.!",
    max_tokens: 128,
    temperature: 0.7,
    top_p: 0.95,
  });
  return NextResponse.json({ response: result.data });
}
