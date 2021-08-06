import NextAuth from "next-auth";

import Providers from "next-auth/providers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      
      id: "google",
    }),

    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
