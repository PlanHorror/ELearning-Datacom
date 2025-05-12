import axios from "axios";
import { FilterCouponDto } from "../domain/dto/coupon.dto";

export class CouponService {
  // async getCouponByFiller(filter?: FilterCouponDto) {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/filter`,
  //       {
  //         params: filter,
  //       }
  //     );
  //     return res;
  //   } catch (error) {
  //     console.error("Error fetching coupons on services side:", error);
  //     throw error;
  //   }
  // }
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
}
