import type { Match } from "@/lib/types/match"
import { cn } from "@/lib/utils"
import { formatDateTime } from "@/lib/utils/date"

type MatchesRowProps = {
	index: number
	match: Match
}

export default function MatchesRow({ index, match }: MatchesRowProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-2 py-2.5 px-3 flex-1 max-sm:min-h-20",
				index % 2 === 0 && "bg-accent",
			)}
		>
			<span className="w-full text-center text-xs font-light whitespace-nowrap">
				{formatDateTime(match.date)}
			</span>
			<div className="flex justify-between items-center gap-2 max-w-52 w-full">
				<div className="flex items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={match.homeTeam.logoURL}
						alt={match.homeTeam.name}
						loading="lazy"
						className="max-size-8 size-8 object-contain overflow-hidden"
					/>
					<span title={match.homeTeam.name}>{match.homeTeam.code || match.homeTeam.name.substring(0, 3).toUpperCase()}</span>
				</div>
				<div className="flex gap-1.5">
					{match.status === "in_progress" || match.status === "finished" && (
						<span className=" text-lg font-medium">{match.score.fullTime.home}</span>
					)}
					<span className="text-lg font-extralight font-mono text-muted-foreground">
						x
					</span>
					{match.status === "in_progress" || match.status === "finished" && (
						<span className=" text-lg font-medium">{match.score.fullTime.away}</span>
					)}
				</div>
				<div className="flex flex-row-reverse items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={match.awayTeam.logoURL}
						alt={match.awayTeam.name}
						loading="lazy"
						className="size-8 object-contain overflow-hidden"
					/>
					<span title={match.awayTeam.name}>{match.awayTeam.code || match.awayTeam.name.substring(0, 3).toUpperCase()}</span>
				</div>
			</div>
		</div>
	)
}
