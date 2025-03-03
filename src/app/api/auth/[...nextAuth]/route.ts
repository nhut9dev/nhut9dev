import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { findUserByEmail } from '~api/auth';
import { generateAccessToken, generateRefreshToken } from '~utils/auth';

async function authorize(credentials: Record<string, string> | undefined): Promise<User | null> {
  if (!credentials?.email || !credentials?.password) return null;

  const user = await findUserByEmail(credentials.email);
  if (!user) throw new Error('User not found');

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken: generateAccessToken(user.id, user.role),
    refreshToken: generateRefreshToken(user.id),
  };
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      authorize,
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
        };
      }
      return token as JWT;
    },
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        accessToken: token.accessToken as string,
        user: { ...session.user, role: token.role as 'admin' | 'user' },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
