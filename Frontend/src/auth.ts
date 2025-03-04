import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("Test authjs", credentials);
        let user = null;
        user = {
          id: "70",
          email: "hieu@gmail.com",
          token: "123",
          refresh_token: "123",
        };

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
  },
});
