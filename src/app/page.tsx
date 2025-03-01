import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome {session?.user?.email}</h1>
      <p>Role: {session?.user?.role}</p>

      {session?.user?.role === 'admin' && <a href="/admin">Go to Admin Panel</a>}

      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
}
