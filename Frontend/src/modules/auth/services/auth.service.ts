import {
  CompanySignUpPayLoad,
  UserSignUpPayLoad,
} from "../domain/dto/register.dto";
import axios from "axios";

export class AuthService {
  async userSignUp(data: UserSignUpPayLoad) {
    return await axios.post(`/auth/customer/signup`, data);
  }

  async companySignUp(data: CompanySignUpPayLoad) {
    return await axios.post(`/auth/company/signup`, data);
  }
}
