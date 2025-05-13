import { FavouriteCouponService } from "../../services/favourite.coupon.service";
import { FavouriteCouponDto } from "../dto/favourite.coupon.dto";

export class FavouriteCouponUseCase {
  private readonly favouriteCouponService: FavouriteCouponService;
  constructor() {
    this.favouriteCouponService = new FavouriteCouponService();
  }

  async addFavouriteCoupons(data: FavouriteCouponDto) {
    try {
      const res = await this.favouriteCouponService.addFavouriteCoupons(data);
      return res.data;
    } catch (error) {
      console.error("Error adding favourite coupons:", error);
      throw error;
    }
  }

  async getFavouriteCoupons() {
    try {
      const res = await this.favouriteCouponService.getFavouriteCoupons();
      return res;
    } catch (error) {
      console.error("Error fetching favourite coupons:", error);
      throw error;
    }
  }

  async deleteFavouriteCoupon(data: FavouriteCouponDto) {
    try {
      const res = await this.favouriteCouponService.deleteFavouriteCoupon(data);
      return res.data;
    } catch (error) {
      console.error("Error deleting favourite coupon:", error);
      throw error;
    }
  }
}
