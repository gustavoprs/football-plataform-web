"use client"

import type { Player, PlayerPosition } from "@/lib/types/player"
import type { Team } from "@/lib/types/team"
import { useLineup } from "../../_context/LineupContext"
import PlayerSelect from "../PlayerSelect"
import PlayerButton from "./PlayerButton"

function groupPlayersByPosition(players: Player[]) {
	players = players.sort((a, b) => {
		if (a.number === null && b.number === null) return 0
		if (a.number === null) return 1
		if (b.number === null) return -1
		return a.number - b.number
	})

	const grouped: Record<PlayerPosition | "unknown", Player[]> = {
		goalkeeper: [],
		defender: [],
		midfielder: [],
		attacker: [],
		unknown: [],
	}

	players.forEach((player) =>
		player.position
			? grouped[player.position].push(player)
			: grouped.unknown.push(player),
	)

	return grouped
}

function getPositionsFromFormation(formation: number[]): PlayerPosition[] {
	const positions: PlayerPosition[] = []
	const n = formation.length

	formation.forEach((playersInLine, index) => {
		let position: PlayerPosition

		if (index === 0) {
			position = "defender"
		} else if (index === n - 1) {
			position = "attacker"
		} else {
			position = "midfielder"
		}

		for (let i = 0; i < playersInLine; i++) {
			positions.push(position)
		}
	})

	return positions
}

type Props = {
	homeTeam: Team
	awayTeam: Team
}

export default function Players({ homeTeam, awayTeam }: Props) {
	const {
		state: { formation, lineup },
		dispatch,
	} = useLineup()

	function handleSelect(player: Player | null, index: number) {
		dispatch({ type: "SET_PLAYER", payload: { player, index } })
	}

	const homeTeamPlauers = groupPlayersByPosition(
		homeTeam.players ? homeTeam.players.filter((p) => p.number) : [],
	)
	const awayTeamPlauers = groupPlayersByPosition(
		awayTeam.players ? awayTeam.players.filter((p) => p.number) : [],
	)

	const positions = getPositionsFromFormation(formation)
	let playerIndex = -1

	return (
		<div className="z-2 absolute flex flex-col-reverse justify-evenly items-center gap-2 py-[8%] size-full">
			<PlayerSelect
				defaultSelectedId={lineup[0]?.id ?? null}
				homeTeam={homeTeam}
				awayTeam={awayTeam}
				homeTeamPlayers={homeTeamPlauers}
				awayTeamPlayers={awayTeamPlauers}
				defaultPosition="goalkeeper"
				className="rounded-full aspect-square w-1/6 shadow-xl cursor-pointer"
				onSelect={(p) => handleSelect(p, 0)}
			>
				<PlayerButton player={lineup[0]} />
			</PlayerSelect>
			{[...formation].map((players, i) => {
				return (
					<div
						key={`${players + i.toString()}`}
						className="flex flex-row-reverse justify-evenly items-center gap-2.5 flex-1 w-full"
					>
						{[...Array(Number(players))].map((_, j) => {
							const positionIndex = playerIndex + 1
							playerIndex++

							return (
								<PlayerSelect
									key={`${players + i.toString() + j.toString()}`}
									defaultSelectedId={lineup[positionIndex + 1]?.id ?? null}
									homeTeam={homeTeam}
									awayTeam={awayTeam}
									homeTeamPlayers={homeTeamPlauers}
									awayTeamPlayers={awayTeamPlauers}
									defaultPosition={positions[playerIndex]}
									className="rounded-full aspect-square w-1/6 shadow-xl cursor-pointer"
									onSelect={(p) => handleSelect(p, positionIndex + 1)}
								>
									<PlayerButton player={lineup[positionIndex + 1]} />
								</PlayerSelect>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
