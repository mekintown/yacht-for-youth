// app/page.tsx  (the root home page in Next.js 13+)

import HeroSection from "@/components/HeroSection";
import WaveSection from "@/components/WaveSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col overflow-x-hidden min-h-screen">
        {/* Background gradient */}
        <div className="absolute inset-0 w-full h-[75%] bg-gradient-to-t from-backgroundYellow to-white"></div>

        <HeroSection />

        {/* Two large buttons for นายจ้าง / เยาวชน */}
        <section className="px-6 py-12 z-10 max-w-4xl mx-auto w-full ">
          <div className="text-center mb-8 ">
            <h2 className="text-3xl sm:text-4xl font-bold text-accent">
              เลือกประเภทผู้ใช้งาน
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* นายจ้าง Button */}
            <Link href="/employer-features">
              <Button className="text-lg px-8 py-4 font-semibold shadow-md">
                ฉันเป็นนายจ้าง
              </Button>
            </Link>

            {/* เยาวชน Button */}
            <Link href="/youth-features">
              <Button className="text-lg px-8 py-4 font-semibold shadow-md">
                ฉันเป็นเยาวชน
              </Button>
            </Link>
          </div>
        </section>

        <WaveSection />
      </div>
    </>
  );
}
