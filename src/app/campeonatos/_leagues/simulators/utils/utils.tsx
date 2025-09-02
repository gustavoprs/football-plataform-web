import type { Match } from "@/lib/types/match"
import type { Standing } from "@/lib/types/standing"

export function calculateStandings(matches: Match[]) {
	const teamStats: Record<Standing["teamId"], Standing> = {}

	matches.forEach((match) => {
		const homeId = match.homeTeam.id
		const awayId = match.awayTeam.id

		if (!teamStats[homeId]) {
			teamStats[homeId] = {
				id: homeId,
				teamId: homeId,
				seasonId: 0,
				phaseId: match.phase,
				position: 0,
				points: 0,
				gamesPlayed: 0,
				wins: 0,
				draws: 0,
				losses: 0,
				goalsFor: 0,
				goalsAgainst: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				team: match.homeTeam,
			}
		}
		if (!teamStats[awayId]) {
			teamStats[awayId] = {
				id: awayId,
				teamId: awayId,
				seasonId: 0,
				phaseId: match.phase,
				position: 0,
				points: 0,
				gamesPlayed: 0,
				wins: 0,
				draws: 0,
				losses: 0,
				goalsFor: 0,
				goalsAgainst: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				team: match.awayTeam,
			}
		}

		const homeGoals = match.score.fullTime.home
		const awayGoals = match.score.fullTime.away

		if(homeGoals === -1 || awayGoals === -1){
			return
		}

		teamStats[homeId].gamesPlayed += 1
		teamStats[awayId].gamesPlayed += 1

		teamStats[homeId].goalsFor += homeGoals
		teamStats[homeId].goalsAgainst += awayGoals

		teamStats[awayId].goalsFor += awayGoals
		teamStats[awayId].goalsAgainst += homeGoals

		if (homeGoals > awayGoals) {
			teamStats[homeId].wins += 1
			teamStats[homeId].points += 3

			teamStats[awayId].losses += 1
		} else if (homeGoals < awayGoals) {
			teamStats[awayId].wins += 1
			teamStats[awayId].points += 3

			teamStats[homeId].losses += 1
		} else {
			teamStats[homeId].draws += 1
			teamStats[homeId].points += 1

			teamStats[awayId].draws += 1
			teamStats[awayId].points += 1
		}
	})

	const standingsArray = Object.values(teamStats).sort((a, b) => {
		const goalDiffA = a.goalsFor - a.goalsAgainst
		const goalDiffB = b.goalsFor - b.goalsAgainst

		if (b.points !== a.points) return b.points - a.points
		if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA
		return b.goalsFor - a.goalsFor
	})

	standingsArray.forEach((standing, index) => {
		standing.position = index + 1
	})

	return standingsArray
}
