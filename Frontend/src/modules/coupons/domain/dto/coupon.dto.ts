import { CouponStatus } from "@/shared/constants/coupon.status";

export class FilterCouponDto {
  companyId?: string;
  labelId?: string;
  status?: CouponStatus;
  title?: string;
  useCode?: string;
}
