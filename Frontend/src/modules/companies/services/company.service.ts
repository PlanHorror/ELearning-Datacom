import axios from "axios";
import { getSession } from "next-auth/react";
import { CreateCouponPayload, UpdateCompanyProfilePayload, UpdateCouponPayload } from "../domain/dto/coupon.dto";

export class CompanyService {
  async getCompanyById() {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    return await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  async updateCompanyProfile(data: UpdateCompanyProfilePayload) {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    return await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  // create coupon
  async createCoupon(data: CreateCouponPayload) {
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;

      if (!accessToken) throw new Error("No access token found");

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key]) {
          formData.append("image", data[key] as File);
        } else if (data[key as keyof CreateCouponPayload]) {
          formData.append(key, String(data[key as keyof CreateCouponPayload]));
        }
      });

      return await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error creating coupon on service side:", error);
      throw error;
    }
  }

  async updateCoupon(id: string, data: UpdateCouponPayload) {
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;

      if (!accessToken) throw new Error("No access token found");

      return await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error updating coupon on service side:", error);
      throw error;
    }
  }

  async deleteCoupon(id: string) {
    try {
      return await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/${id}`
      );
    } catch (error) {
      console.error("Error deleting coupon on service side:", error);
      throw error;
    }
  }

  async getInformationCoupon(id: string) {
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon/${id}`
      );
    } catch (error) {
      console.error("Error getting information coupon on service side:", error);
      throw error;
    }
  }
  // get all label of coupon
  async getListLabel() {
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon-label/find`
      );
    } catch (error) {
      console.error("Error get list label on service side:", error);
      throw error;
    }
  }
}
