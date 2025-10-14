import { cookies } from "next/headers"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getStandings } from "@/lib/footballApi"
import type { Standing } from "@/lib/types/standing"
import { cn } from "@/lib/utils"

const VISIBLE_COUNT = 7

type Props = {
	className?: string
}

export default async function SerieAStandingsSection({ className }: Props) {
	const selectedTeamId = (await cookies()).get("selectedTeamId")?.value
	const standings = await getStandings(1, 2025)

	let displayedStandings: typeof standings = []

	if (selectedTeamId) {
		const index = standings.findIndex(
			(s) => s.teamId.toString() === selectedTeamId,
		)

		if (index !== -1) {
			const half = Math.floor(VISIBLE_COUNT / 2)
			let start = index - half
			let end = start + VISIBLE_COUNT

			if (start < 0) {
				start = 0
				end = Math.min(VISIBLE_COUNT, standings.length)
			} else if (end > standings.length) {
				end = standings.length
				start = Math.max(0, end - VISIBLE_COUNT)
			}

			displayedStandings = standings.slice(start, end)
		} else {
			displayedStandings = standings.slice(0, VISIBLE_COUNT)
		}
	} else {
		displayedStandings = standings.slice(0, VISIBLE_COUNT)
	}

	return (
		<section className={cn("flex flex-col gap-1 flex-1", className)}>
			<Link
				href="/campeonatos/brasileirao-serie-a/tabela"
				className="w-fit text-lg font-medium transition-all hover:underline"
			>
				Brasileirão Série A 2025
			</Link>
			<ScrollArea className="w-full">
				<div className="relative flex items-center mb-2 pe-2 h-7 text-sm text-muted-foreground">
					<div className="sticky left-0 min-w-26 h-5 bg-background">
						Classificação
					</div>
					<div className="flex-1 min-w-12 text-center" title="Pontos">
						P
					</div>
					<div className="flex-1 min-w-12 text-center" title="Jogos">
						J
					</div>
					<div className="flex-1 min-w-12 text-center" title="Saldo de gols">
						SG
					</div>
					<div
						className="flex-1 min-w-12 text-center"
						title="Aproveitamento em porcentagem"
					>
						%
					</div>
				</div>
				<div>
					{displayedStandings.map((data, index) => {
						const position = standings.findIndex((s) => s.id === data.id) + 1

						return (
							<ReducedTableRow
								key={data.id}
								index={index}
								position={position}
								standing={data}
							/>
						)
					})}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</section>
	)
}

type ReducedTableRowProps = {
	index: number
	position: number
	standing: Standing
}

export function ReducedTableRow({
	index,
	position,
	standing,
}: ReducedTableRowProps) {
	const { team } = standing
	if (!team) {
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
				"flex items-center !border-x pe-2 h-10",
				index === 0 && "rounded-t-sm border-t",
				index === VISIBLE_COUNT-1 && "rounded-b-sm !border-b",
				index % 2 !== 0 ? "bg-accent" : "bg-background",
			)}
		>
			<div
				className={cn(
					"sticky left-0 flex items-center gap-2 min-w-26 overflow-hidden",
					index % 2 !== 0 ? "bg-accent" : "bg-background",
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
					<span title={team.name}>
						{team.code || team.name.substring(0, 3).toUpperCase()}
					</span>
				</div>
			</div>
			<div className="flex-1 min-w-12 text-center font-medium">
				{standing.points}
			</div>
			<div className="flex-1 min-w-12 text-center">{standing.gamesPlayed}</div>
			<div className="flex-1 min-w-12 text-center">
				{standing.goalsFor - standing.goalsAgainst}
			</div>
			<div className="flex-1 min-w-12 text-center">{`${performance}%`}</div>
		</div>
	)
}
