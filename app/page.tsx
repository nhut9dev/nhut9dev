import HeroSection from '@app/_components/HeroSection';
import Contact from '@components/Contact/page';

export default function Home() {
	return (
		<>
			<HeroSection />
			<section className="flex justify-center items-center border-b min-h-20 h-[15vh] border-gray-300">
				<Contact />
			</section>
		</>
	);
}
