"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import WaveSection from "@/components/WaveSection";

const employeeFeatures = [
  {
    title: "📝 สมัคร",
    description: "ลงทะเบียนเพื่อใช้งานระบบเยาวชน",
    link: "/new-registration?role=employee",
  },
  {
    title: "⏱️ ระบบลงเวลาทำงาน",
    description:
      "พนักงานสามารถลงเวลาเข้า-ออกงานผ่านระบบจดจำใบหน้า พร้อมตรวจสอบตำแหน่งที่ตั้งและแจ้งเตือนการทำงานล่วงเวลา",
    link: "/check-in",
  },
  {
    title: "📄 ตรวจสอบสัญญาจ้าง",
    description:
      "สแกนเอกสารจ้างงานดูว่ามีความเป็นธรรม และแจ้งเตือนเมื่อผิดกฎหมาย",
    link: "/contracts",
  },
  {
    title: "📍 ค้นหาสถานที่ทำงาน",
    description:
      "ช่วยให้ลูกจ้างและนายจ้างหาตำแหน่งงานที่อยู่ใกล้กัน เพิ่มความสะดวกในการเดินทาง",
    link: "/location",
  },
];

export default function EmployerFeaturesPage() {
  return (
    <div className="relative flex flex-col overflow-x-hidden min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 w-full h-[75%] bg-gradient-to-t from-backgroundYellow to-white"></div>
      <section className="px-6 py-12 z-10 max-w-4xl mx-auto w-full ">
        <div className="min-h-screen pt-24 px-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-accent">
            ฟีเจอร์สำหรับเยาวชน
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {employeeFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 flex-1">{item.description}</p>

                <Link href={item.link} className="mt-4">
                  <Button
                    variant="gradient"
                    className={buttonVariants({
                      variant: "gradient",
                      className: "mt-auto px-6 py-3",
                    })}
                  >
                    ดูเพิ่มเติม →
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <WaveSection />
    </div>
  );
}
