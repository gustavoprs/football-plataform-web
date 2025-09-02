import type { Competition } from "../types/competition"
import type { CompetitionResponse } from "./types"

export function mapCompetition(api: CompetitionResponse): Competition {
	return {
		id: api.id,
		logo: api.logoUrl,
		name: api.name,
	}
}
