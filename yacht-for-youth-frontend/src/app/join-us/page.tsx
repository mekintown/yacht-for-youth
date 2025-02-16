"use client";

import { motion } from "framer-motion";

export default function JoinUs() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-12 py-12 bg-gradient-to-r from-secondary to-primary text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl font-bold mb-6">Join Our Mission</h1>
        <p className="text-lg mb-6">
          Become a part of Yacht For Youth and help shape the future. We welcome
          innovators, engineers, designers, and passionate individuals.
        </p>
        <a
          href="/apply"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-200"
        >
          Apply Now
        </a>
      </motion.div>
    </section>
  );
}
