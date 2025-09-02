"use client"

import { createContext, useContext, useReducer } from "react"
import type { Match } from "@/lib/types/match"
import type { Standing } from "@/lib/types/standing"
import { calculateStandings } from "../utils/utils"

type State = {
	matches: Match[]
	standings: Standing[]
}

type Action =
	| { type: "SET_MATCHES"; payload: Match[] }
	| {
			type: "UPDATE_MATCH"
			id: Match["id"]
			homeTeamId: Match["homeTeam"]["id"]
			awayTeamId: Match["awayTeam"]["id"]
			score: Match["score"]["fullTime"]
	  }

function leagueReducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_MATCHES":
			return { ...state, matches: action.payload }
		case "UPDATE_MATCH": {
			const updatedMatches = state.matches.map((m) => {
				return m.id === action.id
					? {
							...m,
							score: {
								...m.score,
								fullTime: action.score,
							},
						}
					: m
			})

			const updatedStandings = calculateStandings(updatedMatches)

			return { matches: updatedMatches, standings: updatedStandings }
		}
		default:
			return state
	}
}

const LeagueContext = createContext<{
	state: State
	dispatch: React.Dispatch<Action>
} | null>(null)

export function LeagueProvider({
	children,
	initialMatches,
	initalStandings,
}: {
	children: React.ReactNode
	initialMatches: Match[]
	initalStandings: Standing[]
}) {
	const [state, dispatch] = useReducer(leagueReducer, {
		matches: initialMatches,
		standings: initalStandings,
	})

	return (
		<LeagueContext.Provider value={{ state, dispatch }}>
			{children}
		</LeagueContext.Provider>
	)
}

export function useLeague() {
	const ctx = useContext(LeagueContext)
	if (!ctx) throw new Error("useLeague must be used inside LeagueProvider")
	return ctx
}
