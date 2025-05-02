export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired";
  description: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponPayload {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  startDate: string;
  endDate: string;
  description: string;
}

export interface CouponResponse {
  data: Coupon;
  message: string;
}
