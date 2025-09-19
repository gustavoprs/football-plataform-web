import type { Match } from "@/lib/types/match"

export function groupTies(matches: Match[]) {
	const grouped: { [key: string]: Match[] } = {}

	matches.forEach((match) => {
		const teamIds = [match.homeTeam.id, match.awayTeam.id].sort()
		const key = teamIds.join("-")

		if (!grouped[key]) {
			grouped[key] = []
		}

		grouped[key].push(match)
	})

	return Object.values(grouped)
}
