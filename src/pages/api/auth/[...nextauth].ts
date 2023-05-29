import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import prisma from "lib/prisma";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Youremail@pdex.org",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials: any, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error(
            JSON.stringify({
              message: "Please enter your email and password",
              code: "NO_CREDENTIALS",
            })
          );
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          // throw new Error("No account associated with that email was found");
          throw new Error(
            JSON.stringify({
              message: "No account associated with that email was found",
              code: "NO_USER",
            })
          );
          return null;
        }

        if (!user.password) {
          throw new Error(
            JSON.stringify({
              message:
                "No password set for this account, please sign in with Google or Github.",
              code: "NO_PASSWORD",
            })
          );
          return null;
        }

        const passwordValid = await compare(
          credentials.password,
          user.password || ""
        );

        if (!passwordValid) {
          throw new Error(
            JSON.stringify({
              message: "The password doesn't match the account",
              code: "WRONG_PASSWORD",
            })
          );
          return null;
        }
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          nickname: user.nickname,
          randomKey: "Tashi is actually great",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // session.accessToken = token.accessToken; //error here
      // console.log("Session callback", { session, token, user });
      // The return type will match the one returned in `useSession()`
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          nickname: token.nickname,
          randomKey: token.randomKey,
        },
      };
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        let u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          nickname: u.nickname,
          randomKey: u.randomKey,
        };
      }
      // console.log("JWT callback", { token, user });
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    // secret: process.env.SECRET || "",
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/newuser", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.JWT_SECRET || "",
});
