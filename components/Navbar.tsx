"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-verity-yellow/30 bg-verity-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="glitch-text text-lg font-bold tracking-widest sm:text-xl">
          VERITY
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-verity text-sm uppercase tracking-wider text-verity-yellow/80 transition-colors hover:text-verity-yellow"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#buy"
            className="focus-verity rounded bg-verity-yellow px-4 py-2 text-sm font-bold uppercase tracking-wider text-verity-bg shadow-[0_0_18px_rgba(255,230,0,0.55)] transition-shadow hover:shadow-[0_0_28px_rgba(255,230,0,0.85)]"
          >
            Buy Now
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="focus-verity text-verity-yellow md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-verity-yellow/30 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-wider text-verity-yellow/80"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#buy"
            onClick={() => setOpen(false)}
            className="rounded bg-verity-yellow px-4 py-2 text-center text-sm font-bold uppercase tracking-wider text-verity-bg shadow-[0_0_18px_rgba(255,230,0,0.55)]"
          >
            Buy Now
          </a>
        </div>
      )}
    </header>
  );
}
