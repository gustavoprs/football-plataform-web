import type { Team } from "../types/team"
import { apiFetch } from "./client"
import { mapPlayer } from "./players"
import type { TeamResponse } from "./types"
import { mapVenue } from "./venue"

export function mapTeam(api: TeamResponse): Team {
	const team: Team = {
		id: api.id,
		code: api.code,
		logoURL: api.logo_url,
		name: api.name,
		venueId: api.venue_id,
	}

	if(api.venue){
		team.venue = mapVenue(api.venue)
	}

	if(api.players){
		team.players = api.players.map(mapPlayer)
	}

	return team
}

export async function getTeamWithPlayers(teamId: number) {
	const data = await apiFetch<TeamResponse>(
		`/teams/${teamId}/players`
	)

	return mapTeam(data)
}

export async function getTeamsByCompetitionID(competitionId: number, season: number) {
	const data = await apiFetch<TeamResponse[]>(
		`/competitions/${competitionId}/seasons/${season}/teams`,
	)

	return data.map(mapTeam)
}
