'use client';

import MarkdownIt from 'markdown-it';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';

import { Button } from '@/components/ui/button';

// Import Markdown Editor Lite (dùng dynamic import để tránh lỗi SSR)
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
	ssr: false,
});

const mdParser = new MarkdownIt();

export default function PostEditor({
	post,
	onSave,
}: {
	post?: any;
	onSave: (data: any) => void;
}) {
	const [title, setTitle] = useState(post?.title || '');
	const [slug, setSlug] = useState(post?.slug || '');
	const [content, setContent] = useState(post?.content || '');
	const [excerpt, setExcerpt] = useState(post?.excerpt || '');
	const [tags, setTags] = useState(post?.tags?.join(', ') || ''); // Chuỗi tag, cách nhau bằng dấu phẩy
	const [status, setStatus] = useState(post?.status || 'draft');

	const handleEditorChange = ({ text }: { text: string }) => {
		setContent(text);
	};

	const handleSubmit = () => {
		const tagList = tags.split(',').map((tag: any) => tag.trim()); // Tách tag thành mảng
		onSave({ title, slug, content, excerpt, tags: tagList, status });
	};

	return (
		<Card className="max-w-3xl mx-auto my-6">
			<CardHeader>
				<CardTitle>
					{post ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<Input
						placeholder="Tiêu đề bài viết"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						placeholder="Slug (tự động tạo nếu để trống)"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
					/>
					<Textarea
						placeholder="Tóm tắt nội dung bài viết"
						value={excerpt}
						onChange={(e) => setExcerpt(e.target.value)}
					/>
					<Input
						placeholder="Tags (cách nhau bằng dấu phẩy)"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
					<MdEditor
						value={content}
						style={{ height: '300px' }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={handleEditorChange}
					/>
					<div className="flex justify-between">
						<select
							className="border rounded p-2"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="draft">Nháp</option>
							<option value="published">Công khai</option>
						</select>
						<Button onClick={handleSubmit}>
							{post ? 'Cập nhật' : 'Lưu bài viết'}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
