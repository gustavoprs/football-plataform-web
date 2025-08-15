"use client"

import { endOfDay, isWithinInterval, startOfDay } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
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

export function Content({ matches }: ContentProps) {
	const [selectedDateRange, setSelectedDateRange] = useState<
		DateRange | undefined
	>({
		from: new Date(),
		to: new Date(),
	})
	const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>([
		"brasileirao-serie-a",
		"copa-do-brasil",
	])

	const filteredMatches = matches.filter((match) => {
		const start = startOfDay(selectedDateRange?.from ?? new Date())
		const end = endOfDay(selectedDateRange?.to ?? new Date())
		return isWithinInterval(match.date, { start, end })
	})

	const matchesByCompetition: Record<string, Match[]> = {}
	if (selectedCompetitions.includes("brasileirao-serie-a")) {
		matchesByCompetition["brasileirao-serie-a"] = filteredMatches.filter(
			(f) => f.competition.id === 1,
		)
	}
	if (selectedCompetitions.includes("copa-do-brasil")) {
		matchesByCompetition["copa-do-brasil"] = filteredMatches.filter(
			(f) => f.competition.id === 2,
		)
	}

	const hasAnyMatch = Object.values(matchesByCompetition).some(
		(matches) => matches.length > 0,
	)

	return (
		<section className="flex flex-col gap-4">
			<div className="flex justify-between gap-3 sm:justify-start">
				<Label className="flex flex-col items-start">
					Dias:
					<ResponsiveDateRangePicker
						value={selectedDateRange}
						onValueChange={setSelectedDateRange}
					/>
				</Label>
				<Label className="flex flex-col items-start">
					Campeonatos:
					<ResponsiveSelect
						options={[
							{
								label: "Brasileirão Série A",
								value: "brasileirao-serie-a",
							},
							{
								label: "Copa do Brasil",
								value: "copa-do-brasil",
							},
						]}
						value={selectedCompetitions}
						onValueChange={setSelectedCompetitions}
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
