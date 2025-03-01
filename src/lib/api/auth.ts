import { connectDB } from '~lib/db';
import User from '~models/User';
import { IUser } from '~types/user';

export async function findUserByEmail(email: string): Promise<IUser | null> {
  await connectDB();
  const user = await User.findOne({ email }).lean<IUser>();

  return user || null;
}

export async function findUserById(userId: string): Promise<IUser | null> {
  await connectDB();
  const user = await User.findOne({ _id: userId }).lean<IUser>();

  return user || null;
}

export async function saveRefreshToken(userId: string, refreshToken: string) {
  await connectDB();

  return User.findByIdAndUpdate(userId, { $push: { refreshTokens: refreshToken } });
}

export async function isValidRefreshToken(userId: string, refreshToken: string) {
  await connectDB();
  const user = await User.findById(userId);

  return user?.refreshTokens.includes(refreshToken) || false;
}

export async function removeRefreshToken(userId: string, refreshToken: string) {
  await connectDB();

  return User.findByIdAndUpdate(userId, { $pull: { refreshTokens: refreshToken } });
}

export async function removeAllRefreshTokens(userId: string) {
  await connectDB();

  return User.findByIdAndUpdate(userId, { refreshTokens: [] });
}
