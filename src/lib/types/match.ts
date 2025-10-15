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
	extraTime: {
		home: number
		away: number
	}
	penalty: {
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
	round?: number
	date: Date
	status: MatchStatus

	homeTeam: Team
	awayTeam: Team

	score: Score

	venue: Venue

	phase: number
	competition?: Competition
}

export function getMatchStatusLabel(
	status: MatchStatus | null,
	locale: "pt" | "en" = "pt",
) {
	const labels =
		locale === "en"
			? {
					scheduled: "Scheduled",
					in_progress: "In progress",
					finished: "Finished",
					postponed: "Postponed",
					cancelled: "Cancelled",
				}
			: {
					scheduled: "Agendado",
					in_progress: "Em andamento",
					finished: "Encerrado",
					postponed: "Adiato",
					cancelled: "Cancelado",
				}

	return status ? labels[status] : locale === "en" ? "No status" : "Sem status"
}
