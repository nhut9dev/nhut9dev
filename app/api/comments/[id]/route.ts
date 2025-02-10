import { Comment } from '@/models/Comment';
import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoose';

// 🟢 Lấy một comment theo ID (GET)
export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const comment = await Comment.findById(params.id).populate(
			'author post replies',
		);
		if (!comment)
			return NextResponse.json({ error: 'Comment not found' }, { status: 404 });

		return NextResponse.json({ comment }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🔴 Xóa comment (DELETE)
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const deletedComment = await Comment.findByIdAndDelete(params.id);
		if (!deletedComment)
			return NextResponse.json({ error: 'Comment not found' }, { status: 404 });

		return NextResponse.json({ message: 'Comment deleted' }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Error deleting comment' },
			{ status: 500 },
		);
	}
}
