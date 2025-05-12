import axios from "axios";
import { getSession } from "next-auth/react";
import { FavouriteCouponDto } from "../domain/dto/favourite.coupon.dto";

export class FavouriteCouponService {
  async addFavouriteCoupons(data: FavouriteCouponDto) {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/favourite`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  async getFavouriteCoupons() {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    return await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/favourite`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
