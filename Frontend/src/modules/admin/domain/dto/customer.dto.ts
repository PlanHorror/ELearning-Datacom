export interface CustomerInput {
  email: string;
  password: string;
  username: string;
  postal_code: string;
  prefecture: string;
  gender: string;
  dob: string;
  points: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_login: string;
}

export interface MultiCustomerResponse {
  _id: string;
  email: string;
  password: string;
  username: string;
  postalCode: string;
  prefecture: string;
  gender: string;
  dob: string;
  points: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_login: string;
}

export interface SingleCustomerResponse {
  _id: string;
  email: string;
  password: string;
  username: string;
  postalCode: string;
  prefecture: string;
  gender: string;
  dob: string;
  points: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  favourites: string[];
  pointsHistories: string[];
  couponUsages: string[];
  learningStatus: string[];
}
