import { LoginPayLoad } from "../dto/login.dto";
import { AuthService } from "../../services/authService";
import { CompanySignUpPayLoad, UserSignUpPayLoad } from "../dto/register.dto";

export class AuthUseCase {
  // constructor(private readonly authService: AuthService) {}
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signin(values: LoginPayLoad) {
    try {
      const res = await this.authService.signin(values);
      return res;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response.data || { message: "Something went wrong!" };
    }
  }

  async userSignUp(values: UserSignUpPayLoad) {
    try {
      const res = await this.authService.userSignUp(values);
      return res;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response.data || { message: "Something went wrong!" };
    }
  }

  async companySignUp(values: CompanySignUpPayLoad) {
    try {
      const res = await this.authService.companySignUp(values);
      return res;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response.data || { message: "Something went wrong!" };
    }
  }
}
