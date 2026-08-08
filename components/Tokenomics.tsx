"use client";

import { motion } from "framer-motion";
import { tokenomics, socialLinks, buyUrl } from "@/config/site";
import CopyAddress from "./CopyAddress";

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="verity-grid-bg px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-widest sm:text-3xl">
          Tokenomics
        </h2>

        <div className="mb-10 flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              id="buy"
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-verity rounded bg-verity-yellow px-8 py-3 text-center text-sm font-bold uppercase tracking-wider text-verity-bg shadow-[0_0_22px_rgba(255,230,0,0.6)] transition-shadow hover:shadow-[0_0_34px_rgba(255,230,0,0.9)]"
            >
              Buy $VERITY
            </a>
            <a
              href={socialLinks.dexscreener}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-verity rounded border border-verity-yellow px-8 py-3 text-center text-sm font-bold uppercase tracking-wider text-verity-yellow transition-colors hover:bg-verity-yellow hover:text-verity-bg"
            >
              View Chart
            </a>
          </div>

          <CopyAddress />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tokenomics.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255,230,0,0.55)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-lg border border-verity-yellow/60 bg-verity-bg-raised px-5 py-8 text-center shadow-[0_0_16px_rgba(255,230,0,0.15)]"
            >
              <p className="text-xs uppercase tracking-widest text-verity-yellow/60">
                {stat.label}
              </p>
              <p className="mt-3 text-xl font-bold sm:text-2xl">{stat.value}</p>
              {stat.suffix && (
                <p className="mt-1 text-xs text-verity-yellow/50">{stat.suffix}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
