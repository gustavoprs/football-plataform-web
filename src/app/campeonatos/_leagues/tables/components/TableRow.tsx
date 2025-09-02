import type { Standing } from "@/lib/types/standing"
import { cn } from "@/lib/utils"

type TableRowProps = {
	position: number
	standing: Standing
}

export default function TableRow({ position, standing }: TableRowProps) {
	const { team } = standing
	if(!team) {
		return 
	}

	const performance =
		standing.gamesPlayed !== 0
			? ((standing.points / (standing.gamesPlayed * 3)) * 100).toFixed(0)
			: 0

	return (
		<div
			key={standing.id}
			className={cn(
				"flex items-center !border-x h-10",
				position === 1 && "rounded-t-sm border-t",
				position === 20 && "rounded-b-sm !border-b",
				position % 2 !== 0 ? "bg-accent" : "bg-background",
			)}
		>
			<div
				className={cn(
					"sticky left-0 flex items-center gap-2 min-w-28 overflow-hidden",
					position % 2 !== 0 ? "bg-accent" : "bg-background",
				)}
			>
				<span
					className={cn(
						"rounded-r-full w-0.5 h-9",
						position >= 1 && position <= 4 && "bg-blue-500 dark:bg-blue-600",
						position >= 5 && position <= 6 && "bg-green-500 dark:bg-green-600",
						position >= 7 &&
							position <= 12 &&
							"bg-yellow-500 dark:bg-yellow-600",
						position >= 17 && position <= 20 && "bg-red-500 dark:bg-red-600",
					)}
				></span>
				<span className="w-5 text-center">{position}</span>
				<div className=" flex items-center gap-1.5">
					<div className="truncate">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={team.logoURL}
							alt={team.name}
							loading="lazy"
							className="w-5 h-auto"
						/>
					</div>
					<span title={team.name}>{team.code || team.name.substring(0, 3).toUpperCase()}</span>
				</div>
			</div>
			<div className="flex-1 min-w-10 text-center font-medium">
				{standing.points}
			</div>
			<div className="flex-1 min-w-10 text-center">{standing.gamesPlayed}</div>
			<div className="flex-1 min-w-10 text-center">{standing.wins}</div>
			<div className="flex-1 min-w-10 text-center">{standing.draws}</div>
			<div className="flex-1 min-w-10 text-center">{standing.losses}</div>
			<div className="flex-1 min-w-10 text-center">
				{standing.goalsFor - standing.goalsAgainst}
			</div>
			<div className="flex-1 min-w-10 text-center">{standing.goalsFor}</div>
			<div className="flex-1 min-w-10 text-center">{standing.goalsAgainst}</div>
			<div className="flex-1 min-w-10 text-center">{`${performance}%`}</div>
			{/* <div className="inline-flex justify-center gap-0.5 flex-1 min-w-20">
				<span
					className="rounded-full size-2 bg-green-500 dark:bg-green-600"
					title="Vitória"
				>
					<span className="sr-only select-all">V</span>
				</span>
				<span className="rounded-full size-2 bg-foreground/25" title="Empate">
					<span className="sr-only select-all">E</span>
				</span>
				<span className="rounded-full size-2 bg-foreground/25" title="Empate">
					<span className="sr-only select-all">E</span>
				</span>
				<span
					className="rounded-full size-2 bg-red-500 dark:bg-red-600"
					title="Derrota"
				>
					<span className="sr-only select-all">D</span>
				</span>
				<span
					className="rounded-full size-2 bg-green-500 dark:bg-green-600"
					title="Vitória"
				>
					<span className="sr-only select-all">V</span>
				</span>
			</div> */}
		</div>
	)
}
