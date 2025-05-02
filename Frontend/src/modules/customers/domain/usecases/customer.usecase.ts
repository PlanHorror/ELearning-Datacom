import { CustomerService } from "../../services/customer.service";
import {
  UpdateCustomerProfilePayload,
} from "../dto/updateCustomer.dto";

export class CustomerUseCase {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  async getCustomerById() {
    try {
      const res = await this.customerService.getCustomerById();
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateCustomerProfile(data: UpdateCustomerProfilePayload) {
    try {
      const res = await this.customerService.updateCustomerProfile(data);
      return res;
    } catch (error) {
      throw error;
    }
  }
}
