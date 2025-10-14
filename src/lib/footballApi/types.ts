/* Reponse */
export type ResponseStatus = "success" | "error"

export interface SuccessResponse<T> {
	status: "success"
	data: T
}

export interface ErrorDetail {
	code: number
	message: string
}

export interface ErrorResponse {
	status: "error"
	error: ErrorDetail
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

/* Response Data */
export interface CompetitionResponse {
	id: number
	name: string
	country: string
	logoUrl: string
	seasons: SeasonResponse[]
}

export interface PhaseResponse {
	id: number
	season_id: number
	name: string
	order: number
	type: "group_stage" | "knockout_single" | "knockout_two_legged"
	matches?: MatchResponse[]
	created_at: string
	updated_at: string
}

export interface MatchResponse {
	id: number
	home_team_id: number
	away_team_id: number
	season_id: number
	phase_id: number
	round?: number
	date: string
	venue_id: number
	score: {
		full_time: {
			home: number
			away: number
		}
		half_time: {
			home: number
			away: number
		}
		extra_time: {
			home: number
			away: number
		}
		penalty: {
			home: number
			away: number
		}
	}
	status: "scheduled" | "in_progress" | "finished" | "postponed" | "cancelled"
	season?: SeasonResponse
	home_team?: TeamResponse
	away_team?: TeamResponse
	venue?: VenueResponse
	created_at: string
	updated_at: string
}

export interface SeasonResponse {
	id: number
	competition_id: number
	format: "league" | "cup" | "tournament" | "friendly"
	year: number
	start: Date
	end: Date
	competition?: CompetitionResponse
	phases?: PhaseResponse[]
	matches?: MatchResponse[]
	standings?: StandingResponse[]
}

export interface StandingResponse {
	id: number
	team_id: number
	season_id: number
	phase_id: number
	position: number
	points: number
	games_played: number
	wins: number
	draws: number
	losses: number
	goals_for: number
	goals_against: number
	created_at: string
	updated_at: string

	team?: TeamResponse
}

export interface TeamResponse {
	id: number
	name: string
	code: string
	founded: number
	logo_url: string
	venue_id: number | null
	venue: VenueResponse
	players?: PlayerResponse[]
}

export interface VenueResponse {
	id: number
	name: string
	address: string
	city: string
	state: string
	country: string
	capacity: number
	image_url: string
	created_at: string
	updated_at: string
}

export interface PlayerResponse {
	id: number
	name: string
	age: number | null
	number: number | null
	position: "goalkeeper" | "defender" | "midfielder" | "attacker"
	photo_url: string
	team_id: number | null
	created_at: string
	updated_at: string
	team?: TeamResponse
}
