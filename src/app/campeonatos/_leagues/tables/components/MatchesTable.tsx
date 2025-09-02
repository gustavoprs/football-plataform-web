"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Match } from "@/lib/types/match"
import MatchesRow from "./MatchesRow"

type Props = {
	matches: Match[]
}

export default function MatchesTable({ matches }: Props) {
	const [round, setRound] = useState<number>(getCurrentRound(matches))

	const currentRoundMatches = matches.filter((m) => m.round === round)

	return (
		<div className="flex flex-col gap-4 flex-1 min-w-60 w-full sm:gap-2 sm:w-max">
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
					<MatchesRow key={data.id} index={index} match={data} />
				))}
			</div>
		</div>
	)
}

function getCurrentRound(matches: Match[]): number {
	const finishedRounds = matches
		.filter((m) => m.status === "finished")
		.map((m) => m.round ?? 0)

	const lastFinishedRound = Math.max(...finishedRounds, 0)

	const upcoming = matches.some(
		(m) => m.round === lastFinishedRound + 1 && m.status === "scheduled",
	)

	return upcoming ? lastFinishedRound + 1 : lastFinishedRound
}
