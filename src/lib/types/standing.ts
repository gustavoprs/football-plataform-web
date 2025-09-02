import type { Team } from "./team"

export type Standing = {
	id: number
	teamId: number
	seasonId: number
	phaseId: number
	position: number
	points: number
	gamesPlayed: number
	wins: number
	draws: number
	losses: number
	goalsFor: number
	goalsAgainst: number
	createdAt: Date
	updatedAt: Date

	team?: Team
}
