import { CouponService } from "../../services/coupon.service";
import { FilterCouponDto } from "../dto/coupon.dto";

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

  async getCouponByFiller(filter?: FilterCouponDto) {
    try {
      const response = await this.couponService.getCouponByFiller(filter);
      return response.data;
    } catch (error) {
      console.error("Error fetching coupons on use case side:", error);
      throw error;
    }
  }

  async redeemCoupon(couponId: string) {
    try {
      const response = await this.couponService.redeemCoupon(couponId);
      return response;
    } catch (error) {
      console.error("Error redeeming coupon on use case side:", error);
      throw error;
    }
  }

  async getUsedCoupons() {
    try {
      const response = await this.couponService.getUsedCoupons();
      return response;
    } catch (error) {
      console.error("Error fetching used coupons on use case side:", error);
      throw error;
    }
  }
}
