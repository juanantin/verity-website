import { getRecentVerityActivity } from "@/lib/x-activity";
import { socialLinks } from "@/config/site";

function timeAgo(iso: string): string {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default async function LiveFromX() {
  const activity = await getRecentVerityActivity(5);

  return (
    <section id="live-x" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-widest sm:text-3xl">
          Live from X
        </h2>

        <div className="overflow-hidden rounded-lg border border-verity-yellow/70 bg-verity-bg-raised shadow-[0_0_40px_rgba(255,230,0,0.12)]">
          <div className="flex items-center gap-2 border-b border-verity-yellow/40 bg-black/40 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-verity-red" />
            <span className="h-3 w-3 rounded-full bg-verity-yellow" />
            <span className="h-3 w-3 rounded-full bg-verity-yellow/30" />
            <span className="ml-3 text-xs text-verity-yellow/50">verity_livefeed.exe</span>
          </div>

          <div className="space-y-4 px-5 py-8 text-sm sm:px-8 sm:text-base">
            {activity.length === 0 ? (
              <p className="text-verity-yellow/30">{"> no signal detected yet."}</p>
            ) : (
              activity.map((item) => (
                <p key={item.id} className="text-verity-yellow/90">
                  <span className="text-verity-red">{"> "}</span>
                  {item.text}{" "}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-verity text-xs text-verity-yellow/40 underline transition-colors hover:text-verity-yellow"
                  >
                    view on X{item.createdAt ? ` · ${timeAgo(item.createdAt)}` : ""}
                  </a>
                </p>
              ))
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-verity-yellow/40">
          Tweet at{" "}
          <a
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-verity-yellow"
          >
            @VERITYtoken_
          </a>{" "}
          and Verity replies.
        </p>
      </div>
    </section>
  );
}
