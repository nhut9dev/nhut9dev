import Link from 'next/link';

import { getAllPosts } from '@lib/apis/post';

export default async function BlogListPage() {
	const posts = await getAllPosts(); // Fetch danh sách bài viết

	return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-6">Danh Sách Bài Viết</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts?.map((post: any) => (
					<div
						key={post._id}
						className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
					>
						<Link href={`/blog/${post.slug}`}>
							<h2 className="text-xl font-semibold text-blue-600 hover:underline">
								{post.title}
							</h2>
						</Link>
						<p className="text-gray-600 mt-2">{post.excerpt}</p>
						<p className="text-sm text-gray-500 mt-2">
							Tác giả: {post.author?.name}
						</p>
						<p className="text-sm text-gray-500">
							Ngày đăng: {new Date(post.publishedAt).toLocaleDateString()}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
