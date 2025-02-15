import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WaveSection from "@/components/WaveSection";
import Features from "@/components/Features";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-t from-background to-white to-70% min-h-screen flex flex-col overflow-x-hidden ">
        <Navbar />
        <HeroSection />
        <Features />
        <WaveSection />
      </div>
    </>
  );
}
