import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutTerminal from "@/components/AboutTerminal";
import Tokenomics from "@/components/Tokenomics";
import LiveFromX from "@/components/LiveFromX";
import Footer from "@/components/Footer";

// Re-render (and refetch LiveFromX's data) at most every 5 minutes instead
// of freezing it at build time.
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-vignette" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <AboutTerminal />
        <Tokenomics />
        <LiveFromX />
      </main>
      <Footer />
    </>
  );
}
