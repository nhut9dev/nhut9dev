import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '~app/api/auth/[...nextauth]/route';
import { connectDB } from '~lib/db';
import User from '~models/User';

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const users = await User.find().select('-password');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi lấy danh sách user' }, { status: 500 });
  }
}
