import { cn } from "@/lib/utils"
import { formatDateTime } from "@/lib/utils/date"

type MatchesRowProps = {
	index: number
	datetime: Date
	homeTeam: {
		name: string
		code: string
		logo: string
	}
	awayTeam: {
		name: string
		code: string
		logo: string
	}
	result?: {
		home: number
		away: number
	}
}

export default function MatchesRow({
	index,
	datetime,
	homeTeam,
	awayTeam,
	result,
}: MatchesRowProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-2 py-2.5 px-3 flex-1 max-sm:min-h-20",
				index % 2 === 0 && "bg-accent",
			)}
		>
			<span className="w-full text-center text-xs font-light whitespace-nowrap">
				{formatDateTime(datetime)}
			</span>
			<div className="flex justify-between items-center gap-2 max-w-52 w-full">
				<div className="flex items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={homeTeam.logo}
						alt={homeTeam.name}
						loading="lazy"
						className="size-8 object-contain"
					/>
					<span>{homeTeam.code}</span>
				</div>
				<div className="flex gap-1.5">
					{result && (
						<span className=" text-lg font-medium">{result.home}</span>
					)}
					<span className="text-lg font-extralight font-mono text-muted-foreground">
						x
					</span>
					{result && (
						<span className=" text-lg font-medium">{result.away}</span>
					)}
				</div>
				<div className="flex flex-row-reverse items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={awayTeam.logo}
						alt={awayTeam.name}
						loading="lazy"
						className="size-8 object-contain"
					/>
					<span>{awayTeam.code}</span>
				</div>
			</div>
		</div>
	)
}
