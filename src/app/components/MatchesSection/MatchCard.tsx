import { formatDate } from "date-fns"
import type { Match } from "@/lib/types/match"

type Props = {
	match: Match
}

export default function MatchCard({ match }: Props) {
	return (
		<div className="relative flex flex-col justify-center items-center gap-3 rounded-md border pt-1 pb-4 px-2 flex-1 bg-card transition-colors hover:bg-accent">
			<div className="flex justify-between items-center gap-2 w-full text-sm font-light whitespace-nowrap">
				<span>{match.competition?.name}</span>
				<span className="font-medium">
					{formatDate(match.date, "H:mm dd/MM")}
				</span>
			</div>
			<div className="flex justify-between items-center gap-2 max-w-52 w-full">
				<div className="flex items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={match.homeTeam.logoURL}
						alt={match.homeTeam.name}
						loading="lazy"
						className="size-8 object-contain overflow-hidden"
					/>
					<span title={match.homeTeam.name}>
						{match.homeTeam.code ||
							match.homeTeam.name.substring(0, 3).toUpperCase()}
					</span>
				</div>
				<div className="flex gap-1.5">
					{match.status === "finished" && (
						<span className=" text-lg font-medium">
							{match.score.fullTime.home}
						</span>
					)}
					<span className="text-lg font-extralight font-mono text-muted-foreground">
						x
					</span>
					{match.status === "finished" && (
						<span className=" text-lg font-medium">
							{match.score.fullTime.away}
						</span>
					)}
				</div>
				<div className="flex items-center gap-2">
					<span title={match.awayTeam.name}>
						{match.awayTeam.code ||
							match.awayTeam.name.substring(0, 3).toUpperCase()}
					</span>
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={match.awayTeam.logoURL}
						alt={match.awayTeam.name}
						loading="lazy"
						className="size-8 object-contain overflow-hidden"
					/>
				</div>
			</div>
		</div>
	)
}
