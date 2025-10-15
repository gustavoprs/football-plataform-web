import { TabsContent } from "@/components/ui/tabs"
import { getCompetitionById } from "@/lib/footballApi/competitions"
import { getPhases } from "@/lib/footballApi/phases"
import type { Match } from "@/lib/types/match"
import MatchCard from "./components/MatchCard"
import TwoLeggedTieCard from "./components/TwoLeggedTieCard"
import TwoLeggedTiePlaceholderCard from "./components/TwoLeggedTiePlaceholderCard"
import PhaseTabs from "./PhaseTabs"

function groupTies(matches: Match[]) {
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

export default async function Page() {
	const competition = await getCompetitionById(3)

	const phasesMatches = (await getPhases(3, 2025)).map((p) => ({
		...p,
		matches: p.matches?.map((m) => ({ ...m, competition: competition })),
	}))

	const finalMatches = phasesMatches[6].matches || []

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
								{phasesMatches[1].matches && phasesMatches[1].matches.length > 0
									? phasesMatches[1].matches.map((match, index) => (
											<MatchCard
												key={match.id}
												match={match}
												index={`Chave ${index + 1}`}
											/>
										))
									: new Array(20)
											.fill(0)
											.map((_, index) => (
												<TwoLeggedTiePlaceholderCard
													key={`secondPhase-${index * 2 + 1}-${index * 2 + 2}`}
													index={`Chave ${index + 1}`}
													firstTeamLabel={`Venc. 1ª fase ${index * 2 + 1} ou ${index * 2 + 2}`}
													secondTeamLabel={`Venc. 1ª fase ${index * 2 + 1} ou ${index * 2 + 2}`}
												/>
											))}
							</div>
						</TabsContent>
						<TabsContent value="terceira-fase">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
								{phasesMatches[2].matches &&
									groupTies(phasesMatches[2].matches).map((tie, index) => (
										<TwoLeggedTieCard
											key={`${tie[0].id}-${tie[1].id}`}
											firstMatch={tie[0]}
											secondMatch={tie[1]}
											index={`Chave ${index + 1}`}
										/>
									))}
							</div>
						</TabsContent>
						<TabsContent value="oitavas-de-final">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								{phasesMatches[3].matches &&
									groupTies(phasesMatches[3].matches).map((tie, index) => (
										<TwoLeggedTieCard
											key={`${tie[0].id}-${tie[1].id}`}
											firstMatch={tie[0]}
											secondMatch={tie[1]}
											index={`Oitavas ${index + 1}`}
										/>
									))}
							</div>
						</TabsContent>
						<TabsContent value="quartas-de-final">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								{phasesMatches[4].matches &&
									groupTies(phasesMatches[4].matches).map((tie, index) => (
										<TwoLeggedTieCard
											key={`${tie[0].id}-${tie[1].id}`}
											firstMatch={tie[0]}
											secondMatch={tie[1]}
											index={`Quartas ${index + 1}`}
										/>
									))}
							</div>
						</TabsContent>
						<TabsContent value="semifinal">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								{phasesMatches[5].matches &&
								phasesMatches[5].matches.length > 0 ? (
									groupTies(phasesMatches[5].matches).map((tie, index) => (
										<TwoLeggedTieCard
											key={`${tie[0].id}-${tie[1].id}`}
											firstMatch={tie[0]}
											secondMatch={tie[1]}
											index={`Semifinal ${index + 1}`}
										/>
									))
								) : (
									<>
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
									</>
								)}
							</div>
						</TabsContent>
						<TabsContent value="final">
							{finalMatches.length === 2 ? (
								<TwoLeggedTieCard
									key={`${finalMatches[0].id}-${finalMatches[1].id}`}
									firstMatch={finalMatches[0]}
									secondMatch={finalMatches[1]}
									index="Final"
								/>
							) : (
								<TwoLeggedTiePlaceholderCard
									index="Final"
									firstTeamLabel="Venc. Semi 1 ou 2"
									secondTeamLabel="Venc. Semi 1 ou 2"
								/>
							)}
						</TabsContent>
					</PhaseTabs>
				</section>
			</div>
		</div>
	)
}
