"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-24 flex flex-col gap-5 items-center z-10"
    >
      <Image
        src="/logo-with-background.svg"
        alt="logo"
        width={137}
        height={137}
      />
      <h1 className="text-center text-5xl text-accent font-semibold">
        Yacht for Youth
      </h1>
      <h1 className="text-center text-3xl text-accent font-semibold">
        งานปลอดภัยสำหรับเยาวชน ทุกโอกาสเริ่มต้นที่นี่
      </h1>
    </motion.div>
  );
}
