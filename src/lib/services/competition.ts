import type { Competition } from "../types/competition"

const mockCompetitions: Competition[] = [
	{
		id: 1,
		name: "Brasileiro Série A",
		type: "league",
		country: "Brazil",
		logo: "https://media.api-sports.io/football/leagues/71.png"
	},
	{
		id: 2,
		name: "Copa do Brasil",
		type: "cup",
		country: "Brazil",
		logo: "https://media.api-sports.io/football/leagues/73.png"
	}
]

export async function getAllCompetitions(): Promise<Competition[]> {
	return mockCompetitions
}

export async function getCompetitionById(id: number): Promise<Competition | null> {
	return mockCompetitions.find(c => c.id === id) || null
}