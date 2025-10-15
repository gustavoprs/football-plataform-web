import MatchDialog from "@/components/match/MatchDialog"
import type { Match } from "@/lib/types/match"
import { formatDateTime } from "@/lib/utils/date"

type MatchCardProps = {
	match: Match
	index?: string
}

export default function MatchCard({ match, index }: MatchCardProps) {
	const penaltyDispute =
		match.score.penalty.home !== 0 || match.score.penalty.away !== 0

	return (
		<MatchDialog match={match}>
			<div className="relative flex flex-col justify-center items-center gap-2 rounded-md border py-4 px-3 bg-card cursor-pointer transition-colors hover:bg-accent">
				{index && (
					<span className="absolute -top-3 rounded-sm border py-0.5 px-1.5 text-xs bg-background">
						{index}
					</span>
				)}
				<span className="w-full text-center text-xs font-light whitespace-nowrap">
					{formatDateTime(new Date())}
				</span>
				<div className="flex justify-between items-center gap-2 max-w-60 w-full">
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
					<div className="flex gap-1.5 text-lg">
						{match.status === "finished" && (
							<span className="flex items-center gap-1 font-medium">
								{penaltyDispute && (
									<span className="text-sm text-muted-foreground">
										({match.score.penalty.home})
									</span>
								)}
								{match.score.fullTime.home}
							</span>
						)}
						<span className="font-extralight font-mono text-muted-foreground">
							x
						</span>
						{match.status === "finished" && (
							<span className="flex items-center gap-1 font-medium">
								{match.score.fullTime.away}
								{penaltyDispute && (
									<span className="text-sm text-muted-foreground">
										({match.score.penalty.away})
									</span>
								)}
							</span>
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
						<span title={match.awayTeam.name}>
							{match.awayTeam.code ||
								match.awayTeam.name.substring(0, 3).toUpperCase()}
						</span>
					</div>
				</div>
			</div>
		</MatchDialog>
	)
}
