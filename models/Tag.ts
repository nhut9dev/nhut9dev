import { Schema, model, models } from 'mongoose';

const TagSchema = new Schema(
	{
		name: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
	},
	{ timestamps: true },
);

export const Tag = models.Tag || model('Tag', TagSchema);
