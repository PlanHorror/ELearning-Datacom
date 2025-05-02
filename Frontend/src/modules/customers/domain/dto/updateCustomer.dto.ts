export interface UpdateCustomerProfilePayload {
  username?: string;
  postal_code?: string;
  prefecture?: string;
  gender?: string;
  dob?: string;
}

export interface UpdateCustomerProfileResponse {
  message: string;
  data: {
    _id: string;
    username: string;
    email: string;
    postal_code: string;
    gender: string;
    dob: string;
    points: number;
  };
}
