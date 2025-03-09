import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from '~types/user';

type IUserModel = IUser & Document;

const UserSchema = new Schema<IUserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  refreshTokens: { type: [String], default: [] },
});

const User = mongoose.models.User || mongoose.model<IUserModel>('User', UserSchema);
export default User;
