'use client';

import { APP_NAME } from '@constants/global';

export default function Footer() {
	return (
		<footer className="py-6 text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-300">
			<div className="container mx-auto text-center">
				<p>
					&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
				</p>
				<div className="flex justify-center mt-4 space-x-6">
					{/* <Link href="/contact" className="hover:text-blue-500">
						Contact
					</Link> */}
				</div>
			</div>
		</footer>
	);
}
