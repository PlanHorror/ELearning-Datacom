import { PointsHistoryType } from "@/shared/constants/points-history-type";
import { SingleCustomerResponse } from "./customer.dto";

export interface PointsHistoryInput {
  type: PointsHistoryType;
  points: number;
  description: string;
  customerId: string;
  execute: boolean;
}

export interface PointsHistoryResponse {
  _id: string;
  customer: Omit<
    SingleCustomerResponse,
    "pointsHistories" | "favourites" | "couponUsages" | "learningStatus"
  >;
  type: PointsHistoryType;
  points: number;
  description: string;
  created_at: string;
  updated_at: string;
}
