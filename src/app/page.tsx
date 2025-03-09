'use client';

import { signOut, useSession } from 'next-auth/react';
import { Input } from '~ui/input';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome {session?.user?.email}</h1>
      <p>Role: {session?.user?.role}</p>

      {session?.user?.role === 'admin' && <a href="/admin">Go to Admin Panel</a>}
      <Input />
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
}
