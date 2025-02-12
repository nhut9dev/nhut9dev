import { NextResponse } from 'next/server';

import { connectDB } from '@lib/mongoose';
import { Category } from '@models/Category';

// 🟢 Lấy một category theo ID (GET)
export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const category = await Category.findById(params.id);
		if (!category)
			return NextResponse.json(
				{ error: 'Category not found' },
				{ status: 404 },
			);

		return NextResponse.json({ category }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}

// 🟡 Cập nhật category (PUT)
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const { name, slug, description } = await req.json();

		const updatedCategory = await Category.findByIdAndUpdate(
			params.id,
			{ name, slug, description },
			{ new: true },
		);
		if (!updatedCategory)
			return NextResponse.json(
				{ error: 'Category not found' },
				{ status: 404 },
			);

		return NextResponse.json(
			{ message: 'Category updated', category: updatedCategory },
			{ status: 200 },
		);
	} catch {
		return NextResponse.json(
			{ error: 'Error updating category' },
			{ status: 500 },
		);
	}
}

// 🔴 Xóa category (DELETE)
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();
		const deletedCategory = await Category.findByIdAndDelete(params.id);
		if (!deletedCategory)
			return NextResponse.json(
				{ error: 'Category not found' },
				{ status: 404 },
			);

		return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: 'Error deleting category' },
			{ status: 500 },
		);
	}
}
