import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import User from '@models/User';

export async function GET() {
	await connectDB();
	const users = await User.find();
	return NextResponse.json(users, { status: 200 });
}

export async function POST(req: any) {
	await connectDB();
	const data = await req.json();
	try {
		const user = await User.create(data);
		return NextResponse.json(user, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
