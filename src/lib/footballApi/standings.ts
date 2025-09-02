import type { Standing } from "../types/standing"
import { apiFetch } from "./client"
import { mapTeam } from "./teams"
import type { StandingResponse } from "./types"

export function mapStanding(api: StandingResponse): Standing {
	const standing: Standing = {
		id: api.id,
		teamId: api.team_id,
		seasonId: api.season_id,
		phaseId: api.phase_id,
		position: api.position,
		points: api.points,
		gamesPlayed: api.games_played,
		wins: api.wins,
		draws: api.draws,
		losses: api.losses,
		goalsFor: api.goals_for,
		goalsAgainst: api.goals_against,
		createdAt: new Date(api.created_at),
		updatedAt: new Date(api.updated_at),
	}

	if (api.team) {
		standing.team = mapTeam(api.team)
	}

	return standing
}

export async function getStandings(competitionId: number, season: number) {
	const data = await apiFetch<StandingResponse[]>(
		`/competitions/${competitionId}/seasons/${season}/standings`,
	)

	return data.map(mapStanding)
}
