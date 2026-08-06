import { TwitterApi } from "twitter-api-v2";

export type VerityActivityItem = {
  id: string;
  text: string;
  url: string;
  createdAt: string;
};

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { data: VerityActivityItem[]; fetchedAt: number } | null = null;

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

// Cached per warm serverless instance (not shared globally) — good enough to
// keep normal traffic from re-hitting the X API on every page load without
// adding a database just for this.
export async function getRecentVerityActivity(limit = 5): Promise<VerityActivityItem[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data.slice(0, limit);
  }

  const client = getXClient();
  if (!client) return cache?.data.slice(0, limit) ?? [];

  try {
    const me = await client.v2.me();
    const timeline = await client.v2.userTimeline(me.data.id, {
      max_results: 20,
      exclude: ["retweets"],
      "tweet.fields": ["created_at", "referenced_tweets"],
    });

    const replies: VerityActivityItem[] = timeline.tweets
      .filter((t) => t.referenced_tweets?.some((r) => r.type === "replied_to"))
      .map((t) => ({
        id: t.id,
        text: t.text,
        url: `https://x.com/VERITYtoken_/status/${t.id}`,
        createdAt: t.created_at ?? "",
      }));

    cache = { data: replies, fetchedAt: Date.now() };
    return replies.slice(0, limit);
  } catch (err) {
    console.error("getRecentVerityActivity error:", err);
    return cache?.data.slice(0, limit) ?? [];
  }
}
