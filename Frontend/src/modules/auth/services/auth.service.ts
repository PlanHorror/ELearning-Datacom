import {
  CompanySignUpPayLoad,
  UserSignUpPayLoad,
} from "../domain/dto/register.dto";
import axios from "axios";

export class AuthService {
  async userSignUp(data: UserSignUpPayLoad) {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/customer/signup`, data);
    console.log("Check res:", res);
    return res;
  }

  async companySignUp(data: CompanySignUpPayLoad) {
    return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/company/signup`, data);
  }
}
