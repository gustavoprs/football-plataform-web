import type { Competition } from "./competition"
import type { Team } from "./team"
import type { Venue } from "./venue"

export type Score = {
	halfTime: {
		home: number
		away: number
	}
	fullTime: {
		home: number
		away: number
	}
}

export type MatchStatus =
	| "scheduled"
	| "in_progress"
	| "finished"
	| "postponed"
	| "cancelled"

export type Match = {
	id: number
	date: Date
	status: MatchStatus

	homeTeam: Team
	awayTeam: Team

	score: Score

	venue: Venue

	competition: Competition
}
