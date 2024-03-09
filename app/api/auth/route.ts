
import User from "@/models/user";

import NextAuth,{ AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongoDB";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: Record<string, string> | undefined, req: any): Promise<any> {
        if (!credentials) {
            return null; // Return early if credentials are undefined
          }
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Set the session strategy to JWT
  },
  secret: process.env.NEXTAUTH_SECRET || 'http://localhost:3000/', // Provide a default secret
  pages: {
    signIn: "/", // Define the sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };