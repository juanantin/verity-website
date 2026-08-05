"use client";

import { motion } from "framer-motion";
import { loreLines } from "@/config/site";

export default function AboutTerminal() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-widest sm:text-3xl">
          About
        </h2>

        <div className="overflow-hidden rounded-lg border border-verity-yellow/70 bg-verity-bg-raised shadow-[0_0_40px_rgba(255,230,0,0.12)]">
          <div className="flex items-center gap-2 border-b border-verity-yellow/40 bg-black/40 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-verity-red" />
            <span className="h-3 w-3 rounded-full bg-verity-yellow" />
            <span className="h-3 w-3 rounded-full bg-verity-yellow/30" />
            <span className="ml-3 text-xs text-verity-yellow/50">verity_protocol.exe</span>
          </div>

          <div className="space-y-3 px-5 py-8 text-sm sm:px-8 sm:text-base">
            {loreLines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.35 }}
                className="whitespace-pre-line text-verity-yellow/90"
              >
                {line}
              </motion.p>
            ))}
            <span className="terminal-caret text-verity-yellow" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
