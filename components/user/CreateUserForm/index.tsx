'use client';

import { useState } from 'react';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui/select';
import { useToast } from '@hooks/use-toast';

export default function CreateUserForm() {
	const { toast } = useToast();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		avatar: '',
		role: 'user',
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleRoleChange = (value) => {
		setFormData({ ...formData, role: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const res = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: { 'Content-Type': 'application/json' },
		});

		setLoading(false);

		if (res.ok) {
			setFormData({ name: '', email: '', avatar: '', role: 'user' });
			toast({
				title: 'User created successfully!',
				description: 'The new user has been added.',
			});
		} else {
			const error = await res.json();
			toast({
				title: 'Error',
				description: error.message,
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
			<h2 className="text-xl font-semibold mb-4">Create New User</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<Label htmlFor="avatar">Avatar URL</Label>
					<Input
						id="avatar"
						name="avatar"
						value={formData.avatar}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Label>Role</Label>
					<Select value={formData.role} onValueChange={handleRoleChange}>
						<SelectTrigger>
							<SelectValue placeholder="Select role" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="user">User</SelectItem>
							<SelectItem value="author">Author</SelectItem>
							<SelectItem value="admin">Admin</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? 'Creating...' : 'Create User'}
				</Button>
			</form>
		</div>
	);
}
