import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InactiveAccountError,
  InvalidEmailPasswordError,
} from "./utils/errors";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { routing } from "@/i18n/routing";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/customer/signin`,
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        if (res.status === 201) {
          const accessToken = res.data.accessToken;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const decoded = jwtDecode(accessToken) as any;
          console.log("Check decoded:", decoded);
          return {
            _id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            username: decoded.username,
            accessToken,
            refreshToken: decoded.refreshToken,
          };
        } else if (+res.status === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.status === 400) {
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
    // Credentials({
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   authorize: async (credentials) => {
    //     const res = await axios.post(
    //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/company/signin`,
    //       {
    //         email: credentials?.email,
    //         password: credentials?.password,
    //       }
    //     );

    //     if (res.status === 201) {
    //       const accessToken = res.data.accessToken;
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       const decoded = jwtDecode(accessToken) as any;
    //       console.log("Check decoded:", decoded);
    //       return {
    //         _id: decoded.id,
    //         email: decoded.email,
    //         role: decoded.role,
    //         username: decoded.username || null,
    //         accessToken,
    //         refreshToken: decoded.refreshToken,
    //       };
    //     } else if (+res.status === 401) {
    //       throw new InvalidEmailPasswordError();
    //     } else if (+res.status === 400) {
    //       throw new InactiveAccountError();
    //     } else {
    //       throw new Error("Internal server error");
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: `${routing.defaultLocale}/auth/access-account`,
    signOut: `${routing.defaultLocale}/auth/access-account`, 
    error: `${routing.defaultLocale}/error`
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT callback: ", {token, user, session});
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id,
          email: token.email,
          username: token.username,
          role: token.role,
        };
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        return session;
      }
      return null;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 day
  },
});
