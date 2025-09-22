/** biome-ignore-all lint/performance/noImgElement: <hostname not configured> */
"use client"

import { endOfDay, isWithinInterval, startOfDay } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { useMemo, useState } from "react"
import type { DateRange } from "react-day-picker"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import ResponsiveDateRangePicker from "@/components/ui/ResponsiveDateRangePicker"
import ResponsiveSelect from "@/components/ui/ResponsiveSelect"
import type { Match } from "@/lib/types/match"
import { MatchCard } from "./MatchCard"

type ContentProps = {
	matches: Match[]
}

const competitionOptions = [
	{
		value: "brasileirao-serie-a",
		label: (
			<div className="inline-flex items-center gap-2">
				<img
					src="https://media.api-sports.io/football/leagues/71.png"
					alt="Logo"
					className="size-4 overflow-hidden"
				/>
				Brasileirão Série A
			</div>
		),
		searchLabel: "Brasileirão Serie A",
	},
	{
		value: "brasileirao-serie-b",
		label: (
			<div className="inline-flex items-center gap-2">
				<img
					src="https://media.api-sports.io/football/leagues/72.png"
					alt="Logo"
					className="size-4 overflow-hidden"
				/>
				Brasileirão Série B
			</div>
		),
		searchLabel: "Brasileirão Serie B",
	},
	{
		value: "copa-do-brasil",
		label: (
			<div className="inline-flex items-center gap-2">
				<img
					src="https://media.api-sports.io/football/leagues/73.png"
					alt="Logo"
					className="size-4 overflow-hidden"
				/>
				Copa do Brasil
			</div>
		),
		searchLabel: "Copa do Brasil",
	},
]

export function Content({ matches }: ContentProps) {
	const [selectedDateRange, setSelectedDateRange] = useState<
		DateRange | undefined
	>({
		from: new Date(),
		to: new Date(),
	})
	const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([
		"brasileirao-serie-a",
		"brasileirao-serie-b",
		"copa-do-brasil",
	])
	const [selectedTeams, setSelectedTeams] = useState<number[]>([])

	const teamsOptions = useMemo(() => {
		return Array.from(
			new Map(
				matches.flatMap((match) => [
					[
						match.homeTeam.id,
						{
							label: (
								<div className="inline-flex items-center gap-2">
									<img
										src={match.homeTeam.logoURL}
										alt="Escudo"
										loading="lazy"
										className="size-4 overflow-hidden"
									/>
									{match.homeTeam.name}
								</div>
							),
							value: match.homeTeam.id,
							searchLabel: match.homeTeam.name,
						},
					],
					[
						match.awayTeam.id,
						{
							label: (
								<div className="inline-flex items-center gap-2">
									<img
										src={match.awayTeam.logoURL}
										alt="Escudo"
										loading="lazy"
										className="size-4 overflow-hidden"
									/>
									{match.awayTeam.name}
								</div>
							),
							value: match.awayTeam.id,
							searchLabel: match.awayTeam.name,
						},
					],
				]),
			),
		)
			.map(([, option]) => option)
			.sort((a, b) => a.searchLabel.localeCompare(b.searchLabel))
	}, [matches])

	/* Filter matches */
	const filteredMatches = matches.filter((match) => {
		const start = startOfDay(selectedDateRange?.from ?? new Date())
		const end = endOfDay(selectedDateRange?.to ?? new Date())

		const isInSelectedTeams =
			selectedTeams.length === 0 ||
			selectedTeams.includes(match.homeTeam.id) ||
			selectedTeams.includes(match.awayTeam.id)

		return isWithinInterval(match.date, { start, end }) && isInSelectedTeams
	}).sort((a, b) => a.date.getTime() - b.date.getTime())

	const matchesByCompetition: Record<string, Match[]> = {}
	if (selectedCompetitions.includes("brasileirao-serie-a")) {
		matchesByCompetition["brasileirao-serie-a"] = filteredMatches.filter(
			(f) => f.competition?.id === 1,
		)
	}
	if (selectedCompetitions.includes("brasileirao-serie-b")) {
		matchesByCompetition["brasileirao-serie-b"] = filteredMatches.filter(
			(f) => f.competition?.id === 2,
		)
	}
	if (selectedCompetitions.includes("copa-do-brasil")) {
		matchesByCompetition["copa-do-brasil"] = filteredMatches.filter(
			(f) => f.competition?.id === 3,
		)
	}

	const hasAnyMatch = Object.values(matchesByCompetition).some(
		(matches) => matches.length > 0,
	)

	return (
		<section className="flex flex-col gap-4">
			<div className="flex justify-between gap-3 sm:justify-start">
				<Label className="flex flex-col items-start">
					Datas:
					<ResponsiveDateRangePicker
						value={selectedDateRange}
						onValueChange={setSelectedDateRange}
					/>
				</Label>
				<Label className="flex flex-col items-start">
					Campeonatos:
					<ResponsiveSelect
						options={competitionOptions}
						value={selectedCompetitions}
						onValueChange={setSelectedCompetitions}
					/>
				</Label>
				<Label className="flex flex-col items-start">
					Clubes:
					<ResponsiveSelect<number>
						options={teamsOptions}
						value={selectedTeams}
						onValueChange={setSelectedTeams}
					/>
				</Label>
			</div>
			<div className="flex flex-col gap-2">
				{hasAnyMatch ? (
					<>
						{selectedCompetitions.includes("brasileirao-serie-a") &&
							matchesByCompetition["brasileirao-serie-a"].length > 0 && (
								<Collapsible
									defaultOpen
									className="group flex flex-col gap-2 rounded-md p-2 bg-muted"
								>
									<CollapsibleTrigger className="flex justify-between items-center w-full text-lg font-medium cursor-pointer">
										<span>Brasileirão Série A</span>
										<ChevronDownIcon className="rotate-0 transition-transform group-data-[state=open]:rotate-180" />
									</CollapsibleTrigger>
									<CollapsibleContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
										{matchesByCompetition["brasileirao-serie-a"].map(
											(match) => (
												<MatchCard key={match.id} match={match} />
											),
										)}
									</CollapsibleContent>
								</Collapsible>
							)}
						{selectedCompetitions.includes("brasileirao-serie-b") &&
							matchesByCompetition["brasileirao-serie-b"].length > 0 && (
								<Collapsible
									defaultOpen
									className="group flex flex-col gap-2 rounded-md p-2 bg-muted"
								>
									<CollapsibleTrigger className="flex justify-between items-center w-full text-lg font-medium cursor-pointer">
										<span>Brasileirão Série B</span>
										<ChevronDownIcon className="rotate-0 transition-transform group-data-[state=open]:rotate-180" />
									</CollapsibleTrigger>
									<CollapsibleContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
										{matchesByCompetition["brasileirao-serie-b"].map(
											(match) => (
												<MatchCard key={match.id} match={match} />
											),
										)}
									</CollapsibleContent>
								</Collapsible>
							)}
						{selectedCompetitions.includes("copa-do-brasil") &&
							matchesByCompetition["copa-do-brasil"].length > 0 && (
								<Collapsible
									defaultOpen
									className="group flex flex-col gap-2 rounded-md p-2 bg-muted"
								>
									<CollapsibleTrigger className="flex justify-between items-center w-full text-lg font-medium cursor-pointer">
										<span>Copa do Brasil</span>
										<ChevronDownIcon className="rotate-0 transition-transform group-data-[state=open]:rotate-180" />
									</CollapsibleTrigger>
									<CollapsibleContent className="grid grid-cols-1 gap-2 md:grid-cols-2">
										{matchesByCompetition["copa-do-brasil"].map((match) => (
											<MatchCard key={match.id} match={match} />
										))}
									</CollapsibleContent>
								</Collapsible>
							)}
					</>
				) : (
					<span className="my-5 mx-auto text-center text-muted-foreground">
						{selectedCompetitions.length === 0
							? "Nenhuma competição selecionada"
							: "Nenhuma partida encontrada para os filtros selecionados"}
					</span>
				)}
			</div>
		</section>
	)
}
