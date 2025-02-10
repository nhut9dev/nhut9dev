import { Category } from '@/models/Category';
import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoose';

// 🟢 Lấy danh sách category (GET)
export async function GET() {
	try {
		await connectDB();
		const categories = await Category.find();
		return NextResponse.json({ categories }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🟡 Thêm category mới (POST)
export async function POST(req: Request) {
	try {
		await connectDB();
		const { name, slug, description } = await req.json();

		if (!name || !slug) {
			return NextResponse.json(
				{ error: 'Missing name or slug' },
				{ status: 400 },
			);
		}

		const newCategory = new Category({ name, slug, description });
		await newCategory.save();

		return NextResponse.json(
			{ message: 'Category added', category: newCategory },
			{ status: 201 },
		);
	} catch {
		return NextResponse.json(
			{ error: 'Error adding category' },
			{ status: 500 },
		);
	}
}
