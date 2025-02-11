'use client';

import MarkdownIt from 'markdown-it';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mdParser = new MarkdownIt({
	html: true, // Hỗ trợ HTML trong Markdown
	linkify: true, // Tự động nhận diện link
	typographer: true, // Chuyển đổi ký tự đặc biệt như " thành “
});

export default function PostView({ post }: { post: any }) {
	if (!post) return <p className="text-center">Bài viết không tồn tại!</p>;

	return (
		<Card className="max-w-3xl mx-auto my-6">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				<p className="text-sm text-gray-500">
					Đăng ngày {new Date(post.createdAt).toLocaleDateString()}
				</p>
			</CardHeader>
			<CardContent>
				<div className="prose max-w-none dark:prose-invert">
					{/* Hiển thị nội dung Markdown dưới dạng HTML */}
					<div
						dangerouslySetInnerHTML={{ __html: mdParser.render(post.content) }}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
