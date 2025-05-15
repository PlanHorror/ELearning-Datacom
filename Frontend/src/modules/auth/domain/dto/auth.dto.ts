import { Gender } from "@/shared/constants/gender";

// login
export interface LoginPayLoad {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}


// signup
export interface UserSignUpPayLoad {
  email: string;
  password: string;
  username: string;
  postal_code: string;
  prefecture: string;
  gender: Gender;
  dob: Date;
}

export interface CompanySignUpPayLoad {
  email: string;
  password: string;
  companyName: string;
  prefecture: string;
}
