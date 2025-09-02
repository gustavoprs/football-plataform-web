import type { Match } from "../types/match"
import { apiFetch } from "./client"
import { mapCompetition } from "./competitions"
import type { MatchResponse } from "./types"

export function mapMatch(api: MatchResponse): Match {
	const match: Match = {
		id: api.id,
		round: api.round,
		date: new Date(api.date),
		score: {
			fullTime: {
				home: api.score.full_time.home,
				away: api.score.full_time.away,
			},
			halfTime: {
				home: api.score.half_time.home,
				away: api.score.half_time.away,
			},
			extraTime: {
				home: api.score.extra_time.home,
				away: api.score.extra_time.away,
			},
			penalty: {
				home: api.score.penalty.home,
				away: api.score.penalty.away,
			},
		},
		status: api.status,
		homeTeam: {
			id: api.home_team?.id ?? api.home_team_id,
			name: api.home_team?.name ?? "",
			code: api.home_team?.code ?? "",
			logoURL: api.home_team?.logo_url ?? "",
			venueId: api.home_team?.venue_id ?? 0,
		},
		awayTeam: {
			id: api.away_team?.id ?? api.away_team_id,
			name: api.away_team?.name ?? "",
			code: api.away_team?.code ?? "",
			logoURL: api.away_team?.logo_url ?? "",
			venueId: api.away_team?.venue_id ?? 0,
		},
		venue: {
			id: api.venue?.id ?? api.venue_id,
			name: api.venue?.name ?? "",
			capacity: api.venue?.capacity ?? 0,
			address: api.venue?.address ?? "",
			city: api.venue?.city ?? "",
			country: api.venue?.country ?? "",
			image: api.venue?.image_url ?? "",
		},
		phase: api.phase_id,
	}

	if (api.season?.competition) {
		match.competition = mapCompetition(api.season.competition)
	}

	return match
}

export async function getFilteredMatches({
	competitionIds,
	from,
	to,
	year,
}: {
	competitionIds?: number[]
	from?: Date
	to?: Date
	year?: number
}) {
	const params = new URLSearchParams()

	if (competitionIds && competitionIds.length > 0) {
		params.set("competitions", competitionIds.join(","))
	}
	if (from) {
		params.set("from", from.toISOString())
	}
	if (to) {
		params.set("to", to.toISOString())
	}
	if (year) {
		params.set("year", year.toString())
	}

	const queryString = params.toString()
	const url = queryString ? `/matches?${queryString}` : `/matches`

	const data = await apiFetch<MatchResponse[]>(url)
	return data.map(mapMatch)
}

export async function getMatches(competitionId: number, season: number) {
	const data = await apiFetch<MatchResponse[]>(
		`/competitions/${competitionId}/seasons/${season}/matches`,
	)

	return data.map(mapMatch)
}
