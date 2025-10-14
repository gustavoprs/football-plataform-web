import type { Venue } from "../types/venue"
import type { VenueResponse } from "./types"

export function mapVenue(api: VenueResponse): Venue {
	const venue: Venue = {
		id: api.id,
		name: api.name,
		capacity: api.capacity,
		address: api.address,
		city: api.city,
		country: api.country,
		image: api.image_url,
	}

	return venue
}
