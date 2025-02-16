"use client";

import { useState } from "react";
import Link from "next/link";

const mockJobs = [
  { id: 1, title: "พนักงานขาย", wage: "300 บาท/วัน" },
  { id: 2, title: "พนักงานเสิร์ฟ", wage: "350 บาท/วัน" },
  { id: 3, title: "พนักงานคลังสินค้า", wage: "400 บาท/วัน" },
];

export default function GenerateContractsPage() {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [employeeName, setEmployeeName] = useState("");
  const [employeePrefix, setEmployeePrefix] = useState("นาย");

  const handleGenerate = () => {
    if (!selectedJobId) {
      alert("กรุณาเลือกงานก่อน");
      return;
    }

    // In a real scenario, you might gather more fields or call an API
    const selectedJob = mockJobs.find((job) => job.id === selectedJobId);
    const payload = {
      jobTitle: selectedJob?.title,
      wage: selectedJob?.wage,
      employeeName,
      employeePrefix,
    };
    console.log("Generating labor contract with data:", payload);
    alert("สัญญาจ้างงานถูกสร้าง (ดูใน console)!");
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-8">
        <h1 className="text-2xl font-bold text-accent mb-4 text-center">
          สร้างเอกสารจ้างแรงงาน
        </h1>

        {/* Select an existing job */}
        <label className="block mb-2 text-gray-700">เลือกตำแหน่งงาน</label>
        <select
          value={selectedJobId ?? ""}
          onChange={(e) => setSelectedJobId(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="">-- กรุณาเลือกงาน --</option>
          {mockJobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title} ({job.wage})
            </option>
          ))}
        </select>

        {/* Minimal input for employee info */}
        <label className="block mb-2 text-gray-700">คำนำหน้าชื่อ</label>
        <select
          value={employeePrefix}
          onChange={(e) => setEmployeePrefix(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="นาย">นาย</option>
          <option value="นางสาว">นางสาว</option>
          <option value="นาง">นาง</option>
        </select>

        <label className="block mb-2 text-gray-700">ชื่อพนักงาน</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="เช่น สมหญิง ยิ้มแย้ม"
        />

        <button
          onClick={handleGenerate}
          className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary/80 transition-all"
        >
          สร้างเอกสารจ้างงาน
        </button>

        {/* Link to create a new job if not found */}
        <p className="mt-4 text-center text-sm text-gray-500">
          หรือ{" "}
          <Link href="/create-job">
            <span className="text-primary hover:underline cursor-pointer">
              สร้างงานใหม่
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
