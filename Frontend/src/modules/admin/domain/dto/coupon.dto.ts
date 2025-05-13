import { CompanySingleResponse } from "./company.dto";
import { CouponLabelResponse } from "./coupon-label.dto";

export interface CouponResponse {
  _id: string;
  comapany: CompanySingleResponse;
  title: string;
  period_start: string;
  period_end: string;
  classification: string;
  use_points: number;
  use_code: string;
  image: string;
  comment: string;
  detail: string;
  status: string;
  label: CouponLabelResponse;
  created_at: string;
  last_updated: string;
}
