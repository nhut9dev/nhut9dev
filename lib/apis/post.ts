import { Post } from '@/models/Post';
import { connectDB } from '@lib/mongoose';

export async function getPostBySlug(slug: string) {
	await connectDB();

	const post = await Post.findOne({ slug })
		// .populate('author', 'name') // Lấy thông tin tác giả (chỉ lấy 'name')
		.populate('categories', 'name') // Lấy danh mục (chỉ lấy 'name')
		.populate('tags', 'name') // Lấy danh sách tag (chỉ lấy 'name')
		.lean();

	return post;
}

export async function getAllPosts() {
	await connectDB();

	try {
		return await Post.find({ status: 'published' })
			// .populate('author', 'name') // Lấy thông tin tác giả
			.sort({ publishedAt: -1 }) // Sắp xếp bài viết mới nhất lên đầu
			.lean();
	} catch (error) {
		console.log('aloooooooooo', error);
	}
}
