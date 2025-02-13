import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import User from '@models/User';

export async function POST(req: any) {
	await connectDB();
	const { name, email, password, avatar, role } = await req.json();

	if (!name || !email || !password) {
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 },
		);
	}

	try {
		const newUser = new User({ name, email, password, avatar, role });
		await newUser.save();

		const userResponse = newUser.toObject();
		delete userResponse.password;

		return NextResponse.json(
			{ message: 'User created successfully!' },
			{ status: 201 },
		);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

export async function GET() {
	await connectDB();
	try {
		const users = await User.find().select('-password');
		return NextResponse.json(users, { status: 200 });
	} catch {
		return NextResponse.json(
			{ message: 'Error fetching users' },
			{ status: 500 },
		);
	}
}
