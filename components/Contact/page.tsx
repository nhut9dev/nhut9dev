import { Facebook, Github, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/',
		color: 'bg-blue-500',
		icon: Linkedin,
	},
	{
		name: 'GitHub',
		url: 'https://www.github.com/',
		color: 'bg-gray-900',
		icon: Github,
	},
	{
		name: 'Facebook',
		url: 'https://www.instagram.com/',
		color: 'bg-blue-600',
		icon: Facebook,
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/',
		color: 'bg-gradient-to-r from-blue-500 via-purple-600 to-red-500',
		icon: Instagram,
	},
];

export default function Contact() {
	return (
		<div className="flex items-center justify-center h-full">
			<ul className="flex items-center justify-center space-x-4">
				{socialLinks.map(({ icon: Icon, name, url, color }) => (
					<li key={name} className="relative group">
						<a
							href={url}
							aria-label={name}
							className="relative flex items-center justify-center w-12 h-12 overflow-hidden text-gray-700 transition-transform duration-300 bg-white rounded-full shadow-lg hover:scale-105"
						>
							<div
								className={`absolute bottom-0 left-0 w-full h-0 ${color} transition-all duration-300 group-hover:h-full`}
							></div>
							<i
								className={`relative text-2xl transition-colors duration-300 group-hover:text-white`}
							></i>

							<Icon className="z-10 text-black group-hover:text-white" />
						</a>
						<div
							className={`absolute top-[-40px] left-1/2 transform -translate-x-1/2 ${color} text-white px-3 py-1 rounded-md text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
						>
							{name}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
