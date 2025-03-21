"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WaveSection() {
  return (
    <div className="absolute bottom-0 w-full h-[520px] overflow-hidden">
      <div className="relative w-[105%] h-full">
        {["wave-1.svg", "wave-2.svg", "wave-3.svg"].map((wave, index) => (
          <motion.div
            key={index}
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-5%", "0%"] }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-full h-full"
          >
            <Image
              src={`/${wave}`}
              alt={`Wave ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
