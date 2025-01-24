import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="h-full w-full flex justify-center items-center">
			<Button>Click me</Button>
			<ModeToggle />
		</div>
	);
}
