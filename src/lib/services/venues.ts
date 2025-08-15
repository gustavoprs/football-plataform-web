import type { Venue } from "../types/venue"

const mockVenues: Venue[] = [
	{
		id: 1,
		name: "Neo Química Arena",
		capacity: 49205,
		address: "Avenida Miguel Inácio Curi, 111, Vila Carmosina, Itaquera",
		city: "São Paulo, São Paulo",
		country: "Brazil",
		surface: "grass",
		image: "https://media.api-sports.io/football/venues/11531.png",
	},
]

export async function getAllVenues(): Promise<Venue[]> {
	return mockVenues
}

export async function getVenueById(id: number): Promise<Venue | null> {
	return mockVenues.find(v => v.id === id) || null
}
