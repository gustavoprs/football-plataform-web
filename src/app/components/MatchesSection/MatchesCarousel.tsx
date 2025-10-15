import Link from "next/link"
import MatchDialog from "@/components/match/MatchDialog"
import { Button } from "@/components/ui/button"
import { CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { Match } from "@/lib/types/match"
import MatchCard from "./MatchCard"
import SeeMoreCard from "./SeeMoreCard"

type Props = {
	matches: Match[]
	emptyMessage: string
	linkText: string
}

export default function MatchesCarousel({
	matches,
	emptyMessage,
	linkText,
}: Props) {
	return matches.length > 0 ? (
		<CarouselContent>
			{matches.map((match) => (
				<CarouselItem
					key={match.id}
					className="basis-[65%] sm:basis-[45%] md:basis-[32%] lg:basis-[24%] xl:basis-[22%]"
				>
					<MatchDialog match={match}>
						<MatchCard match={match} />
					</MatchDialog>
				</CarouselItem>
			))}
			<CarouselItem className="basis-1/3">
				<SeeMoreCard />
			</CarouselItem>
		</CarouselContent>
	) : (
		<div className="flex flex-col justify-center items-center h-21.5 text-sm">
			<span>{emptyMessage}</span>
			<Button size="sm" variant="link">
				<Link href="/agenda">{linkText}</Link>
			</Button>
		</div>
	)
}
