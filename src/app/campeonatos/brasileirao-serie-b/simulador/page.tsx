import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getMatches } from "@/lib/footballApi/matches"
import SimulatorMatchesTable from "../../_leagues/simulators/components/SimulatorMatchesTable"
import SimulatorStandingsTableRows from "../../_leagues/simulators/components/SimulatorStandingsTableRows"
import { LeagueProvider } from "../../_leagues/simulators/context/LeagueContext"
import { calculateStandings } from "../../_leagues/simulators/utils/utils"

export default async function Page() {
	const matches = (await getMatches(2, 2025)).map((match) => {
		if (match.status !== "finished") {
			match.score.fullTime.home = -1
			match.score.fullTime.away = -1
		}

		return match
	})

	return (
		<LeagueProvider
			initialMatches={matches}
			initalStandings={calculateStandings(matches)}
		>
			<div className="flex flex-col p-4 flex-1">
				<section className=" flex flex-col gap-3">
					<div className="flex flex-col justify-center items-center gap-4 sm:flex-row sm:items-stretch">
						<div className="flex flex-col gap-3 max-w-[850px] overflow-auto max-sm:w-full sm:flex-2">
							<span className="text-center text-3xl font-semibold sm:text-left sm:text-xl">
								Tabela
							</span>
							<ScrollArea className="w-full">
								<div className="relative flex items-center mb-2 h-7 text-sm text-muted-foreground">
									<div className="sticky left-0 min-w-28 h-5 bg-background">
										Classificação
									</div>
									<div className="flex-1 min-w-10 text-center" title="Pontos">
										P
									</div>
									<div className="flex-1 min-w-10 text-center" title="Jogos">
										J
									</div>
									<div className="flex-1 min-w-10 text-center" title="Vitórias">
										V
									</div>
									<div className="flex-1 min-w-10 text-center" title="Empates">
										E
									</div>
									<div className="flex-1 min-w-10 text-center" title="Derrotas">
										D
									</div>
									<div
										className="flex-1 min-w-10 text-center"
										title="Saldo de gols"
									>
										SG
									</div>
									<div className="flex-1 min-w-10 text-center" title="Gols pró">
										GP
									</div>
									<div
										className="flex-1 min-w-10 text-center"
										title="Gols contra"
									>
										GC
									</div>
									<div
										className="flex-1 min-w-10 text-center"
										title="Aproveitamento em porcentagem"
									>
										%
									</div>
									{/* <div
										className="flex-1 min-w-20 text-center"
										title="Resultados recentes"
									>
										Recentes
									</div> */}
								</div>
								<div>
									<SimulatorStandingsTableRows />
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
						<div className="flex flex-col items-center gap-3 max-sm:w-full">
							<span className="w-full text-center text-3xl font-semibold sm:text-left sm:text-xl">
								Partidas
							</span>
							<SimulatorMatchesTable matches={matches} />
						</div>
					</div>
				</section>
			</div>
		</LeagueProvider>
	)
}
