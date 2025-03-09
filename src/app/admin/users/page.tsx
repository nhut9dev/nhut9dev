'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IUser } from '~types/user';

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'admin') {
      router.push('/login');
    } else {
      fetchUsers();
    }
  }, [session, status]);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      setUsers(await res.json());
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border">
              <td className="border p-2">{user._id}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
