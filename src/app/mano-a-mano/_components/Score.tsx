"use client"

import type { Team } from "@/lib/types/team"
import { useLineup } from "../_context/LineupContext"

type Props = {
	homeTeam: Team
	awayTeam: Team
}

export default function Score({ homeTeam, awayTeam }: Props) {
	const {
		state: { lineup },
	} = useLineup()

	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-2">
				{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
				<img
					src={homeTeam.logoURL}
					alt={homeTeam.name}
					title={homeTeam.name}
					className="size-8 overflow-hidden"
				/>
				<span className="font-mono">{lineup.filter((p) => p?.teamId === homeTeam.id).length}</span>
			</div>
			<span className="text-xs font-semibold text-muted-foreground">VS</span>
			<div className="flex items-center gap-2">
				<span className="font-mono">{lineup.filter((p) => p?.teamId === awayTeam.id).length}</span>
				{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
				<img
					src={awayTeam.logoURL}
					alt={awayTeam.name}
					title={awayTeam.name}
					className="size-8 overflow-hidden"
				/>
			</div>
		</div>
	)
}
