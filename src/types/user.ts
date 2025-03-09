import { User } from 'next-auth';

export interface IUser extends User {
  _id: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  refreshTokens?: string[];
}
