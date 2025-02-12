import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import { Post } from '@models/Post';

// 🟢 Lấy một bài viết theo ID (GET)
export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const post = await Post.findById(params.id).populate(
			'author categories tags',
		);
		if (!post)
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });

		return NextResponse.json({ post }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🟡 Cập nhật bài viết (PUT)
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const { title, slug, content, excerpt, coverImage, status } =
			await req.json();

		const updatedPost = await Post.findByIdAndUpdate(
			params.id,
			{ title, slug, content, excerpt, coverImage, status },
			{ new: true },
		);
		if (!updatedPost)
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });

		return NextResponse.json(
			{ message: 'Post updated', post: updatedPost },
			{ status: 200 },
		);
	} catch {
		return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
	}
}

// 🔴 Xóa bài viết (DELETE)
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const deletedPost = await Post.findByIdAndDelete(params.id);
		if (!deletedPost)
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });

		return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
	} catch {
		return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
	}
}
