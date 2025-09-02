import type { Team } from "../types/team"
import type { TeamResponse } from "./types"

export function mapTeam(api: TeamResponse): Team {
	return {
		id: api.id,
		code: api.code,
		logoURL: api.logo_url,
		name: api.name,
		venueId: api.venue_id,
	}
}
