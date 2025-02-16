# contract_model.py

from pydantic import BaseModel
from typing import Optional

class LaborContractData(BaseModel):
    # 1. Basic Contract Info
    contract_location: str
    day: str
    month: str
    year: str

    # 2. Employer Info
    employer_prefix: str   # user picks: "นาย", "นาง", "นางสาว"
    employer_name: str
    use_office_address: bool
    employer_address: str  # For "ที่อยู่"

    # 3. Employee Info
    employee_prefix: str   # user picks: "นาย", "นาง", "นางสาว"
    employee_name: str
    employee_address: str

    # 4. Position & Work Details
    position_title: str
    department: str
    responsibilities: str
    work_details: str

    # 5. Wage Information
    wage_amount: str
    wage_unit: str   # e.g. "เดือน", "วัน", "ชั่วโมง"
    wage_payment_day: str
    wage_payment_method: str  # e.g. "เงินสด" or "โอนผ่านบัญชีธนาคาร"
    bank_name: Optional[str] = None

    # 6. Contract Duration & Work Location
    has_fixed_term: bool
    contract_duration: Optional[str] = None       # e.g. "1"
    contract_duration_unit: Optional[str] = None  # e.g. "ปี", "เดือน" 
    contract_start: str
    contract_end: Optional[str] = None
    work_location: str

    # 7. Probation Clause (optional)
    include_probation: bool
    probation_period_days: Optional[str] = None

    # 8. Working Hours
    daily_hours_limit: str
    weekly_days: str
    work_start_time: str
    work_end_time: str
    work_day_start: str
    work_day_end: str
    break_start_time: str
    break_end_time: str

    # 9. Holidays / Overtime
    annual_holidays: str
    annual_leave_days: str
    overtime_rate: str
    holiday_rate: str

    # 10. Food & accommodation (optional)
    include_food_clause: bool
    food_details: Optional[str] = None
    food_price: Optional[str] = None     # e.g. "100"
    food_price_unit: Optional[str] = None  # e.g. "วัน", "เดือน"

    include_accommodation_clause: bool

    # 11. Notice Periods
    employer_notice_months: str
    employer_notice_pay: str
    employee_notice_months: str

    # 12. Optional Clauses
    include_rules_clause: bool     # For ข้อบังคับ (clause 10 in the doc)
    include_others_clause: bool    # For อื่นๆ (clause 12 in the doc)
    
    # 13. Ending
    include_stamp: bool
