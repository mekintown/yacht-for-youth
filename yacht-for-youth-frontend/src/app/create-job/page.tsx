"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateContractPage() {
  // 1. Basic Contract Info
  const [contractLocation, setContractLocation] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // 2. Employer Info
  const [employerPrefix, setEmployerPrefix] = useState("นาย");
  const [employerName, setEmployerName] = useState("");
  const [useOfficeAddress, setUseOfficeAddress] = useState(false);
  const [employerAddress, setEmployerAddress] = useState("");

  // 3. Employee Info
  const [employeePrefix, setEmployeePrefix] = useState("นาย");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");

  // 4. Position & Work Details
  const [positionTitle, setPositionTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [workDetails, setWorkDetails] = useState("");

  // 5. Wage Info
  const [wageAmount, setWageAmount] = useState("");
  const [wageUnit, setWageUnit] = useState("วัน");
  const [wagePaymentDay, setWagePaymentDay] = useState("");
  const [wagePaymentMethod, setWagePaymentMethod] = useState("เงินสด");
  const [bankName, setBankName] = useState("");

  // 6. Contract Duration & Work Location
  const [hasFixedTerm, setHasFixedTerm] = useState(false);
  const [contractDuration, setContractDuration] = useState("");
  const [contractDurationUnit, setContractDurationUnit] = useState("");
  const [contractStart, setContractStart] = useState("");
  const [contractEnd, setContractEnd] = useState("");
  const [workLocation, setWorkLocation] = useState("");

  // 7. Probation Clause
  const [includeProbation, setIncludeProbation] = useState(false);
  const [probationPeriodDays, setProbationPeriodDays] = useState("");

  // 8. Working Hours
  const [dailyHoursLimit, setDailyHoursLimit] = useState("");
  const [weeklyDays, setWeeklyDays] = useState("");
  const [workStartTime, setWorkStartTime] = useState("");
  const [workEndTime, setWorkEndTime] = useState("");
  const [workDayStart, setWorkDayStart] = useState("");
  const [workDayEnd, setWorkDayEnd] = useState("");
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");

  // 9. Holidays / Overtime
  const [annualHolidays, setAnnualHolidays] = useState("");
  const [annualLeaveDays, setAnnualLeaveDays] = useState("");
  const [overtimeRate, setOvertimeRate] = useState("");
  const [holidayRate, setHolidayRate] = useState("");

  // 10. Food & Accommodation
  const [includeFoodClause, setIncludeFoodClause] = useState(false);
  const [foodDetails, setFoodDetails] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodPriceUnit, setFoodPriceUnit] = useState("");
  const [includeAccommodationClause, setIncludeAccommodationClause] =
    useState(false);

  // 11. Notice Period
  const [employerNoticeMonths, setEmployerNoticeMonths] = useState("");
  const [employerNoticePay, setEmployerNoticePay] = useState("");
  const [employeeNoticeMonths, setEmployeeNoticeMonths] = useState("");

  // 12. Optional Clauses
  const [includeRulesClause, setIncludeRulesClause] = useState(false);
  const [includeOthersClause, setIncludeOthersClause] = useState(false);

  // 13. Ending
  const [includeStamp, setIncludeStamp] = useState(false);

  const handleSubmit = async () => {
    // Build the payload
    const payload = {
      contract_location: contractLocation,
      day,
      month,
      year,

      employer_prefix: employerPrefix,
      employer_name: employerName,
      use_office_address: useOfficeAddress,
      employer_address: employerAddress,

      employee_prefix: employeePrefix,
      employee_name: employeeName,
      employee_address: employeeAddress,

      position_title: positionTitle,
      department,
      responsibilities,
      work_details: workDetails,

      wage_amount: wageAmount,
      wage_unit: wageUnit,
      wage_payment_day: wagePaymentDay,
      wage_payment_method: wagePaymentMethod,
      bank_name: bankName || undefined,

      has_fixed_term: hasFixedTerm,
      contract_duration: contractDuration || undefined,
      contract_duration_unit: contractDurationUnit || undefined,
      contractStart,
      contract_end: contractEnd || undefined,
      work_location: workLocation,

      include_probation: includeProbation,
      probation_period_days: probationPeriodDays || undefined,

      daily_hours_limit: dailyHoursLimit,
      weekly_days: weeklyDays,
      work_start_time: workStartTime,
      work_end_time: workEndTime,
      work_day_start: workDayStart,
      work_day_end: workDayEnd,
      break_start_time: breakStartTime,
      break_end_time: breakEndTime,

      annual_holidays: annualHolidays,
      annual_leave_days: annualLeaveDays,
      overtime_rate: overtimeRate,
      holiday_rate: holidayRate,

      include_food_clause: includeFoodClause,
      food_details: foodDetails || undefined,
      food_price: foodPrice || undefined,
      food_price_unit: foodPriceUnit || undefined,

      include_accommodation_clause: includeAccommodationClause,

      employer_notice_months: employerNoticeMonths,
      employer_notice_pay: employerNoticePay,
      employee_notice_months: employeeNoticeMonths,

      include_rules_clause: includeRulesClause,
      include_others_clause: includeOthersClause,
      include_stamp: includeStamp,
    };

    // Example: call your API (or log)
    console.log("Submitted Contract Data:", payload);
    alert("Contract data submitted! (Check console)");
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="py-8 px-4 max-w-5xl mx-auto"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        สร้างสัญญาจ้างแรงงาน
      </h1>

      {/* SECTION 1: Basic Contract Info */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          1. Basic Contract Info
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          ข้อมูลพื้นฐานเกี่ยวกับสัญญา (เช่น สถานที่ทำสัญญา, วัน/เดือน/ปี).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              สถานที่ทำสัญญา (contract_location)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={contractLocation}
              onChange={(e) => setContractLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              วัน (day)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              เดือน (month)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ปี (year)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Employer Info */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          2. Employer Info
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          ข้อมูลนายจ้าง (คำนำหน้า, ชื่อ, ที่อยู่, ฯลฯ).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              คำนำหน้า
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employerPrefix}
              onChange={(e) => setEmployerPrefix(e.target.value)}
            >
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              ชื่อ - สกุลนายจ้าง
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              checked={useOfficeAddress}
              onChange={(e) => setUseOfficeAddress(e.target.checked)}
            />
            <label className="block text-sm font-medium text-gray-700">
              สำนักงานตั้งอยู่ที่?
            </label>
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              ที่อยู่
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employerAddress}
              onChange={(e) => setEmployerAddress(e.target.value)}
              placeholder="กรอกที่อยู่สำนักงานหรือตามทะเบียน"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Employee Info */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          3. Employee Info
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          ข้อมูลลูกจ้าง (คำนำหน้า, ชื่อ, ที่อยู่).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              คำนำหน้า
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employeePrefix}
              onChange={(e) => setEmployeePrefix(e.target.value)}
            >
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              ชื่อ - สกุลลูกจ้าง
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              ที่อยู่ปัจจุบัน
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employeeAddress}
              onChange={(e) => setEmployeeAddress(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Position & Work Details */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          4. Position & Work Details
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          ตำแหน่งงาน, แผนก, หน้าที่รับผิดชอบ, และรายละเอียดเพิ่มเติม
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ตำแหน่ง
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={positionTitle}
              onChange={(e) => setPositionTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              แผนก
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              หน้าที่รับผิดชอบ
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              รายละเอียดงาน (work_details)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={workDetails}
              onChange={(e) => setWorkDetails(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SECTION 5: Wage Info */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          5. อัตราค่าจ้าง (Wage Info)
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          อัตราค่าจ้าง, การจ่ายเงิน, และวิธีการจ่าย
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wage Amount
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={wageAmount}
              onChange={(e) => setWageAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wage Unit
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={wageUnit}
              onChange={(e) => setWageUnit(e.target.value)}
            >
              <option value="วัน">วัน</option>
              <option value="เดือน">เดือน</option>
              <option value="ชั่วโมง">ชั่วโมง</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Wage Payment Day
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={wagePaymentDay}
              onChange={(e) => setWagePaymentDay(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={wagePaymentMethod}
              onChange={(e) => setWagePaymentMethod(e.target.value)}
            >
              <option value="เงินสด">เงินสด</option>
              <option value="โอนผ่านบัญชีธนาคาร">โอนผ่านบัญชีธนาคาร</option>
            </select>
          </div>
          {wagePaymentMethod === "โอนผ่านบัญชีธนาคาร" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* SECTION 6: Contract Duration & Work Location */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          6. ระยะเวลาการจ้าง & สถานที่ทำงาน
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          กำหนดสัญญา (fixed term หรือไม่) วันเริ่ม-วันสิ้นสุด และสถานที่ทำงาน
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasFixedTerm}
              onChange={(e) => setHasFixedTerm(e.target.checked)}
            />
            <label className="block text-sm font-medium text-gray-700">
              มีกำหนดระยะเวลาหรือไม่?
            </label>
          </div>
          {hasFixedTerm && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ระยะเวลา (contract_duration)
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={contractDuration}
                  onChange={(e) => setContractDuration(e.target.value)}
                  placeholder="เช่น 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  หน่วย (contract_duration_unit)
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={contractDurationUnit}
                  onChange={(e) => setContractDurationUnit(e.target.value)}
                >
                  <option value="">-- หน่วย --</option>
                  <option value="ปี">ปี</option>
                  <option value="เดือน">เดือน</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contract Start
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={contractStart}
              onChange={(e) => setContractStart(e.target.value)}
              placeholder="01/10/2566"
            />
          </div>
          {hasFixedTerm && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contract End
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={contractEnd}
                onChange={(e) => setContractEnd(e.target.value)}
                placeholder="30/09/2567"
              />
            </div>
          )}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Work Location
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={workLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SECTION 7: Probation Clause */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          7. ระยะเวลาการทดลองงาน
        </h2>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={includeProbation}
            onChange={(e) => setIncludeProbation(e.target.checked)}
          />
          <span className="text-sm font-medium text-gray-700">
            รวมระยะเวลาทดลองงานหรือไม่?
          </span>
        </div>
        {includeProbation && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              ทดลองงานกี่วัน?
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 max-w-xs"
              value={probationPeriodDays}
              onChange={(e) => setProbationPeriodDays(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* SECTION 8: Working Hours */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          8. ชั่วโมงการทำงาน
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          กำหนดชั่วโมงการทำงาน, วันทำงานต่อสัปดาห์, และช่วงเวลาทำงาน/พัก
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Daily Hours Limit
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={dailyHoursLimit}
              onChange={(e) => setDailyHoursLimit(e.target.value)}
              placeholder="เช่น 8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weekly Days
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={weeklyDays}
              onChange={(e) => setWeeklyDays(e.target.value)}
              placeholder="เช่น 6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start-End Time
            </label>
            <div className="flex gap-2">
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={workStartTime}
                onChange={(e) => setWorkStartTime(e.target.value)}
                placeholder="09:00"
              />
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={workEndTime}
                onChange={(e) => setWorkEndTime(e.target.value)}
                placeholder="18:00"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Day Range
            </label>
            <div className="flex gap-2">
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={workDayStart}
                onChange={(e) => setWorkDayStart(e.target.value)}
                placeholder="จันทร์"
              />
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={workDayEnd}
                onChange={(e) => setWorkDayEnd(e.target.value)}
                placeholder="เสาร์"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Break Start
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={breakStartTime}
              onChange={(e) => setBreakStartTime(e.target.value)}
              placeholder="12:00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Break End
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={breakEndTime}
              onChange={(e) => setBreakEndTime(e.target.value)}
              placeholder="13:00"
            />
          </div>
        </div>
      </div>

      {/* SECTION 9: Holidays / Overtime */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          9. วันหยุด / ล่วงเวลา
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Annual Holidays (วันหยุดประเพณี)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={annualHolidays}
              onChange={(e) => setAnnualHolidays(e.target.value)}
              placeholder="เช่น 13"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Annual Leave Days (วันหยุดพักประจำปี)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={annualLeaveDays}
              onChange={(e) => setAnnualLeaveDays(e.target.value)}
              placeholder="เช่น 6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Overtime Rate
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={overtimeRate}
              onChange={(e) => setOvertimeRate(e.target.value)}
              placeholder="1.5 เท่า"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Holiday Rate
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={holidayRate}
              onChange={(e) => setHolidayRate(e.target.value)}
              placeholder="2 เท่า"
            />
          </div>
        </div>
      </div>

      {/* SECTION 10: Food & Accommodation */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          10. อาหาร & ที่พัก
        </h2>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={includeFoodClause}
            onChange={(e) => setIncludeFoodClause(e.target.checked)}
          />
          <label className="text-sm font-medium text-gray-700">
            เพิ่ม Clause อาหาร?
          </label>
        </div>
        {includeFoodClause && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Food Details
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={foodDetails}
                onChange={(e) => setFoodDetails(e.target.value)}
                placeholder="เช่น 2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Food Price
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
                placeholder="เช่น 80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Food Price Unit
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={foodPriceUnit}
                onChange={(e) => setFoodPriceUnit(e.target.value)}
              >
                <option value="">-- เลือกหน่วย --</option>
                <option value="วัน">วัน</option>
                <option value="เดือน">เดือน</option>
              </select>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeAccommodationClause}
            onChange={(e) => setIncludeAccommodationClause(e.target.checked)}
          />
          <label className="text-sm font-medium text-gray-700">
            เพิ่ม Clause ที่พัก?
          </label>
        </div>
      </div>

      {/* SECTION 11: Notice Periods */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          11. Notice Period
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          ระยะเวลาในการบอกเลิกสัญญาสำหรับนายจ้าง/ลูกจ้าง
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employer Notice Months
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employerNoticeMonths}
              onChange={(e) => setEmployerNoticeMonths(e.target.value)}
              placeholder="เช่น 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employer Notice Pay
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employerNoticePay}
              onChange={(e) => setEmployerNoticePay(e.target.value)}
              placeholder="เช่น 1 (เดือน)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Notice Months
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={employeeNoticeMonths}
              onChange={(e) => setEmployeeNoticeMonths(e.target.value)}
              placeholder="เช่น 1"
            />
          </div>
        </div>
      </div>

      {/* SECTION 12: Optional Clauses */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          12. Optional Clauses
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeRulesClause}
              onChange={(e) => setIncludeRulesClause(e.target.checked)}
            />
            <label className="text-sm font-medium text-gray-700">
              Include Rules Clause?
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeOthersClause}
              onChange={(e) => setIncludeOthersClause(e.target.checked)}
            />
            <label className="text-sm font-medium text-gray-700">
              Include Others Clause?
            </label>
          </div>
        </div>
      </div>

      {/* SECTION 13: Ending */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">13. Ending</h2>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeStamp}
            onChange={(e) => setIncludeStamp(e.target.checked)}
          />
          <label className="text-sm font-medium text-gray-700">
            Include Stamp?
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end gap-x-6">
        <Link
          href="/generate-contracts"
          className="inline-block text-sm font-semibold text-gray-700 hover:underline"
        >
          ยกเลิก
        </Link>
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/80 transition"
        >
          บันทึก / สร้างงาน
        </button>
      </div>
    </form>
  );
}
