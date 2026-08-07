import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import Anthropic from "@anthropic-ai/sdk";
import { VERITY_PERSONA, extractTextFromContent } from "@/lib/verity-persona";

const POST_CHAR_LIMIT = 260; // headroom under X's 280-char limit

const VERITY_POST_SYSTEM_PROMPT = `${VERITY_PERSONA}

Write a single standalone post for X (Twitter) — not a reply to anyone. A handful of words, under ${POST_CHAR_LIMIT} characters. No links, no hashtags, no @-mentions.`;

function getXClient() {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET } = process.env;
  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_SECRET) {
    throw new Error("X API credentials are not fully configured");
  }
  return new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_SECRET,
  });
}

function getAnthropicClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  return new Anthropic();
}

async function generatePost(client: Anthropic): Promise<string> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 80,
    temperature: 1,
    system: VERITY_POST_SYSTEM_PROMPT,
    messages: [{ role: "user", content: "Write the next post." }],
  });

  const text = extractTextFromContent(response.content);
  return text.length > POST_CHAR_LIMIT ? `${text.slice(0, POST_CHAR_LIMIT - 1)}…` : text;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const x = getXClient();
    const anthropic = getAnthropicClient();

    const text = await generatePost(anthropic);
    const result = await x.v2.tweet(text);

    return NextResponse.json({ posted: true, id: result.data.id, text });
  } catch (err) {
    console.error("Verity X post error:", err);
    return NextResponse.json({ error: "Post failed" }, { status: 500 });
  }
}
