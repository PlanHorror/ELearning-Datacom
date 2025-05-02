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
