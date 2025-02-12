import { Schema, model, models } from 'mongoose';

import { PostStatus } from '@models/enums';

const PostSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		content: { type: String, required: true },
		excerpt: { type: String, required: true }, // Tóm tắt bài viết
		coverImage: { type: String }, // URL ảnh đại diện
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }], // Danh mục bài viết
		tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], // Danh sách tag
		status: {
			type: String,
			enum: Object.values(PostStatus),
			default: PostStatus.DRAFT,
		},
		publishedAt: { type: Date },
		views: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{ timestamps: true },
);

export const Post = models.Post || model('Post', PostSchema);
