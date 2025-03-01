import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    role: 'user' | 'admin';
  }

  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'user' | 'admin';
    };
  }

  interface JWT extends JWT {
    accessToken: string;
    refreshToken: string;
    role: 'user' | 'admin';
  }
}
