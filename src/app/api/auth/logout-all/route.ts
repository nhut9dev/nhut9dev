import { NextResponse } from 'next/server';

import { removeAllRefreshTokens } from '~api/auth';

export async function POST(req: Request) {
  const { userId } = await req.json();
  await removeAllRefreshTokens(userId);

  return NextResponse.json({ message: 'Logged out from all devices' });
}
