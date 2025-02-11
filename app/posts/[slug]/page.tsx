// Hàm lấy bài viết theo slug
import { getPostBySlug } from '@lib/apis/post';
import { notFound } from 'next/navigation';

import PostView from '@/components/PostView';

export default async function BlogPostPage({
	params,
}: {
	params: { slug: string };
}) {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		return notFound(); // Trả về trang 404 nếu không tìm thấy bài viết
	}

	return (
		<div className="container mx-auto py-8">
			<PostView post={post} />
		</div>
	);
}
