interface User {
  email: string;
  username: string;
  role: string;
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    email: string;
    username: string;
    role: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      username: string;
      role: string;
    } & DefaultSession["user"];
    accessToken: string;
  }
}
