"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckContractPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Control the Dialog manually
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
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

      // POST request to your mock endpoint
      const res = await axios.post(
        "http://localhost:8081/check-labor-contract",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(res.data);
      // When we have a result, open the dialog
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

        {/* File Input */}
        <label className="block mb-2 text-gray-700 font-medium">
          เลือกไฟล์ที่ต้องการตรวจสอบ
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full border border-gray-300 rounded-md p-2"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`w-full bg-primary text-white font-medium py-2 rounded-md transition-all hover:bg-primary/80 ${
            isUploading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "กำลังตรวจสอบ..." : "อัปโหลดเอกสารเพื่อตรวจสอบ"}
        </button>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-4 text-red-600 font-semibold">{errorMsg}</div>
        )}
      </div>

      {/* Use shadcn/ui Dialog for the modal */}
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

                    {result.issues && result.issues.length > 0 && (
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

                {/* Close Dialog Button */}
                <DialogClose className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition">
                  ปิด
                </DialogClose>
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
