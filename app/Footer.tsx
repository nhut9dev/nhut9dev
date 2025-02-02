'use client';

import { APP_NAME } from '@constants/global';

const Footer = () => {
	return (
		<footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-16">
			<div className="container mx-auto text-center">
				<p>
					&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
				</p>
				<div className="flex justify-center space-x-6 mt-4">
					{/* <Link href="/contact" className="hover:text-blue-500">
						Contact
					</Link> */}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
