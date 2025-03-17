"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Dynamically load the map modal (disable SSR)
const MapModal = dynamic(() => import("../../components/MapModal"), {
  ssr: false,
});

/** Example job categories for step 3 if not employer */
const jobCategories = [
  {
    id: 1,
    title: "แคชเชียร์",
    description: "Customer service ...",
    imageUrl: "/cashier.png",
  },
  {
    id: 2,
    title: "พนักงานขายแผนกของเล่น",
    description: "...",
    imageUrl: "/sale.png",
  },
  {
    id: 3,
    title: "ผู้ช่วยคลังสินค้า",
    description: "...",
    imageUrl: "/warehouse-helper.png",
  },
  { id: 4, title: "Designer", description: "...", imageUrl: "/designer.png" },
  { id: 5, title: "บาริสต้า", description: "...", imageUrl: "/barista.png" },
  {
    id: 6,
    title: "พนักงานเสิร์ฟ",
    description: "...",
    imageUrl: "/waiter.png",
  },
  { id: 7, title: "ผู้ช่วยครัว", description: "...", imageUrl: "/kitchen.png" },
  {
    id: 8,
    title: "สตาฟงานคอนเสิร์ต",
    description: "...",
    imageUrl: "/staff.png",
  },
  {
    id: 9,
    title: "Customer Support",
    description: "...",
    imageUrl: "/support.png",
  },
  {
    id: 10,
    title: "ควบคุมเครื่องเล่นสวนสนุก",
    description: "...",
    imageUrl: "/disney-staff.png",
  },
];

export default function NewRegistrationPage() {
  const [step, setStep] = useState(1);

  // STEP 1: Personal info
  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isEmployer, setIsEmployer] = useState(false);

  // Personal location (user’s home/current location)
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState("");
  const [mapModalOpen, setMapModalOpen] = useState(false);

  // STEP 2: Documents
  const [, setIdPhotoFile] = useState<File | null>(null);
  const [nationalId, setNationalId] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // STEP 3 (Employer flow: job details / Non-employer flow: pick jobs)
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  // Employer’s separate map location
  const [workCoords, setWorkCoords] = useState<[number, number] | null>(null);
  const [workAddress, setWorkAddress] = useState("");
  const [workMapOpen, setWorkMapOpen] = useState(false);
  const [jobLocation, setJobLocation] = useState("");

  // If not employer => user picks categories
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Submission final states
  const [submitted, setSubmitted] = useState(false);

  /** Navigation */
  const handleNext = () => {
    // Simple approach: increment step.
    setStep((prev) => prev + 1);
  };
  const handleBack = () => setStep((prev) => prev - 1);

  /** Final submission => sets "submitted" for employees or finishes for employer’s page */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = () => {
    setSubmitted(true);
  };

  /** Toggle categories for non-employer’s step */
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 mt-12">
      {/* Step indicator: up to 3 for employees, up to 4 for employers */}
      <div className="mb-4 flex items-center justify-center space-x-2">
        {/* We'll dynamically highlight these based on user role */}
        {isEmployer
          ? [1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-3 w-3 rounded-full ${
                  step === item
                    ? "bg-blue-500 scale-125"
                    : step > item
                    ? "bg-green-500"
                    : "bg-gray-300"
                } transition-all`}
              />
            ))
          : [1, 2, 3].map((item) => (
              <div
                key={item}
                className={`h-3 w-3 rounded-full ${
                  step === item
                    ? "bg-blue-500 scale-125"
                    : step > item
                    ? "bg-green-500"
                    : "bg-gray-300"
                } transition-all`}
              />
            ))}
      </div>

      {/* STEP 1: Personal Info */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            1. ข้อมูลส่วนตัว
          </h2>

          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ชื่อ - สกุล
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border p-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="เช่น สมชาย ใจดี"
            />
          </div>

          {/* Personal location map */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สถานที่ปัจจุบัน
            </label>
            {coords ? (
              <p className="text-sm text-gray-600">
                {address || "กำลังโหลดที่อยู่..."} <br />
                <span className="text-xs text-gray-400">
                  (Lat: {coords[0].toFixed(5)}, Lng: {coords[1].toFixed(5)})
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-500">ยังไม่ได้เลือกตำแหน่ง</p>
            )}
            <div className="mt-2">
              <Button variant="outline" onClick={() => setMapModalOpen(true)}>
                เลือกตำแหน่งจากแผนที่
              </Button>
            </div>
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              วันเกิด (เช่น 01/09/2548)
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border p-2"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          {/* Employer? */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isEmployer}
              onChange={(e) => setIsEmployer(e.target.checked)}
            />
            <label className="text-sm font-medium text-gray-700">
              ฉันเป็นนายจ้าง (Employer)
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button onClick={handleNext}>ต่อไป</Button>
          </div>
        </div>
      )}

      {/* STEP 2: Documents (both roles) */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            2. อัพโหลด/กรอกเอกสาร
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ภาพถ่ายหน้าตรง
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files ? setIdPhotoFile(e.target.files[0]) : null
              }
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:rounded-md file:border-0
                         file:bg-gray-100 file:py-2 file:px-4
                         file:text-sm file:font-semibold
                         hover:file:bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              เลขบัตรประชาชน
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border p-2"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="เช่น 1234567890123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              หมายเลขบัญชีธนาคาร
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border p-2"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              placeholder="ตัวอย่าง 123-4-56789-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              เบอร์ติดต่อฉุกเฉิน
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border p-2"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="เช่น 081-234-5678"
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" onClick={handleBack}>
              ย้อนกลับ
            </Button>
            <Button onClick={handleNext}>ต่อไป</Button>
          </div>
        </div>
      )}

      {/* STEP 3 for Employer => Job Details
          STEP 3 for Employee => Pick Jobs */}
      {step === 3 && isEmployer && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            3. รายละเอียดงาน (นายจ้าง)
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ชื่อตำแหน่งงาน
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border p-2"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="เช่น พนักงานเสิร์ฟ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              รายละเอียดงาน
            </label>
            <textarea
              className="mt-1 w-full rounded-md border p-2"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="บรรยายงานและความรับผิดชอบ"
            />
          </div>

          {/* Employer map location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สถานที่ทำงาน
            </label>
            {workCoords ? (
              <p className="text-sm text-gray-600">
                {workAddress || "กำลังโหลดที่อยู่..."} <br />
                <span className="text-xs text-gray-400">
                  (Lat: {workCoords[0].toFixed(5)}, Lng:{" "}
                  {workCoords[1].toFixed(5)})
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-500">ยังไม่ได้เลือกตำแหน่ง</p>
            )}
            <input
              type="text"
              className="mt-2 w-full rounded-md border p-2"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              placeholder="ระบุที่อยู่หรือจุดสังเกต (ถ้ามี)"
            />

            <div className="mt-2">
              <Button variant="outline" onClick={() => setWorkMapOpen(true)}>
                เลือกตำแหน่งจากแผนที่
              </Button>
            </div>
          </div>

          {/* Next => show "waiting" page (step=4) */}
          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" onClick={handleBack}>
              ย้อนกลับ
            </Button>
            <Button onClick={handleNext}>ต่อไป</Button>
          </div>
        </div>
      )}

      {step === 3 && !isEmployer && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            3. เลือกงานที่สนใจ
          </h2>
          <p className="text-sm text-gray-500">
            กรุณาเลือกอย่างน้อย 3 ประเภทงานเพื่อปรับแต่งการแนะนำ
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`relative cursor-pointer rounded-lg border p-2 shadow-sm hover:shadow-md transition ${
                  selectedCategories.includes(cat.id)
                    ? "border-blue-400 bg-blue-50"
                    : "bg-white"
                }`}
              >
                <div className="relative w-full h-40 mb-2 overflow-hidden rounded">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-md font-medium text-gray-800">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" onClick={handleBack}>
              ย้อนกลับ
            </Button>
            {/* Next => directly final => skip waiting */}
            <Button
              onClick={() => {
                // Must have at least 3
                if (selectedCategories.length < 3) return;
                setStep(99); // We'll treat step=99 as "done"
                setSubmitted(true);
              }}
            >
              เสร็จสิ้น
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4 => "กำลังตรวจสอบ/รอผล" => final page for Employer */}
      {step === 4 && isEmployer && !submitted && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            กำลังตรวจสอบ/รอผล
          </h2>
          <p className="text-gray-600">
            เจ้าหน้าที่จะตรวจสอบเอกสารและยืนยันอีกครั้ง
            ระบบจะตรวจจับงานอันตรายและอาจปฏิเสธอัตโนมัติ
          </p>
          <p className="text-sm text-gray-500">
            (หน้าตัวอย่าง: ไม่มีขั้นตอนเพิ่มเติมสำหรับนายจ้าง)
          </p>

          <div className="flex justify-end gap-4 pt-4">
            {/* Could show a "back" if you want, or hide it */}
            <Button variant="outline" onClick={handleBack}>
              ย้อนกลับ
            </Button>
            <Button
              onClick={() => {
                setSubmitted(true);
              }}
            >
              เสร็จสิ้น
            </Button>
          </div>
        </div>
      )}

      {/* Final "Done" page for employees or after waiting for employer */}
      {submitted && (
        <div className="space-y-4 text-center mt-8">
          <h2 className="text-2xl font-bold text-green-600">
            ส่งข้อมูลเรียบร้อย
          </h2>
          <p className="text-gray-700">ระบบได้รับข้อมูลของคุณแล้ว</p>
          <Link href="/">
            <Button>กลับหน้าหลัก</Button>
          </Link>
        </div>
      )}

      {/* Personal map modal (Step 1) */}
      {mapModalOpen && (
        <MapModal
          onClose={() => setMapModalOpen(false)}
          onSelectLocation={(lat, lng, addr) => {
            setCoords([lat, lng]);
            setAddress(addr);
            setMapModalOpen(false);
          }}
        />
      )}

      {/* Employer map modal (Step 3) */}
      {workMapOpen && (
        <MapModal
          onClose={() => setWorkMapOpen(false)}
          onSelectLocation={(lat, lng, addr) => {
            setWorkCoords([lat, lng]);
            setWorkAddress(addr);
            setWorkMapOpen(false);
          }}
        />
      )}
    </div>
  );
}
