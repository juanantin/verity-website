import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { TwitterApi } from "twitter-api-v2";
import Anthropic from "@anthropic-ai/sdk";
import { VERITY_PERSONA, extractTextFromContent } from "@/lib/verity-persona";

const MAX_REPLIES_PER_RUN = 5;
const REPLY_CHAR_LIMIT = 260; // headroom under X's 280-char limit

const X_REPLY_SYSTEM_PROMPT = `${VERITY_PERSONA}

You're replying to a tweet on X (Twitter). A handful of words, under ${REPLY_CHAR_LIMIT} characters. No links, no hashtags, no @-mentions.`;

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

async function generateReply(client: Anthropic, tweetText: string): Promise<string> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 80,
    temperature: 1,
    system: X_REPLY_SYSTEM_PROMPT,
    messages: [{ role: "user", content: tweetText || "..." }],
  });

  const text = extractTextFromContent(response.content);
  return text.length > REPLY_CHAR_LIMIT ? `${text.slice(0, REPLY_CHAR_LIMIT - 1)}…` : text;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const x = getXClient();
    const anthropic = getAnthropicClient();

    const me = await x.v2.me();
    const myId = me.data.id;

    const [mentions, ownTweets] = await Promise.all([
      x.v2.userMentionTimeline(myId, {
        max_results: 20,
        "tweet.fields": ["author_id", "text", "referenced_tweets"],
      }),
      x.v2.userTimeline(myId, {
        max_results: 40,
        exclude: ["retweets"],
        "tweet.fields": ["referenced_tweets"],
      }),
    ]);

    // A mention is "handled" if we've already posted a reply pointing at it —
    // there's no persistent store here, so we derive that from our own recent
    // tweets instead of tracking a since_id.
    const alreadyRepliedTo = new Set<string>();
    for (const tweet of ownTweets.tweets) {
      for (const ref of tweet.referenced_tweets ?? []) {
        if (ref.type === "replied_to") alreadyRepliedTo.add(ref.id);
      }
    }

    const toReply = mentions.tweets
      .filter((t) => t.author_id !== myId && !alreadyRepliedTo.has(t.id))
      .slice(0, MAX_REPLIES_PER_RUN);

    const results: { id: string; status: "replied" | "failed" }[] = [];
    for (const tweet of toReply) {
      try {
        const reply = await generateReply(anthropic, tweet.text);
        await x.v2.reply(reply, tweet.id);
        results.push({ id: tweet.id, status: "replied" });
      } catch (err) {
        console.error(`Verity X bot: failed to reply to ${tweet.id}:`, err);
        results.push({ id: tweet.id, status: "failed" });
      }
    }

    if (results.some((r) => r.status === "replied")) {
      revalidatePath("/");
    }

    return NextResponse.json({ checked: mentions.tweets.length, processed: results.length, results });
  } catch (err) {
    console.error("Verity X bot error:", err);
    return NextResponse.json({ error: "Bot run failed" }, { status: 500 });
  }
}
