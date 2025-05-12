import { Gender } from "@/shared/constants/gender";
import { CouponUsageResponse } from "./coupon-usage.dto";
import { CouponFavouriteResponse } from "./favourites.dto";
import { PointsHistoryResponse } from "./points-history.dto";
import { ScoreResponse } from "./score.dto";

export interface CustomerInput {
  email: string;
  password?: string;
  username: string;
  postal_code: string;
  prefecture: string;
  gender: Gender;
  dob: string;
  points: string;
  status: string;
}

export interface MultiCustomerResponse {
  _id: string;
  email: string;
  password: string;
  username: string;
  postal_code: string;
  prefecture: string;
  gender: string;
  dob: string;
  points: string;
  status: string;
  created_at: string;
  last_updated: string;
  last_login: string;
}

export interface SingleCustomerResponse {
  _id: string;
  email: string;
  password: string;
  username: string;
  postal_code: string;
  prefecture: string;
  gender: string;
  dob: string;
  points: string;
  status: string;
  created_at: string;
  last_updated: string;
  last_login: string;
  favourites: CouponFavouriteResponse[];
  pointsHistories: PointsHistoryResponse[];
  couponUsages: CouponUsageResponse[];
  learningStatus: ScoreResponse[];
}
