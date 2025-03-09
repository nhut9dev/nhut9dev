import { NextResponse } from 'next/server';

import { connectDB } from '~lib/db';
import User from '~models/User';
import { generateAccessToken, verifyToken } from '~utils/auth';

export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken) return NextResponse.json({ error: 'Missing token' }, { status: 401 });

    const decoded = verifyToken(refreshToken, true);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 403 });

    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const newAccessToken = generateAccessToken(user.id, user.role);

    return NextResponse.json({ accessToken: newAccessToken });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
