/* AuthOption -
a) Adapter
b) Secret
c) Providers
d) Session
e) Callbacks - signIn, signOut, session, jwt, redirect...
NOTE: Don't forget to export the authOption object
*/

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { DefaultSession, NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './db';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    credits: number;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    /* JWT
a) Token generate email
b) Use the generated email to find the user in the database.
c) Set the user id and credits in the token.
 */

    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
        token.credits = db_user.credits;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.credits = token.credits;
      }
      return session;
    },
  },
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
