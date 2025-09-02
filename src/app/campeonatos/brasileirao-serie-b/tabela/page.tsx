import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { getStandings } from "@/lib/footballApi"
import { getMatches } from "@/lib/footballApi/matches"
import MatchesTable from "../../_leagues/tables/components/MatchesTable"
import TableRow from "../../_leagues/tables/components/TableRow"

export default async function Page() {
	const standings = await getStandings(2, 2025)
	const matches = await getMatches(2, 2025)

	return (
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
								{standings.map((data, index) => (
									<TableRow
										key={data.id}
										position={index + 1}
										standing={data}
									/>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
					<div className="flex flex-col items-center gap-3 max-sm:w-full">
						<span className="w-full text-center text-3xl font-semibold sm:text-left sm:text-xl">
							Partidas
						</span>
						<MatchesTable matches={matches} />
					</div>
				</div>
			</section>
		</div>
	)
}
