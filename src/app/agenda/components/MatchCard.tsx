import type { Match } from "@/lib/types/match"
import { formatDateTime } from "@/lib/utils/date"

type MatchCardProps = {
	match: Match
	index?: string
}

export function MatchCard({ match, index }: MatchCardProps) {
	return (
		<div className="relative flex flex-col justify-center items-center gap-2 rounded-md border py-4 px-3 bg-card">
			{index && (
				<span className="absolute -top-3 rounded-sm border py-0.5 px-1.5 text-xs bg-background">
					{index}
				</span>
			)}
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
