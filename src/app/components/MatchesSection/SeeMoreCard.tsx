import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SeeMoreCard() {
	return (
		<Button variant="link" asChild>
			<Link
				href="/agenda"
				className="relative flex justify-center items-center gap-3 border w-32 h-full text-center text-nowrap bg-accent"
			>
				Ver mais <br /> jogos
			</Link>
		</Button>
	)
}
