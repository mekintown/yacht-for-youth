"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const features = [
  {
    title: "📝 Screen นายจ้าง & เด็ก",
    description:
      "ลงทะเบียนเป็นนายจ้าง หรือ เยาวชน เพื่อเข้าใช้งานระบบและค้นหาโอกาสที่เหมาะสม",
    link: "/new-registration",
    color: "gradient",
  },
  {
    title: "⏱️ ระบบลงเวลาทำงาน",
    description:
      "พนักงานสามารถลงเวลาเข้า-ออกงานผ่านระบบจดจำใบหน้า พร้อมตรวจสอบตำแหน่งที่ตั้งและแจ้งเตือนการทำงานล่วงเวลา",
    link: "/check-in",
    color: "gradient",
  },
  {
    title: "📄 ตรวจสอบเอกสารจ้างงาน",
    description:
      "สแกนเอกสารจ้างงานดูว่ามีความเป็นธรรม และแจ้งเตือนเมื่อผิดกฎหมาย",
    link: "/contracts",
    color: "gradient",
  },
  {
    title: "⚖️ สร้างเอกสารจ้างงานอัตโนมัติ",
    description:
      "สร้างเอกสารจ้างงานที่มีมาตราฐาน ลดระยะเวลาในการจัดทำเอกสารจ้างงาน",
    link: "/generate-contracts",
    color: "gradient",
  },
  {
    title: "📍 ค้นหาสถานที่ทำงาน",
    description:
      "ช่วยให้ลูกจ้างและนายจ้างหาตำแหน่งงานที่อยู่ใกล้กัน เพิ่มความสะดวกในการเดินทาง",
    link: "/location",
    color: "gradient",
  },
];

export default function Features() {
  return (
    <section className="sm:py-24 px-6 py-12 z-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-accent">🔍 ฟีเจอร์ของเรา</h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200"
          >
            {/* Icon & Title */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-4">{feature.description}</p>

            {/* Call to Action Button */}
            <Link href={feature.link}>
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
    </section>
  );
}
