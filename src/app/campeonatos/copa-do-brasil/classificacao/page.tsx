import { TabsContent } from "@/components/ui/tabs"
import { getMatches } from "@/lib/footballApi/matches"
import { getPhases } from "@/lib/footballApi/phases"
import type { Match } from "@/lib/types/match"
import MatchCard from "./components/MatchCard"
import TwoLeggedTieCard from "./components/TwoLeggedTieCard"
import PhaseTabs from "./PhaseTabs"
import TwoLeggedTiePlaceholderCard from "./components/TwoLeggedTiePlaceholderCard"

function groupMatches(matches: Match[]): Record<number, Match[][] | Match[]> {
	const keyMap = new Map<number, number>()
	const matchesRecord: Record<number, Match[][] | Match[]> = {}

	let newKey = 1

	for (const match of matches) {
		if (!keyMap.has(match.phase)) {
			keyMap.set(match.phase, newKey)
			matchesRecord[keyMap.get(match.phase) || 0] = []
			newKey++
		}

		;(matchesRecord[keyMap.get(match.phase) || 0] as Match[]).push(match)
	}

	for (let i = 3; i < 7; i++) {
		const phaseMatches = matchesRecord[i] as Match[]
		if (!phaseMatches) continue

		const tieMap = new Map<string, Match[]>()

		for (const match of phaseMatches) {
			const teamIds = [match.homeTeam.id, match.awayTeam.id].sort(
				(a, b) => a - b,
			)
			const tieKey = `${teamIds[0]}-${teamIds[1]}`

			const tieList = tieMap.get(tieKey) || []
			tieList.push(match)
			tieMap.set(tieKey, tieList)
		}

		matchesRecord[i] = Array.from(tieMap.values())
	}

	return matchesRecord
}

export default async function Page() {
	const matches = await getMatches(3, 2025)

	const phasesMatches = await getPhases(3, 2025)

	const matchesByPhase = groupMatches(matches)

	return (
		<div className="p-4">
			<div className="flex flex-col mx-auto flex-1 max-w-screen-xl w-full">
				<section className="flex flex-col gap-3">
					<PhaseTabs>
						<TabsContent value="primeira-fase">
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
								{phasesMatches[0].matches?.map((match, index) => (
									<MatchCard
										key={match.id}
										match={match}
										index={`Chave ${index + 1}`}
									/>
								))}
							</div>
						</TabsContent>
						<TabsContent value="segunda-fase">
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
								{matchesByPhase[2] !== undefined &&
									(matchesByPhase[2] as Match[]).map((match, index) => (
										<MatchCard
											key={match.id}
											match={match}
											index={`Chave ${index + 1}`}
										/>
									))}
							</div>
						</TabsContent>
						<TabsContent value="terceira-fase">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
								{matchesByPhase[3] !== undefined &&
									(matchesByPhase[3] as Array<Match[]>).map(
										(matches, index) => (
											<TwoLeggedTieCard
												key={`${matches[0].id}${matches[1].id}`}
												firstMatch={matches[0]}
												secondMatch={matches[1]}
												index={`Chave ${index + 1}`}
											/>
										),
									)}
							</div>
						</TabsContent>
						<TabsContent value="oitavas-de-final">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								{matchesByPhase[4] !== undefined &&
									(matchesByPhase[4] as Array<Match[]>).map(
										(matches, index) => (
											<TwoLeggedTieCard
												key={`${matches[0].id}${matches[1].id}`}
												firstMatch={matches[0]}
												secondMatch={matches[1]}
												index={`Oitavas ${index + 1}`}
											/>
										),
									)}
							</div>
						</TabsContent>
						<TabsContent value="quartas-de-final">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								{matchesByPhase[5] !== undefined &&
									(matchesByPhase[5] as Array<Match[]>).map(
										(matches, index) => (
											<TwoLeggedTieCard
												key={`${matches[0].id}${matches[1].id}`}
												firstMatch={matches[0]}
												secondMatch={matches[1]}
												index={`Quartas ${index + 1}`}
											/>
										),
									)}
							</div>
						</TabsContent>
						<TabsContent value="semifinal">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								{matchesByPhase[6] !== undefined
									? (matchesByPhase[6] as Array<Match[]>).map(
										(matches, index) => (
											<TwoLeggedTieCard
												key={`${matches[0].id}${matches[1].id}`}
												firstMatch={matches[0]}
												secondMatch={matches[1]}
												index={`Semifinal ${index + 1}`}
											/>
										),
									) : <>
										<TwoLeggedTiePlaceholderCard 
											index="Semifinal 1"
											firstTeamLabel="Venc. Quartas 1 ou 2"
											secondTeamLabel="Venc. Quartas 1 ou 2"
										/>
										<TwoLeggedTiePlaceholderCard 
											index="Semifinal 2"
											firstTeamLabel="Venc. Quartas 3 ou 4"
											secondTeamLabel="Venc. Quartas 3 ou 4"
										/>
									</>}
							</div>
						</TabsContent>
						<TabsContent value="final">
							{matchesByPhase[7] !== undefined 
								? (
									<TwoLeggedTieCard
										index={"Final"}
										firstMatch={(matchesByPhase[7] as Array<Match[]>)[0][0]}
										secondMatch={(matchesByPhase[7] as Array<Match[]>)[0][1]}
									/>
								) : (
									<TwoLeggedTiePlaceholderCard 
										index="Final"
										firstTeamLabel="Venc. Semi 1 ou 2"
										secondTeamLabel="Venc. Semi 1 ou 2"
									/>
								)
							}
						</TabsContent>
					</PhaseTabs>
				</section>
			</div>
		</div>
	)
}
