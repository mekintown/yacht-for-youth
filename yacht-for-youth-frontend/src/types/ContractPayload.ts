export interface ContractPayload {
  contract_location: string;
  day: string;
  month: string;
  year: string;

  employer_prefix: string;
  employer_name: string;
  use_office_address: boolean;
  employer_address: string;

  employee_prefix: string;
  employee_name: string;
  employee_address: string;

  position_title: string;
  department: string;
  responsibilities: string;
  work_details: string;

  wage_amount: string;
  wage_unit: string; // "วัน" | "เดือน" | "ชั่วโมง"
  wage_payment_day: string;
  wage_payment_method: string; // "เงินสด" | "โอนผ่านบัญชีธนาคาร"
  bank_name?: string | null;

  has_fixed_term: boolean;
  contract_duration?: string | null;
  contract_duration_unit?: string | null;
  contract_start: string;
  contract_end?: string | null;
  work_location: string;

  include_probation: boolean;
  probation_period_days?: string | null;

  daily_hours_limit: string;
  weekly_days: string;
  work_start_time: string;
  work_end_time: string;
  work_day_start: string;
  work_day_end: string;
  break_start_time: string;
  break_end_time: string;

  annual_holidays: string;
  annual_leave_days: string;
  overtime_rate: string;
  holiday_rate: string;

  include_food_clause: boolean;
  food_details?: string | null;
  food_price?: string | null;
  food_price_unit?: string | null;

  include_accommodation_clause: boolean;

  employer_notice_months: string;
  employer_notice_pay: string;
  employee_notice_months: string;

  include_rules_clause: boolean;
  include_others_clause: boolean;
  include_stamp: boolean;
}
