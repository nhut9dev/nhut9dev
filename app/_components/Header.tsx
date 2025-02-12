'use client';

import { Facebook, Instagram, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ModeToggle } from '@components/ModeToggle';
import { Button } from '@components/ui/button';
import { ROUTES } from '@config/routes';
import { APP_NAME } from '@constants/global';

const navLinks = [
	{ name: 'Home', href: ROUTES.CLIENT.HOME },
	{ name: 'Categories', href: ROUTES.CLIENT.CATEGORIES },
	{ name: 'About', href: ROUTES.CLIENT.ABOUT },
	{ name: 'Contact', href: ROUTES.CLIENT.CONTACT },
];

export default function Header() {
	const pathname = usePathname();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 left-0 z-50 w-full p-4 bg-white border-b-2 border-red-600 dark:bg-black">
			<div className="container flex items-center justify-between mx-auto">
				<div className="flex items-center space-x-4">
					<Link href="/" className="text-2xl font-bold dark:text-white">
						{APP_NAME}
					</Link>

					<nav className="hidden space-x-6 md:flex">
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
				<nav className="flex flex-col gap-4 p-4 mt-2 shadow-lg md:hidden">
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
}
