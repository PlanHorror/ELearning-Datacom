import {
  CreateCouponPayload,
  Coupon,
  CouponResponse,
} from "../domain/dto/coupon.dto";
import axios from "axios";
import { getSession } from "next-auth/react";

export class CouponService {
  private static instance: CouponService;
  private constructor() {}

  public static getInstance(): CouponService {
    if (!CouponService.instance) {
      CouponService.instance = new CouponService();
    }
    return CouponService.instance;
  }

  async createCoupon(data: CreateCouponPayload): Promise<CouponResponse> {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: CouponResponse = {
          data: {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: "active",
            companyId: session?.user?._id || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          message: "Coupon created successfully",
        };
        resolve(mockResponse);
      }, 1000);
    });
  }

  async getCoupons(): Promise<Coupon[]> {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    // Mock API call with 10 diverse coupons
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCoupons: Coupon[] = [
          {
            id: "1",
            code: "WELCOME20",
            discount: 20,
            type: "percentage",
            startDate: "2024-04-01",
            endDate: "2024-04-30",
            status: "active",
            description: "Welcome discount 20% for new students",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-01T00:00:00Z",
            updatedAt: "2024-04-01T00:00:00Z",
          },
          {
            id: "2",
            code: "SUMMER50",
            discount: 50,
            type: "fixed",
            startDate: "2024-05-01",
            endDate: "2024-05-31",
            status: "active",
            description: "Summer special discount $50 off any course",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-15T00:00:00Z",
            updatedAt: "2024-04-15T00:00:00Z",
          },
          {
            id: "3",
            code: "BUNDLE30",
            discount: 30,
            type: "percentage",
            startDate: "2024-04-15",
            endDate: "2024-05-15",
            status: "active",
            description: "30% off when purchasing 3 or more courses",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-10T00:00:00Z",
            updatedAt: "2024-04-10T00:00:00Z",
          },
          {
            id: "4",
            code: "STUDENT25",
            discount: 25,
            type: "percentage",
            startDate: "2024-04-01",
            endDate: "2024-12-31",
            status: "active",
            description: "25% discount for all students with valid ID",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-01T00:00:00Z",
            updatedAt: "2024-04-01T00:00:00Z",
          },
          {
            id: "5",
            code: "FLASH100",
            discount: 100,
            type: "fixed",
            startDate: "2024-04-20",
            endDate: "2024-04-21",
            status: "active",
            description: "Flash sale! $100 off for first 50 enrollments",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-19T00:00:00Z",
            updatedAt: "2024-04-19T00:00:00Z",
          },
          {
            id: "6",
            code: "REFER15",
            discount: 15,
            type: "percentage",
            startDate: "2024-04-01",
            endDate: "2024-06-30",
            status: "active",
            description: "15% off for both referrer and referee",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-01T00:00:00Z",
            updatedAt: "2024-04-01T00:00:00Z",
          },
          {
            id: "7",
            code: "VIP40",
            discount: 40,
            type: "percentage",
            startDate: "2024-04-01",
            endDate: "2024-04-30",
            status: "active",
            description: "40% off for VIP members",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-01T00:00:00Z",
            updatedAt: "2024-04-01T00:00:00Z",
          },
          {
            id: "8",
            code: "EARLY75",
            discount: 75,
            type: "fixed",
            startDate: "2024-04-01",
            endDate: "2024-04-15",
            status: "active",
            description: "Early bird discount $75 off new courses",
            companyId: session?.user?._id || "",
            createdAt: "2024-04-01T00:00:00Z",
            updatedAt: "2024-04-01T00:00:00Z",
          },
        //   {
        //     id: "9",
        //     code: "GROUP35",
        //     discount: 35,
        //     type: "percentage",
        //     startDate: "2024-04-01",
        //     endDate: "2024-05-31",
        //     status: "active",
        //     description: "35% off for group enrollments (5+ students)",
        //     companyId: session?.user?._id || "",
        //     createdAt: "2024-04-01T00:00:00Z",
        //     updatedAt: "2024-04-01T00:00:00Z",
        //   },
        //   {
        //     id: "10",
        //     code: "ANNIVERSARY50",
        //     discount: 50,
        //     type: "percentage",
        //     startDate: "2024-04-25",
        //     endDate: "2024-04-26",
        //     status: "active",
        //     description: "50% off to celebrate our anniversary",
        //     companyId: session?.user?._id || "",
        //     createdAt: "2024-04-24T00:00:00Z",
        //     updatedAt: "2024-04-24T00:00:00Z",
        //   },
        ];
        resolve(mockCoupons);
      }, 1000);
    });
  }
}
