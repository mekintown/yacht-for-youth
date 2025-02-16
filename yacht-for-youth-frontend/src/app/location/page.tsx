"use client";

import { SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LocationPage() {
  // Minimal states for this mock
  const [employeeLocation, setEmployeeLocation] = useState("");
  const [employerLocation, setEmployerLocation] = useState("");
  const [withinDistance, setWithinDistance] = useState("5");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<Array<any>>([]);
  const [isSearching, setIsSearching] = useState(false);

  // A mock function for searching
  const handleSearch = () => {
    setIsSearching(true);
    setResults([]);
    setTimeout(() => {
      // After simulating a network call
      setResults([
        {
          id: 1,
          title: "บริษัท สมชาย จำกัด",
          distance: "3.2 km",
          address: "123 ถนนสุขุมวิท, กรุงเทพ",
        },
        {
          id: 2,
          title: "โรงงาน A",
          distance: "4.8 km",
          address: "88 หมู่ 10",
        },
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      {/* Heading / Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-10 px-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">
          ค้นหาสถานที่ทำงาน
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          ช่วยให้ลูกจ้างและนายจ้างหาตำแหน่งงานที่อยู่ใกล้กัน
          เพิ่มความสะดวกในการเดินทางและลดค่าใช้จ่าย
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          ระบุที่อยู่
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ตำแหน่งของลูกจ้าง
            </label>
            <Input
              placeholder="เช่น บ้านเลขที่, ถนน, ตำบล..."
              value={employeeLocation}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setEmployeeLocation(e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ตำแหน่งของนายจ้าง
            </label>
            <Input
              placeholder="เช่น ออฟฟิศหรือบริษัท..."
              value={employerLocation}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setEmployerLocation(e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ภายในระยะ (กม.)
            </label>
            <Input
              type="number"
              min="1"
              value={withinDistance}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setWithinDistance(e.target.value)
              }
            />
          </div>
          <div className="md:col-span-2 flex items-end">
            <Button
              className="mt-6 w-full md:w-auto"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "กำลังค้นหา..." : "ค้นหาสถานที่ทำงาน"}
            </Button>
          </div>
        </div>

        {/* Placeholder for a small map or "Location Preview" */}
        <div className="mt-4 w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          <span className="text-sm">
            [ แผนที่แสดงพิกัด หรือ Google Maps Embed ]
          </span>
        </div>
      </motion.div>

      {/* Results Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="w-full max-w-3xl px-4"
      >
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              ผลลัพธ์การค้นหา
            </h2>
            <ul className="space-y-4">
              {results.map((r) => (
                <li
                  key={r.id}
                  className="border-b border-gray-200 pb-3 last:pb-0 last:border-none"
                >
                  <div className="text-primary font-semibold">
                    {r.title} — {r.distance}
                  </div>
                  <div className="text-sm text-gray-600">{r.address}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {results.length === 0 && !isSearching && (
          <p className="text-gray-500 text-center">
            ยังไม่มีผลลัพธ์ ลองกรอกตำแหน่งแล้วกด &quot;ค้นหาสถานที่ทำงาน&quot;
          </p>
        )}
      </motion.div>
    </div>
  );
}
