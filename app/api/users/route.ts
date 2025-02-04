import { User } from '@/models/User';
import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoose';

// Lấy danh sách user (GET)
export async function GET() {
	try {
		await connectDB();
		const users = await User.find();
		return NextResponse.json({ users }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// Thêm user mới (POST)
export async function POST(req: Request) {
	try {
		await connectDB();
		const { name, email } = await req.json();

		if (!name || !email) {
			return NextResponse.json(
				{ error: 'Missing name or email' },
				{ status: 400 },
			);
		}

		const newUser = new User({ name, email });
		await newUser.save();

		return NextResponse.json(
			{ message: 'User added', user: newUser },
			{ status: 201 },
		);
	} catch {
		return NextResponse.json({ error: 'Error adding user' }, { status: 500 });
	}
}
