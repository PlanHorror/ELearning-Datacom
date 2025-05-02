import {
  CompanySignUpPayLoad,
  UserSignUpPayLoad,
} from "../domain/dto/register.dto";
import axios from "axios";
import { LoginPayLoad } from "../domain/dto/login.dto";

export class AuthService {
  async signin(data: LoginPayLoad) {
    return await axios.post(`/api/auth/customer/signin`, data);
  }

  async userSignUp(data: UserSignUpPayLoad) {
    return await axios.post(`/api/auth/customer/signup`, data);
  }

  async companySignUp(data: CompanySignUpPayLoad) {
    return await axios.post(`/api/auth/company/signup`, data);
  }
}
