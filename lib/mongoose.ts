import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false; // Tránh kết nối lại nhiều lần

export const connectDB = async () => {
	if (isConnected) {
		console.log('✅ Already connected to MongoDB');
		return;
	}

	try {
		const db = await mongoose.connect(MONGODB_URI, {
			dbName: 'nhut9dev', // Đặt tên database
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as mongoose.ConnectOptions);

		isConnected = true;
		console.log('🚀 MongoDB connected:', db.connection.host);
	} catch (error) {
		console.error('❌ Error connecting to MongoDB:', error);
		process.exit(1);
	}
};
