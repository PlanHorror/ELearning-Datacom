import { CouponResponse } from "./coupon.dto";

export interface CompanyMutipleResponse {
  _id: string;
  email: string;
  address: string;
  company_name: string;
  created_at: string;
  last_updated: string;
  last_login: string;
  status: string;
}
export interface CompanySingleResponse {
  _id: string;
  email: string;
  address: string;
  company_name: string;
  created_at: string;
  last_updated: string;
  last_login: string;
  status: string;
  coupons: CouponResponse[];
}
