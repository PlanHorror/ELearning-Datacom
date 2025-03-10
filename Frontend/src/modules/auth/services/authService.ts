import {
  CompanySignUpPayLoad,
  UserSignUpPayLoad,
} from "./../domain/register.dto";
import axios from "axios";
import { LoginPayLoad } from "../domain/login.dto";

export const signin = async (data: LoginPayLoad) => {
  console.log("Check data: ", data);
  return axios.post(`/api/auth/customer/signin`, data);
};

export const userSignUp = async (data: UserSignUpPayLoad) => {
  console.log("Check data: ", data);
  return axios.post(`/api/auth/customer/signup`, data);
};

export const companySignUp = async (data: CompanySignUpPayLoad) => {
  console.log("Check data: ", data);
  return axios.post(`/api/auth/company/signup`, data);
};
