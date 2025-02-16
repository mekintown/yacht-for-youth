"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { API_BASE_URL } from "@/constants/api";

const mockJobs = [
  { id: 1, title: "พนักงานขาย", wage: "300 บาท/วัน" },
  { id: 2, title: "พนักงานเสิร์ฟ", wage: "350 บาท/วัน" },
  { id: 3, title: "พนักงานคลังสินค้า", wage: "400 บาท/วัน" },
];

export default function GenerateContractsPage() {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [employeeName, setEmployeeName] = useState("");
  const [employeePrefix, setEmployeePrefix] = useState("นาย");

  const handleGenerate = async () => {
    if (!selectedJobId) {
      alert("กรุณาเลือกงานก่อน");
      return;
    }

    // Find the selected "mock job"
    const selectedJob = mockJobs.find((job) => job.id === selectedJobId);
    if (!selectedJob) {
      alert("ไม่พบงานที่เลือก");
      return;
    }

    // For demonstration, building a minimal payload
    // In a real scenario, you'd pass all required fields or handle partial
    const payload = {
      // Minimal example (the real fields might be more extensive)
      position_title: selectedJob.title,
      wage_amount: selectedJob.wage, // e.g. "300 บาท/วัน"
      employee_name: employeeName,
      employee_prefix: employeePrefix,
      // plus other mandatory fields with placeholders or default values
      contract_location: "Bangkok",
      day: "1",
      month: "มกราคม",
      year: "2567",

      employer_prefix: "นาย",
      employer_name: "สมชาย ใจดี",
      use_office_address: false,
      employer_address: "123 ถนนสุขุมวิท",

      // Dummy data for the rest:
      employee_address: "88 ถนนสุขุมวิท",
      department: "ฝ่ายขาย",
      responsibilities: "ดูแลสินค้าหน้าร้าน",
      work_details: "ตรวจเช็คสต็อก",
      wage_unit: "วัน",
      wage_payment_day: "15",
      wage_payment_method: "เงินสด",
      bank_name: null,
      has_fixed_term: false,
      contract_duration: null,
      contract_duration_unit: null,
      contract_start: "01/01/2567",
      contract_end: null,
      work_location: "สำนักงานใหญ่",
      include_probation: false,
      probation_period_days: null,
      daily_hours_limit: "8",
      weekly_days: "6",
      work_start_time: "09:00",
      work_end_time: "18:00",
      work_day_start: "จันทร์",
      work_day_end: "เสาร์",
      break_start_time: "12:00",
      break_end_time: "13:00",
      annual_holidays: "13",
      annual_leave_days: "6",
      overtime_rate: "1.5 เท่า",
      holiday_rate: "2 เท่า",
      include_food_clause: false,
      food_details: null,
      food_price: null,
      food_price_unit: null,
      include_accommodation_clause: false,
      employer_notice_months: "1",
      employer_notice_pay: "1",
      employee_notice_months: "1",
      include_rules_clause: false,
      include_others_clause: false,
      include_stamp: false,
    };

    try {
      // Send a POST request to the Flask API to generate the contract
      const response = await axios.post(
        `${API_BASE_URL}/generate-labor-contract`,
        payload,
        { responseType: "blob" } // Expecting a .docx file
      );

      // Create a download link from the returned Blob
      const fileBlob = response.data;
      const fileUrl = window.URL.createObjectURL(fileBlob);

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "labor_contract.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(fileUrl);
      alert("สัญญาจ้างงานถูกดาวน์โหลดเรียบร้อย!");
    } catch (err) {
      console.error("Error generating contract:", err);
      alert("ไม่สามารถสร้างสัญญาจ้างงานได้ กรุณาลองใหม่ภายหลัง");
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-8">
        <h1 className="text-2xl font-bold text-accent mb-4 text-center">
          สร้างเอกสารจ้างแรงงาน (เลือกงานล่วงหน้า)
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
          สร้างเอกสารจ้างงาน (ดาวน์โหลด)
        </button>

        {/* Link to create a new job if not found */}
        <p className="mt-4 text-center text-sm text-gray-500">
          หรือ{" "}
          <Link href="/create-job">
            <span className="text-primary hover:underline cursor-pointer">
              สร้างงานแบบละเอียด
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
