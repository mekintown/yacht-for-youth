from marshmallow import Schema, fields

class LaborContractSchema(Schema):
    # 1. Basic Contract Info
    contract_location = fields.String(required=True)
    day = fields.String(required=True)
    month = fields.String(required=True)
    year = fields.String(required=True)

    # 2. Employer Info
    employer_prefix = fields.String(required=True)  # "นาย", "นาง", "นางสาว"
    employer_name = fields.String(required=True)
    use_office_address = fields.Boolean(required=True)
    employer_address = fields.String(required=True)

    # 3. Employee Info
    employee_prefix = fields.String(required=True)  # "นาย", "นาง", "นางสาว"
    employee_name = fields.String(required=True)
    employee_address = fields.String(required=True)

    # 4. Position & Work Details
    position_title = fields.String(required=True)
    department = fields.String(required=True)
    responsibilities = fields.String(required=True)
    work_details = fields.String(required=True)

    # 5. Wage Information
    wage_amount = fields.String(required=True)
    wage_unit = fields.String(required=True)  # e.g. "เดือน", "วัน", "ชั่วโมง"
    wage_payment_day = fields.String(required=True)
    wage_payment_method = fields.String(required=True)  # e.g. "เงินสด" or "โอนผ่านบัญชีธนาคาร"
    bank_name = fields.String(required=False, allow_none=True)

    # 6. Contract Duration & Work Location
    has_fixed_term = fields.Boolean(required=True)
    contract_duration = fields.String(required=False, allow_none=True)  # e.g. "1"
    contract_duration_unit = fields.String(required=False, allow_none=True)  # e.g. "ปี", "เดือน"
    contract_start = fields.String(required=True)
    contract_end = fields.String(required=False, allow_none=True)
    work_location = fields.String(required=True)

    # 7. Probation Clause (optional)
    include_probation = fields.Boolean(required=True)
    probation_period_days = fields.String(required=False, allow_none=True)

    # 8. Working Hours
    daily_hours_limit = fields.String(required=True)
    weekly_days = fields.String(required=True)
    work_start_time = fields.String(required=True)
    work_end_time = fields.String(required=True)
    work_day_start = fields.String(required=True)
    work_day_end = fields.String(required=True)
    break_start_time = fields.String(required=True)
    break_end_time = fields.String(required=True)

    # 9. Holidays / Overtime
    annual_holidays = fields.String(required=True)
    annual_leave_days = fields.String(required=True)
    overtime_rate = fields.String(required=True)
    holiday_rate = fields.String(required=True)

    # 10. Food & Accommodation (optional)
    include_food_clause = fields.Boolean(required=True)
    food_details = fields.String(required=False, allow_none=True)
    food_price = fields.String(required=False, allow_none=True)  # e.g. "100"
    food_price_unit = fields.String(required=False, allow_none=True)  # e.g. "วัน", "เดือน"

    include_accommodation_clause = fields.Boolean(required=True)

    # 11. Notice Periods
    employer_notice_months = fields.String(required=True)
    employer_notice_pay = fields.String(required=True)
    employee_notice_months = fields.String(required=True)

    # 12. Optional Clauses
    include_rules_clause = fields.Boolean(required=True)  # For ข้อบังคับ (clause 10 in the doc)
    include_others_clause = fields.Boolean(required=True)  # For อื่นๆ (clause 12 in the doc)

    # 13. Ending
    include_stamp = fields.Boolean(required=True)
