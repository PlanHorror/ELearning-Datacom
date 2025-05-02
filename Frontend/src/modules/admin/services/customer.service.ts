import { getSession } from "next-auth/react";
import { MultiCustomerResponse } from "../domain/dto/customer.dto";
import axios from "axios";

export class CustomerService {
  private static instance: CustomerService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  }

  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  public async getCustomers(): Promise<MultiCustomerResponse[]> {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error("No access token found");
      }
      const response = await axios.get(`${this.baseUrl}/admin/customers`, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  }
}
