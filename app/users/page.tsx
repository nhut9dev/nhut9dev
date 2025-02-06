'use client';

import { useEffect, useState } from 'react';

interface User {
	_id?: string;
	name: string;
	email: string;
}

export default function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch('/api/users')
			.then((res) => res.json())
			.then((data) => {
				setUsers(data.users);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
				setLoading(false);
			});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-5">
			<h1 className="text-2xl font-bold">User List</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{users.map((user) => (
						<li key={user._id}>
							{user.name} - {user.email}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
