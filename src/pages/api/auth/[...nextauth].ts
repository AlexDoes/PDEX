import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.accessToken;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session; // The return type will match the one returned in `useSession()`
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    // secret: process.env.SECRET || "",
  },
});
