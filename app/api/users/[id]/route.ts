import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import User from '@models/User';

export async function GET(req: any, { params }: any) {
	await connectDB();
	const user = await User.findById(params.id);
	if (!user)
		return NextResponse.json({ message: 'User not found' }, { status: 404 });
	return NextResponse.json(user, { status: 200 });
}

export async function PUT(req: any, { params }: any) {
	await connectDB();
	const data = await req.json();
	try {
		const user = await User.findByIdAndUpdate(params.id, data, { new: true });
		if (!user)
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		return NextResponse.json(user, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

export async function DELETE(req: any, { params }: any) {
	await connectDB();
	try {
		const user = await User.findByIdAndDelete(params.id);
		if (!user)
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		return NextResponse.json({ message: 'User deleted' }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
