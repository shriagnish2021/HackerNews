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
      
      const user = await prisma.user.findFirst({
        where:{
          email:session.user.email
        }
      })

      if(!user){
        await prisma.user.create({
        
          data: {
            userName: session.user.name,
            email: session.user.email,
            image:session.user.image,
          },
        });

        const user = await prisma.user.findFirst({
          where:{
            email:session.user.email
          }
        })
      }

      
      session.user = {...user}
      return session;
    },
  
  },

};
export default (req, res) => NextAuth(req, res, options);
