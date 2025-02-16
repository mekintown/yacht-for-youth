import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WaveSection from "@/components/WaveSection";
import Features from "@/components/Features";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col overflow-x-hidden  min-h-screen">
        <div className="absolute inset-0 w-full h-[75%] bg-gradient-to-t from-background to-white"></div>

        <Navbar />
        <HeroSection />
        <Features />
        <WaveSection />
      </div>
    </>
  );
}
