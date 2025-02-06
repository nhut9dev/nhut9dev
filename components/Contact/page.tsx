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
		<div className="h-full flex justify-center items-center">
			<ul className="flex justify-center items-center space-x-4">
				{socialLinks.map(({ icon: Icon, name, url, color }) => (
					<li key={name} className="relative group">
						<a
							href={url}
							aria-label={name}
							className="relative flex justify-center items-center w-12 h-12 rounded-full text-gray-700 bg-white shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden"
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
