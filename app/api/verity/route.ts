import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { VERITY_PERSONA, extractTextFromContent } from "@/lib/verity-persona";

const MAX_MESSAGE_LENGTH = 300;

const VERITY_SYSTEM_PROMPT = `${VERITY_PERSONA}

Reply in one short line. Never more.`;

function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  return new Anthropic();
}

export async function POST(req: NextRequest) {
  let body: { message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  try {
    const client = getClient();
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 100,
      temperature: 1,
      system: VERITY_SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }],
    });

    const reply = extractTextFromContent(response.content);

    return NextResponse.json({ reply: reply || "..." });
  } catch (err) {
    console.error("Verity API error:", err);
    return NextResponse.json({ error: "Verity is not responding." }, { status: 502 });
  }
}
