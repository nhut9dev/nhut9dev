import { Post } from '@/models/Post';
import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoose';

// 🟢 Lấy danh sách bài viết (GET)
export async function GET() {
	try {
		await connectDB();
		const posts = await Post.find().populate('author categories tags');
		return NextResponse.json({ posts }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🟡 Thêm bài viết mới (POST)
export async function POST(req: Request) {
	try {
		await connectDB();
		const {
			title,
			slug,
			content,
			excerpt,
			coverImage,
			author,
			categories,
			tags,
			status,
		} = await req.json();

		if (!title || !slug || !content || !author) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			);
		}

		const newPost = new Post({
			title,
			slug,
			content,
			excerpt,
			coverImage,
			author,
			categories,
			tags,
			status,
		});
		await newPost.save();

		return NextResponse.json(
			{ message: 'Post added', post: newPost },
			{ status: 201 },
		);
	} catch {
		return NextResponse.json({ error: 'Error adding post' }, { status: 500 });
	}
}
