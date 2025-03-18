"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/bagde";
import { Camera, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function WorkHourMonitoringPage() {
  // States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");
  const [workHours, setWorkHours] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (date: Date | null) => {
    if (!date) return "--:--";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Calculate duration between check-in and check-out
  const calculateWorkHours = (checkIn: Date, checkOut: Date) => {
    const diff = (checkOut.getTime() - checkIn.getTime()) / 1000 / 60 / 60;
    const hours = Math.floor(diff);
    const minutes = Math.floor((diff - hours) * 60);

    return `${hours}h ${minutes}m`;
  };

  // Start camera for face recognition
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsCameraActive(false);
  };

  // Capture image for verification
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageData);

      // In a real app, you would send this image to your backend for verification
      processVerification(imageData);
    }
  };

  // Mock verification process
  const processVerification = (imageData: string) => {
    setIsProcessing(true);

    // Simulate API call for face recognition and location verification
    setTimeout(() => {
      // Mock successful verification 80% of the time
      const isVerified = Math.random() > 0.2;

      if (isVerified) {
        setVerificationStatus("success");

        if (isCheckedIn) {
          // Check out process
          const checkOutAt = new Date();
          setCheckOutTime(checkOutAt);
          setIsCheckedIn(false);

          if (checkInTime) {
            setWorkHours(calculateWorkHours(checkInTime, checkOutAt));

            // Check for overtime (assuming 8 hours is standard)
            const workHoursDecimal =
              (checkOutAt.getTime() - checkInTime.getTime()) / 1000 / 60 / 60;
            if (workHoursDecimal > 8) {
              // In a real app, send notification to employer and employee
              console.log(
                "OVERTIME ALERT:",
                workHoursDecimal - 8,
                "hours overtime"
              );
              // showNotification("Overtime Alert", `You've worked ${(workHoursDecimal - 8).toFixed(1)} hours overtime today.`);
            }
          }
        } else {
          // Check in process
          setCheckInTime(new Date());
          setCheckOutTime(null);
          setWorkHours(null);
          setIsCheckedIn(true);
        }
      } else {
        setVerificationStatus("failed");
      }

      setIsProcessing(false);

      // Reset verification status after 3 seconds
      setTimeout(() => {
        setVerificationStatus("idle");
        stopCamera();
      }, 3000);
    }, 2000);
  };

  // Handle check in/out button click
  const handleCheckInOut = () => {
    setCapturedImage(null);
    setVerificationStatus("idle");
    startCamera();
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
          บันทึกเวลาทำงาน
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          ระบบบันทึกเวลาเข้า-ออกงานด้วยการจดจำใบหน้าและตรวจสอบตำแหน่งพิกัด
          เพื่อความแม่นยำและโปร่งใส
        </p>
      </motion.div>

      {/* Current Time Display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mb-6 flex items-center justify-center"
      >
        <Clock className="mr-2 text-primary" />
        <span className="text-xl font-semibold">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </motion.div>

      {/* Check In/Out Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-full max-w-md mb-8 px-4"
      >
        <Card className="p-6 shadow-md">
          {/* Status Display */}
          <div className="mb-6 text-center">
            <Badge
              variant={isCheckedIn ? "default" : "outline"}
              className="mb-2 px-4 py-1"
            >
              {isCheckedIn ? "เข้างานแล้ว" : "ยังไม่ได้เข้างาน"}
            </Badge>
            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">เวลาเข้างาน</p>
                <p className="text-lg font-medium">{formatTime(checkInTime)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">เวลาออกงาน</p>
                <p className="text-lg font-medium">
                  {formatTime(checkOutTime)}
                </p>
              </div>
            </div>
            {workHours && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">ชั่วโมงทำงานวันนี้</p>
                <p className="text-lg font-semibold text-primary">
                  {workHours}
                </p>
              </div>
            )}
          </div>

          {/* Camera Section */}
          {isCameraActive && (
            <div className="relative mb-4">
              <div className="bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>

              {verificationStatus === "success" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <div className="text-center text-white">
                    <CheckCircle2
                      className="mx-auto mb-2 text-green-400"
                      size={48}
                    />
                    <p className="font-medium">
                      {isCheckedIn
                        ? "บันทึกเวลาเข้างานสำเร็จ"
                        : "บันทึกเวลาออกงานสำเร็จ"}
                    </p>
                  </div>
                </div>
              )}

              {verificationStatus === "failed" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <div className="text-center text-white">
                    <XCircle className="mx-auto mb-2 text-red-400" size={48} />
                    <p className="font-medium">ยืนยันตัวตนไม่สำเร็จ</p>
                    <p className="text-sm mt-1">กรุณาลองใหม่อีกครั้ง</p>
                  </div>
                </div>
              )}

              {verificationStatus === "idle" && !isProcessing && (
                <Button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  onClick={captureImage}
                >
                  <Camera className="mr-2" size={18} />
                  ถ่ายภาพยืนยันตัวตน
                </Button>
              )}

              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                  <div className="animate-pulse text-white text-center">
                    <p>กำลังตรวจสอบ...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          {!isCameraActive && (
            <Button
              className="w-full"
              onClick={handleCheckInOut}
              variant={isCheckedIn ? "destructive" : "default"}
            >
              {isCheckedIn ? "บันทึกเวลาออกงาน" : "บันทึกเวลาเข้างาน"}
            </Button>
          )}
        </Card>
      </motion.div>

      {/* Work History Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="w-full max-w-md px-4"
      >
        <Card className="p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            ประวัติการทำงานล่าสุด
          </h2>

          {/* This would be populated from API in a real app */}
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <p className="font-medium">วันจันทร์, 17 มี.ค. 2025</p>
                <p className="text-sm text-gray-500">8:30 - 17:45</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">9h 15m</p>
                <Badge variant="outline" className="text-amber-600 bg-amber-50">
                  ล่วงเวลา 1h 15m
                </Badge>
              </div>
            </li>
            <li className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <p className="font-medium">วันศุกร์, 14 มี.ค. 2025</p>
                <p className="text-sm text-gray-500">8:45 - 16:30</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">7h 45m</p>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">วันพฤหัสบดี, 13 มี.ค. 2025</p>
                <p className="text-sm text-gray-500">9:00 - 18:15</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">9h 15m</p>
                <Badge variant="outline" className="text-amber-600 bg-amber-50">
                  ล่วงเวลา 1h 15m
                </Badge>
              </div>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
