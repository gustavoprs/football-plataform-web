import type { Player } from "../types/player"
import { mapTeam } from "./teams"
import type { PlayerResponse } from "./types"

export function mapPlayer(api: PlayerResponse): Player {
	const player: Player = {
		id: api.id,
		name: api.name,
		age: api.age,
		number: api.number,
		position: api.position,
		photoUrl: api.photo_url,
		teamId: api.team_id,
		createdAt: new Date(api.created_at),
		updatedAt: new Date(api.updated_at),
	}

	if (api.team) {
		player.team = mapTeam(api.team)
	}

	return player
}
