/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants/api";

export default function CheckContractPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
      setErrorMsg("");
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMsg("กรุณาเลือกไฟล์ก่อน");
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg("");
      setResult(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await axios.post(
        `${API_BASE_URL}/check-labor-contract`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorMsg("ตรวจสอบเอกสารล้มเหลว, โปรดลองใหม่ภายหลัง");
      console.error("Error uploading file:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mt-8">
        <h1 className="text-2xl font-bold text-accent mb-6 text-center">
          ตรวจสอบเอกสารจ้างงาน
        </h1>

        <p className="text-gray-600 mb-4">
          อัปโหลดเอกสารจ้างงาน (DOCX/PDF) เพื่อตรวจสอบความเป็นธรรม
          และแจ้งเตือนเมื่อมีเงื่อนไขผิดกฎหมายหรือมีปัญหา
        </p>

        {/* Example Files */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium">
            ตัวอย่างไฟล์สำหรับตรวจสอบ:
          </p>
          <ul className="list-disc list-inside text-blue-600">
            <li>
              <a
                href="/example-contract/wrong_contract.pdf"
                download
                className="underline"
              >
                ดาวน์โหลดตัวอย่างเอกสารที่ผิด PDF
              </a>
            </li>
            <li>
              <a
                href="/example-contract/wrong_contract.docx"
                download
                className="underline"
              >
                ดาวน์โหลดตัวอย่างเอกสารที่ผิด DOCX
              </a>
            </li>
            <li>
              <a
                href="/example-contract/good_contract.docx"
                download
                className="underline"
              >
                ดาวน์โหลดตัวอย่างเอกสารที่ถูกต้อง DOCX
              </a>
            </li>
          </ul>
        </div>

        {/* File Input */}
        <label className="block mb-2 text-gray-700 font-medium">
          เลือกไฟล์ที่ต้องการตรวจสอบ
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full border border-gray-300 rounded-md p-2"
        />

        <Button
          variant="default"
          className="w-full"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "กำลังตรวจสอบ..." : "อัปโหลดเอกสารเพื่อตรวจสอบ"}
        </Button>

        {errorMsg && (
          <div className="mt-4 text-red-600 font-semibold">{errorMsg}</div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              key="dialog"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>ผลการตรวจสอบ</DialogTitle>
                  <DialogDescription>
                    ระบบได้ทำการวิเคราะห์เอกสารของคุณแล้ว
                  </DialogDescription>
                </DialogHeader>

                {result ? (
                  <div className="mt-4">
                    {result.valid ? (
                      <p className="text-green-700 mb-2">
                        เอกสารนี้ไม่มีปัญหาที่ชัดเจน (Valid: true).
                      </p>
                    ) : (
                      <p className="text-red-700 mb-2">
                        พบปัญหาบางอย่างในเอกสาร
                      </p>
                    )}
                    {result.issues?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-gray-700 font-medium mb-1">
                          พบเงื่อนไขที่อาจมีปัญหา:
                        </p>
                        <ul className="list-disc list-inside text-gray-600">
                          {result.issues.map((issue: string, idx: number) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.valid && result.issues?.length === 0 && (
                      <div className="text-gray-600 mt-2">
                        ระบบไม่พบเงื่อนไขใดๆ ที่ผิดปกติ
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-600 mt-4">
                    ไม่พบข้อมูลผลการตรวจสอบ
                  </div>
                )}
                <DialogClose asChild>
                  <Button variant="default" className="mt-6">
                    ปิด
                  </Button>
                </DialogClose>
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
