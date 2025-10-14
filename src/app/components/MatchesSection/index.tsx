import { cookies } from "next/headers"
import Link from "next/link"
import {
	Carousel,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFilteredMatches } from "@/lib/footballApi/matches"
import type { Match } from "@/lib/types/match"
import { cn } from "@/lib/utils"
import MatchesCarousel from "./MatchesCarousel"

type Props = {
	className?: string
}

export default async function MatchesSection({ className }: Props) {
	const selectedTeamId = (await cookies()).get("selectedTeamId")?.value
	const today = new Date()

	const twoDaysAgo = new Date()
	twoDaysAgo.setDate(today.getDate() - 2)

	const twoDaysLater = new Date()
	twoDaysLater.setDate(today.getDate() + 2)

	const matches = await getFilteredMatches({
		from: twoDaysAgo,
		to: twoDaysLater,
	})

	const nextMatches = matches
		.filter((match) => match.date.getTime() >= today.getTime())
		.sort((a, b) => a.date.getTime() - b.date.getTime())

	const previousMatches = matches
		.filter((match) => match.date.getTime() < today.getTime())
		.sort((a, b) => b.date.getTime() - a.date.getTime())

	let teamMatches: Match[] = []
	if (selectedTeamId) {
		teamMatches = (
			await getFilteredMatches({
				teamIds: [Number(selectedTeamId)],
				from: today,
			})
		).splice(0, 10)
	}

	return (
		<section className={cn("flex flex-col gap-1 w-full", className)}>
			<Link
				href="/agenda"
				className="w-fit text-lg font-medium transition-all hover:underline"
			>
				Partidas e Resultados
			</Link>
			<Tabs
				defaultValue={selectedTeamId ? "team" : "next"}
				className="max-w-full flex-1"
			>
				<Carousel
					className="flex flex-col gap-2"
					opts={{
						align: "start",
					}}
				>
					<div className="flex justify-between">
						<TabsList>
							{selectedTeamId && (
								<TabsTrigger value="team">Meu time</TabsTrigger>
							)}
							<TabsTrigger value="next">Próximos jogos</TabsTrigger>
							<TabsTrigger value="previous">
								<span className="inline-flex gap-1">
									Resultados <span className="hidden sm:block">recentes</span>
								</span>
							</TabsTrigger>
						</TabsList>
						<div className="flex gap-2">
							<CarouselPrevious
								variant="secondary"
								className="static translate-0"
							/>
							<CarouselNext
								variant="secondary"
								className="static translate-0"
							/>
						</div>
					</div>
					{selectedTeamId && (
						<TabsContent value="team">
							<MatchesCarousel
								matches={teamMatches}
								emptyMessage="Nenhum jogo disponível para o seu time."
								linkText="Clique aqui para ver todos os jogos do seu time."
							/>
						</TabsContent>
					)}
					<TabsContent value="next">
						<MatchesCarousel
							matches={nextMatches}
							emptyMessage="Nehuma partida disponível nos próximos dois dias."
							linkText="Clique aqui para ver todas partidas."
						/>
					</TabsContent>
					<TabsContent value="previous">
						<MatchesCarousel
							matches={previousMatches}
							emptyMessage="Nenhum resultado disponível dos dois últimos dias."
							linkText="Clique aqui para ver todos resultados."
						/>
					</TabsContent>
				</Carousel>
			</Tabs>
		</section>
	)
}
