import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
	ArrowUpRightIcon,
	BadgeIcon,
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
	UsersIcon,
} from "lucide-react"
import Link from "next/link"
import { getMatchStatusLabel, type Match } from "@/lib/types/match"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"

type Props = {
	match: Match
	className?: string
	children: React.ReactNode
}

export default function MatchDialog({ match, children }: Props) {
	const penaltyDispute =
		match.score.penalty.home !== 0 || match.score.penalty.away !== 0

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="p-8 max-w-screen w-[575px] sm:max-w-screen">
				<DialogTitle className="sr-only">
					{match.homeTeam.name} vs {match.awayTeam.name}
				</DialogTitle>
				<div className="flex flex-col gap-8">
					<div className="flex justify-between text-sm">
						<div className="flex items-center gap-2">
							{match.competition && (
								<>
									{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
									<img
										src={match.competition.logo}
										alt={match.competition.name}
										className="size-5 overflow-hidden"
									/>
									<span>{match.competition.name}</span>
								</>
							)}
						</div>
						<div className="flex items-center gap-1.5">
							{match.competition?.id === 1 && (
								<Button
									size="sm"
									variant="link"
									className="text-foreground"
									asChild
								>
									<Link
										href={`/mano-a-mano/${match.homeTeam.id}-vs-${match.awayTeam.id}`}
									>
										<span>Fazer mano a mano</span>
										<ArrowUpRightIcon />
									</Link>
								</Button>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-4 text-xl">
							<div className="flex items-center gap-2 flex-1">
								{/** biome-ignore lint/performance/noImgElement: <source domain not found> */}
								<img
									src={match.homeTeam.logoURL}
									alt={match.homeTeam.name}
									loading="lazy"
									className="size-12 object-contain overflow-hidden"
								/>
								<span className="text-lg truncate sm:text-xl">
									{match.homeTeam.name}
								</span>
							</div>
							<div className="flex items-center gap-1.5 font-medium">
								<span className="inline-flex items-center gap-1">
									{penaltyDispute && (
										<span className="text-sm text-muted-foreground">
											({match.score.penalty.home})
										</span>
									)}
									{match.status === "in_progress" ||
										(match.status === "finished" && (
											<span>{match.score.fullTime.home}</span>
										))}
								</span>
								<span className="text-lg font-light text-muted-foreground">
									x
								</span>
								<span className="inline-flex items-center gap-1">
									{match.status === "in_progress" ||
										(match.status === "finished" && (
											<span>{match.score.fullTime.away}</span>
										))}
									{penaltyDispute && (
										<span className="text-sm text-muted-foreground">
											({match.score.penalty.away})
										</span>
									)}
								</span>
							</div>
							<div className="flex flex-row-reverse items-center gap-2 flex-1">
								{/** biome-ignore lint/performance/noImgElement: <source domain not found> */}
								<img
									src={match.awayTeam.logoURL}
									alt={match.awayTeam.name}
									loading="lazy"
									className="size-12 object-contain overflow-hidden"
								/>
								<span className="text-lg truncate sm:text-xl">
									{match.awayTeam.name}
								</span>
							</div>
						</div>
						{match.status === "in_progress" ||
							(match.status === "finished" && (
								<div className="flex flex-col gap-1">
									<div className="flex flex-col text-sm text-muted-foreground">
										<div className="relative flex justify-center items-center gap-1 flex-1">
											<span className="absolute left-1/6 text-xs sm:left-1/4">
												1º tempo
											</span>
											<div className="flex gap-1">
												<span>{match.score.halfTime.home}</span>
												<span className="font-light">x</span>
												<span>{match.score.halfTime.away}</span>
											</div>
										</div>
									</div>
									<div className="flex flex-col text-sm text-muted-foreground">
										<div className="relative flex justify-center items-center gap-1 flex-1">
											<span className="absolute left-1/6 text-xs sm:left-1/4">
												2º tempo
											</span>
											<div className="flex gap-1">
												<span>{match.score.fullTime.home}</span>
												<span className="font-light">x</span>
												<span>{match.score.fullTime.away}</span>
											</div>
										</div>
									</div>
									{penaltyDispute && (
										<div className="flex flex-col text-sm text-muted-foreground">
											<div className="relative flex justify-center items-center gap-1 flex-1">
												<span className="absolute left-1/6 text-xs sm:left-1/4">
													Disp. de Pênaltis
												</span>
												<div className="flex gap-1">
													<span>{match.score.penalty.home}</span>
													<span className="font-light">x</span>
													<span>{match.score.penalty.away}</span>
												</div>
											</div>
										</div>
									)}
								</div>
							))}
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<span className="text-sm font-medium text-muted-foreground">
								Data e horário:
							</span>
							<div className="flex gap-5 text-sm">
								<span className="inline-flex items-center gap-2">
									<BadgeIcon className="size-4" />
									<span>{getMatchStatusLabel(match.status)}</span>
								</span>
								<span className="inline-flex items-center gap-2">
									<CalendarIcon className="size-4" />
									<span>
										{formatDate(match.date, "dd/MM/yyyy (EEEE)", {
											locale: ptBR,
										}).replace(/\((\p{L})/u, (_, c) => `(${c.toUpperCase()}`)}
									</span>
								</span>
								<span className="inline-flex items-center gap-2">
									<ClockIcon className="size-4" />
									<span>
										{formatDate(match.date, "H:mm", {
											locale: ptBR,
										})}
									</span>
								</span>
							</div>
						</div>
						{match.venue.name && (
							<div className="flex flex-col gap-2">
								<span className="text-sm font-medium text-muted-foreground">
									Local:
								</span>
								<div className="flex items-center gap-5">
									{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
									<img
										src={
											match.venue.image
												? match.venue.image
												: "/stadium-image-placeholder.jpg"
										}
										alt={`Foto do estádio ${match.venue.name}`}
										loading="lazy"
										className="rounded-md border min-w-44 h-32 object-cover bg-accent overflow-hidden"
									/>
									<div className="flex flex-col gap-3">
										<span className="text-balance leading-tight font-medium">
											{match.venue.name}
										</span>
										<div className="flex flex-col gap-1">
											{match.venue.capacity !== 0 && (
												<div className="flex items-center gap-2.5">
													<UsersIcon />
													<div className="flex flex-col">
														<span className="leading-none text-xs text-muted-foreground">
															Capacidade
														</span>
														<span className="text-sm">
															{match.venue.capacity.toLocaleString("pt-BR")}
														</span>
													</div>
												</div>
											)}
											<div className="flex items-center gap-2.5">
												<MapPinIcon />
												<div className="flex flex-col">
													<span className="leading-none text-xs text-muted-foreground">
														Localização
													</span>
													<span className="text-sm">{match.venue.city}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
