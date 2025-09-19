"use client"

import { CrownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import type { Match } from "@/lib/types/match"
import type { Phase } from "@/lib/types/phase"
import type { Team } from "@/lib/types/team"
import { cn } from "@/lib/utils"
import { groupTies } from "../../../utils"

type Tie = {
	teams: [Team | null, Team | null]
	winner: 0 | 1 | null
}

type PhasesTies = {
	quarterFinals: Tie[]
	semiFinals: Tie[]
	final: Tie
}

function getWinner(tie: Match[]): Team | null {
	if (tie[1].status !== "finished") {
		return null
	}

	const finalScore = {
		team0: tie[0].score.fullTime.home + tie[1].score.fullTime.away,
		team1: tie[0].score.fullTime.away + tie[1].score.fullTime.home,
	}

	if (finalScore.team0 === finalScore.team1) {
		return tie[1].score.penalty.home > tie[1].score.penalty.away
			? tie[1].homeTeam
			: tie[1].awayTeam
	}

	return finalScore.team0 > finalScore.team1 ? tie[0].homeTeam : tie[0].awayTeam
}

type Props = {
	phases: Phase[]
}

export default function FinalPhasesSimulator({ phases }: Props) {
	const [ties, setTies] = useState<PhasesTies>()

	useEffect(() => {
		function setUpPhaseTies() {
			const quarterFinals = groupTies(phases[4].matches || [])
			const semiFinals = groupTies(phases[5].matches || [])
			const final = groupTies(phases[6].matches || [])

			const ties: PhasesTies = {
				quarterFinals: [],
				semiFinals: [],
				final: { teams: [null, null], winner: null },
			}

			quarterFinals.forEach((tie, index) => {
				const winner = getWinner(quarterFinals[index])

				console.log(winner, tie[1])

				ties.quarterFinals.push({
					teams: [tie[1].homeTeam, tie[1].awayTeam],
					winner: winner ? (winner.id === tie[1].homeTeam.id ? 0 : 1) : null,
				})
			})

			if (semiFinals.length > 0) {
				semiFinals.forEach((tie, index) => {
					const winner = getWinner(semiFinals[index])

					ties.semiFinals.push({
						teams: [tie[1].homeTeam, tie[1].awayTeam],
						winner: winner ? (winner.id === tie[1].id ? 0 : 1) : null,
					})
				})
			} else {
				for (let i = 0; i < quarterFinals.length; i += 2) {
					const winner1 = getWinner(quarterFinals[i])
					const winner2 = getWinner(quarterFinals[i + 1])

					ties.semiFinals.push({
						teams: [winner1, winner2],
						winner: null,
					})
				}
			}

			if (final.length > 0) {
				const winner = getWinner(final[0])

				ties.final = {
					teams: [final[0][1].homeTeam, final[0][1].awayTeam],
					winner: winner
						? winner.id === final[0][1].homeTeam.id
							? 0
							: 1
						: null,
				}
			} else {
				ties.final = {
					teams: [
						ties.semiFinals[0].winner
							? ties.semiFinals[0].teams[ties.semiFinals[0].winner]
							: null,
						ties.semiFinals[1].winner
							? ties.semiFinals[1].teams[ties.semiFinals[1].winner]
							: null,
					],
					winner: null,
				}
			}

			setTies(ties)
		}

		setUpPhaseTies()
	}, [phases])

	if (!ties) {
		return ""
	}

	function handleSelectWinner(
		phase: "quarterFinals" | "semiFinals" | "final",
		index: number,
		winner: 0 | 1 | null,
	) {
		setTies((prev) => {
			if (!prev) {
				return
			}

			const newTies: PhasesTies = {
				quarterFinals: prev.quarterFinals.map((t) => ({ ...t })),
				semiFinals: prev.semiFinals.map((t) => ({ ...t })),
				final: { ...prev.final },
			}

			if (phase === "final") {
				newTies.final.winner = winner
				return newTies
			}

			if (phase === "quarterFinals") {
				const tie = newTies.quarterFinals[index]
				tie.winner = winner

				const semiIndex = index < 2 ? 0 : 1
				const semiSlot = index % 2

				// Update semifinal
				newTies.semiFinals[semiIndex].teams[semiSlot] =
					winner !== null ? tie.teams[winner] : null
				newTies.semiFinals[semiIndex].winner = null

				// Reset final in case semifinal was changed
				const finalSlot = semiIndex
				newTies.final.teams[finalSlot] = null
				newTies.final.winner = null
			}

			if (phase === "semiFinals") {
				const tie = newTies.semiFinals[index]
				tie.winner = winner

				const finalSlot = index // semi 0 -> final[0], semi 1 -> final[1]
				newTies.final.teams[finalSlot] =
					winner !== null ? tie.teams[winner] : null
				newTies.final.winner = null
			}

			return newTies
		})
	}

	return (
		<div className="flex flex-col items-center gap-2 flex-1">
			<div className="flex flex-col justify-center items-center gap-1">
				<span className="text-center text-2xl font-semibold">
					Simulador do mata-mata
				</span>
				<span className="text-center text-sm text-muted-foreground">
					Clique nos times para decidir os resultados e descubra quem será o
					campeão.
				</span>
			</div>
			<div className="flex justify-center items-center my-auto">
				<div className="flex gap-2 sm:flex-col-reverse">
					<div className="flex flex-col gap-12 sm:flex-row">
						{ties.quarterFinals.map((tie, index) => (
							<TieCard
								key={`${tie.teams[1]?.id ?? `q${index}null`}-${tie.teams[1]?.id ?? `q${index}null`}`}
								tie={tie}
								onSelect={(winner) =>
									handleSelectWinner("quarterFinals", index, winner)
								}
							/>
						))}
					</div>
					<div className="flex sm:flex-col-reverse">
						<div className="flex sm:flex-col-reverse">
							<div className="flex flex-col gap-12 sm:flex-row">
								<div className="flex-1 flex flex-col justify-center w-8 sm:flex-row">
									<div className="rounded-tr-md border-t-2 border-r-2 w-full h-[34.85%] sm:rounded-tr-none sm:rounded-tl sm:border-r-0 sm:border-l-2 sm:w-[34.85%] sm:h-10"></div>
									<div className="rounded-br-md border-b-2 border-r-2 w-full h-[34.85%] sm:rounded-br-none sm:rounded-tr sm:border-b-0 sm:border-t-2 sm:w-[34.85%] sm:h-10"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center w-8 sm:flex-row">
									<div className="rounded-tr-md border-t-2 border-r-2 w-full h-[34.85%] sm:rounded-tr-none sm:rounded-tl sm:border-r-0 sm:border-l-2 sm:w-[34.85%] sm:h-10"></div>
									<div className="rounded-br-md border-b-2 border-r-2 w-full h-[34.85%] sm:rounded-br-none sm:rounded-tr sm:border-b-0 sm:border-t-2 sm:w-[34.85%] sm:h-10"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center w-8 sm:flex-row">
									<div className="rounded-tr-md border-t-2 border-r-2 w-full h-[34.85%] sm:rounded-tr-none sm:rounded-tl sm:border-r-0 sm:border-l-2 sm:w-[34.85%] sm:h-10"></div>
									<div className="rounded-br-md border-b-2 border-r-2 w-full h-[34.85%] sm:rounded-br-none sm:rounded-tr sm:border-b-0 sm:border-t-2 sm:w-[34.85%] sm:h-10"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center w-8 sm:flex-row">
									<div className="rounded-tr-md border-t-2 border-r-2 w-full h-[34.85%] sm:rounded-tr-none sm:rounded-tl sm:border-r-0 sm:border-l-2 sm:w-[34.85%] sm:h-10"></div>
									<div className="rounded-br-md border-b-2 border-r-2 w-full h-[34.85%] sm:rounded-br-none sm:rounded-tr sm:border-b-0 sm:border-t-2 sm:w-[34.85%] sm:h-10"></div>
								</div>
							</div>
							<div className="flex flex-col gap-12 sm:flex-row">
								<div className="flex-1 flex flex-col justify-center items-center w-8 sm:w-auto sm:h-12">
									<div className="border w-full sm:w-0 sm:h-full"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center items-center w-8 sm:w-auto sm:h-12">
									<div className="border w-full sm:w-0 sm:h-full"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center items-center w-8 sm:w-auto sm:h-12">
									<div className="border w-full sm:w-0 sm:h-full"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center items-center w-8 sm:w-auto sm:h-12">
									<div className="border w-full sm:w-0 sm:h-full"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-12 sm:flex-row">
						{ties.semiFinals.map((tie, index) => (
							<TieCard
								key={`${tie.teams[1]?.id ?? `s${index}null`}-${tie.teams[1]?.id ?? `s${index}null`}`}
								tie={tie}
								onSelect={(winner) =>
									handleSelectWinner("semiFinals", index, winner)
								}
							/>
						))}
					</div>
					<div className="flex sm:flex-col-reverse">
						<div className="flex sm:flex-col-reverse">
							<div className="flex flex-col gap-12 sm:flex-row">
								<div className="flex-1 flex flex-col justify-center w-6 sm:flex-row">
									<div className="rounded-tr-md border-t-2 border-r-2 w-full h-[28.75%] sm:rounded-tr-none sm:rounded-tl sm:border-r-0 sm:border-l-2 sm:w-[28.75%] sm:h-12"></div>
									<div className="rounded-br-md border-b-2 border-r-2 w-full h-[28.75%] sm:rounded-br-none sm:rounded-tr sm:border-b-0 sm:border-t-2 sm:w-[28.75%] sm:h-12"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center w-6 sm:flex-row">
									<div className="rounded-tr-md border-t-2 border-r-2 w-full h-[28.75%] sm:rounded-tr-none sm:rounded-tl sm:border-r-0 sm:border-l-2 sm:w-[28.75%] sm:h-12"></div>
									<div className="rounded-br-md border-b-2 border-r-2 w-full h-[28.75%] sm:rounded-br-none sm:rounded-tr sm:border-b-0 sm:border-t-2 sm:w-[28.75%] sm:h-12"></div>
								</div>
							</div>
							<div className="flex flex-col gap-12 sm:flex-row">
								<div className="flex-1 flex flex-col justify-center items-center w-6 sm:w-auto sm:h-12">
									<div className="border w-full sm:w-0 sm:h-full"></div>
								</div>
								<div className="flex-1 flex flex-col justify-center items-center w-6 sm:w-auto sm:h-12">
									<div className="border w-full sm:w-0 sm:h-full"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-12">
						<TieCard
							tie={ties.final}
							onSelect={(winner) => handleSelectWinner("final", 0, winner)}
						/>
					</div>
					<div className="flex sm:flex-col-reverse">
						<div className="flex sm:flex-col-reverse">
							<div className="flex flex-col gap-12 sm:flex-row">
								<div className="flex-1 flex flex-col justify-center w-4 sm:flex-row">
									<div className="rounded-tr-md border-t-2 border-r-2 w-full h-[26.75%] sm:rounded-tr-none sm:rounded-tl sm:border-r-0 sm:border-l-2 sm:w-[26.75%] sm:h-12"></div>
									<div className="rounded-br-md border-b-2 border-r-2 w-full h-[26.75%] sm:rounded-br-none sm:rounded-tr sm:border-b-0 sm:border-t-2 sm:w-[26.75%] sm:h-12"></div>
								</div>
							</div>
							<div className="flex flex-col gap-12 sm:flex-row">
								<div className="flex-1 flex flex-col justify-center items-center w-3 sm:w-auto sm:h-12">
									<div className="border w-full sm:w-0 sm:h-full"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center">
						{ties.final.winner !== null ? (
							<button
								type="button"
								className="relative size-10 transition-transform cursor-pointer hover:scale-115 sm:size-12 md:size-14"
								onClick={() => {
									setTies((prev) => {
										if (!prev) return prev

										return {
											...prev,
											final: {
												...prev.final,
												winner: null,
												teams: [...prev.final.teams],
											},
										}
									})
								}}
							>
								<CrownIcon className="absolute left-3/5 bottom-[80%] rotate-[30deg] text-amber-400 fill-amber-200" />
								{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
								<img
									alt={ties.final.teams[ties.final.winner]?.name}
									loading="lazy"
									className="w-auto size-full object-contain overflow-hidden"
									title={ties.final.teams[ties.final.winner]?.name}
									src={ties.final.teams[ties.final.winner]?.logoURL}
								/>
							</button>
						) : (
							<span className="inline-flex justify-center items-center rounded-full size-10 text-2xl font-medium bg-muted text-muted-foreground  sm:size-12 md:size-14">
								?
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

type tieCardProps = {
	tie: Tie
	onSelect: (winner: 0 | 1 | null) => void
}

function TieCard({ tie, onSelect }: tieCardProps) {
	const isDefined = tie.teams[0] && tie.teams[1]

	return (
		<div className="flex flex-col justify-evenly items-center gap-3 flex-1 sm:flex-row sm:gap-2 md:gap-4">
			{tie.teams[0] ? (
				<button
					type="button"
					className={cn(
						"size-10 md:size-12 transition-all",
						isDefined && "cursor-pointer hover:scale-115",
						tie.winner === 1 && "opacity-50 grayscale-50 hover:opacity-100",
					)}
					onClick={
						isDefined
							? () => (tie.winner !== 0 ? onSelect(0) : onSelect(null))
							: undefined
					}
				>
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={tie.teams[0].logoURL}
						alt={tie.teams[0].name}
						loading="lazy"
						className="size-full object-contain overflow-hidden"
						title={tie.teams[0].name}
					/>
				</button>
			) : (
				<span className="inline-flex justify-center items-center rounded-full size-10 text-2xl font-medium bg-muted text-muted-foreground sm:size-12">
					?
				</span>
			)}
			<span className="font-bold text-muted-foreground">VS</span>
			{tie.teams[1] ? (
				<button
					type="button"
					className={cn(
						"size-10 md:size-12 transition-all",
						isDefined && "cursor-pointer hover:scale-115",
						tie.winner === 0 && "opacity-50 grayscale-50 hover:opacity-100",
						tie.winner === 1,
					)}
					onClick={
						isDefined
							? () => (tie.winner !== 1 ? onSelect(1) : onSelect(null))
							: undefined
					}
				>
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={tie.teams[1].logoURL}
						alt={tie.teams[1].name}
						loading="lazy"
						className="size-full object-contain overflow-hidden"
						title={tie.teams[1].name}
					/>
				</button>
			) : (
				<span className="inline-flex justify-center items-center rounded-full size-10 text-2xl font-medium bg-muted text-muted-foreground sm:size-12">
					?
				</span>
			)}
		</div>
	)
}
