"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { verityResponses } from "@/config/site";

type Entry = { role: "user" | "verity"; text: string };

export default function AskVerity() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<Entry[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const reply = verityResponses[Math.floor(Math.random() * verityResponses.length)];
    setLog((prev) => [...prev, { role: "user", text }, { role: "verity", text: reply }]);
    setInput("");
  }

  return (
    <section id="terminal" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-center text-2xl font-bold uppercase tracking-widest sm:text-3xl">
          Ask Verity
        </h2>

        <div className="rounded-lg border border-verity-yellow/70 bg-verity-bg-raised p-5 shadow-[0_0_40px_rgba(255,230,0,0.12)] sm:p-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="shrink-0 text-verity-yellow/60">{"> TALK TO VERITY"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type something..."
              className="focus-verity w-full min-w-0 flex-1 border-b border-verity-yellow/40 bg-transparent px-2 py-1 text-sm text-verity-yellow placeholder:text-verity-yellow/30 focus:border-verity-yellow"
            />
          </form>

          <div className="mt-5 space-y-2 text-sm">
            <AnimatePresence initial={false}>
              {log.map((entry, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={
                    entry.role === "user"
                      ? "text-verity-yellow/50"
                      : "text-verity-red [text-shadow:0_0_10px_rgba(255,0,60,0.5)]"
                  }
                >
                  {entry.role === "user" ? "> " : "VERITY: "}
                  {entry.text}
                </motion.p>
              ))}
            </AnimatePresence>
            {log.length === 0 && (
              <p className="text-verity-yellow/30">Waiting for input...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
