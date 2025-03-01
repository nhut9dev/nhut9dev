import { NextResponse } from 'next/server';

import { removeRefreshToken } from '~api/auth';

export async function POST(req: Request) {
  const { refreshToken } = await req.json();

  if (!refreshToken) return NextResponse.json({ error: 'No token' }, { status: 400 });

  const userId = 'someUserId';
  await removeRefreshToken(userId, refreshToken);

  return NextResponse.json({ message: 'Logged out successfully' });
}
