import type { Match } from "../types/match"

const mockMatches: Match[] = [
	{
		id: 1,
		date: new Date(),
		status: "finished",
		homeTeam: {
			id: 1,
			name: "Corinthias",
			code: "COR",
			logo: "https://media.api-sports.io/football/teams/131.png",
		},
		awayTeam: {
			id: 2,
			name: "Palmeiras",
			code: "PAL",
			logo: "https://media.api-sports.io/football/teams/121.png",
		},
		score: {
			halfTime: {
				home: 0,
				away: 0,
			},
			fullTime: {
				home: 1,
				away: 0,
			},
		},
		venue: {
			id: 1,
			name: "Neo Química Arena",
			capacity: 49205,
			address: "Avenida Miguel Inácio Curi, 111, Vila Carmosina, Itaquera",
			city: "São Paulo, São Paulo",
			country: "Brazil",
			image: "https://media.api-sports.io/football/venues/11531.png",
		},
		competition: {
			id: 1,
			name: "Serie A",
			type: "league",
			logo: "https://media.api-sports.io/football/leagues/71.png",
		},
	},
	{
		id: 2,
		date: new Date(),
		status: "scheduled",
		homeTeam: {
			id: 1,
			name: "Corinthias",
			code: "COR",
			logo: "https://media.api-sports.io/football/teams/131.png",
		},
		awayTeam: {
			id: 2,
			name: "Palmeiras",
			code: "PAL",
			logo: "https://media.api-sports.io/football/teams/121.png",
		},
		score: {
			halfTime: {
				home: 0,
				away: 0,
			},
			fullTime: {
				home: 0,
				away: 0,
			},
		},
		venue: {
			id: 1,
			name: "Neo Química Arena",
			capacity: 49205,
			address: "Avenida Miguel Inácio Curi, 111, Vila Carmosina, Itaquera",
			city: "São Paulo, São Paulo",
			country: "Brazil",
			image: "https://media.api-sports.io/football/venues/11531.png",
		},
		competition: {
			id: 2,
			name: "Copa do Brasil",
			type: "league",
			logo: "https://media.api-sports.io/football/leagues/73.png",
		},
	},
]

export async function getAllMatches(): Promise<Match[]> {
	return mockMatches
}

export async function getMatchById(id: number): Promise<Match | null> {
	return mockMatches.find((f) => f.id === id) || null
}
