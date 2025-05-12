import { Coupon } from "@/modules/companies/domain/dto/coupon.dto";
import { CouponUsageStatus } from "@/shared/constants/coupon-usage-status";

export interface CouponUsageInput {
  customerId: string;
  couponId: string;
  status: CouponUsageStatus;
  subtract_points: boolean;
}
export interface CouponUsageResponse {
  _id: string;
  coupon: Coupon;
  status: CouponUsageStatus;
  created_at: string;
  updated_at: string;
}
