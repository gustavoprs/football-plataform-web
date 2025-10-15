import type { Competition } from "../types/competition"
import { apiFetch } from "./client"
import type { CompetitionResponse } from "./types"

export function mapCompetition(api: CompetitionResponse): Competition {
	return {
		id: api.id,
		logo: api.logo_url,
		name: api.name,
	}
}

export async function getCompetitionById(competitionId: Competition["id"]){
		const data = await apiFetch<CompetitionResponse>(
			`/competitions/${competitionId}`,
		)
	
		return mapCompetition(data)
}