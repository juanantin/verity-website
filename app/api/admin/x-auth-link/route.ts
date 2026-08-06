import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

// TEMPORARY — one-time OAuth 1.0a PIN-flow helper for authorizing the X bot
// as @VERITYtoken_ while the app's Consumer Key/Secret belong to a different
// developer account. Delete this route (and x-auth-exchange) once you have
// the Access Token/Secret.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { X_API_KEY, X_API_SECRET } = process.env;
  if (!X_API_KEY || !X_API_SECRET) {
    return NextResponse.json({ error: "X_API_KEY / X_API_SECRET not configured" }, { status: 500 });
  }

  try {
    const client = new TwitterApi({ appKey: X_API_KEY, appSecret: X_API_SECRET });
    const authLink = await client.generateAuthLink("oob", { authAccessType: "write" });
    return NextResponse.json(authLink);
  } catch (err) {
    console.error("x-auth-link error:", err);
    return NextResponse.json({ error: "Failed to generate auth link" }, { status: 500 });
  }
}
