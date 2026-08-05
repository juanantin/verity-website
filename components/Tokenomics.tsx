"use client";

import { motion } from "framer-motion";
import { tokenomics } from "@/config/site";

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="verity-grid-bg px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-widest sm:text-3xl">
          Tokenomics
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
