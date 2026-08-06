import { TwitterApi } from "twitter-api-v2";

export type VerityActivityItem = {
  id: string;
  text: string;
  url: string;
  createdAt: string;
};

function getXClient() {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET } = process.env;
  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_SECRET) {
    return null;
  }
  return new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_SECRET,
  });
}

// Freshness is handled by the homepage's `revalidate` (ISR) plus an on-demand
// revalidatePath("/") call from the bot route right after it posts a reply —
// not by a cache kept here. A plain module-level variable isn't shared
// across separate serverless function instances anyway, so it wouldn't
// actually reduce X API calls the way it looks like it would.
export async function getRecentVerityActivity(limit = 5): Promise<VerityActivityItem[]> {
  const client = getXClient();
  if (!client) return [];

  try {
    const me = await client.v2.me();
    const timeline = await client.v2.userTimeline(me.data.id, {
      max_results: 20,
      exclude: ["retweets"],
      "tweet.fields": ["created_at", "referenced_tweets"],
    });

    return timeline.tweets
      .filter((t) => t.referenced_tweets?.some((r) => r.type === "replied_to"))
      .map((t) => ({
        id: t.id,
        text: t.text,
        url: `https://x.com/VERITYtoken_/status/${t.id}`,
        createdAt: t.created_at ?? "",
      }))
      .slice(0, limit);
  } catch (err) {
    console.error("getRecentVerityActivity error:", err);
    return [];
  }
}

