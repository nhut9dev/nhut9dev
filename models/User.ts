import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		avatar: { type: String, default: '' },
		role: { type: String, enum: ['admin', 'author', 'user'], default: 'user' },
	},
	{ timestamps: true },
);

// Hash password trước khi lưu
UserSchema.pre('save', async function (next) {
	console.log('pre save');
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
