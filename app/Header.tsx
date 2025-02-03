'use client';

import { ModeToggle } from '@components/ModeToggle';
import { Button } from '@components/ui/button';
import { APP_NAME } from '@constants/global';
import { Facebook, Instagram, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'Categories', href: '/categories' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
];

const Header = () => {
	const pathname = usePathname();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 w-full bg-white dark:bg-black border-b-2 border-red-600 p-4 z-50">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center space-x-4">
					<Link href="/" className="text-2xl font-bold dark:text-white">
						{APP_NAME}
					</Link>

					<nav className="hidden md:flex space-x-6">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-red-900 ${pathname === link.href ? '!text-red-700' : ''}`}
							>
								{link.name}
							</Link>
						))}
					</nav>
				</div>

				<div className="flex items-center space-x-4">
					<Button variant="outline" size="icon">
						<Facebook />
						<span className="sr-only">Facebook</span>
					</Button>
					<Button variant="outline" size="icon">
						<Instagram />
						<span className="sr-only">Instagram</span>
					</Button>

					<div className="h-10 border-l-2 border-gray-600"></div>

					<ModeToggle />

					<Button
						variant="outline"
						size="icon"
						className="md:hidden"
						onClick={() => setIsOpen(!isOpen)}
					>
						<Menu className="w-6 h-6" />
					</Button>
				</div>
			</div>

			{isOpen && (
				<nav className="mt-2 md:hidden shadow-lg p-4 flex flex-col gap-4">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-red-900 ${pathname === link.href ? '!text-red-700' : ''}`}
							onClick={() => setIsOpen(false)}
						>
							{link.name}
						</Link>
					))}
				</nav>
			)}
		</header>
	);
};

export default Header;
