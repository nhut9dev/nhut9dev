import { Tag } from '@/models/Tag';
import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoose';

// 🟢 Lấy một tag theo ID (GET)
export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const tag = await Tag.findById(params.id);
		if (!tag)
			return NextResponse.json({ error: 'Tag not found' }, { status: 404 });

		return NextResponse.json({ tag }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🟡 Cập nhật tag (PUT)
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const { name, slug } = await req.json();

		const updatedTag = await Tag.findByIdAndUpdate(
			params.id,
			{ name, slug },
			{ new: true },
		);
		if (!updatedTag)
			return NextResponse.json({ error: 'Tag not found' }, { status: 404 });

		return NextResponse.json(
			{ message: 'Tag updated', tag: updatedTag },
			{ status: 200 },
		);
	} catch {
		return NextResponse.json({ error: 'Error updating tag' }, { status: 500 });
	}
}

// 🔴 Xóa tag (DELETE)
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const deletedTag = await Tag.findByIdAndDelete(params.id);
		if (!deletedTag)
			return NextResponse.json({ error: 'Tag not found' }, { status: 404 });

		return NextResponse.json({ message: 'Tag deleted' }, { status: 200 });
	} catch {
		return NextResponse.json({ error: 'Error deleting tag' }, { status: 500 });
	}
}
