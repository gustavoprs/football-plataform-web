import type { Phase } from "../types/phase"
import { apiFetch } from "./client"
import { mapMatch } from "./matches"
import type { PhaseResponse } from "./types"

export function mapPhase(api: PhaseResponse): Phase {
	const phase: Phase = {
		id: api.id,
		name: api.name,
		order: api.order,
		type: api.type,
		createdAt: new Date(api.created_at),
		updatedAt: new Date(api.updated_at),
	}

	if (api.matches) {
		phase.matches = api.matches.map(mapMatch)
	}

	return phase
}

export async function getPhases(competitionId: number, season: number) {
	const data = await apiFetch<PhaseResponse[]>(
		`/competitions/${competitionId}/seasons/${season}/phases/matches`,
	)

	return data.map(mapPhase)
}
