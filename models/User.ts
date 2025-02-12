import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		avatar: { type: String, default: '' },
		role: { type: String, enum: ['admin', 'author', 'user'], default: 'user' },
	},
	{ timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
