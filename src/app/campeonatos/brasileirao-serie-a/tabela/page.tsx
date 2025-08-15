import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import MatchesRow from "./components/MatchesRow"
import TableRow from "./components/TableRow"

const data = [
	{
		name: "Cruzeiro",
		code: "CRU",
		logo: "https://media.api-sports.io/football/teams/135.png",
	},
	{
		name: "Flamengo",
		code: "FLA",
		logo: "https://media.api-sports.io/football/teams/127.png",
	},
	{
		name: "RB Bragantino",
		code: "BRA",
		logo: "https://media.api-sports.io/football/teams/794.png",
	},
	{
		name: "Palmeiras",
		code: "PAL",
		logo: "https://media.api-sports.io/football/teams/121.png",
	},
	{
		name: "Botafogo",
		code: "BOT",
		logo: "https://media.api-sports.io/football/teams/120.png",
	},
	{
		name: "Bahia",
		code: "BAH",
		logo: "https://media.api-sports.io/football/teams/118.png",
	},
	{
		name: "Mirassol",
		code: "MIR",
		logo: "https://media.api-sports.io/football/teams/7848.png",
	},
	{
		name: "Fluminense",
		code: "FLU",
		logo: "https://media.api-sports.io/football/teams/124.png",
	},
	{
		name: "Atlético-MG",
		code: "CAM",
		logo: "https://media.api-sports.io/football/teams/1062.png",
	},
	{
		name: "Corinthians",
		code: "COR",
		logo: "https://media.api-sports.io/football/teams/131.png",
	},
	{
		name: "Ceará",
		code: "CEA",
		logo: "https://media.api-sports.io/football/teams/129.png",
	},
	{
		name: "Internacional",
		code: "INT",
		logo: "https://media.api-sports.io/football/teams/119.png",
	},
	{
		name: "Grêmio",
		code: "GRE",
		logo: "https://media.api-sports.io/football/teams/130.png",
	},
	{
		name: "São Paulo",
		code: "SAO",
		logo: "https://media.api-sports.io/football/teams/126.png",
	},
	{
		name: "Vitória",
		code: "VIT",
		logo: "https://media.api-sports.io/football/teams/136.png",
	},
	{
		name: "Vasco da Gama",
		code: "VAS",
		logo: "https://media.api-sports.io/football/teams/133.png",
	},
	{
		name: "Santos",
		code: "SAN",
		logo: "https://media.api-sports.io/football/teams/128.png",
	},
	{
		name: "Juventude",
		code: "JUV",
		logo: "https://media.api-sports.io/football/teams/152.png",
	},
	{
		name: "Fortaleza",
		code: "FOR",
		logo: "https://media.api-sports.io/football/teams/154.png",
	},
	{
		name: "Sport",
		code: "SPO",
		logo: "https://media.api-sports.io/football/teams/123.png",
	},
]

const matches = [
	{
		datetime: new Date("2025-07-20T16:00:00"),
		homeTeam: {
			name: "Cruzeiro",
			code: "CRU",
			logo: "https://media.api-sports.io/football/teams/135.png",
		},
		awayTeam: {
			name: "Flamengo",
			code: "FLA",
			logo: "https://media.api-sports.io/football/teams/127.png",
		},
		result: {
			home: 1,
			away: 2,
		},
	},
	{
		datetime: new Date("2025-07-21T18:30:00"),
		homeTeam: {
			name: "RB Bragantino",
			code: "BRA",
			logo: "https://media.api-sports.io/football/teams/794.png",
		},
		awayTeam: {
			name: "Palmeiras",
			code: "PAL",
			logo: "https://media.api-sports.io/football/teams/121.png",
		},
	},
	{
		datetime: new Date("2025-07-22T20:00:00"),
		homeTeam: {
			name: "Botafogo",
			code: "BOT",
			logo: "https://media.api-sports.io/football/teams/120.png",
		},
		awayTeam: {
			name: "Bahia",
			code: "BAH",
			logo: "https://media.api-sports.io/football/teams/118.png",
		},
		result: {
			home: 0,
			away: 0,
		},
	},
	{
		datetime: new Date("2025-07-23T17:00:00"),
		homeTeam: {
			name: "Mirassol",
			code: "MIR",
			logo: "https://media.api-sports.io/football/teams/7848.png",
		},
		awayTeam: {
			name: "Fluminense",
			code: "FLU",
			logo: "https://media.api-sports.io/football/teams/124.png",
		},
	},
	{
		datetime: new Date("2025-07-24T19:00:00"),
		homeTeam: {
			name: "Atlético-MG",
			code: "CAM",
			logo: "https://media.api-sports.io/football/teams/1062.png",
		},
		awayTeam: {
			name: "Corinthians",
			code: "COR",
			logo: "https://media.api-sports.io/football/teams/131.png",
		},
		result: {
			home: 2,
			away: 2,
		},
	},
	{
		datetime: new Date("2025-07-25T20:30:00"),
		homeTeam: {
			name: "Ceará",
			code: "CEA",
			logo: "https://media.api-sports.io/football/teams/129.png",
		},
		awayTeam: {
			name: "Internacional",
			code: "INT",
			logo: "https://media.api-sports.io/football/teams/119.png",
		},
	},
	{
		datetime: new Date("2025-07-26T15:00:00"),
		homeTeam: {
			name: "Grêmio",
			code: "GRE",
			logo: "https://media.api-sports.io/football/teams/130.png",
		},
		awayTeam: {
			name: "São Paulo",
			code: "SAO",
			logo: "https://media.api-sports.io/football/teams/126.png",
		},
		result: {
			home: 3,
			away: 1,
		},
	},
	{
		datetime: new Date("2025-07-26T17:30:00"),
		homeTeam: {
			name: "Vitória",
			code: "VIT",
			logo: "https://media.api-sports.io/football/teams/136.png",
		},
		awayTeam: {
			name: "Vasco da Gama",
			code: "VAS",
			logo: "https://media.api-sports.io/football/teams/133.png",
		},
	},
	{
		datetime: new Date("2025-07-27T11:00:00"),
		homeTeam: {
			name: "Santos",
			code: "SAN",
			logo: "https://media.api-sports.io/football/teams/128.png",
		},
		awayTeam: {
			name: "Juventude",
			code: "JUV",
			logo: "https://media.api-sports.io/football/teams/152.png",
		},
		result: {
			home: 2,
			away: 0,
		},
	},
	{
		datetime: new Date("2025-07-27T16:00:00"),
		homeTeam: {
			name: "Fortaleza",
			code: "FOR",
			logo: "https://media.api-sports.io/football/teams/154.png",
		},
		awayTeam: {
			name: "Sport",
			code: "SPO",
			logo: "https://media.api-sports.io/football/teams/123.png",
		},
	},
]

export default function Page() {
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
								<div
									className="flex-1 min-w-20 text-center"
									title="Resultados recentes"
								>
									Recentes
								</div>
							</div>
							<div>
								{data.map((data, index) => (
									<TableRow key={data.code} position={index + 1} data={data} />
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
					<div className="flex flex-col items-center gap-3 max-sm:w-full">
						<span className="w-full text-center text-3xl font-semibold sm:text-left sm:text-xl">
							Partidas
						</span>
						<div className="flex flex-col gap-4 flex-1 min-w-56 w-full sm:gap-2 sm:w-max">
							<div className="flex justify-between items-center gap-2">
								<Button
									size="icon"
									variant="ghost"
									className="size-7 cursor-pointer"
								>
									<ChevronLeftIcon />
								</Button>
								<span className="font-medium">14° Rodada</span>
								<Button
									size="icon"
									variant="ghost"
									className="size-7 cursor-pointer"
								>
									<ChevronRightIcon />
								</Button>
							</div>
							<div className="flex flex-col rounded-sm border flex-1 overflow-hidden">
								{matches.map((data, index) => (
									<MatchesRow
										key={`${data.homeTeam.code}${data.awayTeam.code}`}
										index={index}
										datetime={data.datetime}
										homeTeam={data.homeTeam}
										awayTeam={data.awayTeam}
										result={data.result}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
