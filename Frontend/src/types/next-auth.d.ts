import NextAuth from "next-auth";

interface User {
  _id: string;
  email: string;
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}
declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    username: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    _id: string;
    email: string;
    role: string;
    username: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}
