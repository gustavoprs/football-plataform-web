import type { Team } from "../types/team"
import { apiFetch } from "./client"
import type { TeamResponse } from "./types"

export function mapTeam(api: TeamResponse): Team {
	const team: Team = {
		id: api.id,
		code: api.code,
		logoURL: api.logo_url,
		name: api.name,
		venueId: api.venue_id,
	}

	return team
}

export async function getTeamsByCompetitionID(competitionId: number, season: number) {
	const data = await apiFetch<TeamResponse[]>(
		`/competitions/${competitionId}/seasons/${season}/teams`,
	)

	return data.map(mapTeam)
}
