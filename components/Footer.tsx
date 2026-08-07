import { LineChart } from "lucide-react";
import { socialLinks } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-verity-yellow/30 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-6">
          <a
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="focus-verity flex h-5 w-5 items-center justify-center text-sm font-bold text-verity-yellow/70 transition-colors hover:text-verity-yellow"
          >
            X
          </a>
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="focus-verity flex h-5 w-5 items-center justify-center text-xs font-bold text-verity-yellow/70 transition-colors hover:text-verity-yellow"
          >
            TT
          </a>
          <a
            href={socialLinks.dexscreener}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DexScreener"
            className="focus-verity text-verity-yellow/70 transition-colors hover:text-verity-yellow"
          >
            <LineChart size={20} />
          </a>
        </div>
        <p className="text-xs text-verity-yellow/40">
          $VERITY is a community meme project. No utility or investment promises implied. Nothing here is financial advice.
        </p>
      </div>
    </footer>
  );
}
