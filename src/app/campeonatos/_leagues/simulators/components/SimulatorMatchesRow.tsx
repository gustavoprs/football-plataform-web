import { type ChangeEvent, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import type { Match } from "@/lib/types/match"
import { cn } from "@/lib/utils"
import { formatDateTime } from "@/lib/utils/date"
import { useLeague } from "../context/LeagueContext"

type SimulatorMatchesRowProps = {
	index: number
	match: Match
}

export default function SimulatorMatchesRow({ index, match }: SimulatorMatchesRowProps) {
	const { dispatch } = useLeague()
	const [homeScore, setHomeScore] = useState<number | "">(
		match.score.fullTime.home !== -1 ? match.score.fullTime.home : "",
	)
	const [awayScore, setAwayScore] = useState<number | "">(
		match.score.fullTime.away !== -1 ? match.score.fullTime.away : "",
	)

	function handleHomeScoreChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value
		if (value !== "" && !Number.isInteger(Number(value))) {
			return
		}

		setHomeScore(value !== "" ? Number(value) : "")
	}

	function handleAwayScoreChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value
		if (value !== "" && !Number.isInteger(Number(value))) {
			return
		}

		setAwayScore(value !== "" ? Number(value) : "")
	}

	useEffect(() => {
		if (homeScore !== "" && awayScore !== "") {
			dispatch({
				type: "UPDATE_MATCH",
				id: match.id,
				awayTeamId: match.awayTeam.id,
				homeTeamId: match.homeTeam.id,
				score: { home: homeScore, away: awayScore },
			})
		} else {
			dispatch({
				type: "UPDATE_MATCH",
				id: match.id,
				awayTeamId: match.awayTeam.id,
				homeTeamId: match.homeTeam.id,
				score: { home: -1, away: -1 },
			})
		}
	}, [homeScore, awayScore, dispatch, match])

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
			<div className="flex justify-between items-center gap-2 max-w-60 w-full">
				<div className="flex items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={match.homeTeam.logoURL}
						alt={match.homeTeam.name}
						loading="lazy"
						className="size-8 object-contain overflow-hidden"
					/>
					<span title={match.homeTeam.name}>{match.homeTeam.code || match.homeTeam.name.substring(0, 3).toUpperCase()}</span>
				</div>
				<div className="flex gap-1.5">
					{match.status === "in_progress" || match.status === "finished" ? (
						<span className=" text-lg font-medium">
							{match.score.fullTime.home}
						</span>
					) : (
						<Input
							maxLength={1}
							className="text-center p-0 size-7 !text-lg bg-card no-spinner"
							value={homeScore}
							onInput={handleHomeScoreChange}
						/>
					)}
					<span className="text-lg font-extralight font-mono text-muted-foreground">
						x
					</span>
					{match.status === "in_progress" || match.status === "finished" ? (
						<span className=" text-lg font-medium">
							{match.score.fullTime.away}
						</span>
					) : (
						<Input
							maxLength={1}
							className="text-center p-0 size-7 !text-lg bg-card no-spinner"
							value={awayScore}
							onInput={handleAwayScoreChange}
						/>
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
					<span title={match.awayTeam.name}>{match.awayTeam.code || match.awayTeam.name.substring(0,3).toUpperCase()}</span>
				</div>
			</div>
		</div>
	)
}
