import axios from "axios";
// import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { UpdateCustomerProfilePayload } from "../domain/dto/updateCustomer.dto";

export class CustomerService {
  async getCustomerById() {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    return await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/customers/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  async updateCustomerProfile(data: UpdateCustomerProfilePayload) {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    return await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/customers/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
