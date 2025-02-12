import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import { Tag } from '@models/Tag';

// 🟢 Lấy danh sách tag (GET)
export async function GET() {
	try {
		await connectDB();
		const tags = await Tag.find();
		return NextResponse.json({ tags }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🟡 Thêm tag mới (POST)
export async function POST(req: Request) {
	try {
		await connectDB();
		const { name, slug } = await req.json();

		if (!name || !slug) {
			return NextResponse.json(
				{ error: 'Missing name or slug' },
				{ status: 400 },
			);
		}

		const newTag = new Tag({ name, slug });
		await newTag.save();

		return NextResponse.json(
			{ message: 'Tag added', tag: newTag },
			{ status: 201 },
		);
	} catch {
		return NextResponse.json({ error: 'Error adding tag' }, { status: 500 });
	}
}
