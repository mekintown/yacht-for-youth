"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-md border-b border-white/10 px-6 sm:px-12 py-4 flex justify-between items-center z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        <span className="text-xl font-semibold text-accent">
          Yacht For Youth
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8 items-center justify-center">
        <ul className="hidden md:flex gap-8 text-lg text-accent font-medium">
          {["Home", "Contact"].map((item) => (
            <li
              key={item}
              className="hover:text-primary transition-all duration-200 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-2 bg-accent text-white font-medium rounded-lg shadow-md hover:bg-accent/80 transition-all duration-200"
        >
          Join Us
        </motion.button>
      </div>

      {/* Mobile Menu (Optional) */}
      <div className="md:hidden text-accent text-2xl cursor-pointer">☰</div>
    </motion.nav>
  );
}
