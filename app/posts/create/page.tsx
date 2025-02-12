'use client';

import PostEditor from '@components/PostEditor';

export default function CreatePostPage() {
	const handleSave = async (postData: any) => {
		try {
			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData),
			});

			if (response.ok) {
				alert('Bài viết đã được tạo thành công!');
			} else {
				alert('Lỗi khi tạo bài viết!');
			}
		} catch (error) {
			console.error('Lỗi:', error);
		}
	};

	return <PostEditor onSave={handleSave} />;
}
