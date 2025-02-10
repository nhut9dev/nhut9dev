import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema(
	{
		post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		content: { type: String, required: true },
		replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Trả lời bình luận
	},
	{ timestamps: true },
);

export const Comment = models.Comment || model('Comment', CommentSchema);
