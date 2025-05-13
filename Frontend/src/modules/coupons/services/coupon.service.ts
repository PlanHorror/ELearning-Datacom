import axios from "axios";
import { FilterCouponDto } from "../domain/dto/coupon.dto";
import { getSession } from "next-auth/react";

export class CouponService {
  async getCouponByFiller(filter?: FilterCouponDto) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/filter`,
        {
          params: filter,
        }
      );
      return res;
    } catch (error) {
      console.error("Error fetching coupons on services side:", error);
      throw error;
    }
  }

  async getAllCoupons() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon`
      );
      return res;
    } catch (error) {
      console.error("Error fetching coupons on services side:", error);
      throw error;
    }
  }

  async getLabel(id: string, name: string) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/label/find`,
        {
          params: {
            id: id || undefined,
            name: name || undefined,
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Error fetching label by id on services side:", error);
      throw error;
    }
  }

  async redeemCoupon(couponId: string) {
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;

      if (!accessToken) {
        throw new Error("No access token found");
      }
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/usage`,
        { id: couponId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error redeeming coupon on service side:", error);
      throw error;
    }
  }

  async getUsedCoupons() {
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;

      if (!accessToken) {
        throw new Error("No access token found");
      }
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/usage`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching used coupons on service side:", error);
      throw error;
    }
  }
}
