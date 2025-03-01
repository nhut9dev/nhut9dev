import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { connectDB } from '~lib/db';
import User from '~models/User';

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
