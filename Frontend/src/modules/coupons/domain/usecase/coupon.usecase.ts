import { CouponService } from "../../services/coupon.service";
// import { FilterCouponDto } from "../dto/coupon.dto";

export class CouponUseCase {
  private couponService: CouponService;

  constructor() {
    this.couponService = new CouponService();
  }

  async getAllCoupons() {
    try {
      const response = await this.couponService.getAllCoupons();
      return response;
    } catch (error) {
      console.error("Error fetching coupons on use case side:", error);
      throw error;
    }
  }

  async getLabel(id: string, name: string) {
    try {
      const response = await this.couponService.getLabel(id, name);
      return response.data;
    } catch (error) {
      console.error("Error fetching label on use case side:", error);
      throw error;
    }
  }

  // async getCouponByFiller(filter?: FilterCouponDto) {
  //   try {
  //     const response = await this.couponService.getAllCoupons(filter);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching coupons on use case side:", error);
  //     throw error;
  //   }
  // }
}
