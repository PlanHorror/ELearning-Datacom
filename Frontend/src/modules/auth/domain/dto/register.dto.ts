import { Gender } from "@/shared/constants/gender";

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
