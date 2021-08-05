import NextAuth from "next-auth";

import Providers from "next-auth/providers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

require("dotenv").config();

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
      id: "google",
    }),

    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "user:email",
      id: "github",
    }),
  ],
 

  callbacks: {
    async session(session) {
      
      await prisma.user.upsert({
        where: {
          email: session.user.email,
        },
        update: {},
        create: {
          userName: session.user.name,
          email: session.user.email,
        },
      });
      return session;
    },
  },
};
export default (req, res) => NextAuth(req, res, options);
