import { CouponResponse } from "./coupon.dto";
import { SingleCustomerResponse } from "./customer.dto";

export interface CouponFavouriteInput {
  customerId: string;
  couponId: string;
}

export interface CouponFavouriteResponse {
  _id: string;
  customer: Omit<
    SingleCustomerResponse,
    "pointsHistories" | "favourites" | "couponUsages" | "learningStatus"
  >;
  coupon: CouponResponse;
  created_at: string;
  last_updated: string;
}
