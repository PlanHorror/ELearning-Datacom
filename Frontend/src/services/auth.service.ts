import {
  CompanySignUpPayLoad,
} from "../domain/dto/register.dto";
import axios from "axios";

export class AuthService {
  async companySignUp(data: CompanySignUpPayLoad) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/company/signup`,
      data
    );
  }
}
