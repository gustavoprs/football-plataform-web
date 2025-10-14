import type { Player } from "./player"
import type { Venue } from "./venue"

export type Team = {
	id: number
	name: string
	code: string
	logoURL: string
	venueId: number | null

	venue?: Venue
	players?: Player[]
}
