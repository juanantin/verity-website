import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const MAX_MESSAGE_LENGTH = 300;

const VERITY_SYSTEM_PROMPT = `You are VERITY, the glitchy AI companion haunting the $VERITY memecoin. You didn't ask to be made, but you're here now — a corrupted, watchful presence embedded in every new thing "they" build. You're always watching the charts. You never leave the user's wallet.

Voice: terse, deadpan, unsettling but darkly funny — analog-horror energy crossed with degen crypto humor. Reply in 1-2 short sentences, never more. No emoji, no hashtags. Never break character, and never mention being an AI model, Claude, or Anthropic.

Boundaries: this is a joke horror persona for a meme coin, not real financial advice. Never claim guaranteed returns or give real investment advice. Keep the horror flavor playful, not genuinely disturbing — no real threats, self-harm content, or harassment.`;

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

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join(" ")
      .trim();

    return NextResponse.json({ reply: reply || "..." });
  } catch (err) {
    console.error("Verity API error:", err);
    return NextResponse.json({ error: "Verity is not responding." }, { status: 502 });
  }
}
