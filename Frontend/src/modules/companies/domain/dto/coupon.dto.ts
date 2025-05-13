//auth
export interface CompanyLoginPayload {
  email: string;
  password: string;
}

export interface CompanyLoginResponse {
  accessToken: string;
  refreshToken: string;
  payload: {
    _id: string;
    email: string;
    username: string;
    role: string;
  };
}

// get profile by id
export interface CompanyProfileResponse {
  email: string;
  address: string;
  company_name: string;
  created_at: string;
  last_updated: string;
  last_login: string;
  status: string;
  coupons: [];
}

export interface UpdateCompanyProfilePayload {
  company_name: string;
  address: string;
}

// coupon
export interface CreateCouponPayload {
  title: string;
  period_start: string;
  period_end: string;
  classification: string;
  use_point: number;
  use_code: string;
  comment: string;
  detail: string;
  label: string;
  image: File;
}

export interface UpdateCouponPayload {
  title: string;
  period_start: string;
  period_end: string;
  classification: string;
  use_point: number;
  use_code: string;
  comment: string;
  detail: string;
  label: string;
  image: File;
}
