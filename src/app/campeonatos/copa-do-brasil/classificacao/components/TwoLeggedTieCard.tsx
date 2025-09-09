import type { Match } from "@/lib/types/match"
import { formatDateTime } from "@/lib/utils/date"

type TwoLeggedTieCardProps = {
	firstMatch: Match
	secondMatch: Match
	index?: string
}

export default function TwoLeggedTieCard({
	firstMatch,
	secondMatch,
	index,
}: TwoLeggedTieCardProps) {
	const penaltyDispute =
		secondMatch.score.penalty.home !== 0 || secondMatch.score.penalty.away !== 0

	return (
		<div className="relative flex flex-col justify-center items-center rounded-md border sm:flex-row md:flex-col lg:flex-row xl:flex-col">
			{index && (
				<span className="absolute -top-3 rounded-sm border py-0.5 px-1.5 text-xs bg-background">
					{index}
				</span>
			)}
			<div className="relative flex flex-col items-center gap-2 py-4 px-3 flex-1 h-full">
				<span className="w-full text-center text-xs font-light whitespace-nowrap">
					{formatDateTime(firstMatch.date)}
				</span>
				<div className="flex justify-between items-center gap-2 max-w-60 w-full">
					<div className="flex items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={firstMatch.homeTeam.logoURL}
							alt={firstMatch.homeTeam.name}
							loading="lazy"
							className="size-8 object-contain overflow-hidden"
						/>
						<span title={firstMatch.homeTeam.name}>
							{firstMatch.homeTeam.code ||
								firstMatch.homeTeam.name.substring(0, 3).toUpperCase()}
						</span>
					</div>
					<div className="flex gap-1.5">
						{firstMatch.status === "finished" && (
							<span className=" text-lg font-medium">
								{firstMatch.score.fullTime.home}
							</span>
						)}
						<span className="text-lg font-extralight font-mono text-muted-foreground">
							x
						</span>
						{firstMatch.status === "finished" && (
							<span className=" text-lg font-medium">
								{firstMatch.score.fullTime.away}
							</span>
						)}
					</div>
					<div className="flex flex-row-reverse items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={firstMatch.awayTeam.logoURL}
							alt={firstMatch.awayTeam.name}
							loading="lazy"
							className="size-8 object-contain overflow-hidden"
						/>
						<span title={firstMatch.awayTeam.name}>
							{firstMatch.awayTeam.code ||
								firstMatch.awayTeam.name.substring(0, 3).toUpperCase()}
						</span>
					</div>
				</div>
			</div>
			<hr className="absolute -z-1 w-full h-px bg-border sm:w-px sm:h-full md:w-full md:h-px lg:w-px lg:h-full xl:w-full xl:h-px" />
			<div className="relative flex flex-col items-center gap-2 py-4 px-3 flex-1 h-full">
				<span className="w-full text-center text-xs font-light whitespace-nowrap">
					{formatDateTime(secondMatch.date)}
				</span>
				<div className="flex justify-between items-center gap-2 max-w-60 w-full">
					<div className="flex items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={secondMatch.homeTeam.logoURL}
							alt={secondMatch.homeTeam.name}
							loading="lazy"
							className="size-8 object-contain overflow-hidden"
						/>
						<span title={secondMatch.homeTeam.name}>
							{secondMatch.homeTeam.code ||
								secondMatch.homeTeam.name.substring(0, 3).toUpperCase()}
						</span>
					</div>
					<div className="flex gap-1.5">
						{secondMatch.status === "finished" && (
							<span className="flex items-center gap-1 text-lg font-medium">
								{penaltyDispute && <span className="text-sm text-muted-foreground">({secondMatch.score.penalty.home})</span>}
								{secondMatch.score.fullTime.home}
							</span>
						)}
						<span className="text-lg font-extralight font-mono text-muted-foreground">
							x
						</span>
						{secondMatch.status === "finished" && (
							<span className="flex items-center gap-1 text-lg font-medium">
								{secondMatch.score.fullTime.away}
								{penaltyDispute && <span className="text-sm text-muted-foreground">({secondMatch.score.penalty.away})</span>}
							</span>
						)}
					</div>
					<div className="flex flex-row-reverse items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={secondMatch.awayTeam.logoURL}
							alt={secondMatch.awayTeam.name}
							loading="lazy"
							className="size-8 object-contain overflow-hidden"
						/>
						<span title={secondMatch.awayTeam.name}>
							{secondMatch.awayTeam.code ||
								secondMatch.awayTeam.name.substring(0, 3).toUpperCase()}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
