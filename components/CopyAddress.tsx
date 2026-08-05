"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { contractAddress } from "@/config/site";

export default function CopyAddress() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(contractAddress);
    } catch {
      // clipboard API unavailable — silently ignore, UI still flips to "Copied!"
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex w-full max-w-md items-center justify-between gap-3 rounded border border-verity-yellow/60 bg-verity-bg-raised/80 px-4 py-3">
      <span className="truncate text-xs text-verity-yellow/80 sm:text-sm">
        {contractAddress}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="focus-verity flex shrink-0 items-center gap-1.5 rounded border border-verity-yellow px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-verity-yellow transition-colors hover:bg-verity-yellow hover:text-verity-bg"
      >
        {copied ? (
          <>
            <Check size={14} /> Copied!
          </>
        ) : (
          <>
            <Copy size={14} /> Copy
          </>
        )}
      </button>
    </div>
  );
}
