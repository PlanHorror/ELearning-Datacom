import { CompanyService } from "../../services/company.service";
import {
  UpdateCompanyProfilePayload,
  CreateCouponPayload,
  UpdateCouponPayload,
} from "../dto/coupon.dto";

export class CompanyUseCase {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  async getCompanyById() {
    try {
      const res = await this.companyService.getCompanyById();
      if (!res)
        throw new Error("Error getting company profile on use case side!");
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateCompanyProfile(payload: UpdateCompanyProfilePayload) {
    try {
      const res = await this.companyService.updateCompanyProfile(payload);
      if (!res)
        throw new Error("Error updating company profile on use case side!");
      return res;
    } catch (error) {
      throw error;
    }
  }

  // coupon

  async createCoupon(payload: CreateCouponPayload) {
    try {
      const res = await this.companyService.createCoupon(payload);
      if (!res) throw new Error("Error creating coupon on use case side!");
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateCoupon(id: string, payload: UpdateCouponPayload) {
    try {
      const res = await this.companyService.updateCoupon(id, payload);
      if (!res) throw new Error("Error updating coupon on use case side!");
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteCoupon(id: string) {
    try {
      const res = await this.companyService.deleteCoupon(id);
      if (!res) throw new Error("Error deleting coupon on use case side!");
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getInformationCoupon(id: string) {
    try {
      const res = await this.companyService.getInformationCoupon(id);
      if (!res)
        throw new Error("Error getting information coupon on use case side!");
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getListLabel() {
    try {
      const res = await this.companyService.getListLabel();
      if (!res) throw new Error("Error getting list label on use case side!");
      return res;
    } catch (error) {
      throw error;
    }
  }
}
