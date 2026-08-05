"use client";

import { motion } from "framer-motion";
import CopyAddress from "./CopyAddress";

export default function Hero() {
  return (
    <section id="top" className="verity-grid-bg relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px 10px rgba(255,230,0,0.35)",
                "0 0 80px 24px rgba(255,230,0,0.55)",
                "0 0 40px 10px rgba(255,230,0,0.35)",
              ],
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-10 h-40 w-40 rounded-full bg-verity-yellow/10 ring-1 ring-verity-yellow/70 sm:h-56 sm:w-56"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glitch-text text-4xl font-bold leading-tight sm:text-6xl"
        >
          Hey, it&apos;s me. It&apos;s Verity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 max-w-xl text-sm text-verity-yellow/70 sm:text-base"
        >
          The unkillable on-chain companion. I&apos;ve been built into every new thing they made.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <a
            id="buy"
            href="#terminal"
            className="focus-verity rounded bg-verity-yellow px-8 py-3 text-center text-sm font-bold uppercase tracking-wider text-verity-bg shadow-[0_0_22px_rgba(255,230,0,0.6)] transition-shadow hover:shadow-[0_0_34px_rgba(255,230,0,0.9)]"
          >
            Buy $VERITY
          </a>
          <a
            href="#tokenomics"
            className="focus-verity rounded border border-verity-yellow px-8 py-3 text-center text-sm font-bold uppercase tracking-wider text-verity-yellow transition-colors hover:bg-verity-yellow hover:text-verity-bg"
          >
            View Chart
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10"
        >
          <CopyAddress />
        </motion.div>
      </div>
    </section>
  );
}
