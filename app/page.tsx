import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutTerminal from "@/components/AboutTerminal";
import Tokenomics from "@/components/Tokenomics";
import AskVerity from "@/components/AskVerity";
import Footer from "@/components/Footer";

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
        <AskVerity />
      </main>
      <Footer />
    </>
  );
}
