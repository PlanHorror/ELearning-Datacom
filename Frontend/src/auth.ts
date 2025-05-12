import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InactiveAccountError,
  InvalidEmailPasswordError,
} from "./utils/errors";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { routing } from "@/i18n/routing";
import { User } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        if (res.status === 201) {
          const accessToken = res.data.accessToken;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const decoded = jwtDecode(accessToken) as any;

          const user: User = {
            _id: decoded._id,
            email: decoded.email,
            username: decoded.username,
            company_name: decoded.company_name,
            role: decoded.role,
            accessToken,
            refreshToken: decoded.refreshToken,
          };
          return user;
        } else if (+res.status === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.status === 400) {
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  pages: {
    signIn: `${routing.defaultLocale}/auth/access-account`,
    signOut: `${routing.defaultLocale}/auth/access-account`,
    error: `${routing.defaultLocale}/error`,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.username = user.username;
        token.company_name = user.company_name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id as string,
          email: token.email as string,
          username: token.username as string,
          company_name: token.company_name as string,
          role: token.role as string,
        };

        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        return session;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 day
  },
});
