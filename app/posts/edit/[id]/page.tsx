'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import PostEditor from '@/components/PostEditor';

export default function EditPostPage() {
	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		async function fetchPost() {
			const response = await fetch(`/api/posts/${id}`);
			const data = await response.json();
			setPost(data.post);
		}
		fetchPost();
	}, [id]);

	const handleUpdate = async (postData: any) => {
		try {
			const response = await fetch(`/api/posts/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData),
			});

			if (response.ok) {
				alert('Bài viết đã được cập nhật!');
			} else {
				alert('Lỗi khi cập nhật bài viết!');
			}
		} catch (error) {
			console.error('Lỗi:', error);
		}
	};

	return post ? (
		<PostEditor post={post} onSave={handleUpdate} />
	) : (
		<p>Đang tải...</p>
	);
}
