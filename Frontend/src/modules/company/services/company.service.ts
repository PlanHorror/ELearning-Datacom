import axios from "axios";

export class CompanyService {
    async getCompanyById() {
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
  
    async updateCompanyProfile(data: any) {
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
