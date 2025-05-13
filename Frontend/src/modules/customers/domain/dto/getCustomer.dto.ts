export interface GetCustomerByIdResponse {
  _id: string;
  email: string;
  username: string;
  postal_code: string;
  prefecture: string;
  gender: string;
  dob: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  available_coupons: number;
  coupon_usage_history: {
    coupon_code: string;
    used_at: string;
    discount_amount: number;
    status: "used" | "expired";
  }[];
}
