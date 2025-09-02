"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Match } from "@/lib/types/match"
import SimulatorMatchesRow from "./SimulatorMatchesRow"

type Props = {
	matches: Match[]
}

export default function SimulatorMatchesTable({ matches }: Props) {
	const [round, setRound] = useState<number>(getCurrentRound(matches))

	const currentRoundMatches = matches.filter((m) => m.round === round)

	return (
		<div className="flex flex-col gap-4 flex-1 min-w-68 w-full sm:gap-2 sm:w-max">
			<div className="flex justify-between items-center gap-2">
				<Button
					size="icon"
					variant="ghost"
					className="size-7 cursor-pointer"
					onClick={() => setRound((prev) => (prev > 1 ? prev - 1 : 1))}
					disabled={round === 1}
				>
					<ChevronLeftIcon />
				</Button>
				<span className="font-medium">{round}° Rodada</span>
				<Button
					size="icon"
					variant="ghost"
					className="size-7 cursor-pointer"
					onClick={() => setRound((prev) => (prev < 38 ? prev + 1 : 38))}
					disabled={round === 38}
				>
					<ChevronRightIcon />
				</Button>
			</div>
			<div className="flex flex-col rounded-sm border flex-1 overflow-hidden">
				{currentRoundMatches.map((data, index) => (
					<SimulatorMatchesRow key={data.id} index={index} match={data} />
				))}
			</div>
		</div>
	)
}

function getCurrentRound(matches: Match[]): number {
	const rounds = Array.from(new Set(matches.map((m) => m.round ?? 0))).sort(
		(a, b) => a - b,
	)

	const firstUnfinishedRound = rounds.find((round) =>
		matches.some((m) => m.round === round && m.status !== "finished")
	)

		return firstUnfinishedRound ?? Math.max(...rounds)
}
