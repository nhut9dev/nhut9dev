import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import { Comment } from '@models/Comment';

// 🟢 Lấy danh sách comment (GET)
export async function GET() {
	try {
		await connectDB();
		const comments = await Comment.find().populate('author post replies');
		return NextResponse.json({ comments }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🟡 Thêm comment mới (POST)
export async function POST(req: Request) {
	try {
		await connectDB();
		const { post, author, content, replyTo } = await req.json();

		if (!post || !author || !content) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			);
		}

		const newComment = new Comment({ post, author, content });

		if (replyTo) {
			const parentComment = await Comment.findById(replyTo);
			if (parentComment) {
				parentComment.replies.push(newComment._id);
				await parentComment.save();
			}
		}

		await newComment.save();

		return NextResponse.json(
			{ message: 'Comment added', comment: newComment },
			{ status: 201 },
		);
	} catch {
		return NextResponse.json(
			{ error: 'Error adding comment' },
			{ status: 500 },
		);
	}
}
