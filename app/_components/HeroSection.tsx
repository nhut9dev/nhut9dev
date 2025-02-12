'use client';

import { motion } from 'framer-motion';

import { Button } from '@components/ui/button';

const TEXT = {
	TITLE: 'Xin chào',
	DESCRIPTION:
		'Trang này dùng để chia sẻ nhiều khía cạnh cuộc sống cá nhân của tôi',
};
export default function HeroSection() {
	return (
		<section className="flex flex-col items-center justify-center text-center py-20 px-4 h-[80vh] w-full transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white">
			<div className="flex flex-col items-center justify-center w-full text-center bg-gray-2">
				<motion.h1
					className="text-4xl font-bold text-red-600 md:text-6xl dark:text-red-500"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					whileHover={{ scale: 1.05 }}
				>
					{TEXT.TITLE}
				</motion.h1>
				<motion.p
					className="max-w-2xl mt-4 text-lg transition-colors duration-300"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					whileHover={{ scale: 1.02 }}
				>
					{TEXT.DESCRIPTION}
				</motion.p>
				<motion.div
					className="flex gap-4 mt-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<Button
						className="px-6 py-3 text-lg text-white bg-red-500 hover:bg-red-600"
						variant="default"
					>
						Đọc bài viết
					</Button>
					<Button
						className="px-6 py-3 text-lg text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
						variant="outline"
					>
						Về tôi
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
