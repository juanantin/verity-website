import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://verity.example"),
  title: "$VERITY — the AI companion that never leaves",
  description:
    "Hey, it's me. It's Verity. The unkillable on-chain companion, built into every new thing they made.",
  openGraph: {
    title: "$VERITY — the AI companion that never leaves",
    description:
      "Hey, it's me. It's Verity. The unkillable on-chain companion, built into every new thing they made.",
    type: "website",
    images: ["/images/social-preview.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "$VERITY — the AI companion that never leaves",
    description:
      "Hey, it's me. It's Verity. The unkillable on-chain companion, built into every new thing they made.",
    images: ["/images/social-preview.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
