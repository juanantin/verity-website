import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

// TEMPORARY — see x-auth-link/route.ts. Delete both once you have the
// Access Token/Secret.
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const secret = params.get("secret");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { X_API_KEY, X_API_SECRET } = process.env;
  const oauthToken = params.get("oauth_token");
  const oauthTokenSecret = params.get("oauth_token_secret");
  const pin = params.get("pin");

  if (!X_API_KEY || !X_API_SECRET) {
    return NextResponse.json({ error: "X_API_KEY / X_API_SECRET not configured" }, { status: 500 });
  }
  if (!oauthToken || !oauthTokenSecret || !pin) {
    return NextResponse.json(
      { error: "Missing oauth_token, oauth_token_secret, or pin query params" },
      { status: 400 },
    );
  }

  try {
    const client = new TwitterApi({
      appKey: X_API_KEY,
      appSecret: X_API_SECRET,
      accessToken: oauthToken,
      accessSecret: oauthTokenSecret,
    });
    const { accessToken, accessSecret, screenName, userId } = await client.login(pin);
    return NextResponse.json({ accessToken, accessSecret, screenName, userId });
  } catch (err) {
    console.error("x-auth-exchange error:", err);
    return NextResponse.json({ error: "Failed to exchange PIN" }, { status: 500 });
  }
}
