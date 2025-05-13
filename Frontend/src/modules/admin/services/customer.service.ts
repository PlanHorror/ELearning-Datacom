import { getSession } from "next-auth/react";
import {
  CustomerInput,
  MultiCustomerResponse,
  SingleCustomerResponse,
} from "../domain/dto/customer.dto";
import axios from "axios";

export class CustomerService {
  private static instance: CustomerService;
  private baseUrl: string;
  private readonly token: string;
  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL!;
    this.token = process.env.NEXT_PUBLIC_API_TOKEN!;
  }

  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  public async getCustomers(): Promise<MultiCustomerResponse[]> {
    try {
      // const session = await getSession();
      // if (!session?.user?.accessToken) {
      //   throw new Error("No access token found");
      // }
      const response = await axios.get(`${this.baseUrl}/admin/customer`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  }

  public async getCustomerById(id: string): Promise<SingleCustomerResponse> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/admin/customer?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async createCustomer(
    customer: CustomerInput
  ): Promise<SingleCustomerResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/admin/customer`,
        customer,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  }

  public async updateCustomer(
    id: string,
    customer: CustomerInput
  ): Promise<SingleCustomerResponse> {
    try {
      const response = await axios.patch(
        `${this.baseUrl}/admin/customer/${id}`,
        customer,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  }
  public async deleteCustomer(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/admin/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  }
}
