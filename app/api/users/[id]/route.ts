import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import User from '@models/User';

export async function GET(req: any, { params }: any) {
	await connectDB();

	try {
		console.log(req);
		const user = await User.findById(params.id).select('-password');
		if (!user)
			return NextResponse.json({ message: 'User not found' }, { status: 404 });

		return NextResponse.json(user, { status: 200 });
	} catch {
		return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
	}
}

// Cập nhật user theo ID
export async function PUT(req: any, { params }: any) {
	await connectDB();
	const { name, email, password, avatar, role } = await req.json();

	try {
		const updatedData = { name, email, avatar, role, password: '' };

		// Hash password nếu có cập nhật
		if (password) {
			const salt = await bcrypt.genSalt(10);
			updatedData.password = await bcrypt.hash(password, salt);
		}

		const user = await User.findByIdAndUpdate(params.id, updatedData, {
			new: true,
		}).select('-password');
		if (!user)
			return NextResponse.json({ message: 'User not found' }, { status: 404 });

		return NextResponse.json(user, { status: 200 });
	} catch {
		return NextResponse.json({ message: 'Update failed' }, { status: 400 });
	}
}

export async function DELETE(req: any, { params }: any) {
	await connectDB();
	try {
		const user = await User.findByIdAndDelete(params.id);
		if (!user)
			return NextResponse.json({ message: 'User not found' }, { status: 404 });

		return NextResponse.json(
			{ message: 'User deleted successfully' },
			{ status: 200 },
		);
	} catch {
		return NextResponse.json({ message: 'Delete failed' }, { status: 400 });
	}
}
