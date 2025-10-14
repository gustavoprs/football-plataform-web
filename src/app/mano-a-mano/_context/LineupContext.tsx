"use client"

import { createContext, useContext, useReducer } from "react"
import type { Player } from "@/lib/types/player"

type State = {
	lineup: Array<Player | null>
	formation: Array<number>
}

type Action =
	| { type: "SET_FORMATION"; payload: Array<number> }
	| { type: "SET_PLAYER"; payload: { player: Player | null; index: number } }
	| { type: "RESET_LINEUP" }

function lineupReducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_PLAYER": {
			const newLineup = state.lineup.map((p, index) => {
				if (index === action.payload.index) {
					return action.payload.player
				}

				if (p && p.id === action.payload.player?.id) {
					return null
				}

				return p
			})

			newLineup[action.payload.index] = action.payload.player

			return { ...state, lineup: newLineup }
		}
		case "RESET_LINEUP": {
			return { ...state, lineup: new Array(11).fill(null) }
		}
		case "SET_FORMATION":
			return { ...state, formation: action.payload }
		default:
			return state
	}
}

const LineupContext = createContext<{
	state: State
	dispatch: React.Dispatch<Action>
} | null>(null)

export function LineupProvider({
	defaultFormation = [4, 3, 3],
	children,
}: {
	defaultFormation?: Array<number>
	children: React.ReactNode
}) {
	const [state, dispatch] = useReducer(lineupReducer, {
		lineup: new Array(11).fill(null),
		formation: defaultFormation,
	})

	return (
		<LineupContext.Provider value={{ state, dispatch }}>
			{children}
		</LineupContext.Provider>
	)
}

export function useLineup() {
	const ctx = useContext(LineupContext)
	if (!ctx) throw new Error("useLineup must be used inside LineupProvider")
	return ctx
}
